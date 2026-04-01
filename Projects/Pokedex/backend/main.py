import argparse
import json
import os
import re
import urllib.error
import urllib.parse
import urllib.request
from getpass import getpass

import uvicorn
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from auth_service import AuthService


USERS_FILE = os.path.join(os.path.dirname(__file__), "users.json")
POKEDEX_FILE = os.path.join(os.path.dirname(__file__), "..", "holdover", "pokedex.json")
auth_service = AuthService(USERS_FILE)
LOCATION_AREA_LIST_URL = "https://pokeapi.co/api/v2/location-area?limit=2000"
LOCATION_AREA_LIST_CACHE = None
LOCATION_AREA_DETAIL_CACHE = {}
VERSION_GROUP_BY_VERSION_CACHE = {}
VERSION_AVAILABILITY_CACHE = {}


def _parse_cors_origins() -> list[str]:
	origins_raw = os.environ.get("CORS_ORIGINS", "")
	if origins_raw.strip():
		return [origin.strip() for origin in origins_raw.split(",") if origin.strip()]
	return ["http://localhost:3000", "http://127.0.0.1:3000"]


def _fetch_json(url: str):
	try:
		request = urllib.request.Request(
			url,
			headers={
				"User-Agent": "TermiDex/1.0 (https://github.com/Daveparisi8/TermiDex)",
				"Accept": "application/json",
			},
		)
		with urllib.request.urlopen(request, timeout=14) as response:
			return json.load(response)
	except urllib.error.HTTPError as error:
		if error.code == 404:
			return None
		raise RuntimeError(f"Upstream HTTP error {error.code}") from error
	except urllib.error.URLError as error:
		raise RuntimeError("Upstream PokeAPI unavailable") from error


def _format_location_name(location_slug: str) -> str:
	return location_slug.replace("-", " ").title()


def _format_method_name(method_slug: str) -> str:
	return method_slug.replace("-", " ").title()


def _format_move_name(move_slug: str) -> str:
	return move_slug.replace("-", " ").title()


def _get_version_group_name(version: str) -> str | None:
	if version in VERSION_GROUP_BY_VERSION_CACHE:
		return VERSION_GROUP_BY_VERSION_CACHE[version]

	version_url = f"https://pokeapi.co/api/v2/version/{urllib.parse.quote(version)}"
	payload = _fetch_json(version_url)
	if payload is None:
		return None

	version_group_name = payload.get("version_group", {}).get("name")
	VERSION_GROUP_BY_VERSION_CACHE[version] = version_group_name
	return version_group_name


def _extract_time_label(condition_values: list[dict]) -> str:
	times = []
	for condition_value in condition_values:
		name = condition_value.get("name", "")
		if name.startswith("time-"):
			time_value = name.replace("time-", "").replace("-", " ").title()
			times.append(time_value)

	unique_times = sorted(set(times))
	if not unique_times:
		return "Any"
	return ", ".join(unique_times)


def _build_encounter_detail(encounter: dict) -> dict:
	min_level = encounter.get("min_level")
	max_level = encounter.get("max_level")
	if min_level is None and max_level is None:
		level_text = "Unknown"
	elif min_level == max_level:
		level_text = str(min_level)
	else:
		level_text = f"{min_level}-{max_level}"

	return {
		"method": _format_method_name(encounter.get("method", {}).get("name", "unknown")),
		"chance": encounter.get("chance"),
		"min_level": min_level,
		"max_level": max_level,
		"level": level_text,
		"time": _extract_time_label(encounter.get("condition_values", [])),
	}


def _slugify_route_query(route_query: str) -> str:
	return re.sub(r"[^a-z0-9]+", "-", route_query.strip().lower()).strip("-")


def _extract_resource_id(resource_url: str) -> int | None:
	match = re.search(r"/(\d+)/?$", resource_url or "")
	if not match:
		return None
	return int(match.group(1))


def _get_location_area_resources() -> list[dict]:
	global LOCATION_AREA_LIST_CACHE
	if LOCATION_AREA_LIST_CACHE is None:
		payload = _fetch_json(LOCATION_AREA_LIST_URL) or {}
		LOCATION_AREA_LIST_CACHE = payload.get("results", [])
	return LOCATION_AREA_LIST_CACHE


def _get_location_area_detail(area_url: str) -> dict | None:
	if area_url not in LOCATION_AREA_DETAIL_CACHE:
		LOCATION_AREA_DETAIL_CACHE[area_url] = _fetch_json(area_url)
	return LOCATION_AREA_DETAIL_CACHE[area_url]


def _get_available_pokemon_ids_for_version(version: str) -> list[int]:
	if version in VERSION_AVAILABILITY_CACHE:
		return VERSION_AVAILABILITY_CACHE[version]

	available_ids = set()
	for area in _get_location_area_resources():
		area_url = area.get("url")
		if not area_url:
			continue

		area_payload = _get_location_area_detail(area_url) or {}
		for encounter in area_payload.get("pokemon_encounters", []):
			version_details = encounter.get("version_details", [])
			if not any(detail.get("version", {}).get("name") == version for detail in version_details):
				continue

			pokemon_id = _extract_resource_id(encounter.get("pokemon", {}).get("url", ""))
			if pokemon_id is not None:
				available_ids.add(pokemon_id)

	VERSION_AVAILABILITY_CACHE[version] = sorted(available_ids)
	return VERSION_AVAILABILITY_CACHE[version]


class RegisterRequest(BaseModel):
	username: str
	password: str
	pin: str


class LoginRequest(BaseModel):
	username: str
	password: str


def create_app() -> FastAPI:
	app = FastAPI(title="TermiDex Auth API", version="0.1.0")
	allowed_origins = _parse_cors_origins()
	app.add_middleware(
		CORSMiddleware,
		allow_origins=allowed_origins,
		allow_credentials=True,
		allow_methods=["*"],
		allow_headers=["*"],
	)

	@app.get("/health")
	def health() -> dict:
		return {"status": "ok"}

	@app.post("/auth/register")
	def register(payload: RegisterRequest) -> dict:
		ok, message = auth_service.register(
			username=payload.username,
			password=payload.password,
			pin=payload.pin,
		)
		return {"success": ok, "message": message}

	@app.post("/auth/login")
	def login(payload: LoginRequest) -> dict:
		ok, message = auth_service.authenticate(
			username=payload.username,
			password=payload.password,
		)
		return {"success": ok, "message": message}

	@app.get("/pokedex")
	def pokedex() -> dict:
		with open(POKEDEX_FILE, "r", encoding="utf-8") as file:
			data = json.load(file)
		return {"count": len(data), "pokemon": data}

	@app.get("/availability")
	def availability(version: str = Query(..., min_length=1)) -> dict:
		try:
			pokemon_ids = _get_available_pokemon_ids_for_version(version)
		except RuntimeError as error:
			raise HTTPException(status_code=502, detail=str(error)) from error

		return {
			"version": version,
			"count": len(pokemon_ids),
			"pokemon_ids": pokemon_ids,
		}

	@app.get("/pokemon/{pokemon_name}/locations")
	def pokemon_locations(pokemon_name: str, version: str = Query(..., min_length=1)) -> dict:
		pokemon_url = f"https://pokeapi.co/api/v2/pokemon/{urllib.parse.quote(str(pokemon_name))}"
		try:
			pokemon_payload = _fetch_json(pokemon_url)
		except RuntimeError as error:
			raise HTTPException(status_code=502, detail=str(error)) from error
		if pokemon_payload is None:
			raise HTTPException(status_code=404, detail="Pokemon not found in PokeAPI")

		encounters_url = pokemon_payload.get("location_area_encounters")
		if not encounters_url:
			return {
				"pokemon": pokemon_payload.get("name", str(pokemon_name)),
				"version": version,
				"count": 0,
				"locations": [],
			}

		try:
			encounter_payload = _fetch_json(encounters_url) or []
		except RuntimeError as error:
			raise HTTPException(status_code=502, detail=str(error)) from error
		locations_by_name = {}

		for area in encounter_payload:
			location_area = area.get("location_area", {})
			location_name = _format_location_name(location_area.get("name", "unknown"))
			matching_version_details = [
				detail
				for detail in area.get("version_details", [])
				if detail.get("version", {}).get("name") == version
			]
			if not matching_version_details:
				continue

			location_entry = locations_by_name.setdefault(
				location_name,
				{"location": location_name, "encounters": []},
			)
			seen_encounters = {
				(
					encounter["method"],
					encounter["level"],
					encounter["chance"],
					encounter["time"],
				)
				for encounter in location_entry["encounters"]
			}

			for detail in matching_version_details:
				for encounter in detail.get("encounter_details", []):
					encounter_detail = _build_encounter_detail(encounter)
					detail_key = (
						encounter_detail["method"],
						encounter_detail["level"],
						encounter_detail["chance"],
						encounter_detail["time"],
					)
					if detail_key not in seen_encounters:
						location_entry["encounters"].append(encounter_detail)
						seen_encounters.add(detail_key)

		matched_locations = sorted(locations_by_name.values(), key=lambda item: item["location"])

		return {
			"pokemon": pokemon_payload.get("name", str(pokemon_name)),
			"version": version,
			"count": len(matched_locations),
			"locations": matched_locations,
		}

	@app.get("/pokemon/{pokemon_name}/moves")
	def pokemon_moves(pokemon_name: str, version: str = Query(..., min_length=1)) -> dict:
		pokemon_url = f"https://pokeapi.co/api/v2/pokemon/{urllib.parse.quote(str(pokemon_name))}"
		try:
			pokemon_payload = _fetch_json(pokemon_url)
		except RuntimeError as error:
			raise HTTPException(status_code=502, detail=str(error)) from error

		if pokemon_payload is None:
			raise HTTPException(status_code=404, detail="Pokemon not found in PokeAPI")

		try:
			version_group_name = _get_version_group_name(version)
		except RuntimeError as error:
			raise HTTPException(status_code=502, detail=str(error)) from error

		if not version_group_name:
			raise HTTPException(status_code=404, detail="Game version not found in PokeAPI")

		moves = []
		seen_moves = set()
		for move_entry in pokemon_payload.get("moves", []):
			move_name = _format_move_name(move_entry.get("move", {}).get("name", "unknown"))
			for detail in move_entry.get("version_group_details", []):
				if detail.get("version_group", {}).get("name") != version_group_name:
					continue

				learn_method = _format_method_name(detail.get("move_learn_method", {}).get("name", "unknown"))
				level = detail.get("level_learned_at", 0)
				move_key = (move_name, learn_method, level)
				if move_key in seen_moves:
					continue

				moves.append(
					{
						"name": move_name,
						"learn_method": learn_method,
						"level": level,
					}
				)
				seen_moves.add(move_key)

		moves.sort(key=lambda item: (item["level"], item["name"], item["learn_method"]))

		return {
			"pokemon": pokemon_payload.get("name", str(pokemon_name)),
			"version": version,
			"version_group": version_group_name,
			"count": len(moves),
			"moves": moves,
		}

	@app.get("/routes/encounters")
	def route_encounters(route: str = Query(..., min_length=1), version: str = Query(..., min_length=1)) -> dict:
		route_slug = _slugify_route_query(route)
		if not route_slug:
			raise HTTPException(status_code=400, detail="Route filter must not be empty")

		try:
			location_areas = _get_location_area_resources()
		except RuntimeError as error:
			raise HTTPException(status_code=502, detail=str(error)) from error

		matched_area_resources = [
			area for area in location_areas if route_slug in area.get("name", "")
		]

		pokemon_by_id = {}
		matched_locations = []

		for area in matched_area_resources:
			area_url = area.get("url")
			if not area_url:
				continue

			try:
				area_payload = _get_location_area_detail(area_url) or {}
			except RuntimeError as error:
				raise HTTPException(status_code=502, detail=str(error)) from error

			location_name = _format_location_name(area_payload.get("name") or area.get("name", "unknown"))
			pokemon_encounters = area_payload.get("pokemon_encounters", [])

			area_has_match = False
			for encounter in pokemon_encounters:
				version_details = [
					detail
					for detail in encounter.get("version_details", [])
					if detail.get("version", {}).get("name") == version
				]
				if not version_details:
					continue

				pokemon_resource = encounter.get("pokemon", {})
				pokemon_id = _extract_resource_id(pokemon_resource.get("url", ""))
				if pokemon_id is None:
					continue

				area_has_match = True
				pokemon_entry = pokemon_by_id.setdefault(
					pokemon_id,
					{
						"id": pokemon_id,
						"name": pokemon_resource.get("name", "unknown"),
						"locations": [],
					},
				)

				location_entry = next(
					(
						location
						for location in pokemon_entry["locations"]
						if location["location"] == location_name
					),
					None,
				)
				if location_entry is None:
					location_entry = {"location": location_name, "encounters": []}
					pokemon_entry["locations"].append(location_entry)

				seen_encounters = {
					(
						detail["method"],
						detail["level"],
						detail["chance"],
						detail["time"],
					)
					for detail in location_entry["encounters"]
				}

				for detail in version_details:
					for encounter_detail_raw in detail.get("encounter_details", []):
						encounter_detail = _build_encounter_detail(encounter_detail_raw)
						detail_key = (
							encounter_detail["method"],
							encounter_detail["level"],
							encounter_detail["chance"],
							encounter_detail["time"],
						)
						if detail_key not in seen_encounters:
							location_entry["encounters"].append(encounter_detail)
							seen_encounters.add(detail_key)

			if area_has_match and location_name not in matched_locations:
				matched_locations.append(location_name)

		pokemon = sorted(
			pokemon_by_id.values(),
			key=lambda item: (item["id"], item["name"]),
		)

		return {
			"route": route,
			"route_slug": route_slug,
			"version": version,
			"location_count": len(matched_locations),
			"locations": matched_locations,
			"count": len(pokemon),
			"pokemon": pokemon,
		}

	return app


app = create_app()


def handle_register(auth_service: AuthService) -> None:
	username = input("Choose a username: ").strip()
	password = getpass("Choose a password: ")
	confirm = getpass("Confirm password: ")
	if password != confirm:
		print("Passwords do not match.")
		return

	pin = input("Choose a 4-digit PIN: ").strip()
	ok, message = auth_service.register(username=username, password=password, pin=pin)
	print(message)


def handle_login(auth_service: AuthService) -> None:
	username = input("Username: ").strip()
	password = getpass("Password: ")
	ok, message = auth_service.authenticate(username=username, password=password)
	print(message)
	if ok:
		print("Login successful.")


def handle_list_users(auth_service: AuthService) -> None:
	if not auth_service.users:
		print("No users found.")
		return

	print("Registered users:")
	for key, user in auth_service.users.items():
		lock_state = "locked" if user.is_locked else "active"
		print(f"- {user.username} ({key}) [{lock_state}]")


def build_parser() -> argparse.ArgumentParser:
	parser = argparse.ArgumentParser(description="TermiDex backend auth utility")
	parser.add_argument(
		"command",
		nargs="?",
		default="serve",
		choices=["register", "login", "list-users", "serve"],
		help="Action to perform",
	)
	parser.add_argument("--host", default="127.0.0.1", help="API host for serve command")
	parser.add_argument("--port", type=int, default=8000, help="API port for serve command")
	return parser


def main() -> None:
	parser = build_parser()
	args = parser.parse_args()
	auth_service = AuthService(USERS_FILE)

	if args.command == "register":
		handle_register(auth_service)
	elif args.command == "login":
		handle_login(auth_service)
	elif args.command == "list-users":
		handle_list_users(auth_service)
	elif args.command == "serve":
		host = os.environ.get("HOST", args.host)
		port = int(os.environ.get("PORT", str(args.port)))
		uvicorn.run(app, host=host, port=port, reload=False)


if __name__ == "__main__":
	main()


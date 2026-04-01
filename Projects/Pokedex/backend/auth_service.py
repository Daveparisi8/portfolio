import hashlib
import json
import os
from dataclasses import dataclass


@dataclass
class LoginData:
	username: str
	password_hash: str
	pin: str
	login_attempts: int = 0

	@staticmethod
	def hash_password(raw_password: str) -> str:
		salt = os.urandom(16)
		key = hashlib.pbkdf2_hmac("sha256", raw_password.encode("utf-8"), salt, 100_000)
		return (salt + key).hex()

	@staticmethod
	def verify_password(raw_password: str, password_hash_hex: str) -> bool:
		hashed = bytes.fromhex(password_hash_hex)
		salt, expected_key = hashed[:16], hashed[16:]
		candidate = hashlib.pbkdf2_hmac("sha256", raw_password.encode("utf-8"), salt, 100_000)
		return candidate == expected_key

	@property
	def is_locked(self) -> bool:
		return self.login_attempts >= 3

	def to_dict(self) -> dict:
		return {
			"username": self.username,
			"password_hash": self.password_hash,
			"pin": self.pin,
		}

	@classmethod
	def from_dict(cls, data: dict) -> "LoginData":
		return cls(
			username=data["username"],
			password_hash=data["password_hash"],
			pin=data["pin"],
			login_attempts=0,
		)


class AuthService:
	DEFAULT_ADMIN_USERNAME = "admin"
	DEFAULT_ADMIN_PASSWORD = "password"
	DEFAULT_ADMIN_PIN = "0000"
	DEFAULT_PORTFOLIO_USERNAME = "portfolio_guest"
	DEFAULT_PORTFOLIO_PASSWORD = "portfolio_access"
	DEFAULT_PORTFOLIO_PIN = "1111"

	def __init__(self, users_file: str):
		self.users_file = users_file
		self.users = self._load_users()
		self._ensure_default_accounts()

	def _ensure_account(self, username: str, password: str, pin: str) -> bool:
		key = username.strip().lower()
		if key in self.users:
			return False

		self.users[key] = LoginData(
			username=username,
			password_hash=LoginData.hash_password(password),
			pin=pin,
			login_attempts=0,
		)
		return True

	def _ensure_default_accounts(self) -> None:
		created_any = False
		created_any = self._ensure_account(
			username=self.DEFAULT_ADMIN_USERNAME,
			password=self.DEFAULT_ADMIN_PASSWORD,
			pin=self.DEFAULT_ADMIN_PIN,
		) or created_any
		created_any = self._ensure_account(
			username=self.DEFAULT_PORTFOLIO_USERNAME,
			password=self.DEFAULT_PORTFOLIO_PASSWORD,
			pin=self.DEFAULT_PORTFOLIO_PIN,
		) or created_any

		if created_any:
			self._save_users()

	def _load_users(self) -> dict:
		if not os.path.isfile(self.users_file):
			return {}

		with open(self.users_file, "r", encoding="utf-8") as file:
			raw_data = json.load(file)

		return {username: LoginData.from_dict(payload) for username, payload in raw_data.items()}

	def _save_users(self) -> None:
		payload = {username: user.to_dict() for username, user in self.users.items()}
		with open(self.users_file, "w", encoding="utf-8") as file:
			json.dump(payload, file, indent=2)

	def register(self, username: str, password: str, pin: str) -> tuple[bool, str]:
		normalized_username = username.strip()
		key = normalized_username.lower()

		if not normalized_username:
			return False, "Username is required."
		if key in self.users:
			return False, "Username already exists."
		if not password:
			return False, "Password is required."
		if not (pin.isdigit() and len(pin) == 4):
			return False, "PIN must be exactly 4 digits."

		password_hash = LoginData.hash_password(password)
		self.users[key] = LoginData(
			username=normalized_username,
			password_hash=password_hash,
			pin=pin,
			login_attempts=0,
		)
		self._save_users()
		return True, "Account created successfully."

	def authenticate(self, username: str, password: str) -> tuple[bool, str]:
		key = username.strip().lower()
		user = self.users.get(key)

		if user is None:
			return False, "No account found for that username."
		if user.is_locked:
			return False, "Account is locked due to too many failed attempts."

		if LoginData.verify_password(password, user.password_hash):
			user.login_attempts = 0
			self._save_users()
			return True, f"Welcome back, {user.username}!"

		user.login_attempts += 1
		self._save_users()
		attempts_left = max(0, 3 - user.login_attempts)
		if user.is_locked:
			return False, "Incorrect password. Account is now locked."
		return False, f"Incorrect password. {attempts_left} attempt(s) left."


// API service functions for Pokedex app

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// Fetch pokedex entries
export async function fetchPokedexEntries() {
  const response = await fetch(`${API_BASE_URL}/pokedex`);
  if (!response.ok) throw new Error('Could not load Pokedex data.');
  const payload = await response.json();
  return Array.isArray(payload.pokemon) ? payload.pokemon : [];
}

// Fetch availability for a game version
export async function fetchAvailability(version) {
  const response = await fetch(`${API_BASE_URL}/availability?version=${encodeURIComponent(version)}`);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.detail || 'Could not load game availability data.');
  return Array.isArray(payload.pokemon_ids) ? payload.pokemon_ids : [];
}

// Fetch locations for a Pokémon in a version
export async function fetchPokemonLocations(pokemonId, version) {
  const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonId}/locations?version=${encodeURIComponent(version)}`);
  const payload = await response.json();
  return Array.isArray(payload.locations) ? payload.locations : [];
}

// Fetch moves for a Pokémon in a version
export async function fetchPokemonMoves(pokemonId, version) {
  const response = await fetch(`${API_BASE_URL}/pokemon/${pokemonId}/moves?version=${encodeURIComponent(version)}`);
  const payload = await response.json();
  return Array.isArray(payload.moves) ? payload.moves : [];
}

// Fetch route encounters for a version and route
export async function fetchRouteEncounters(version, route) {
  const response = await fetch(`${API_BASE_URL}/routes/encounters?version=${encodeURIComponent(version)}&route=${encodeURIComponent(route)}`);
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.detail || 'Could not load route encounters.');
  return Array.isArray(payload.pokemon) ? payload.pokemon : [];
}

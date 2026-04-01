// Centralized imports for App.js
import { useEffect, useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import typeMatchupsData from './typematchups.json';
import {
  getTypeMultiplierAgainstDefender,
  getTypeColorClassName,
  formatMovesetLine,
  formatEvolutionCondition,
} from './utils';
import {
  fetchPokedexEntries,
  fetchAvailability,
  fetchPokemonLocations,
  fetchPokemonMoves,
  fetchRouteEncounters,
} from './api';

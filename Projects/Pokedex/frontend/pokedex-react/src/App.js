import { useEffect, useState } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import typeMatchupsData from './typematchups.json';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

const OFFICIAL_GAMES = [
  'Pokémon Red',
  'Pokémon Blue',
  'Pokémon Yellow',
  'Pokémon Gold',
  'Pokémon Silver',
  'Pokémon Crystal',
  'Pokémon Ruby',
  'Pokémon Sapphire',
  'Pokémon Emerald',
  'Pokémon FireRed',
  'Pokémon LeafGreen',
  'Pokémon Diamond',
  'Pokémon Pearl',
  'Pokémon Platinum',
  'Pokémon HeartGold',
  'Pokémon SoulSilver',
  'Pokémon Black',
  'Pokémon White',
  'Pokémon Black 2',
  'Pokémon White 2',
  'Pokémon X',
  'Pokémon Y',
  'Pokémon Omega Ruby',
  'Pokémon Alpha Sapphire',
  'Pokémon Sun',
  'Pokémon Moon',
  'Pokémon Ultra Sun',
  'Pokémon Ultra Moon',
  "Pokémon Let's Go, Pikachu!",
  "Pokémon Let's Go, Eevee!",
  'Pokémon Sword',
  'Pokémon Shield',
  'Pokémon Brilliant Diamond',
  'Pokémon Shining Pearl',
  'Pokémon Legends: Arceus',
  'Pokémon Scarlet',
  'Pokémon Violet',
];

const GAME_CATEGORIES = [
  {
    key: 'official',
    label: 'Pokémon Official Mainline',
    games: OFFICIAL_GAMES,
  },
  {
    key: 'coming-soon',
    label: 'Coming Soon',
    games: [],
  },
];

const GAME_TO_POKEAPI_VERSION = {
  'Pokémon Red': 'red',
  'Pokémon Green': 'green',
  'Pokémon Blue': 'blue',
  'Pokémon Yellow': 'yellow',
  'Pokémon Gold': 'gold',
  'Pokémon Silver': 'silver',
  'Pokémon Crystal': 'crystal',
  'Pokémon Ruby': 'ruby',
  'Pokémon Sapphire': 'sapphire',
  'Pokémon Emerald': 'emerald',
  'Pokémon FireRed': 'firered',
  'Pokémon LeafGreen': 'leafgreen',
  'Pokémon Diamond': 'diamond',
  'Pokémon Pearl': 'pearl',
  'Pokémon Platinum': 'platinum',
  'Pokémon HeartGold': 'heartgold',
  'Pokémon SoulSilver': 'soulsilver',
  'Pokémon Black': 'black',
  'Pokémon White': 'white',
  'Pokémon Black 2': 'black-2',
  'Pokémon White 2': 'white-2',
  'Pokémon X': 'x',
  'Pokémon Y': 'y',
  'Pokémon Omega Ruby': 'omega-ruby',
  'Pokémon Alpha Sapphire': 'alpha-sapphire',
  'Pokémon Sun': 'sun',
  'Pokémon Moon': 'moon',
  'Pokémon Ultra Sun': 'ultra-sun',
  'Pokémon Ultra Moon': 'ultra-moon',
  "Pokémon Let's Go, Pikachu!": 'lets-go-pikachu',
  "Pokémon Let's Go, Eevee!": 'lets-go-eevee',
  'Pokémon Sword': 'sword',
  'Pokémon Shield': 'shield',
  'Pokémon Brilliant Diamond': 'brilliant-diamond',
  'Pokémon Shining Pearl': 'shining-pearl',
  'Pokémon Legends: Arceus': 'legends-arceus',
  'Pokémon Scarlet': 'scarlet',
  'Pokémon Violet': 'violet',
};

const VERSION_TO_MAX_NATIONAL_DEX_ID = {
  red: 151,
  green: 151,
  blue: 151,
  yellow: 151,
  gold: 251,
  silver: 251,
  crystal: 251,
  ruby: 386,
  sapphire: 386,
  emerald: 386,
  firered: 386,
  leafgreen: 386,
  diamond: 493,
  pearl: 493,
  platinum: 493,
  heartgold: 493,
  soulsilver: 493,
  black: 649,
  white: 649,
  'black-2': 649,
  'white-2': 649,
  x: 721,
  y: 721,
  'omega-ruby': 721,
  'alpha-sapphire': 721,
  sun: 809,
  moon: 809,
  'ultra-sun': 809,
  'ultra-moon': 809,
  'lets-go-pikachu': 809,
  'lets-go-eevee': 809,
  sword: 905,
  shield: 905,
  'brilliant-diamond': 905,
  'shining-pearl': 905,
  'legends-arceus': 905,
  scarlet: 1025,
  violet: 1025,
};

const VERSION_TO_GENERATION = {
  red: 1,
  green: 1,
  blue: 1,
  yellow: 1,
  gold: 2,
  silver: 2,
  crystal: 2,
  ruby: 3,
  sapphire: 3,
  emerald: 3,
  firered: 3,
  leafgreen: 3,
  diamond: 4,
  pearl: 4,
  platinum: 4,
  heartgold: 4,
  soulsilver: 4,
  black: 5,
  white: 5,
  'black-2': 5,
  'white-2': 5,
  x: 6,
  y: 6,
  'omega-ruby': 6,
  'alpha-sapphire': 6,
  sun: 7,
  moon: 7,
  'ultra-sun': 7,
  'ultra-moon': 7,
  'lets-go-pikachu': 7,
  'lets-go-eevee': 7,
  sword: 8,
  shield: 8,
  'brilliant-diamond': 8,
  'shining-pearl': 8,
  'legends-arceus': 8,
  scarlet: 9,
  violet: 9,
};

const EVOLUTION_METHOD_MIN_GENERATION = [
  { pattern: /dawn stone|dusk stone|shiny stone|reaper cloth|protector|electirizer|magmarizer|razor claw|razor fang|oval stone|mimic learned|ancient power/i, minGeneration: 4 },
  { pattern: /prism scale/i, minGeneration: 5 },
  { pattern: /high affection|knowing fairy move|fairy move/i, minGeneration: 6 },
  { pattern: /sachet|whipped dream|sliggoo.*rain|know.*dragon type move/i, minGeneration: 6 },
  { pattern: /ice stone|alolan|hisuian/i, minGeneration: 7 },
  { pattern: /galarian|tower of darkness|tower of waters|three critical hits/i, minGeneration: 8 },
  { pattern: /let's go|scarlet|violet|paldea/i, minGeneration: 9 },
];

const MOVESET_TABS = ['Level Up', 'Machine', 'Egg'];
const FAN_NOTICE_ACK_KEY = 'fanProjectNoticeAcknowledged';

function App() {
  const [session, setSession] = useState({
    isAuthenticated: false,
    username: '',
    lastAction: 'none',
    lastMessage: 'No auth activity yet.',
    success: null,
  });
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(GAME_CATEGORIES[0].key);
  const [currentScreen, setCurrentScreen] = useState('games');
  const [selectedGameName, setSelectedGameName] = useState('');
  const [pokedexEntries, setPokedexEntries] = useState([]);
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [routeSearch, setRouteSearch] = useState('');
  const [appliedRouteSearch, setAppliedRouteSearch] = useState('');
  const [isPokedexLoading, setIsPokedexLoading] = useState(false);
  const [pokedexError, setPokedexError] = useState('');
  const [routeFilterError, setRouteFilterError] = useState('');
  const [isRouteFilterLoading, setIsRouteFilterLoading] = useState(false);
  const [routeFilteredPokemonIds, setRouteFilteredPokemonIds] = useState(null);
  const [availablePokemonIdsByVersion, setAvailablePokemonIdsByVersion] = useState({});
  const [availabilityLoadingByVersion, setAvailabilityLoadingByVersion] = useState({});
  const [availabilityError, setAvailabilityError] = useState('');
  const [pokemonLocationsById, setPokemonLocationsById] = useState({});
  const [pokemonLocationLoadingById, setPokemonLocationLoadingById] = useState({});
  const [visiblePokemonLocationsById, setVisiblePokemonLocationsById] = useState({});
  const [pokemonMovesById, setPokemonMovesById] = useState({});
  const [pokemonMovesLoadingById, setPokemonMovesLoadingById] = useState({});
  const [visiblePokemonMovesById, setVisiblePokemonMovesById] = useState({});
  const [selectedMovesTabById, setSelectedMovesTabById] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showOnlyObtainable, setShowOnlyObtainable] = useState(false);
  const [selectedTypeFilters, setSelectedTypeFilters] = useState([]);
  const [useExactTypeFilter, setUseExactTypeFilter] = useState(false);
  const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(false);
  const [caughtFilter, setCaughtFilter] = useState('all');
  const [isTeamAnalysisOpen, setIsTeamAnalysisOpen] = useState(false);
  const [teamPokemonIds, setTeamPokemonIds] = useState(() => {
    try {
      const storedTeamPokemonIds = localStorage.getItem('teamPokemonIds');
      const parsedTeamPokemonIds = JSON.parse(storedTeamPokemonIds || '[]');
      return Array.isArray(parsedTeamPokemonIds)
        ? parsedTeamPokemonIds
          .map((pokemonId) => Number(pokemonId))
          .filter((pokemonId) => Number.isInteger(pokemonId))
          .slice(0, 6)
        : [];
    } catch {
      return [];
    }
  });
  const [selectedTeamPreviewPokemonId, setSelectedTeamPreviewPokemonId] = useState(null);
  const [draggedTeamIndex, setDraggedTeamIndex] = useState(null);
  const [draggedOverTeamIndex, setDraggedOverTeamIndex] = useState(null);
  const [hasAcknowledgedFanNotice, setHasAcknowledgedFanNotice] = useState(() => {
    try {
      return sessionStorage.getItem(FAN_NOTICE_ACK_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [caughtPokemonIds, setCaughtPokemonIds] = useState(() => {
    try {
      const storedCaughtPokemonIds = localStorage.getItem('caughtPokemonIds');
      const parsedCaughtPokemonIds = JSON.parse(storedCaughtPokemonIds || '[]');
      return Array.isArray(parsedCaughtPokemonIds)
        ? parsedCaughtPokemonIds
          .map((pokemonId) => Number(pokemonId))
          .filter((pokemonId) => Number.isInteger(pokemonId))
        : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 280);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem('caughtPokemonIds', JSON.stringify(caughtPokemonIds));
  }, [caughtPokemonIds]);

  useEffect(() => {
    localStorage.setItem('teamPokemonIds', JSON.stringify(teamPokemonIds));
  }, [teamPokemonIds]);

  useEffect(() => {
    if (!selectedTeamPreviewPokemonId) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedTeamPreviewPokemonId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedTeamPreviewPokemonId]);

  const handleAuthSuccess = (username) => {
    setSession((previous) => ({
      ...previous,
      isAuthenticated: true,
      username,
    }));
  };

  const handleAuthEvent = ({ success, action, message }) => {
    setSession((previous) => ({
      ...previous,
      lastAction: action,
      lastMessage: message,
      success,
      isAuthenticated: action === 'login' && success ? true : previous.isAuthenticated,
    }));
  };

  const handleLogout = () => {
    setSession((previous) => ({
      ...previous,
      isAuthenticated: false,
      username: '',
      lastAction: 'logout',
      lastMessage: 'You have been logged out.',
      success: true,
    }));
    setCurrentScreen('games');
    setSelectedGameName('');
    setRouteSearch('');
    setAppliedRouteSearch('');
    setRouteFilterError('');
    setAvailabilityError('');
    setRouteFilteredPokemonIds(null);
    setVisiblePokemonLocationsById({});
    setVisiblePokemonMovesById({});
    setSelectedMovesTabById({});
  };

  const handleAcknowledgeFanNotice = () => {
    try {
      sessionStorage.setItem(FAN_NOTICE_ACK_KEY, 'true');
    } catch {
      // Ignore storage failures and still allow acknowledgement for this runtime.
    }
    setHasAcknowledgedFanNotice(true);
  };

  const handleOpenGame = async (gameName) => {
    const nextGameVersion = GAME_TO_POKEAPI_VERSION[gameName] || '';

    setSelectedGameName(gameName);
    setCurrentScreen('pokedex');
    setPokemonSearch('');
    setRouteSearch('');
    setAppliedRouteSearch('');
    setRouteFilterError('');
    setAvailabilityError('');
    setRouteFilteredPokemonIds(null);
    setPokemonLocationsById({});
    setPokemonLocationLoadingById({});
    setVisiblePokemonLocationsById({});
    setPokemonMovesById({});
    setPokemonMovesLoadingById({});
    setVisiblePokemonMovesById({});
    setSelectedMovesTabById({});

    const pendingRequests = [];

    if (pokedexEntries.length === 0) {
      setIsPokedexLoading(true);
      setPokedexError('');

      pendingRequests.push(
        fetch(`${API_BASE_URL}/pokedex`)
          .then((response) => response.json())
          .then((payload) => {
            setPokedexEntries(Array.isArray(payload.pokemon) ? payload.pokemon : []);
          })
          .catch(() => {
            setPokedexError('Could not load Pokedex data. Make sure backend API is running.');
          })
          .finally(() => {
            setIsPokedexLoading(false);
          }),
      );
    }

    if (nextGameVersion && !Array.isArray(availablePokemonIdsByVersion[nextGameVersion])) {
      setAvailabilityLoadingByVersion((previous) => ({
        ...previous,
        [nextGameVersion]: true,
      }));

      pendingRequests.push(
        fetch(`${API_BASE_URL}/availability?version=${encodeURIComponent(nextGameVersion)}`)
          .then(async (response) => {
            const payload = await response.json();
            if (!response.ok) {
              throw new Error(payload.detail || 'Could not load game availability data.');
            }
            return payload;
          })
          .then((payload) => {
            setAvailablePokemonIdsByVersion((previous) => ({
              ...previous,
              [nextGameVersion]: Array.isArray(payload.pokemon_ids) ? payload.pokemon_ids : [],
            }));
          })
          .catch((error) => {
            setAvailabilityError(error.message || 'Could not load game availability data.');
          })
          .finally(() => {
            setAvailabilityLoadingByVersion((previous) => ({
              ...previous,
              [nextGameVersion]: false,
            }));
          }),
      );
    }

    if (pendingRequests.length > 0) {
      await Promise.all(pendingRequests);
    }
  };

  const selectedGameVersion = GAME_TO_POKEAPI_VERSION[selectedGameName] || '';
  const selectedGameGeneration = selectedGameVersion
    ? VERSION_TO_GENERATION[selectedGameVersion] || Number.POSITIVE_INFINITY
    : Number.POSITIVE_INFINITY;
  const maxNationalDexIdForSelectedVersion = selectedGameVersion
    ? VERSION_TO_MAX_NATIONAL_DEX_ID[selectedGameVersion] || Number.POSITIVE_INFINITY
    : Number.POSITIVE_INFINITY;
  const isAvailabilityLoading = Boolean(
    selectedGameVersion && availabilityLoadingByVersion[selectedGameVersion],
  );
  const availablePokemonIdsForSelectedGame = selectedGameVersion
    ? availablePokemonIdsByVersion[selectedGameVersion]
    : null;
  const hasAvailabilityDataForSelectedGame = Boolean(
    selectedGameVersion && Array.isArray(availablePokemonIdsForSelectedGame),
  );
  const availablePokemonIdSet = new Set(
    Array.isArray(availablePokemonIdsForSelectedGame)
      ? availablePokemonIdsForSelectedGame
        .map((pokemonId) => Number(pokemonId))
        .filter((pokemonId) => Number.isInteger(pokemonId))
      : [],
  );
  const pokedexEntriesById = new Map(
    pokedexEntries
      .map((entry) => [Number(entry?.id), entry])
      .filter(([pokemonId]) => Number.isInteger(pokemonId)),
  );
  const obtainableByEvolutionCache = new Map();

  const isPokemonObtainable = (pokemonId, visited = new Set()) => {
    const normalizedPokemonId = Number(pokemonId);
    if (!Number.isInteger(normalizedPokemonId)) {
      return false;
    }

    if (normalizedPokemonId > maxNationalDexIdForSelectedVersion) {
      obtainableByEvolutionCache.set(normalizedPokemonId, false);
      return false;
    }

    if (availablePokemonIdSet.has(normalizedPokemonId)) {
      return true;
    }

    if (obtainableByEvolutionCache.has(normalizedPokemonId)) {
      return obtainableByEvolutionCache.get(normalizedPokemonId);
    }

    if (visited.has(normalizedPokemonId)) {
      return false;
    }

    visited.add(normalizedPokemonId);

    const pokemonEntry = pokedexEntriesById.get(normalizedPokemonId);
    const previousEvolution = pokemonEntry?.evolution?.prev;
    const previousEvolutionId = Array.isArray(previousEvolution)
      ? Number(previousEvolution[0])
      : NaN;
    const previousEvolutionCondition = Array.isArray(previousEvolution)
      ? String(previousEvolution[1] || '')
      : '';

    const minimumGenerationForCondition = EVOLUTION_METHOD_MIN_GENERATION
      .filter((rule) => rule.pattern.test(previousEvolutionCondition))
      .reduce((highestGeneration, rule) => Math.max(highestGeneration, rule.minGeneration), 1);

    if (
      !Number.isInteger(previousEvolutionId)
      || previousEvolutionId > maxNationalDexIdForSelectedVersion
      || selectedGameGeneration < minimumGenerationForCondition
    ) {
      obtainableByEvolutionCache.set(normalizedPokemonId, false);
      return false;
    }

    const isObtainableViaEvolution = isPokemonObtainable(previousEvolutionId, visited);
    obtainableByEvolutionCache.set(normalizedPokemonId, isObtainableViaEvolution);
    return isObtainableViaEvolution;
  };

  const selectedTeamPreviewEntry = Number.isInteger(Number(selectedTeamPreviewPokemonId))
    ? pokedexEntriesById.get(Number(selectedTeamPreviewPokemonId))
    : null;
  const selectedTeamPreviewLocationKey = selectedTeamPreviewEntry && selectedGameVersion
    ? `${selectedTeamPreviewEntry.id}:${selectedGameVersion}`
    : '';
  const selectedTeamPreviewLocations = selectedTeamPreviewLocationKey
    ? pokemonLocationsById[selectedTeamPreviewLocationKey]
    : null;
  const isSelectedTeamPreviewLocationLoading = selectedTeamPreviewLocationKey
    ? Boolean(pokemonLocationLoadingById[selectedTeamPreviewLocationKey])
    : false;
  const isSelectedTeamPreviewDirectlyAvailableInSelectedGame = Boolean(
    selectedGameVersion
    && Array.isArray(availablePokemonIdsForSelectedGame)
    && selectedTeamPreviewEntry
    && availablePokemonIdSet.has(Number(selectedTeamPreviewEntry.id)),
  );
  const isSelectedTeamPreviewObtainableInSelectedGame = Boolean(
    selectedGameVersion
    && Array.isArray(availablePokemonIdsForSelectedGame)
    && selectedTeamPreviewEntry
    && isPokemonObtainable(selectedTeamPreviewEntry.id),
  );
  const isSelectedTeamPreviewAvailableViaEvolutionOnly = Boolean(
    selectedGameVersion
    && Array.isArray(availablePokemonIdsForSelectedGame)
    && selectedTeamPreviewEntry
    && !isSelectedTeamPreviewDirectlyAvailableInSelectedGame
    && isSelectedTeamPreviewObtainableInSelectedGame,
  );
  const isSelectedTeamPreviewUnavailableInSelectedGame = Boolean(
    selectedGameVersion
    && Array.isArray(availablePokemonIdsForSelectedGame)
    && selectedTeamPreviewEntry
    && !isSelectedTeamPreviewObtainableInSelectedGame,
  );
  const teamEntries = teamPokemonIds
    .map((pokemonId) => pokedexEntriesById.get(Number(pokemonId)))
    .filter((entry) => entry && Array.isArray(entry.type));
  const typeChart = typeMatchupsData?.typeChart || {};
  const allPokemonTypes = Object.keys(typeChart);

  const getTypeMultiplierAgainstDefender = (attackingType, defendingTypes) => {
    if (!attackingType || !Array.isArray(defendingTypes) || defendingTypes.length === 0) {
      return 1;
    }

    return defendingTypes.reduce((totalMultiplier, defendingType) => {
      const matchupValue = typeChart?.[attackingType]?.[defendingType];
      const nextMultiplier = typeof matchupValue === 'number' ? matchupValue : 1;
      return totalMultiplier * nextMultiplier;
    }, 1);
  };

  const getTypeColorClassName = (typeName) => {
    const normalizedType = String(typeName || '').toLowerCase();
    const typeColorClassByType = {
      ice: 'type-ice',
      ground: 'type-ground',
      psychic: 'type-psychic',
      rock: 'type-rock',
      water: 'type-water',
      electric: 'type-electric',
      bug: 'type-bug',
      dark: 'type-dark',
      fire: 'type-fire',
      flying: 'type-flying',
      ghost: 'type-ghost',
      grass: 'type-grass',
      poison: 'type-poison',
      fairy: 'type-fairy',
      steel: 'type-steel',
    };

    return typeColorClassByType[normalizedType] || '';
  };

  const teamWeakAgainst = allPokemonTypes
    .map((attackingType) => {
      const summary = teamEntries.reduce((accumulator, pokemonEntry) => {
        const defendingTypes = Array.isArray(pokemonEntry?.type) ? pokemonEntry.type : [];
        const multiplier = getTypeMultiplierAgainstDefender(attackingType, defendingTypes);

        if (multiplier === 0) {
          accumulator.immune += 1;
        } else if (multiplier > 1) {
          accumulator.weak += 1;
        } else if (multiplier < 1) {
          accumulator.resist += 1;
        }

        return accumulator;
      }, { weak: 0, resist: 0, immune: 0 });

      return {
        type: attackingType,
        ...summary,
      };
    })
    .filter((entry) => entry.weak > 0)
    .sort((first, second) => {
      if (second.weak !== first.weak) {
        return second.weak - first.weak;
      }
      if (second.immune !== first.immune) {
        return second.immune - first.immune;
      }
      return first.type.localeCompare(second.type);
    });

  const teamStrongAgainst = allPokemonTypes
    .map((defendingType) => {
      const strongCount = teamEntries.reduce((accumulator, pokemonEntry) => {
        const attackingTypes = Array.isArray(pokemonEntry?.type) ? pokemonEntry.type : [];
        const hasSuperEffectiveSTAB = attackingTypes.some((attackingType) => {
          const matchupValue = typeChart?.[attackingType]?.[defendingType];
          return typeof matchupValue === 'number' ? matchupValue > 1 : false;
        });

        return accumulator + (hasSuperEffectiveSTAB ? 1 : 0);
      }, 0);

      return {
        type: defendingType,
        strongCount,
      };
    })
    .filter((entry) => entry.strongCount > 0)
    .sort((first, second) => {
      if (second.strongCount !== first.strongCount) {
        return second.strongCount - first.strongCount;
      }
      return first.type.localeCompare(second.type);
    });
  const topTeamWeaknesses = teamWeakAgainst.slice(0, 5);
  
  // Compute individual Pokémon weaknesses and strengths
  const selectedPokemonWeaknesses = selectedTeamPreviewEntry
    ? allPokemonTypes
      .map((attackingType) => {
        const defendingTypes = Array.isArray(selectedTeamPreviewEntry?.type) ? selectedTeamPreviewEntry.type : [];
        const multiplier = getTypeMultiplierAgainstDefender(attackingType, defendingTypes);

        if (multiplier === 0) {
          return { type: attackingType, multiplier, category: 'immune' };
        } else if (multiplier > 1) {
          return { type: attackingType, multiplier, category: 'weak' };
        } else if (multiplier < 1) {
          return { type: attackingType, multiplier, category: 'resist' };
        }
        return null;
      })
      .filter((entry) => entry)
      .sort((first, second) => {
        if (first.category === 'weak' && second.category !== 'weak') return -1;
        if (first.category !== 'weak' && second.category === 'weak') return 1;
        if (first.multiplier !== second.multiplier) return second.multiplier - first.multiplier;
        return first.type.localeCompare(second.type);
      })
    : [];

  const selectedPokemonStrengths = selectedTeamPreviewEntry
    ? allPokemonTypes
      .map((defendingType) => {
        const attackingTypes = Array.isArray(selectedTeamPreviewEntry?.type) ? selectedTeamPreviewEntry.type : [];
        const hasSuperEffectiveSTAB = attackingTypes.some((attackingType) => {
          const matchupValue = typeChart?.[attackingType]?.[defendingType];
          return typeof matchupValue === 'number' ? matchupValue > 1 : false;
        });

        return {
          type: defendingType,
          isStrong: hasSuperEffectiveSTAB,
        };
      })
      .filter((entry) => entry.isStrong)
      .sort((first, second) => first.type.localeCompare(second.type))
    : [];

  const selectedPokemonEvolutionLine = selectedTeamPreviewEntry
    ? (() => {
      const evolutionByChildId = new Map();
      const visitedIds = new Set();
      const chainEntries = [];

      let currentEntry = selectedTeamPreviewEntry;
      const ancestors = [];
      while (Array.isArray(currentEntry?.evolution?.prev)) {
        const previousEvolutionId = Number(currentEntry.evolution.prev[0]);
        const evolutionCondition = String(currentEntry.evolution.prev[1] || '');

        if (!Number.isInteger(previousEvolutionId) || visitedIds.has(previousEvolutionId)) {
          break;
        }

        const previousEvolutionEntry = pokedexEntriesById.get(previousEvolutionId);
        if (!previousEvolutionEntry) {
          break;
        }

        visitedIds.add(previousEvolutionId);
        evolutionByChildId.set(Number(currentEntry.id), evolutionCondition);
        ancestors.unshift(previousEvolutionEntry);
        currentEntry = previousEvolutionEntry;
      }

      chainEntries.push(...ancestors, selectedTeamPreviewEntry);
      visitedIds.add(Number(selectedTeamPreviewEntry.id));

      currentEntry = selectedTeamPreviewEntry;
      while (
        Array.isArray(currentEntry?.evolution?.next)
        && currentEntry.evolution.next.length === 1
      ) {
        const nextEvolutionItem = currentEntry.evolution.next[0];
        const nextEvolutionId = Number(nextEvolutionItem[0]);
        const evolutionCondition = String(nextEvolutionItem[1] || '');

        if (!Number.isInteger(nextEvolutionId) || visitedIds.has(nextEvolutionId)) {
          break;
        }

        const nextEvolutionEntry = pokedexEntriesById.get(nextEvolutionId);
        if (!nextEvolutionEntry) {
          break;
        }

        evolutionByChildId.set(nextEvolutionId, evolutionCondition);
        chainEntries.push(nextEvolutionEntry);
        visitedIds.add(nextEvolutionId);
        currentEntry = nextEvolutionEntry;
      }

      return chainEntries.map((entry) => ({
        entry,
        conditionFromPrevious: evolutionByChildId.get(Number(entry.id)) || '',
        isCurrent: Number(entry.id) === Number(selectedTeamPreviewEntry.id),
      }));
    })()
    : [];

  const redundantTeamTypes = Object.entries(
    teamEntries.reduce((accumulator, pokemonEntry) => {
      const pokemonTypes = Array.isArray(pokemonEntry?.type) ? pokemonEntry.type : [];
      pokemonTypes.forEach((pokemonType) => {
        accumulator[pokemonType] = (accumulator[pokemonType] || 0) + 1;
      });
      return accumulator;
    }, {}),
  )
    .map(([type, count]) => ({ type, count }))
    .filter((entry) => entry.count > 1)
    .sort((first, second) => {
      if (second.count !== first.count) {
        return second.count - first.count;
      }
      return first.type.localeCompare(second.type);
    });
  const duplicateTypeCombos = Object.entries(
    teamEntries.reduce((accumulator, pokemonEntry) => {
      const pokemonTypes = Array.isArray(pokemonEntry?.type) ? [...pokemonEntry.type] : [];
      const typeComboKey = pokemonTypes.sort((first, second) => first.localeCompare(second)).join('/');
      accumulator[typeComboKey] = (accumulator[typeComboKey] || 0) + 1;
      return accumulator;
    }, {}),
  )
    .map(([typeCombo, count]) => ({ typeCombo, count }))
    .filter((entry) => entry.count > 1)
    .sort((first, second) => {
      if (second.count !== first.count) {
        return second.count - first.count;
      }
      return first.typeCombo.localeCompare(second.typeCombo);
    });

  const availableTypeFilters = Array.from(
    new Set(
      pokedexEntries.flatMap((entry) => (Array.isArray(entry?.type) ? entry.type : [])),
    ),
  ).sort((firstType, secondType) => firstType.localeCompare(secondType));
  const selectedTypeSet = new Set(selectedTypeFilters);

  const handleToggleTypeFilter = (typeName) => {
    setSelectedTypeFilters((previous) => (
      previous.includes(typeName)
        ? previous.filter((entryType) => entryType !== typeName)
        : [...previous, typeName]
    ));
  };

  const toggleCaughtPokemon = (pokemonId) => {
    const normalizedPokemonId = Number(pokemonId);
    if (!Number.isInteger(normalizedPokemonId)) {
      return;
    }

    setCaughtPokemonIds((previous) => (
      previous.includes(normalizedPokemonId)
        ? previous.filter((entryId) => entryId !== normalizedPokemonId)
        : [...previous, normalizedPokemonId]
    ));
  };

  const toggleTeamPokemon = (pokemonId) => {
    const normalizedPokemonId = Number(pokemonId);
    if (!Number.isInteger(normalizedPokemonId)) {
      return;
    }

    setTeamPokemonIds((previous) => {
      if (previous.includes(normalizedPokemonId)) {
        return previous.filter((entryId) => entryId !== normalizedPokemonId);
      }

      if (previous.length >= 6) {
        return previous;
      }

      return [...previous, normalizedPokemonId];
    });
  };

  const handleSelectTeamPokemon = (pokemonId) => {
    const normalizedPokemonId = Number(pokemonId);
    if (!Number.isInteger(normalizedPokemonId)) {
      return;
    }

    setSelectedTeamPreviewPokemonId(normalizedPokemonId);
    void handleLoadLocations(normalizedPokemonId);
    const matchingCardElement = document.getElementById(`pokemon-card-${normalizedPokemonId}`);
    if (matchingCardElement) {
      matchingCardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleTeamSlotDragStart = (slotIndex) => {
    setDraggedTeamIndex(slotIndex);
  };

  const handleTeamSlotDragOver = (event, slotIndex) => {
    event.preventDefault();
    setDraggedOverTeamIndex(slotIndex);
  };

  const handleTeamSlotDrop = (event, targetSlotIndex) => {
    event.preventDefault();
    if (draggedTeamIndex === null || draggedTeamIndex === targetSlotIndex) {
      setDraggedTeamIndex(null);
      setDraggedOverTeamIndex(null);
      return;
    }

    const newTeamOrder = [...teamPokemonIds];
    const draggedPokemonId = newTeamOrder[draggedTeamIndex];
    newTeamOrder.splice(draggedTeamIndex, 1);
    newTeamOrder.splice(targetSlotIndex, 0, draggedPokemonId);
    setTeamPokemonIds(newTeamOrder);
    setDraggedTeamIndex(null);
    setDraggedOverTeamIndex(null);
  };

  const handleTeamSlotDragLeave = () => {
    setDraggedOverTeamIndex(null);
  };

  const handleTeamSlotDragEnd = () => {
    setDraggedTeamIndex(null);
    setDraggedOverTeamIndex(null);
  };

  const handleApplyRouteFilter = async () => {
    const nextRoute = routeSearch.trim();

    if (!selectedGameVersion) {
      setRouteFilterError('Route filtering is only available for official game versions.');
      return;
    }

    if (!nextRoute) {
      setAppliedRouteSearch('');
      setRouteFilterError('');
      setRouteFilteredPokemonIds(null);
      return;
    }

    setIsRouteFilterLoading(true);
    setRouteFilterError('');

    try {
      const response = await fetch(
        `${API_BASE_URL}/routes/encounters?version=${encodeURIComponent(selectedGameVersion)}&route=${encodeURIComponent(nextRoute)}`,
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.detail || 'Could not load route encounters.');
      }

      const matchingPokemon = Array.isArray(payload.pokemon) ? payload.pokemon : [];
      const nextLocations = {};
      const nextIds = [];

      matchingPokemon.forEach((pokemon) => {
        const locationKey = `${pokemon.id}:${selectedGameVersion}`;
        nextIds.push(pokemon.id);
        nextLocations[locationKey] = Array.isArray(pokemon.locations)
          ? pokemon.locations
          : [];
      });

      setPokemonLocationsById((previous) => ({
        ...previous,
        ...nextLocations,
      }));
      setRouteFilteredPokemonIds(nextIds);
      setAppliedRouteSearch(nextRoute);
      if (matchingPokemon.length === 0) {
        setRouteFilterError(`No Pokemon found on route "${nextRoute}" in ${selectedGameName}.`);
      }
    } catch (error) {
      setRouteFilteredPokemonIds([]);
      setAppliedRouteSearch(nextRoute);
      setRouteFilterError(error.message || 'Could not load route encounters.');
    } finally {
      setIsRouteFilterLoading(false);
    }
  };

  const handleClearRouteFilter = () => {
    setRouteSearch('');
    setAppliedRouteSearch('');
    setRouteFilterError('');
    setRouteFilteredPokemonIds(null);
  };

  const handleLoadLocations = async (pokemonId) => {
    if (!selectedGameVersion) {
      return;
    }

    const key = `${pokemonId}:${selectedGameVersion}`;
    if (pokemonLocationLoadingById[key]) {
      return;
    }

    const existingLocations = pokemonLocationsById[key];
    if (Array.isArray(existingLocations)) {
      return;
    }

    setPokemonLocationLoadingById((previous) => ({ ...previous, [key]: true }));
    try {
      const response = await fetch(
        `${API_BASE_URL}/pokemon/${pokemonId}/locations?version=${encodeURIComponent(selectedGameVersion)}`,
      );
      const payload = await response.json();
      setPokemonLocationsById((previous) => ({
        ...previous,
        [key]: Array.isArray(payload.locations) ? payload.locations : [],
      }));
    } catch (error) {
      setPokemonLocationsById((previous) => ({
        ...previous,
        [key]: [],
      }));
    } finally {
      setPokemonLocationLoadingById((previous) => ({ ...previous, [key]: false }));
    }
  };

  const handleToggleLocations = async (pokemonId) => {
    if (!selectedGameVersion) {
      return;
    }

    const key = `${pokemonId}:${selectedGameVersion}`;
    const isCurrentlyVisible = Boolean(visiblePokemonLocationsById[key]);

    if (isCurrentlyVisible) {
      setVisiblePokemonLocationsById((previous) => ({ ...previous, [key]: false }));
      return;
    }

    setVisiblePokemonLocationsById((previous) => ({ ...previous, [key]: true }));
    await handleLoadLocations(pokemonId);
  };

  const handleLoadMoves = async (pokemonId) => {
    if (!selectedGameVersion) {
      return;
    }

    const key = `${pokemonId}:${selectedGameVersion}`;
    const existingMoves = pokemonMovesById[key];
    if (Array.isArray(existingMoves)) {
      return;
    }

    setPokemonMovesLoadingById((previous) => ({ ...previous, [key]: true }));
    try {
      const response = await fetch(
        `${API_BASE_URL}/pokemon/${pokemonId}/moves?version=${encodeURIComponent(selectedGameVersion)}`,
      );
      const payload = await response.json();
      setPokemonMovesById((previous) => ({
        ...previous,
        [key]: Array.isArray(payload.moves) ? payload.moves : [],
      }));
    } catch (error) {
      setPokemonMovesById((previous) => ({
        ...previous,
        [key]: [],
      }));
    } finally {
      setPokemonMovesLoadingById((previous) => ({ ...previous, [key]: false }));
    }
  };

  const handleToggleMoves = async (pokemonId) => {
    if (!selectedGameVersion) {
      return;
    }

    const key = `${pokemonId}:${selectedGameVersion}`;
    const isCurrentlyVisible = Boolean(visiblePokemonMovesById[key]);
    if (isCurrentlyVisible) {
      setVisiblePokemonMovesById((previous) => ({ ...previous, [key]: false }));
      return;
    }

    setSelectedMovesTabById((previous) => ({
      ...previous,
      [key]: previous[key] || 'Level Up',
    }));
    setVisiblePokemonMovesById((previous) => ({ ...previous, [key]: true }));
    await handleLoadMoves(pokemonId);
  };

  const filteredPokemon = pokedexEntries.filter((entry) => {
    const query = pokemonSearch.trim().toLowerCase();
    const matchesRoute = routeFilteredPokemonIds === null || routeFilteredPokemonIds.includes(entry.id);
    const entryPokemonId = Number(entry?.id);
    const isCaughtPokemon = caughtPokemonIds.includes(entryPokemonId);
    const matchesObtainableFilter = !showOnlyObtainable
      || (hasAvailabilityDataForSelectedGame && isPokemonObtainable(entryPokemonId));
    const matchesCaughtFilter = caughtFilter === 'all'
      || (caughtFilter === 'caught' && isCaughtPokemon)
      || (caughtFilter === 'uncaught' && !isCaughtPokemon);
    const entryTypes = Array.isArray(entry?.type) ? entry.type : [];
    const matchesTypeFilter = selectedTypeSet.size === 0
      || (useExactTypeFilter
        ? Array.from(selectedTypeSet).every((selectedType) => entryTypes.includes(selectedType))
        : entryTypes.some((entryType) => selectedTypeSet.has(entryType)));

    if (!matchesRoute) {
      return false;
    }

    if (!matchesObtainableFilter) {
      return false;
    }

    if (!matchesCaughtFilter) {
      return false;
    }

    if (!matchesTypeFilter) {
      return false;
    }

    if (!query) {
      return true;
    }

    const englishName = entry?.name?.english?.toLowerCase() || '';
    const types = Array.isArray(entry?.type) ? entry.type.join(' ').toLowerCase() : '';
    const species = (entry?.species || '').toLowerCase();
    const dexNumber = String(entry?.id ?? '');
    const dexNumberWithHash = `#${dexNumber}`;

    return (
      englishName.includes(query)
      || types.includes(query)
      || species.includes(query)
      || dexNumber.includes(query)
      || dexNumberWithHash.includes(query)
    );
  });

  const selectedCategory =
    GAME_CATEGORIES.find((category) => category.key === selectedCategoryKey) || GAME_CATEGORIES[0];

  const renderGenderRatio = (genderValue) => {
    if (!genderValue) {
      return '-';
    }

    if (typeof genderValue !== 'string' || !genderValue.includes(':')) {
      return genderValue;
    }

    const parts = genderValue.split(':').map((part) => part.trim());
    if (parts.length < 2) {
      return genderValue;
    }

    return (
      <>
        <span className="gender-ratio-first">{parts[0]}</span>
        {' : '}
        <span className="gender-ratio-second">{parts[1]}</span>
      </>
    );
  };

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatMovesetLine = (move, activeTab) => {
    if (activeTab === 'Level Up') {
      return `Level ${move.level} - ${move.name}`;
    }

    if (activeTab === 'Machine') {
      return `Machine - ${move.name}`;
    }

    if (activeTab === 'Egg') {
      return `Egg Move - ${move.name}`;
    }

    return move.name;
  };

  const formatEvolutionCondition = (condition) => {
    if (!condition) return '';
    const levelMatch = condition.match(/level\s+(\d+)/i);
    if (levelMatch) {
      return `At level ${levelMatch[1]}`;
    }
    return condition;
  };

  return (
    <div className="App">
      <header className="App-header">
        <div id="content-wrapper" className={session.isAuthenticated ? 'content-wrapper-auth' : 'content-wrapper-guest'}>
          {!session.isAuthenticated ? (
            <div className="guest-screen-layout">
              <aside className="auth-status-panel">
                <p className="auth-status-eyebrow">Session</p>
                <p>Status: {session.isAuthenticated ? 'Authenticated' : 'Guest'}</p>
                <p>User: {session.username || 'Not logged in'}</p>
                <p>Last action: {session.lastAction}</p>
                <p className={session.success === false ? 'panel-error' : 'panel-success'}>
                  {session.lastMessage}
                </p>
              </aside>
              <div className="guest-login-center">
                <div className="guest-login-stack">
                  <LoginForm onAuthSuccess={handleAuthSuccess} onAuthEvent={handleAuthEvent} />
                  <section className="guest-login-disclaimer" aria-label="Project disclaimer">
                    <p>
                      This is a personal fan project built for learning purposes. It is not affiliated with,
                      endorsed by, or associated with The Pokemon Company or Nintendo. All Pokemon names,
                      sprites, and data are used for educational demonstration only. The project is not
                      distributed publicly.
                    </p>
                  </section>
                </div>
              </div>
              {!hasAcknowledgedFanNotice && (
                <div className="fan-notice-overlay" role="dialog" aria-modal="true" aria-labelledby="fan-notice-title">
                  <div className="fan-notice-dialog">
                    <h3 id="fan-notice-title">Notice</h3>
                    <p>
                      This is a personal fan project built for learning purposes. It is not affiliated with,
                      endorsed by, or associated with The Pokemon Company or Nintendo. All Pokemon names,
                      sprites, and data are used for educational demonstration only. The project is not
                      distributed publicly.
                    </p>
                    <button
                      type="button"
                      className="fan-notice-button"
                      onClick={handleAcknowledgeFanNotice}
                    >
                      I understand
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="game-browser">
              <div className="game-browser-header">
                <h2>
                  {currentScreen === 'games'
                    ? `Welcome, ${session.username}!`
                    : `${selectedGameName} - Pokedex`}
                </h2>
                <div className="header-actions">
                  {currentScreen === 'pokedex' && (
                    <button className="logout-button" type="button" onClick={() => setCurrentScreen('games')}>
                      Back to Games
                    </button>
                  )}
                  <button className="logout-button" type="button" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              </div>

              {currentScreen === 'games' ? (
                <div className="game-categories-grid">
                  <aside className="category-nav">
                    <h3>Categories</h3>
                    <div className="category-nav-list">
                      {GAME_CATEGORIES.map((category) => (
                        <button
                          key={category.key}
                          type="button"
                          className={`category-nav-item ${selectedCategoryKey === category.key ? 'active' : ''}`}
                          onClick={() => setSelectedCategoryKey(category.key)}
                        >
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </aside>

                  <section className="category-content-panel">
                    <h3>{selectedCategory.label}</h3>
                    {selectedCategory.games.length > 0 ? (
                      <div className="game-list">
                        {selectedCategory.games.map((game) => (
                          <button
                            key={game}
                            type="button"
                            className="game-list-item game-button"
                            onClick={() => handleOpenGame(game)}
                          >
                            {game}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p>Additional categories are planned, but not available yet.</p>
                    )}
                  </section>
                </div>
              ) : (
                <div className="pokedex-screen">
                  <div className={`pokedex-filter-bar ${isFilterBarCollapsed ? 'collapsed' : ''}`}>
                    {!isFilterBarCollapsed && (
                      <div className="pokedex-filter-controls">
                        <div className="pokedex-search-wrap">
                          <input
                            type="text"
                            className="pokedex-search"
                            placeholder="Search Pokemon by name, type, or species"
                            value={pokemonSearch}
                            onChange={(event) => setPokemonSearch(event.target.value)}
                          />
                          {pokemonSearch && (
                            <button
                              type="button"
                              className="pokedex-search-clear"
                              aria-label="Clear Pokemon search"
                              onClick={() => setPokemonSearch('')}
                            >
                              x
                            </button>
                          )}
                        </div>

                        <div className="route-filter-group">
                          <input
                            type="text"
                            className="route-filter-input"
                            placeholder="Filter by route or area"
                            value={routeSearch}
                            onChange={(event) => setRouteSearch(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                handleApplyRouteFilter();
                              }
                            }}
                            disabled={!selectedGameVersion || isRouteFilterLoading}
                          />
                          <button
                            type="button"
                            className="route-filter-button"
                            onClick={handleApplyRouteFilter}
                            disabled={!selectedGameVersion || isRouteFilterLoading}
                          >
                            {isRouteFilterLoading ? 'Filtering...' : 'Filter Route'}
                          </button>
                          {appliedRouteSearch && (
                            <button
                              type="button"
                              className="route-filter-button route-filter-clear"
                              onClick={handleClearRouteFilter}
                            >
                              Clear
                            </button>
                          )}
                        </div>

                        <div className="boolean-filter-group">
                          <label className="boolean-filter-item" htmlFor="show-only-obtainable">
                            <input
                              id="show-only-obtainable"
                              type="checkbox"
                              checked={showOnlyObtainable}
                              onChange={(event) => setShowOnlyObtainable(event.target.checked)}
                              disabled={!hasAvailabilityDataForSelectedGame || isAvailabilityLoading}
                            />
                            Show obtainable only
                          </label>

                          <label className="caught-filter-label" htmlFor="caught-filter-select">
                            Caught status
                          </label>
                          <select
                            id="caught-filter-select"
                            className="caught-filter-select"
                            value={caughtFilter}
                            onChange={(event) => setCaughtFilter(event.target.value)}
                          >
                            <option value="all">All Pokemon</option>
                            <option value="caught">Caught Pokemon</option>
                            <option value="uncaught">Uncaught Pokemon</option>
                          </select>

                          {availableTypeFilters.length > 0 && (
                            <div className="type-filter-section">
                              <p className="type-filter-label">Filter by type</p>
                              <label className="boolean-filter-item" htmlFor="type-filter-exact-match">
                                <input
                                  id="type-filter-exact-match"
                                  type="checkbox"
                                  checked={useExactTypeFilter}
                                  onChange={(event) => setUseExactTypeFilter(event.target.checked)}
                                />
                                Exact multiple type search (must match all selected)
                              </label>
                              <div className="type-filter-grid">
                                {availableTypeFilters.map((typeName) => (
                                  <label key={typeName} className="type-filter-item" htmlFor={`type-filter-${typeName}`}>
                                    <input
                                      id={`type-filter-${typeName}`}
                                      type="checkbox"
                                      checked={selectedTypeSet.has(typeName)}
                                      onChange={() => handleToggleTypeFilter(typeName)}
                                    />
                                    {typeName}
                                  </label>
                                ))}
                              </div>
                              {selectedTypeFilters.length > 0 && (
                                <button
                                  type="button"
                                  className="route-filter-button route-filter-clear"
                                  onClick={() => {
                                    setSelectedTypeFilters([]);
                                    setUseExactTypeFilter(false);
                                  }}
                                >
                                  Clear Types
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {selectedGameVersion ? (
                      isAvailabilityLoading && (
                        <p className="route-filter-status">
                          {`Loading ${selectedGameName} availability...`}
                        </p>
                      )
                    ) : (
                      <p className="route-filter-status">
                        Route filtering is only available for official game versions.
                      </p>
                    )}

                    {selectedGameVersion && appliedRouteSearch && !isAvailabilityLoading && (
                      <p className="route-filter-status">
                        {`Showing ${filteredPokemon.length} Pokemon found on ${appliedRouteSearch}.`}
                      </p>
                    )}

                    <p className="route-filter-status">
                      Matching Pokemon: {filteredPokemon.length}
                    </p>

                    {routeFilterError && <p className="panel-error route-filter-error">{routeFilterError}</p>}
                    {availabilityError && <p className="panel-error route-filter-error">{availabilityError}</p>}

                    <button
                      type="button"
                      className="filter-bar-toggle"
                      onClick={() => setIsFilterBarCollapsed((previous) => !previous)}
                      aria-label={isFilterBarCollapsed ? 'Expand filters' : 'Collapse filters'}
                      title={isFilterBarCollapsed ? 'Expand filters' : 'Collapse filters'}
                    >
                      {isFilterBarCollapsed ? '▾' : '▴'}
                    </button>
                  </div>

                  {isPokedexLoading && <p>Loading Pokedex...</p>}
                  {pokedexError && <p className="panel-error">{pokedexError}</p>}

                  {!isPokedexLoading && !pokedexError && (
                    <div className="pokemon-card-grid">
                      {filteredPokemon.length === 0 && (
                        <article className="pokemon-card pokemon-empty-state">
                          <h4>No results found.</h4>
                          <p>Try a different name, number, type, species, or route filter.</p>
                        </article>
                      )}
                      {filteredPokemon.map((entry) => {
                        const baseStats = entry.base || {};
                        const baseStatEntries = [
                          ['HP', baseStats.HP],
                          ['Attack', baseStats.Attack],
                          ['Defense', baseStats.Defense],
                          ['Sp. Attack', baseStats['Sp. Attack']],
                          ['Sp. Defense', baseStats['Sp. Defense']],
                          ['Speed', baseStats.Speed],
                        ];
                        const topBaseStatKeys = baseStatEntries
                          .filter(([, value]) => typeof value === 'number')
                          .sort((first, second) => second[1] - first[1])
                          .slice(0, 2)
                          .map(([key]) => key);
                        const topBaseStatSet = new Set(topBaseStatKeys);
                        const lowestBaseStatKeys = baseStatEntries
                          .filter(([, value]) => typeof value === 'number')
                          .sort((first, second) => first[1] - second[1])
                          .slice(0, 2)
                          .map(([key]) => key);
                        const lowestBaseStatSet = new Set(lowestBaseStatKeys);

                        const getBaseStatClassName = (statKey) => {
                          if (topBaseStatSet.has(statKey)) {
                            return 'base-stat-highlight';
                          }
                          if (lowestBaseStatSet.has(statKey)) {
                            return 'base-stat-lowlight';
                          }
                          return '';
                        };
                        const profile = entry.profile || {};
                        const evolution = entry.evolution || {};
                        const locationKey = `${entry.id}:${selectedGameVersion}`;
                        const locationData = pokemonLocationsById[locationKey];
                        const isLocationLoading = Boolean(pokemonLocationLoadingById[locationKey]);
                        const isLocationVisible = Boolean(visiblePokemonLocationsById[locationKey]);
                        const isDirectlyAvailableInSelectedGame = Boolean(
                          selectedGameVersion
                          && Array.isArray(availablePokemonIdsForSelectedGame)
                          && availablePokemonIdSet.has(Number(entry.id)),
                        );
                        const isObtainableInSelectedGame = Boolean(
                          selectedGameVersion
                          && Array.isArray(availablePokemonIdsForSelectedGame)
                          && isPokemonObtainable(entry.id),
                        );
                        const isAvailableViaEvolutionOnly = Boolean(
                          selectedGameVersion
                          && Array.isArray(availablePokemonIdsForSelectedGame)
                          && !isDirectlyAvailableInSelectedGame
                          && isObtainableInSelectedGame,
                        );
                        const isUnavailableInSelectedGame = Boolean(
                          selectedGameVersion
                          && Array.isArray(availablePokemonIdsForSelectedGame)
                          && !isObtainableInSelectedGame,
                        );
                        const movesData = pokemonMovesById[locationKey];
                        const isMovesLoading = Boolean(pokemonMovesLoadingById[locationKey]);
                        const isMovesVisible = Boolean(visiblePokemonMovesById[locationKey]);
                        const selectedMovesTab = selectedMovesTabById[locationKey] || 'Level Up';
                        const filteredMoves = Array.isArray(movesData)
                          ? movesData.filter((move) => move.learn_method === selectedMovesTab)
                          : [];
                        const previousEvolutionId = Array.isArray(evolution.prev)
                          ? Number(evolution.prev[0])
                          : NaN;
                        const previousEvolutionEntry = Number.isInteger(previousEvolutionId)
                          ? pokedexEntriesById.get(previousEvolutionId)
                          : null;
                        const isCaughtPokemon = caughtPokemonIds.includes(Number(entry.id));
                        const isTeamPokemon = teamPokemonIds.includes(Number(entry.id));

                        return (
                          <article
                            key={entry.id}
                            id={`pokemon-card-${entry.id}`}
                            className={`pokemon-card ${isUnavailableInSelectedGame ? 'pokemon-card-unavailable' : ''} ${isCaughtPokemon ? 'pokemon-card-caught' : ''}`}
                          >
                            <button
                              type="button"
                              className={`caught-toggle-button ${isCaughtPokemon ? 'caught' : ''}`}
                              onClick={() => toggleCaughtPokemon(entry.id)}
                              aria-label={isCaughtPokemon ? 'Mark Pokemon as not caught' : 'Mark Pokemon as caught'}
                              title={isCaughtPokemon ? 'Caught' : 'Mark as caught'}
                            >
                              {isCaughtPokemon ? '★' : '☆'}
                            </button>
                            <button
                              type="button"
                              className={`team-toggle-button ${isTeamPokemon ? 'team' : ''}`}
                              onClick={() => toggleTeamPokemon(entry.id)}
                              aria-label={isTeamPokemon ? 'Remove Pokemon from team' : 'Add Pokemon to team'}
                              title={isTeamPokemon ? 'In team' : teamPokemonIds.length >= 6 ? 'Team is full (max 6)' : 'Add to team'}
                              disabled={!isTeamPokemon && teamPokemonIds.length >= 6}
                            >
                              {isTeamPokemon ? '✓' : '+'}
                            </button>
                            <div className="pokemon-card-head">
                              <img
                                src={entry?.image?.sprite}
                                alt={`${entry?.name?.english || 'Pokemon'} sprite`}
                                className="pokemon-sprite"
                                loading="lazy"
                              />
                              <div>
                                <h4>{entry?.name?.english}</h4>
                                <p>#{entry.id}</p>
                                <p>Type: {(entry.type || []).join(', ')}</p>
                                <p>Species: {entry.species || 'Unknown'}</p>
                                {isAvailableViaEvolutionOnly && (
                                  <p className="pokemon-availability-flag obtainable-via-evolution">
                                    Obtainable via evolution
                                  </p>
                                )}
                                {isUnavailableInSelectedGame && (
                                  <p className="pokemon-availability-flag">Not obtainable in this game</p>
                                )}
                              </div>
                            </div>

                            <p className="pokemon-description">{entry.description}</p>

                            <div className="pokemon-info-block">
                              <p><strong>Base Stats</strong></p>
                              <p>
                                HP:{' '}
                                <span className={getBaseStatClassName('HP')}>{baseStats.HP ?? '-'}</span>
                                {' | '}Attack:{' '}
                                <span className={getBaseStatClassName('Attack')}>{baseStats.Attack ?? '-'}</span>
                                {' | '}Defense:{' '}
                                <span className={getBaseStatClassName('Defense')}>{baseStats.Defense ?? '-'}</span>
                              </p>
                              <p>
                                Sp. Atk:{' '}
                                <span className={getBaseStatClassName('Sp. Attack')}>{baseStats['Sp. Attack'] ?? '-'}</span>
                                {' | '}Sp. Def:{' '}
                                <span className={getBaseStatClassName('Sp. Defense')}>{baseStats['Sp. Defense'] ?? '-'}</span>
                                {' | '}Speed:{' '}
                                <span className={getBaseStatClassName('Speed')}>{baseStats.Speed ?? '-'}</span>
                              </p>
                            </div>

                            <div className="pokemon-info-block">
                              <p><strong>Profile</strong></p>
                              <p>Height: {profile.height || '-'} | Weight: {profile.weight || '-'}</p>
                              <p>Egg Groups: {Array.isArray(profile.egg) ? profile.egg.join(', ') : '-'}</p>
                              <p>Gender: {renderGenderRatio(profile.gender)}</p>
                              <p>
                                Abilities:{' '}
                                {Array.isArray(profile.ability)
                                  ? profile.ability.map((ability) => ability[0]).join(', ')
                                  : '-'}
                              </p>
                            </div>

                            <div className="pokemon-info-block">
                              <p><strong>Evolution Chain</strong></p>
                              <div className="evolution-chain-display">
                                {previousEvolutionEntry ? (
                                  <>
                                    <div className="evolution-chain-item">
                                      <div className="evolution-chain-sprite-container">
                                        <img
                                          src={previousEvolutionEntry?.image?.sprite}
                                          alt={`${previousEvolutionEntry?.name?.english} sprite`}
                                          className="evolution-chain-sprite"
                                          title={`#${previousEvolutionEntry.id} ${previousEvolutionEntry?.name?.english}`}
                                        />
                                      </div>
                                      <p className="evolution-chain-method">
                                        {formatEvolutionCondition(Array.isArray(evolution.prev) ? evolution.prev[1] || '' : '')}
                                      </p>
                                    </div>
                                    <div className="evolution-chain-arrow">→</div>
                                  </>
                                ) : null}

                                <div className="evolution-chain-item evolution-chain-current">
                                  <div className="evolution-chain-sprite-container">
                                    <img
                                      src={entry?.image?.sprite}
                                      alt={`${entry?.name?.english} sprite`}
                                      className="evolution-chain-sprite-large"
                                      title={`#${entry.id} ${entry?.name?.english}`}
                                    />
                                  </div>
                                  <p className="evolution-chain-name">{entry?.name?.english}</p>
                                </div>

                                {Array.isArray(evolution.next) && evolution.next.length > 0 ? (
                                  evolution.next.map((nextEvoItem) => {
                                    const nextEvoId = Number(nextEvoItem[0]);
                                    const nextEvoCondition = String(nextEvoItem[1] || '');
                                    const nextEvolutionEntry = Number.isInteger(nextEvoId)
                                      ? pokedexEntriesById.get(nextEvoId)
                                      : null;
                                    
                                    return nextEvolutionEntry ? (
                                      <div key={nextEvoId} className="evolution-chain-step">
                                        <div className="evolution-chain-arrow">→</div>
                                        <div className="evolution-chain-item">
                                          <div className="evolution-chain-sprite-container">
                                            <img
                                              src={nextEvolutionEntry?.image?.sprite}
                                              alt={`${nextEvolutionEntry?.name?.english} sprite`}
                                              className="evolution-chain-sprite"
                                              title={`#${nextEvolutionEntry.id} ${nextEvolutionEntry?.name?.english}`}
                                            />
                                          </div>
                                          <p className="evolution-chain-method">
                                            {formatEvolutionCondition(nextEvoCondition)}
                                          </p>
                                        </div>
                                      </div>
                                    ) : null;
                                  })
                                ) : null}

                              </div>
                            </div>

                            <div className="pokemon-info-block">
                              <p><strong>Find In {selectedGameName}</strong></p>
                              {selectedGameVersion ? (
                                <>
                                  <div className="pokemon-action-row">
                                    <button
                                      type="button"
                                      className="location-button"
                                      onClick={() => handleToggleLocations(entry.id)}
                                      disabled={isLocationLoading}
                                    >
                                      {isLocationLoading
                                        ? 'Loading locations...'
                                        : isLocationVisible
                                          ? 'Hide Locations'
                                          : 'Show Locations'}
                                    </button>

                                    <button
                                      type="button"
                                      className="location-button"
                                      onClick={() => handleToggleMoves(entry.id)}
                                      disabled={isMovesLoading}
                                    >
                                      {isMovesLoading
                                        ? 'Loading moves...'
                                        : isMovesVisible
                                          ? 'Hide Moveset'
                                          : 'Show Moveset'}
                                    </button>
                                  </div>
                                  {isLocationVisible && Array.isArray(locationData) && locationData.length > 0 && (
                                    <ul className="location-list">
                                      {locationData.map((locationEntry, index) => {
                                        if (typeof locationEntry === 'string') {
                                          return <li key={locationEntry}>{locationEntry}</li>;
                                        }

                                        const encounterDetails = Array.isArray(locationEntry?.encounters)
                                          ? locationEntry.encounters
                                          : [];
                                        const locationName = locationEntry?.location || `Unknown location ${index + 1}`;

                                        return (
                                          <li key={`${locationName}-${index}`}>
                                            <details className="location-item">
                                              <summary className="location-summary">{locationName}</summary>
                                              <div className="location-popup">
                                                {encounterDetails.length > 0 ? (
                                                  <ul className="encounter-detail-list">
                                                    {encounterDetails.map((detail, detailIndex) => (
                                                      <li key={`${locationName}-detail-${detailIndex}`}>
                                                        <div className="encounter-detail-card">
                                                          <span className="encounter-meta-item">
                                                            <span className="encounter-meta-label">Method</span>
                                                            <span className="encounter-meta-value">{detail?.method || 'Unknown'}</span>
                                                          </span>
                                                          <span className="encounter-meta-item">
                                                            <span className="encounter-meta-label">Level</span>
                                                            <span className="encounter-meta-value">{detail?.level || 'Unknown'}</span>
                                                          </span>
                                                          <span className="encounter-meta-item">
                                                            <span className="encounter-meta-label">Chance</span>
                                                            <span className="encounter-meta-value">{detail?.chance ?? 'Unknown'}%</span>
                                                          </span>
                                                          <span className="encounter-meta-item">
                                                            <span className="encounter-meta-label">Time</span>
                                                            <span className="encounter-meta-value">{detail?.time || 'Any'}</span>
                                                          </span>
                                                        </div>
                                                      </li>
                                                    ))}
                                                  </ul>
                                                ) : (
                                                  <p className="location-meta-empty">Encounter details unavailable.</p>
                                                )}
                                              </div>
                                            </details>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  )}
                                  {isLocationVisible && Array.isArray(locationData) && locationData.length === 0 && !isLocationLoading && (
                                    <p>There are no known encounter locations for this game.</p>
                                  )}

                                  {isMovesVisible && Array.isArray(movesData) && movesData.length > 0 && (
                                    <>
                                      <div className="moveset-tabs" role="tablist" aria-label="Moveset categories">
                                        {MOVESET_TABS.map((tabName) => (
                                          <button
                                            key={`${locationKey}-${tabName}`}
                                            type="button"
                                            role="tab"
                                            className={`moveset-tab ${selectedMovesTab === tabName ? 'active' : ''}`}
                                            aria-selected={selectedMovesTab === tabName}
                                            onClick={() => setSelectedMovesTabById((previous) => ({
                                              ...previous,
                                              [locationKey]: tabName,
                                            }))}
                                          >
                                            {tabName}
                                          </button>
                                        ))}
                                      </div>
                                      <ul className="moveset-list">
                                      {filteredMoves.map((move, moveIndex) => (
                                        <li key={`${entry.id}-move-${move.name}-${moveIndex}`}>
                                          {formatMovesetLine(move, selectedMovesTab)}
                                        </li>
                                      ))}
                                      </ul>
                                      {filteredMoves.length === 0 && (
                                        <p>No {selectedMovesTab.toLowerCase()} moves found for this game.</p>
                                      )}
                                    </>
                                  )}
                                  {isMovesVisible && Array.isArray(movesData) && movesData.length === 0 && !isMovesLoading && (
                                    <p>No moveset data found for this game.</p>
                                  )}
                                </>
                              ) : (
                                <p>Location lookup via PokeAPI is only available for official game versions.</p>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {session.isAuthenticated && currentScreen === 'pokedex' && (
        <aside className="team-rail" aria-label="Pokemon team">
          <p className="team-rail-title">Team ({teamPokemonIds.length}/6)</p>
          <div className="team-rail-slots">
            {Array.from({ length: 6 }).map((_, slotIndex) => {
              const teamPokemonId = teamPokemonIds[slotIndex];
              const teamEntry = Number.isInteger(teamPokemonId) ? pokedexEntriesById.get(teamPokemonId) : null;
              const isDragging = draggedTeamIndex === slotIndex;
              const isDraggedOver = draggedOverTeamIndex === slotIndex && draggedTeamIndex !== null;

              return teamEntry ? (
                <button
                  key={`team-slot-${slotIndex}-${teamPokemonId}`}
                  type="button"
                  draggable
                  className={`team-rail-slot filled ${selectedTeamPreviewPokemonId === teamPokemonId ? 'active' : ''} ${isDragging ? 'dragging' : ''} ${isDraggedOver ? 'drag-over' : ''}`}
                  onClick={() => handleSelectTeamPokemon(teamPokemonId)}
                  onDragStart={() => handleTeamSlotDragStart(slotIndex)}
                  onDragOver={(event) => handleTeamSlotDragOver(event, slotIndex)}
                  onDrop={(event) => handleTeamSlotDrop(event, slotIndex)}
                  onDragLeave={handleTeamSlotDragLeave}
                  onDragEnd={handleTeamSlotDragEnd}
                  title={`#${teamEntry.id} ${teamEntry?.name?.english}`}
                >
                  <img
                    src={teamEntry?.image?.sprite}
                    alt={`${teamEntry?.name?.english} team sprite`}
                    className="team-rail-sprite"
                  />
                </button>
              ) : (
                <div
                  key={`team-slot-${slotIndex}`}
                  draggable
                  className={`team-rail-slot ${isDraggedOver ? 'drag-over' : ''}`}
                  onDragOver={(event) => handleTeamSlotDragOver(event, slotIndex)}
                  onDrop={(event) => handleTeamSlotDrop(event, slotIndex)}
                  onDragLeave={handleTeamSlotDragLeave}
                  aria-hidden="true"
                >
                  -
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="team-analysis-button"
            onClick={() => {
              setSelectedTeamPreviewPokemonId(null);
              setIsTeamAnalysisOpen(true);
            }}
          >
            Team Analysis
          </button>
        </aside>
      )}

      {session.isAuthenticated && currentScreen === 'pokedex' && isTeamAnalysisOpen && (
        <div className="team-analysis-overlay" onClick={() => setIsTeamAnalysisOpen(false)}>
          <div className="team-analysis-dialog" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="team-analysis-close"
              onClick={() => setIsTeamAnalysisOpen(false)}
              aria-label="Close team analysis window"
            >
              x
            </button>
            <h3>Team Analysis</h3>
            <p>Current team size: {teamPokemonIds.length}/6</p>

            {teamEntries.length === 0 ? (
              <p>Add Pokemon to your team to view strengths and weaknesses.</p>
            ) : (
              <>
                <div className="team-analysis-section">
                  <h4>Top Weaknesses</h4>
                  {topTeamWeaknesses.length > 0 ? (
                    <div className="team-chip-row">
                      {topTeamWeaknesses.map((entry) => (
                        <span
                          key={`top-weak-${entry.type}`}
                          className={`team-type-chip weak ${getTypeColorClassName(entry.type)}`}
                          title={`${entry.weak} weak, ${entry.resist} resist, ${entry.immune} immune`}
                        >
                          {entry.type} x{entry.weak}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>No shared weaknesses.</p>
                  )}
                </div>

                <div className="team-analysis-section">
                  <h4>Weak Against</h4>
                  {teamWeakAgainst.length > 0 ? (
                    <div className="team-chip-row">
                      {teamWeakAgainst.map((entry) => (
                        <span
                          key={`weak-${entry.type}`}
                          className={`team-type-chip weak muted ${getTypeColorClassName(entry.type)}`}
                          title={`${entry.weak} weak, ${entry.resist} resist, ${entry.immune} immune`}
                        >
                          {entry.type} x{entry.weak}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>None</p>
                  )}
                </div>

                <div className="team-analysis-section">
                  <h4>Strong Against</h4>
                  {teamStrongAgainst.length > 0 ? (
                    <div className="team-chip-row">
                      {teamStrongAgainst.map((entry) => (
                        <span key={`strong-${entry.type}`} className={`team-type-chip strong ${getTypeColorClassName(entry.type)}`}>
                          {entry.type} x{entry.strongCount}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p>None</p>
                  )}
                </div>

                <div className="team-analysis-section">
                  <h4>Redundancy</h4>
                  {redundantTeamTypes.length === 0 && duplicateTypeCombos.length === 0 ? (
                    <p>None</p>
                  ) : (
                    <>
                      {redundantTeamTypes.length > 0 && (
                        <div className="team-chip-row">
                          {redundantTeamTypes.map((entry) => (
                            <span key={`redundant-type-${entry.type}`} className={`team-type-chip neutral ${getTypeColorClassName(entry.type)}`}>
                              {entry.type} x{entry.count}
                            </span>
                          ))}
                        </div>
                      )}
                      {duplicateTypeCombos.length > 0 && (
                        <div className="team-chip-row team-chip-row-secondary">
                          {duplicateTypeCombos.map((entry) => (
                            <span key={`redundant-combo-${entry.typeCombo}`} className="team-type-chip neutral">
                              {entry.typeCombo} x{entry.count}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {session.isAuthenticated && currentScreen === 'pokedex' && selectedTeamPreviewEntry && (
        <div className="team-preview-overlay" onClick={() => setSelectedTeamPreviewPokemonId(null)}>
          <div className="team-preview-dialog team-preview-dialog-expanded" onClick={(event) => event.stopPropagation()}>
            <span className="team-preview-name">{selectedTeamPreviewEntry?.name?.english}</span>
            <span className="team-preview-dex-number">#{selectedTeamPreviewEntry.id}</span>
            <div className="team-preview-content">
              <div className="team-preview-header">
                <div>
                  <div className="team-preview-type-row">
                    <span className="team-preview-type-label">Type:</span>
                    <div className="team-chip-row">
                      {(selectedTeamPreviewEntry.type || []).map((typeName) => (
                        <span
                          key={typeName}
                          className={`team-type-chip neutral ${getTypeColorClassName(typeName)}`}
                        >
                          {typeName}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p>Species: {selectedTeamPreviewEntry.species || 'Unknown'}</p>
                </div>
              </div>

              {selectedPokemonEvolutionLine.length > 0 && (
                <div className="team-preview-evolution-inline">
                  <div className="evolution-chain-display">
                    {selectedPokemonEvolutionLine.map((evolutionNode, index) => (
                      <div key={`team-preview-evolution-${evolutionNode.entry.id}`} className="evolution-chain-step">
                        {index > 0 && <div className="evolution-chain-arrow">→</div>}
                        <div className={`evolution-chain-item ${evolutionNode.isCurrent ? 'evolution-chain-current' : ''}`}>
                          <button
                            type="button"
                            className="evolution-chain-link"
                            onClick={() => handleSelectTeamPokemon(evolutionNode.entry.id)}
                          >
                            <div className="evolution-chain-sprite-container">
                              <img
                                src={evolutionNode.entry?.image?.sprite}
                                alt={`${evolutionNode.entry?.name?.english} sprite`}
                                className={evolutionNode.isCurrent ? 'evolution-chain-sprite-large' : 'evolution-chain-sprite'}
                                title={`#${evolutionNode.entry.id} ${evolutionNode.entry?.name?.english}`}
                              />
                            </div>
                          </button>
                          {evolutionNode.isCurrent ? (
                            <p className="evolution-chain-name">{evolutionNode.entry?.name?.english}</p>
                          ) : (
                            <p className="evolution-chain-method">
                              {formatEvolutionCondition(evolutionNode.conditionFromPrevious)}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Base Stats */}
              {selectedTeamPreviewEntry.base && (
                <div className="team-preview-section">
                  <h5>Base Stats</h5>
                  <table className="team-preview-stats-table">
                    <tbody>
                      {Object.entries(selectedTeamPreviewEntry.base).map(([statName, statValue]) => (
                        <tr key={statName}>
                          <td className="stat-name">{statName}</td>
                          <td className="stat-value">{statValue}</td>
                          <td className="stat-bar">
                            <div className="stat-bar-fill" style={{ width: `${(statValue / 150) * 100}%` }}></div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="team-preview-section">
                <h5>Found In {selectedGameName}</h5>
                {!selectedGameVersion ? (
                  <p>Location lookup is only available for official game versions.</p>
                ) : isAvailabilityLoading && !hasAvailabilityDataForSelectedGame ? (
                  <p>Checking game availability...</p>
                ) : isSelectedTeamPreviewUnavailableInSelectedGame ? (
                  <p>Unavailable in this game.</p>
                ) : isSelectedTeamPreviewAvailableViaEvolutionOnly ? (
                  <p>Not found in wild encounters for this game. Obtainable via evolution.</p>
                ) : isSelectedTeamPreviewLocationLoading ? (
                  <p>Loading locations...</p>
                ) : Array.isArray(selectedTeamPreviewLocations) && selectedTeamPreviewLocations.length > 0 ? (
                  <ul className="location-list">
                    {selectedTeamPreviewLocations.map((locationEntry, index) => {
                      if (typeof locationEntry === 'string') {
                        return <li key={`${locationEntry}-${index}`}>{locationEntry}</li>;
                      }

                      const encounterDetails = Array.isArray(locationEntry?.encounters)
                        ? locationEntry.encounters
                        : [];
                      const locationName = locationEntry?.location || `Unknown location ${index + 1}`;

                      return (
                        <li key={`${locationName}-${index}`}>
                          <details className="location-item">
                            <summary className="location-summary">{locationName}</summary>
                            <div className="location-popup">
                              {encounterDetails.length > 0 ? (
                                <ul className="encounter-detail-list">
                                  {encounterDetails.map((detail, detailIndex) => (
                                    <li key={`${locationName}-detail-${detailIndex}`}>
                                      <div className="encounter-detail-card">
                                        <span className="encounter-meta-item">
                                          <span className="encounter-meta-label">Method</span>
                                          <span className="encounter-meta-value">{detail?.method || 'Unknown'}</span>
                                        </span>
                                        <span className="encounter-meta-item">
                                          <span className="encounter-meta-label">Level</span>
                                          <span className="encounter-meta-value">{detail?.level || 'Unknown'}</span>
                                        </span>
                                        <span className="encounter-meta-item">
                                          <span className="encounter-meta-label">Chance</span>
                                          <span className="encounter-meta-value">{detail?.chance ?? 'Unknown'}%</span>
                                        </span>
                                        <span className="encounter-meta-item">
                                          <span className="encounter-meta-label">Time</span>
                                          <span className="encounter-meta-value">{detail?.time || 'Any'}</span>
                                        </span>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="location-meta-empty">Encounter details unavailable.</p>
                              )}
                            </div>
                          </details>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No known encounter locations for this game.</p>
                )}
              </div>

              {/* Type Weaknesses */}
              {selectedPokemonWeaknesses.length > 0 && (
                <div className="team-preview-section">
                  <h5>Weak To</h5>
                  <div className="team-chip-row">
                    {selectedPokemonWeaknesses
                      .filter(w => w.category === 'weak')
                      .map((entry) => (
                        <span
                          key={`pokemon-weak-${entry.type}`}
                          className={`team-type-chip weak ${getTypeColorClassName(entry.type)}`}
                          title={`${entry.multiplier}x damage`}
                        >
                          {entry.type} x{entry.multiplier}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Type Resistances */}
              {selectedPokemonWeaknesses.filter(w => w.category === 'resist').length > 0 && (
                <div className="team-preview-section">
                  <h5>Resistant To</h5>
                  <div className="team-chip-row">
                    {selectedPokemonWeaknesses
                      .filter(w => w.category === 'resist')
                      .map((entry) => (
                        <span
                          key={`pokemon-resist-${entry.type}`}
                          className={`team-type-chip strong ${getTypeColorClassName(entry.type)}`}
                          title={`${entry.multiplier}x damage`}
                        >
                          {entry.type} x{entry.multiplier}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Type Immunities */}
              {selectedPokemonWeaknesses.filter(w => w.category === 'immune').length > 0 && (
                <div className="team-preview-section">
                  <h5>Immune To</h5>
                  <div className="team-chip-row">
                    {selectedPokemonWeaknesses
                      .filter(w => w.category === 'immune')
                      .map((entry) => (
                        <span
                          key={`pokemon-immune-${entry.type}`}
                          className={`team-type-chip neutral ${getTypeColorClassName(entry.type)}`}
                        >
                          {entry.type}
                        </span>
                      ))}
                  </div>
                </div>
              )}

              {/* Super Effective Against */}
              {selectedPokemonStrengths.length > 0 && (
                <div className="team-preview-section">
                  <h5>Super Effective Against</h5>
                  <div className="team-chip-row">
                    {selectedPokemonStrengths.map((entry) => (
                      <span
                        key={`pokemon-strong-${entry.type}`}
                        className={`team-type-chip strong ${getTypeColorClassName(entry.type)}`}
                      >
                        {entry.type}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {showBackToTop && (
        <button type="button" className="back-to-top-button" onClick={handleBackToTop}>
          Back to Top
        </button>
      )}
    </div>
  );
}


export default App;

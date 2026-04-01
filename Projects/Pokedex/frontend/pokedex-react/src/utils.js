// Utility functions for Pokedex app

// Calculate type effectiveness multiplier
export function getTypeMultiplierAgainstDefender(attackingType, defendingTypes, typeChart) {
  if (!attackingType || !Array.isArray(defendingTypes) || defendingTypes.length === 0) {
    return 1;
  }
  return defendingTypes.reduce((totalMultiplier, defendingType) => {
    const matchupValue = typeChart?.[attackingType]?.[defendingType];
    const nextMultiplier = typeof matchupValue === 'number' ? matchupValue : 1;
    return totalMultiplier * nextMultiplier;
  }, 1);
}

// Get CSS class for a Pokémon type
export function getTypeColorClassName(typeName) {
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
}

// Format a moveset line for display
export function formatMovesetLine(move, activeTab) {
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
}

// Format evolution condition for display
export function formatEvolutionCondition(condition) {
  if (!condition) return '';
  const levelMatch = condition.match(/level\s+(\d+)/i);
  if (levelMatch) {
    return `At level ${levelMatch[1]}`;
  }
  return condition;
}

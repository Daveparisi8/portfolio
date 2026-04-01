// Handler and callback functions for App.js
// All functions receive state and setState as needed via props or context

export function handleAuthSuccess(setSession) {
  return (username) => {
    setSession((previous) => ({
      ...previous,
      isAuthenticated: true,
      username,
    }));
  };
}

export function handleAuthEvent(setSession) {
  return ({ success, action, message }) => {
    setSession((previous) => ({
      ...previous,
      lastAction: action,
      lastMessage: message,
      success,
      isAuthenticated: action === 'login' && success ? true : previous.isAuthenticated,
    }));
  };
}

export function handleLogout(setSession, setCurrentScreen, setSelectedGameName, setRouteSearch, setAppliedRouteSearch, setRouteFilterError, setAvailabilityError, setRouteFilteredPokemonIds, setVisiblePokemonLocationsById, setVisiblePokemonMovesById, setSelectedMovesTabById) {
  return () => {
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
}

// ...add other handlers as needed, following the same pattern

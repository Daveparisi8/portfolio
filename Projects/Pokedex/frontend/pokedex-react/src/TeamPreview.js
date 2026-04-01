import React from 'react';

function TeamPreview({
  selectedTeamPreviewEntry,
  selectedGameName,
  selectedGameVersion,
  pokedexEntriesById,
  selectedPokemonWeaknesses,
  selectedPokemonStrengths,
  selectedPokemonEvolutionLine,
  getTypeColorClassName,
  formatEvolutionCondition,
  handleSelectTeamPokemon,
  selectedTeamPreviewLocations,
  isSelectedTeamPreviewLocationLoading,
  isSelectedTeamPreviewUnavailableInSelectedGame,
  isSelectedTeamPreviewAvailableViaEvolutionOnly,
  isAvailabilityLoading,
  hasAvailabilityDataForSelectedGame,
  onClose,
}) {
  if (!selectedTeamPreviewEntry) return null;
  return (
    <div className="team-preview-overlay" onClick={onClose}>
      <div className="team-preview-dialog team-preview-dialog-expanded" onClick={e => e.stopPropagation()}>
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
  );
}

export default TeamPreview;

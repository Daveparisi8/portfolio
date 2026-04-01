import React from 'react';

function TeamAnalysis({
  teamEntries,
  topTeamWeaknesses,
  teamWeakAgainst,
  teamStrongAgainst,
  redundantTeamTypes,
  duplicateTypeCombos,
  getTypeColorClassName,
  teamPokemonIds,
  setSelectedTeamPreviewPokemonId,
  setIsTeamAnalysisOpen,
}) {
  return (
    <div className="team-analysis-overlay" onClick={() => setIsTeamAnalysisOpen(false)}>
      <div className="team-analysis-dialog" onClick={e => e.stopPropagation()}>
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
  );
}

export default TeamAnalysis;

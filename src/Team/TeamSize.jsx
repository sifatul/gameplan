import React from 'react';
import './TeamSize.css';

function TeamSize({ setPlayersPerTeam, playersPerTeam }) {
   

 
  const handleCardClick = teamSize => {
    setPlayersPerTeam(teamSize);
  };

  return (
    <div className="team-setup">
      <div className="team-size-selection">
        <div className={`team-card ${playersPerTeam === 1 ? 'selected' : ''}`} onClick={() => handleCardClick(1)}>
          <h3>Singles</h3>
        </div>
        <div className={`team-card ${playersPerTeam === 2 ? 'selected' : ''}`} onClick={() => handleCardClick(2)}>
          <h3>Doubles</h3>
        </div>
            
      </div>
    </div>
  );
}

export default TeamSize;

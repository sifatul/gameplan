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
          <p>1 player per team</p>
        </div>
        <div className={`team-card ${playersPerTeam === 2 ? 'selected' : ''}`} onClick={() => handleCardClick(2)}>
          <h3>Doubles</h3>
          <p>2 players per team</p>
        </div>
        <div className={`team-card ${playersPerTeam === 5 ? 'selected' : ''}`} onClick={() => handleCardClick(5)}>
          <h3>Big Team</h3>
          <p> At least 3 players per team</p>
        </div>
      </div>
    </div>
  );
}

export default TeamSize;

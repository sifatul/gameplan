import React, { useState } from 'react';
import './SingleMatchScore.css'; // Import the CSS file for styling

function SingleMatchScore({ match, matchIndex, handleScoreChange, setMatchComplete }) {
  const [isShowDetails, setIsShowDetails] = useState(true)
  return (
    <div className="match-container">
      <h3 className="match-title" onClick={()=>setIsShowDetails(!isShowDetails)}>Match No. {matchIndex + 1}</h3>
      {isShowDetails && 
      <>
      <ul className="team-list">
        {match.teams.map((team, teamIndex) => (
          <li key={teamIndex} className="team-item">
            <span>{team.name}</span>
            <input
              type="number"
              onChange={e => handleScoreChange(matchIndex, teamIndex, e.target.value)}
              defaultValue={0}
              className="score-input"
            />
          </li>
        ))}
      </ul>
      <button className="end-match-button secondary" onClick={() => setIsShowDetails(false)}>
        Completed
      </button>
      </>}

    </div>
  );
}

export default SingleMatchScore;

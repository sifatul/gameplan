import React from 'react';
import './SingleMatchScore.css'; // Import the CSS file for styling

function SingleMatchScore({ match, matchIndex, handleScoreChange }) {
  return (
    <div className="match-container">
      <h3 className="match-title">Match No. {matchIndex + 1}</h3>
      <ul className="team-list">
        {match.map((team, teamIndex) => (
          <li key={teamIndex} className="team-item">
            <span >{team.name}</span>
            <input
              type="number"
              onChange={e => handleScoreChange(matchIndex, teamIndex, e.target.value)}
              defaultValue={0}
              className="score-input"
            />
          </li>
        ))}
      </ul>
      <button className="end-match-button" 
    //   onClick={() => endMatch(matchIndex)}
      >
        Completed
      </button>
    </div>
  );
}

export default SingleMatchScore;

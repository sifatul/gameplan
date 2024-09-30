import { useMemo } from 'react';
import './ScoreBoard.css'; // Assuming you create a CSS file for styling

function ScoreBoard({ teamScore = {} }) {


  const sortedTeams = useMemo(() => {
    return Object.entries(teamScore).sort((a, b) => b[1].totalScore - a[1].totalScore);
  }, [teamScore]);

  console.log("sortedTeams",sortedTeams)

  return (
    <div className="sidebar">
      <h3>Scoreboard</h3>
      {sortedTeams.length === 0 ? (
        <p>No matches played yet.</p>
      ) : (
        <ul>
          {sortedTeams.map(([teamName, { totalScore, totalGame }], index) => (
            <li key={index} className="team-score">
              <span className="team-name">{teamName}</span>: 
              <span className="score"> {totalScore}</span> 
              <span className="games"> (Games: {totalGame})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ScoreBoard;

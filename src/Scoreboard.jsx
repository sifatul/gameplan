import React, { useMemo, useState } from 'react';
import MatchScore from './MatchScore';
import './ScoreBoard.css'; // Assuming you create a CSS file for styling

function ScoreBoard({ matches = [] }) {
  const [teamScore, setTeamScore] = useState(null);
  const sortedTeams = useMemo(() => {
    if (!teamScore) return [];
    return Object.entries(teamScore).sort((a, b) => b[1].totalScore - a[1].totalScore);
  }, [teamScore]);

  return (
    <>
      <div className="main-content">
        <div className="titleHolder">
          <h1>Scoreboard</h1>
          {sortedTeams.length === 0 && <p>No matches played yet. Fill in Player Scores on the Sidebar to Update the Scoreboard.</p>}
        </div>
        {sortedTeams.length !== 0 && (
          <ul>
            <li className="team-score">
              <span className="team-name">Team Name</span>
              <span className="score"> Score</span>
              <span className="games"> Game played</span>
            </li>
            {sortedTeams.map(([teamName, { totalScore, totalGame }], index) => (
              <li key={index} className="team-score">
                <span className="team-name">{teamName}</span>
                <span className="score"> {totalScore}</span>
                <span className="games"> {totalGame}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <MatchScore matches={matches} setTeamScore={setTeamScore}></MatchScore>
    </>
  );
}

export default ScoreBoard;

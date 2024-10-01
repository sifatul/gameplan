import { useMemo } from 'react';
import './ScoreBoard.css'; // Assuming you create a CSS file for styling
import React, { useCallback, useEffect, useState } from 'react';

function ScoreBoard({ matches = [] }) {
  const [teamScore, setTeamScore] = useState(null);
  const sortedTeams = useMemo(() => {
    if (!teamScore) return [];
    return Object.entries(teamScore).sort((a, b) => b[1].totalScore - a[1].totalScore);
  }, [teamScore]);

  const updateScore = useCallback(_matches => {
    const score = {};
    _matches.forEach(match => {
      match.forEach(team => {
        const currentVal = score[team.name] || {};
        score[team.name] = {
          totalScore: (currentVal.totalScore || 0) + team.score,
          totalGame: (currentVal.totalGame || 0) + 1,
        };
      });
    });
    setTeamScore(score);
  });

  //  if(!matches.length == 0)
  const handleScoreChange = (matchIndex, teamIndex, value) => {
    const matchCopy = matches[matchIndex][teamIndex];
    matchCopy.score = parseInt(value);
    updateScore(matches);
  };
  return (
    <>
      <div className="main-content">
      <div className="titleHolder">
        <h1>Scoreboard</h1>
        {sortedTeams.length === 0 && <p>No matches played yet. Fill in Player Scores on the Sidebar to Update the Scoreboard.</p>}
        </div>
        {sortedTeams.length !== 0 &&   <ul>
            {sortedTeams.map(([teamName, { totalScore, totalGame }], index) => (
              <li key={index} className="team-score">
                <span className="team-name">{teamName}</span>:<span className="score"> {totalScore}</span>
                <span className="games"> (Games: {totalGame})</span>
              </li>
            ))}
          </ul>}
      </div>

      {matches.length > 0 && (
        <div className="PlayerList">
          <ul>
            {matches.map((match, matchIndex) => (
              <li key={matchIndex}>
                <h3>Match No. {matchIndex + 1}</h3>
                <ul>
                  {match.map((team, teamIndex) => (
                    <li key={teamIndex}>
                      {team.name}
                      <input
                        type="number"
                        // value={scores[matchIndex][teamIndex]}
                        onChange={e => handleScoreChange(matchIndex, teamIndex, e.target.value)}
                        defaultValue={0}
                      />
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default ScoreBoard;

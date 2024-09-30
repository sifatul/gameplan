import React, { useCallback, useEffect, useState } from 'react';

const MatchScoreDashboard = props => {
  const { teams, setTeamScore } = props;
  const [matches, setMatches] = useState([]);

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

  const handleScoreChange = (matchIndex, teamIndex, value) => {
    const matchCopy = matches[matchIndex][teamIndex];
    matchCopy.score = parseInt(value);
    setMatches(matches);
    updateScore(matches);
  };

  useEffect(() => {
    if (matches.length == 0) return;
    setTeamScore({});
  }, [matches.length]);

  function createMatch() {
    const matches = [];

    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        matches.push([
          { ...teams[i], score: 0 },
          { ...teams[j], score: 0 },
        ]);
      }
    }
    setMatches(matches);
  }

  return (
    <>
      {matches.length == 0 && (
        <>
          <h1>Create Match</h1>
          <button onClick={createMatch}>Create Match</button>
        </>
      )}

      {matches.length > 0 && (
        <div className="sidebar">
          <h3>Match Score</h3>
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
};

export default MatchScoreDashboard;

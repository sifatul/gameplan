import React, { useCallback, useEffect, useState } from 'react';
import SingleMatchScore from './SingleMatchScore';
function MatchScore(props) {
  const { matches, setTeamScore } = props;

  const handleScoreChange = (matchIndex, teamIndex, value) => {
    const matchCopy = matches[matchIndex][teamIndex];
    matchCopy.score = parseInt(value);
    const score = {};
    matches.forEach(match => {
      match.forEach(team => {
        const currentVal = score[team.name] || {};
        score[team.name] = {
          totalScore: (currentVal.totalScore || 0) + team.score,
          totalGame: (currentVal.totalGame || 0) + 1,
        };
      });
    });
    setTeamScore(score);
  };

  return (
    <>
      {matches.length > 0 && (
        <div className="PlayerList">
          <ul>
            {matches.map((match, matchIndex) => (
              <SingleMatchScore  key={matchIndex} match={match} matchIndex={matchIndex} handleScoreChange={handleScoreChange}></SingleMatchScore>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
export default MatchScore;

import React, { useCallback, useEffect, useState } from 'react';
import SingleMatchScore from './SingleMatchScore';
function MatchScore(props) {
  const { matches, setTeamScore} = props;

   
  const [closedMatch, setClosedMatch] = useState(matches);

  const handleScoreChange = (matchIndex, teamIndex, value) => {
    const matchCopy = matches[matchIndex].teams[teamIndex];
    matchCopy.score = parseInt(value);
    const score = {};
    matches.forEach(({teams}) => {
      teams.forEach(team => {
        const currentVal = score[team.name] || {};
        score[team.name] = {
          totalScore: (currentVal.totalScore || 0) + team.score,
          totalGame: (currentVal.totalGame || 0) + 1,
        };
      });
    });
    setTeamScore(score);
  };
  const setMatchComplete = useCallback((idx) => {

    setClosedMatch((prevState) => ([
        ...prevState,
        idx
      ]));
    
  },[]);

  
  return (
    <>
      {matches.length > 0 && (
        <div className="PlayerList">
          <ul>
            {matches.map((match, matchIndex) => (
              <SingleMatchScore  
              key={matchIndex} 
              match={match} 
              matchIndex={matchIndex} 
              handleScoreChange={handleScoreChange}
              setMatchComplete={setMatchComplete}
              ></SingleMatchScore>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
export default MatchScore;

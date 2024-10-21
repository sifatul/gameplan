import React, { useCallback, useEffect } from 'react';
import { IoPersonOutline, IoPerson } from 'react-icons/io5';
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';
import { scheduleMatches } from '../utils/gameUtil';

function MatchListPage(props) {
  const { matches, setMatchList, changeMatchStatus } = useMatch();
  const { players, getActivePlayers } = usePlayers();

  const handleGameStatusUpdate = useCallback((roundIdx, status) => {
    changeMatchStatus(roundIdx, status);
  }, []);

  useEffect(() => {
    const activePlayers = getActivePlayers();
    const completedMatches = matches.filter(match => !match.isActive);

    const output = scheduleMatches(activePlayers, matches);

    setMatchList([...completedMatches, ...output]);
  }, []);

  return (
    <div className="match-list-container">
      <ul className="match-list">
        {matches.map((round, roundIdx) => {
          const { isActive, team1, team2 } = round;
          return (
            <li key={`round-${roundIdx}`} className={`match-card ${isActive ? 'active' : ''}`}>
              <div className='match-card-wrapper'>
              <div className="team team1">
                <IoPerson className="team-icon" />
                <div>
                  <div className="team-name">{team1[0]}</div>
                  <div className="team-name">{team1[1]}</div>
                </div>
              </div>
              <div className="vs-divider">
                <span>VS</span>
              </div>
              <div className="team team2">
                <IoPersonOutline className="team-icon" />
                <div>
                  <div className="team-name">{team2[0]}</div>
                  <div className="team-name">{team2[1]}</div>
                </div>
              </div>
              </div>
              <button className="action-btn" 
              disabled={!isActive}
              onClick={() => handleGameStatusUpdate(roundIdx, false)}>
                  End Game
                </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MatchListPage;

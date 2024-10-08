import React, { useCallback, useEffect } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { MdCheckCircle, MdCheckCircleOutline } from 'react-icons/md';
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';
import { scheduleMatches } from '../utils/gameUtil';

function MatchListPage(props) {
  const { matches, setMatchList, changeMatchStatus } = useMatch();
  const { players, addPlayer, removePlayer, changePlayerName, getActivePlayers } = usePlayers();

  const handleGameStatusUpdate = useCallback((roundIdx, status) => {
    changeMatchStatus(roundIdx, status)
  }, []);

  useEffect(() => {
    const activePlayers = getActivePlayers();
    const completedMatches = matches.filter(match => !match.isActive);

    const output = scheduleMatches(activePlayers, matches);

    setMatchList([...completedMatches, ...output]);
  }, []);

  return (
    <>
      <ul className="long-list">
        {matches.map((round, roundIdx) => {
          const { isActive, team1, team2 } = round;
          return (
            <li key={`round-${roundIdx}`} className={`match-team ${isActive ? 'active' : ''}`}>
              <div className="flex-row">
                {/* <IoMdPeople className={isActive ? '' : 'icon-inactive'} size={20} style={{ marginRight: '10px' }} /> */}
                <div>
                  <div className="team-name">{team1[0]}</div>
                  <div className="team-name">{team1[1]}</div>
                </div>
              </div>
              <div className="flex-row">
                <span className='bold-text'>VS</span>
              </div>
              <div className="flex-row">
                {/* <IoMdPeople className={isActive ? '' : 'icon-inactive'} size={20} style={{ marginRight: '10px' }} /> */}
                <div>
                  <div className="team-name">{team2[0]}</div>
                  <div className="team-name">{team2[1]}</div>
                </div>
              </div>
              {isActive ? (
                <MdCheckCircle size={25} onClick={() => handleGameStatusUpdate(roundIdx, false)} className="status-icon" />
              ) : (
                <MdCheckCircleOutline size={25} onClick={() => handleGameStatusUpdate(roundIdx, true)} className="status-icon" />
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default MatchListPage;

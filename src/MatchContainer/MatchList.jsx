import React, { useCallback, useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { IoIosDoneAll } from 'react-icons/io';
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';
import { generateRounds, scheduleMatches, sortMatches } from '../utils/gameUtil';
import { MdCheckCircleOutline } from 'react-icons/md';
import { MdCheckCircle } from 'react-icons/md';

function MatchListPage(props) {
  const { matches, setMatchList, changeMatchStatus } = useMatch();
  const { players, addPlayer, removePlayer, changePlayerName, getActivePlayers } = usePlayers();

  const handleGameStatusUpdate = useCallback((roundIdx, status) => changeMatchStatus(roundIdx, status), []);

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
            <div key={`round-${roundIdx}`}>
              <div className={`match-team ${isActive ? 'active' : ''}`}>
                <div className="flex-row">
                  <IoMdPeople className={isActive ? '' : 'icon-inactive'} size={20} style={{ marginRight: '10px' }} />
                  <div>
                    <span> {team1[0]}</span> & <span>{team1[1]}</span> <br></br>
                    <span> {team2[0]}</span> & <span>{team2[1]}</span>
                  </div>
                </div>
                {isActive && <MdCheckCircleOutline size={25} onClick={e => handleGameStatusUpdate(roundIdx, false)} />}
                {!isActive && <MdCheckCircle size={25} onClick={e => handleGameStatusUpdate(roundIdx, true)} />}
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}
export default MatchListPage;

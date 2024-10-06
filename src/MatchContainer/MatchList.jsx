import React, { useCallback, useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { IoIosDoneAll } from 'react-icons/io';
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';

function MatchListPage(props) {
  
  const {matches, setMatchList, changeMatchStatus} = useMatch();
  const { players, addPlayer, removePlayer, changePlayerName, getActivePlayers } = usePlayers();
 
  const handleGameOver = useCallback(
    (roundIdx) => changeMatchStatus(roundIdx, false),
    [matches, setMatchList],
  );

  

  return (
    <>
      <ul className="long-list">
        {matches.map(( round, roundIdx) => {
          const {isActive, team} = round;
          return (
            <div key={`round-${roundIdx}`}>
              <div className={`match-team ${isActive ? 'active' : ''}`}>
                <div className="flex-row">
                  <IoMdPeople className={isActive ? '' : 'icon-inactive'} size={30} style={{ marginRight: '10px' }} />
                  <span> {team[0]}</span> & <span>{team[1]}</span>
                </div>
                <IoIosDoneAll size={30} onClick={e => handleGameOver(roundIdx)} />
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}
export default MatchListPage;

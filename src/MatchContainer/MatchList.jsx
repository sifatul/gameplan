import React, { useCallback, useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { IoIosDoneAll } from 'react-icons/io';
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';
import { generateRounds } from '../utils/gameUtil';
import { MdCheckCircleOutline } from "react-icons/md";
import { MdCheckCircle } from "react-icons/md";


function MatchListPage(props) {
  
  const {matches, setMatchList, changeMatchStatus} = useMatch();
  const { players, addPlayer, removePlayer, changePlayerName, getActivePlayers } = usePlayers();
 
  const handleGameStatusUpdate = useCallback(
    (roundIdx, status) => changeMatchStatus(roundIdx, status),
    [],
  );


  useEffect(() => {
    const activePlayers = getActivePlayers();
    let newRound = generateRounds(activePlayers)

    const completedMatches = matches.filter(match => !match.isActive);
    const updatedList = [...completedMatches, ...newRound]
 
    setMatchList(updatedList)
   
  }, []);

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
                {isActive && <MdCheckCircleOutline size={20} onClick={e => handleGameStatusUpdate(roundIdx, false)} />}
                {!isActive && <MdCheckCircle size={20}  onClick={e => handleGameStatusUpdate(roundIdx, true)} />}
              </div>
            </div>
          );
        })}
      </ul>
    </>
  );
}
export default MatchListPage;

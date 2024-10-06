import React, { useCallback, useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { IoIosDoneAll } from "react-icons/io";

function MatchListPage(props) {
  const {setRounds, rounds } = props;

  const handleGameOver = useCallback((roundIdx, gameIdx) => {
    // Create a new copy of the rounds array
    const updatedRounds = rounds.map((round, rIdx) => 
      rIdx === roundIdx
        ? round.map((game, gIdx) => 
            gIdx === gameIdx ? { ...game, isActive: false } : game
          )
        : round
    );
  
    // Update the state with the new copy
    setRounds(updatedRounds);
  }, [rounds, setRounds]);
  return (
    <>
      <ul className='long-list'>
        {rounds.map((round, roundIdx) => {
          return (
            <div key={`round-${roundIdx}`}>
              {round.map(({team, isActive}, idx) => {
                
                return (
                  <div key={`game-${idx}-${isActive}`} className={`match-team ${isActive?'active':''}`}>
                    <div className="flex-row">
                      <IoMdPeople 
                      className={isActive ? '' : 'icon-inactive'}
                      size={30} style={{ marginRight: '10px' }} />
                      <span> {team[0]}</span> & <span>{team[1]}</span>
                    </div>
                    <IoIosDoneAll size={30} onClick={e=> handleGameOver(roundIdx, idx)}/>
                  </div>
                );
              })}
            </div>
          );
        })}
      </ul>
    </>
  );
}
export default MatchListPage;

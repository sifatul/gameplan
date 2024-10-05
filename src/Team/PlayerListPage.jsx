import React, { useCallback, useEffect, useState } from 'react';
import { PAGE_ROUTE } from '../App';

function PlayerListPage(props) {
  const { setPageName, playerList, setPlayerList, totalParticipants } = props;

 
  useEffect(()=>{

    const cachedPlayers = JSON.parse(localStorage.getItem('playerList'));
    if (cachedPlayers && cachedPlayers.length === totalParticipants) {
      setPlayerList(cachedPlayers);
      setPageName(PAGE_ROUTE.PLAYER_LIST);
      return;
    }

    const participants = [];
    for (let i = 1; i <= totalParticipants; i++) {
      participants.push({
        name: `Participant ${i}`,
      });
    }
    setPlayerList(participants);
    setPageName(PAGE_ROUTE.PLAYER_LIST);

  },[])

  const onChangeName = useCallback(
    (idx, e) => {
      const newValue = e.target.value;

      // Create a copy of the current player list
      const updatedPlayerList = [...playerList];

      // Update the name of the player at the specified index
      updatedPlayerList[idx] = { ...updatedPlayerList[idx], name: newValue };

      // Set the updated player list
      setPlayerList(updatedPlayerList);
    },
    [playerList],
  );
  const goToNextPage = useCallback(()=>{
    localStorage.setItem('playerList', JSON.stringify(playerList));
    setPageName(PAGE_ROUTE.MATCHES)
  },[setPageName, playerList])

  return (
    <>
      <div className="main-content playerList">
        <div className="titleHolder">
          <h1>Player Setup</h1>
          <p>Easily organize your participants into teams.</p>
        </div>

        <ul>
          {playerList.map((player, idx) => {
            return (
              <input
                key={`player-${idx}`}
                value={player.name}
                type="string"
                onChange={e => onChangeName(idx, e)} // Handle change
              />
            );
          })}
        </ul>
      </div>

      {playerList.length > 0 && (
        <button className="action-btn" type="submit" onClick={e=>goToNextPage()}>
          Create Match
        </button>
      )}
    </>
  );
}

export default PlayerListPage;

import React, { useCallback, useEffect, useState } from 'react';
import { PAGE_ROUTE } from '../App';
import { usePlayers } from '../context/PlayersContext';

function PlayerListPage(props) {
  const { setPageName, totalParticipants } = props;
  const { players, addPlayer, removePlayer, changePlayerName, setPlayerList } = usePlayers();

  useEffect(() => {
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
        isActive: true,
      });
    }
    setPlayerList(participants);
    setPageName(PAGE_ROUTE.PLAYER_LIST);
  }, []);

  const onChangeName = useCallback(
    (idx, e) => {
      const newValue = e.target.value;

      changePlayerName(idx, newValue);
    },
    [players],
  );
  console.log('players', players);
  const goToNextPage = useCallback(() => {
    localStorage.setItem('playerList', JSON.stringify(players));
    setPageName(PAGE_ROUTE.MATCHES);
  }, [setPageName, players]);

  return (
    <>
      <div className="container main-content playerList">
        <div className="titleHolder">
          <h1>Player Setup</h1>
          <p>Easily organize your participants into teams.</p>
        </div>

        <ul>
          {players.map((player, idx) => {
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

      {players.length > 0 && (
        <button className="action-btn" type="submit" onClick={e => goToNextPage()}>
          Create Match
        </button>
      )}
    </>
  );
}

export default PlayerListPage;

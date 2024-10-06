import React, { createContext, useState, useContext } from 'react';

// Create a context
const PlayerContext = createContext();

// Create a provider component
export const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);

  const setPlayerList = (players)=>{
    setPlayers(players);
  }

  const addPlayer = (player) => {
    setPlayers((prevPlayers) => [...prevPlayers, player]);
  };

  const removePlayer = (id) => {
    setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
  };

  const changePlayerName = (index, newName) => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((player, idx) =>
        idx === index ? { ...player, name: newName} : player
      )
    );
  };

  return (
    <PlayerContext.Provider value={{ players, addPlayer, removePlayer, changePlayerName, setPlayerList }}>
      {children}
    </PlayerContext.Provider>
  );
};

// Custom hook for using the Player context
export const usePlayers = () => {
  return useContext(PlayerContext);
};

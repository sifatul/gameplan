import React, { createContext, useState, useContext } from 'react';

// Create a context
const MatchContext = createContext();

// Create a provider component
export const MatchProvider = ({ children }) => {
  const [matches, setMatch] = useState([]);
 

  const setMatchList = (matches)=>{
    setMatch(matches);
  }

  const addMatch = (player) => {
    setMatch((prevMatch) => [...prevMatch, player]);
  };

  const removeMatch = (id) => {
    setMatch((prevMatch) => prevMatch.filter((player) => player.id !== id));
  };

 

  const changeMatchStatus = (index, newStatus) => {
    setMatch((prevMatch) =>
      prevMatch.map((match, idx) =>
        idx === index ? { ...match, isActive: newStatus} : match
      )
    );
  };
  const getActiveMatches = ()=>{
    return matches.filter((match) => match.isActive)
  }

  return (
    <MatchContext.Provider value={{ matches, addMatch, removeMatch, setMatchList, changeMatchStatus, getActiveMatches }}>
      {children}
    </MatchContext.Provider>
  );
};

// Custom hook for using the Match context
export const useMatch = () => {
  return useContext(MatchContext);
};

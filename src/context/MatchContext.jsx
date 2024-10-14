import React, { createContext, useState, useContext } from 'react';
import { GAME_TYPE, MATCH_TYPE } from '../enums/match-defaults.enum';

// Create a context
const MatchContext = createContext();
const DEFAULT_MATCH_SETUP = {
  gameType: GAME_TYPE.SINGLES,
  matchType: MATCH_TYPE.FRIENDLY,
};

// Create a provider component
export const MatchProvider = ({ children }) => {
  const [matches, setMatch] = useState([]);
  const [matchSetupInfo, setMatchSetupInfo] = useState(DEFAULT_MATCH_SETUP);

  const setGameType = payload => {
    setMatchSetupInfo(prev => {
      return { ...prev, gameType: payload };
    });
  };

  const setMatchType = payload => {
    setMatchSetupInfo(prev => {
      return { ...prev, matchType: payload };
    });
  };
  const setMatchList = matches => {
    setMatch(matches);
  };

  const addMatch = player => {
    setMatch(prevMatch => [...prevMatch, player]);
  };

  const removeMatch = id => {
    setMatch(prevMatch => prevMatch.filter(player => player.id !== id));
  };

  const changeMatchStatus = (index, newStatus) => {
    setMatch(prevMatch => prevMatch.map((match, idx) => (idx === index ? { ...match, isActive: newStatus } : match)));
  };
  const getActiveMatches = () => {
    return matches.filter(match => match.isActive);
  };

  return (
    <MatchContext.Provider value={{ matches, addMatch, removeMatch, setMatchList, changeMatchStatus, getActiveMatches, setGameType, setMatchType, matchSetupInfo }}>
      {children}
    </MatchContext.Provider>
  );
};

// Custom hook for using the Match context
export const useMatch = () => {
  return useContext(MatchContext);
};

import React, { useCallback, useEffect, useState } from 'react';
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';
import './MatchContainer.css';
import MatchListPage from './MatchList';
import ActivePlayerListPage from './activePlayerList';
import { generateRounds } from '../utils/gameUtil';

const MatchContainer = props => {
  const { resetGame } = props;
  const { players, addPlayer, removePlayer, changePlayerName, setPlayerList } = usePlayers();
  const [rounds, setRounds] = useState([]);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const { matches, setMatchList, changeMatchStatus } = useMatch();

 
  useEffect(() => {
    if (!players.length) {
      const storedFixture = JSON.parse(localStorage.getItem('matches'));
      console.log('storedFixture', storedFixture);
      setMatchList(storedFixture);
      return;
    }
    const rounds = generateRounds(players);
    console.log('rounds', players, rounds);
    setMatchList(rounds);
  }, [players.length]);

  const resetGameHandler = useCallback(() => {
    setPlayerList([]);
    resetGame();
  }, []);

  const saveMatchInfo = () => {
    // Convert array to JSON string and save it to localStorage
    localStorage.setItem('matches', JSON.stringify(rounds));
  };
  const rePlan = useCallback(() => {
    const activePlayersName = players.filter(player => player.isActive);
    const activeRounds = rounds.filter(r => r.isActive);

    const newRounds = generateRounds(activePlayersName);
    const updatedRounds = [...activeRounds, ...newRounds];

    console.log('activeTeams', updatedRounds);
  }, [rounds]);

  return (
    <>
      <div className="main-content matchContainer">
        <div className="titleHolder">
          <h1>Match List</h1>
          <p>Games that you will play.</p>
        </div>
        <div className="custom-tabs">
          <div className={`custom-tabs-item ${activeTabIdx === 0 ? 'active' : ''}`} onClick={() => setActiveTabIdx(0)}>
            Match
          </div>
          <div className={`custom-tabs-item ${activeTabIdx === 1 ? 'active' : ''}`} onClick={() => setActiveTabIdx(1)}>
            Players
          </div>
        </div>

        
        {activeTabIdx === 0 && <MatchListPage rounds={rounds} setRounds={setRounds} />}
        {activeTabIdx === 1 && <ActivePlayerListPage />}
        
      </div>
      {players.length > 0 && activeTabIdx === 0 && (
        <>
          <button className="action-btn" type="submit" onClick={e => rePlan()}>
            exclude sick players
          </button>
          <button className="action-btn" type="submit" onClick={e => saveMatchInfo()}>
            Save
          </button>

          <button className="action-btn" type="submit" onClick={e => resetGameHandler()}>
            reset
          </button>
        </>
      )}
    </>
  );
};

export default MatchContainer;

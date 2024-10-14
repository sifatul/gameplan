import React, { useEffect, useState } from 'react';
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';
import '../styles/MatchContainer.css';
import MatchListPage from '../MatchContainer/MatchList';
import ActivePlayerListPage from '../MatchContainer/activePlayerList';

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
  }, [players.length]);

  useEffect(() => {
    const handleBackButton = event => {
      // Perform state change when back button is pressed
      setActiveTabIdx(0);
      event.preventDefault(); // Prevent default behavior if needed
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const saveMatchInfo = () => {
    // Convert array to JSON string and save it to localStorage
    localStorage.setItem('matches', JSON.stringify(rounds));
  };

  return (
    <>
      <div className="container main-content matchContainer">
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
      {/* {players.length > 0 && activeTabIdx === 0 && (
        <>
          <button className="action-btn" type="submit" onClick={e => saveMatchInfo()}>
            Save
          </button>
        </>
      )} */}
    </>
  );
};

export default MatchContainer;

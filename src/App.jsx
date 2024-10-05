import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import MatchContainer from './MatchContainer';
import TeamContainer from './Team/TeamContainer';
import PlayerListPage from './Team/PlayerListPage';

export const PAGE_ROUTE = {
  LANDING_PAGE: 'LANDING_PAGE',
  MATCHES: 'MATCHES',
  PLAYER_LIST: 'PLAYER_LIST',
};

function App() {
  const [playerList, setPlayerList] = useState([]);
  const [pageName, setPageName] = useState(PAGE_ROUTE.LANDING_PAGE);
  const [totalParticipants, setTotalParticipants] = useState(6);

  const resetGame = useCallback(() => {
    localStorage.removeItem('matches');
    setPageName(PAGE_ROUTE.LANDING_PAGE);
    setPlayerList([]);
  }, []);

  useEffect(() => {
    // Get the JSON string from localStorage and parse it back into an array
    const storedFixture = JSON.parse(localStorage.getItem('matches'));
    console.log('storedFixture', storedFixture);
    if (storedFixture && storedFixture.length > 0) {
      setPageName(PAGE_ROUTE.MATCHES);
    }
  }, []);

  return (
    <div className="App">
      {pageName === PAGE_ROUTE.LANDING_PAGE && (
        <TeamContainer
          setTotalParticipants={setTotalParticipants}
          totalParticipants={totalParticipants}
          setPageName={setPageName}
        ></TeamContainer>
      )}
      {pageName === PAGE_ROUTE.PLAYER_LIST && (
        <PlayerListPage
          playerList={playerList}
          setPageName={setPageName}
          setPlayerList={setPlayerList}
          totalParticipants={totalParticipants}
        ></PlayerListPage>
      )}
      {pageName === PAGE_ROUTE.MATCHES && <MatchContainer playerList={playerList} resetGame={resetGame}></MatchContainer>}
    </div>
  );
}

export default App;

import React, { useCallback, useEffect, useState } from 'react';
import '../App.css';
import MatchContainer from './MatchContainer';
import TeamContainer from './TeamContainer';
import PlayerListPage from './PlayerSetup';
import { PlayerProvider } from '../context/PlayersContext'; // Import the TodoProvider
import { MatchProvider } from '../context/MatchContext';
import { PAGE_ROUTE } from '../enums/routes.enum';
// import GameSelectionPage from './SelectGameType';
import LandingPage from './LandingPage';

function Home() {
  const [pageName, setPageName] = useState(PAGE_ROUTE.LANDING_PAGE);
  const [totalParticipants, setTotalParticipants] = useState(4);

  const resetGame = useCallback(() => {
    localStorage.removeItem('matches');
    setPageName(PAGE_ROUTE.LANDING_PAGE);
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
        <MatchProvider>
          <LandingPage  setPageName={setPageName}/>
        </MatchProvider>
      )}
      {pageName === PAGE_ROUTE.PLAYER_SETUP_PAGE && (
        <TeamContainer
          setTotalParticipants={setTotalParticipants}
          totalParticipants={totalParticipants}
          setPageName={setPageName}
        ></TeamContainer>
      )}
      <PlayerProvider>
        {pageName === PAGE_ROUTE.PLAYER_LIST && (
          <PlayerListPage setPageName={setPageName} totalParticipants={totalParticipants}></PlayerListPage>
        )}
        {pageName === PAGE_ROUTE.MATCHES && (
          <MatchProvider>
            <MatchContainer resetGame={resetGame}></MatchContainer>
          </MatchProvider>
        )}
      </PlayerProvider>
    </div>
  );
}

export default Home;

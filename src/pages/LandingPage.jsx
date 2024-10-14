import React, { useCallback, useState } from 'react';
import { GAME_TYPE, MATCH_TYPE } from '../enums/match-defaults.enum';
import { PAGE_ROUTE } from '../enums/routes.enum';
import '../styles/TeamContainer.css';
import { useMatch } from '../context/MatchContext';

function LandingPage(props) {
  const { setPageName } = props;
  const { matches, matchSetupInfo, setGameType, setMatchType } = useMatch();
  

  // const [gameType, setGameType] = useState(GAME_TYPE.DOUBLES);
  // const [matchType, setMatchType] = useState(MATCH_TYPE.FRIENDLY);

  const goToNextPage = useCallback(() => {
    setPageName(PAGE_ROUTE.PLAYER_SETUP_PAGE);
  }, [setPageName]);

  const gameTypeOptions = [GAME_TYPE.SINGLES, GAME_TYPE.DOUBLES];
  const matchTypeOptions = [MATCH_TYPE.FRIENDLY, MATCH_TYPE.TOURNAMENT];

  return (
    <>
      <div className="container main-content LandingPage">
        <div className="titleHolder">
          <div className="title-flex">
            <h1 className="centered-title">Game Setup</h1>
          </div>
          <p>Select the type of game and match type.</p>
        </div>

        {/* Section 1: Game Type */}
        <div className="section">
          <h2 className="section-title">Choose Game Type</h2>
          <div className="card-container" >
            {gameTypeOptions.map(option => (
              <div key={option} className={`card card-rect ${matchSetupInfo.gameType === option ? 'selected' : ''}`} onClick={() => setGameType(option)}>
                {option}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Match Type */}
        <div className="section">
          <h2 className="section-title">Choose Match Type</h2>
          <div className="card-container">
            {matchTypeOptions.map(option => (
              <div key={option} className={`card card-bg ${matchSetupInfo.matchType === option ? 'selected' : ''}`} onClick={() => setMatchType(option)}>
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="action-btn" type="submit" onClick={goToNextPage}>
        Next
      </button>
    </>
  );
}

export default LandingPage;

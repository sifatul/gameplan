import React, { useCallback, useState } from 'react';
import '../styles/TeamContainer.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { PAGE_ROUTE } from '../enums/routes.enum';

function GameSetupPage(props) {
  const { setPageName } = props;

  const [gameType, setGameType] = useState('Doubles');
  const [matchType, setMatchType] = useState('Friendly');

  const goToNextPage = useCallback(() => {
    setPageName(PAGE_ROUTE.PLAYER_SETUP_PAGE);
  }, [setPageName]);

  const gameTypeOptions = ['Singles', 'Doubles'];
  const matchTypeOptions = ['Friendly', 'Tournament'];

  return (
    <>
      <div className="container main-content gameSetupPage">
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
              <div key={option} className={`card card-rect ${gameType === option ? 'selected' : ''}`} onClick={() => setGameType(option)}>
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
              <div key={option} className={`card card-bg ${matchType === option ? 'selected' : ''}`} onClick={() => setMatchType(option)}>
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

export default GameSetupPage;

import React, { useCallback, useState } from 'react';
import '../styles/TeamContainer.css';
import '../styles/Card.css';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { PAGE_ROUTE } from '../enums/routes.enum';

function TeamContainer(props) {
  const { setTotalParticipants, setPageName, totalParticipants } = props;

  const goToNextPage = useCallback(() => {
    if (totalParticipants >= 2 && totalParticipants <= 20) {
      setPageName(PAGE_ROUTE.PLAYER_LIST);
    }
  }, [setPageName, totalParticipants]);

  const commonParticipantCounts = [2, 4, 6, 8, 12];

  const handleManualInput = e => {
    const value = parseInt(e.target.value, 10);
    setTotalParticipants(value);
  };

  return (
    <>
      <div className="container main-content teamContainer">
        <div className="titleHolder">
          <div className="title-flex">
            <div className="back-button" onClick={() => setPageName(PAGE_ROUTE.LANDING_PAGE)}>
              <IoMdArrowRoundBack size={25} color="#14213D" />
            </div>
            <h1 className="centered-title">Team Setup</h1>
          </div>
          <p>Select or input the number of participants.</p>
        </div>

        <div className="card-container">
          {commonParticipantCounts.map(count => (
            <div
              key={count}
              className={`card card-sm ${totalParticipants == count ? 'selected' : ''}`}
              onClick={() => {
                setTotalParticipants(count);
              }}
            >
              {count} Players
            </div>
          ))}
          <div className={`card hidden`}>Hidden</div>
        </div>
        <div className="flex-row align-center">
          <span className="or-divider">OR</span>
        </div>

        <div className="manual-input-container">
          <label htmlFor="manual-input"> Enter Number of Players:</label>
          <input
            id="manual-input"
            type="number"
            value={totalParticipants}
            placeholder="e.g., 15"
            onChange={handleManualInput}
            min="2"
            max="20"
          />
          {totalParticipants < 2 && <p className="error-message">You need at least 2 players.</p>}

          {totalParticipants > 20 && <p className="error-message">Maximum 20 players are allowed.</p>}
        </div>

        {/* Error Message for invalid number of participants */}
      </div>

      <button className="action-btn" type="submit" onClick={goToNextPage} disabled={totalParticipants < 2 || totalParticipants > 20}>
        Next
      </button>
    </>
  );
}

export default TeamContainer;

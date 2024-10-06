import React, { useCallback, useEffect, useState } from 'react';
import { PAGE_ROUTE } from '../App';

function TeamContainer(props) {
  const { setTotalParticipants, setPageName, totalParticipants } = props;
  const goToNextPage = useCallback(() => {
    setPageName(PAGE_ROUTE.PLAYER_LIST);
  }, []);

  return (
    <>
      <div className="main-content teamContainer">
        <>
          <div className="titleHolder">
            <h1>Team Setup</h1>
            <p>Easily organize your participants into teams.</p>
          </div>

          <div>
            <label htmlFor="total-participants">Total Number of Players: </label>
            <input
              type="number"
              id="total-participants"
              value={totalParticipants}
              onChange={e => setTotalParticipants(e.target.value)}
              required
            />
          </div>

          {/* {playersPerTeam > 2 && (
              <div>
                <label htmlFor="players-per-team">Players per Team (Max):</label>
                <input
                  type="number"
                  id="players-per-team"
                  value={playersPerTeam}
                  onChange={e => setPlayersPerTeam(e.target.value)}
                  required
                />
              </div>
            )} */}

          {/* {teams.length == 0 && <TeamSize setPlayersPerTeam={setPlayersPerTeam} playersPerTeam={playersPerTeam}></TeamSize>} */}
        </>
      </div>

      <button className="action-btn" type="submit" onClick={e => goToNextPage(e)}>
        Create Teams
      </button>
    </>
  );
}
export default TeamContainer;

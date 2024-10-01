import React, { useState } from 'react';
import TeamSize from './TeamSize';

function TeamContainer(props) {
  const { teams, setTeams } = props;
  const [totalParticipants, setTotalParticipants] = useState(6);
  const [playersPerTeam, setPlayersPerTeam] = useState(2);
  const createTeams = e => {
    e.preventDefault();
    const participants = [];
    for (let i = 1; i <= totalParticipants; i++) {
      participants.push(`Participant ${i}`);
    }

    // Shuffle participants
    participants.sort(() => Math.random() - 0.5);

    // Set team names
    const numTeams = Math.ceil(totalParticipants / playersPerTeam);

    // Create teams
    const newTeams = [];
    for (let i = 0; i < numTeams; i++) {
      newTeams.push({
        name: `Team ${i + 1}`,
        players: participants.splice(0, playersPerTeam),
      });
    }
    setTeams(newTeams);
  };
console.log(playersPerTeam)
  return (
    <div className="main-content">
      {teams.length == 0 && (
        <>
          <div className="titleHolder">
            <h1>Team Setup</h1>
            <p>Easily organize your participants into teams.</p>
          </div>
          {teams.length == 0 && <TeamSize setPlayersPerTeam={setPlayersPerTeam} playersPerTeam={playersPerTeam}></TeamSize>}
          <form onSubmit={createTeams}>
            <div>
              <label htmlFor="total-participants">Total Number of Players:              </label>
              <input
                type="number"
                id="total-participants"
                value={totalParticipants}
                onChange={e => setTotalParticipants(e.target.value)}
                required
              />
            </div>
            <br />

            {playersPerTeam >2 && <div>
              <label htmlFor="players-per-team">Players per Team (Max):</label>
              <input
                type="number"
                id="players-per-team"
                value={playersPerTeam}
                onChange={e => setPlayersPerTeam(e.target.value)}
                required
              />
            </div>}
            <br />

            <button type="submit">Create Teams</button>
          </form>
        </>
      )}
    </div>
  );
}
export default TeamContainer;

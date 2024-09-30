import React, { useState } from 'react';
function TeamContainer (props){
    const { teams, setTeams} = props;
    const [totalParticipants, setTotalParticipants] = useState('');
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
            players: participants.splice(0, playersPerTeam)
          });
        }
        setTeams(newTeams);
      };


    return <>
    
    {teams.length == 0 && (
          <>
            <h1>Team Divider</h1>
            <form onSubmit={createTeams}>
              <label>Total Number of Participants:</label>
              <input type="number" value={totalParticipants} onChange={e => setTotalParticipants(e.target.value)} required />
              <br />

              <label>Number of Players per Team:</label>
              <input type="number" value={playersPerTeam} onChange={e => setPlayersPerTeam(e.target.value)} required />
              <br />

              <button type="submit">Create Teams</button>
            </form>
          </>
        )}
    </>

}
export default TeamContainer;
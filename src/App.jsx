import React, { useState } from 'react';
import './App.css';
import Sidebar from './sidebar';
import ScoreBoard from './Scoreboard';
import MatchContainer from './match-container';
import TeamContainer from './team-container';
function App() {
  
  
  const [teams, setTeams] = useState([]);
  const [teamScore, setTeamScore] = useState(null);
   
 

  return (
    <div className="App">
      <div className="main-content">

       <TeamContainer setTeams={setTeams} teams={teams}></TeamContainer>
       {teams.length>0 &&  <MatchContainer teams={teams} setTeamScore={setTeamScore}></MatchContainer>}

      </div>

      {teams.length > 0 && !teamScore && <Sidebar teams={teams} ></Sidebar>}
      {teamScore && <ScoreBoard teamScore={teamScore}></ScoreBoard>}
    </div>
  );
}

export default App;

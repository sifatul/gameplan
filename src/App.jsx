import React, { useState } from 'react';
import './App.css';
import ScoreBoard from './Scoreboard';

import MatchContainer from './MatchContainer';
import TeamContainer from './TeamContainer';
function App() {
  const [teams, setTeams] = useState([]);
  
  const [matches, setMatches] = useState([]);

  return (
    <div className="App">
      {teams.length == 0 && <TeamContainer setTeams={setTeams} teams={teams}></TeamContainer>}
      {teams.length > 0 && matches.length == 0 &&  (
        <MatchContainer
          teams={teams}
           
          matches={matches}
          setMatches={setMatches}
           
        ></MatchContainer>
      )}
      {matches.length > 0 && <ScoreBoard matches={matches}></ScoreBoard>}
      
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './App.css';
import ScoreBoard from './Scoreboard';

import MatchContainer from './MatchContainer';
import TeamContainer from './Team/TeamContainer';

// Inside App.jsx or your main component
import React, { useEffect, useState } from 'react';

function App() {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);

  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installPromptVisible, setInstallPromptVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = e => {
      e.preventDefault(); // Prevent the default install prompt
      setDeferredPrompt(e); // Store the event for later
      setInstallPromptVisible(true); // Show your custom install button
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      setInstallPromptVisible(false); // Hide the prompt
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        setDeferredPrompt(null); // Clear the prompt
      });
    }
  };

  return (
    <div className="App">
      {installPromptVisible && (
        <div
          id="installBanner"
          style={{ position: 'fixed', bottom: 0, width: '100%', background: '#333', color: 'white', textAlign: 'center', padding: '10px' }}
        >
          <p>Install our app for a better experience!</p>
          <button onClick={handleInstallClick}>Install</button>
        </div>
      )}
      {teams.length == 0 && <TeamContainer setTeams={setTeams} teams={teams}></TeamContainer>}

      {teams.length > 0 && matches.length == 0 && <MatchContainer teams={teams} matches={matches} setMatches={setMatches}></MatchContainer>}
      {matches.length > 0 && <ScoreBoard matches={matches}></ScoreBoard>}
    </div>
  );
}

export default App;

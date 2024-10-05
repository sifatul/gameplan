import React, { useCallback, useEffect, useState } from 'react';
import ScoreBoard from './Scoreboard';
import PlayerList from './PlayerList';
 

const MatchScoreDashboard = props => {
  const {playerList = [], resetGame} = props;
  const [rounds, setRounds] = useState([]);

  function generateRounds(players) {
    const rounds = [];
    const numberOfPlayers = players.length;

    // Check if the number of players is even; if not, add a "bye" player
    const isOdd = numberOfPlayers % 2 !== 0;
    if (isOdd) {
      return;
    }

    // Total rounds are equal to number of players - 1
    const totalRounds = players.length - 1;
    const half = players.length / 2;

    for (let round = 0; round < totalRounds; round++) {
      const currentRound = [];

      // First half is fixed; second half is rotated
      for (let i = 0; i < half; i++) {
        const player1 = players[i];
        const player2 = players[numberOfPlayers - 1 - i];
        if (player1 !== 'Bye' && player2 !== 'Bye') {
          currentRound.push([player1.name, player2.name]);
        }
      }
      rounds.push(currentRound);

      // Rotate players (except the first one)
      players.splice(1, 0, players.pop());
    }

    return rounds;
  }
   useEffect(() => {
    if(!playerList.length){
      const storedFixture = JSON.parse(localStorage.getItem('matches'));
      console.log("storedFixture", storedFixture)
      setRounds(storedFixture);
      return
    }
    const rounds = generateRounds(playerList);
    setRounds(rounds);
  }, [playerList, setRounds]);

  const saveMatchInfo = ()=>{
// Convert array to JSON string and save it to localStorage
      localStorage.setItem('matches', JSON.stringify(rounds));

  }
 

  return (
    <>
      <div className="main-content matchContainer">
        <ul>
          {rounds.map((round, index) => {
            return (
              <div key={`round-${index}`}>
                <p>Round {index + 1}:</p>

                {round.map((pair, idx) => {
                  return (
                    <div key={`index-${pair[0]}`}>
                      {pair[0]} & {pair[1]}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </ul>
      </div>
      {playerList.length > 0 && (
        <button className="action-btn" type="submit" onClick={e=>saveMatchInfo()}>
          Save
        </button>
      )}
        <button className="action-btn" type="submit" onClick={e=>resetGame()}>
          reset
        </button>
    </>
  );
};

export default MatchScoreDashboard;

export function generateRounds(input) {
  const players = [...input];
  const rounds = [];
  const numberOfPlayers = players.length;

  // Check if the number of players is odd; if not, add a "bye" player
  const isOdd = numberOfPlayers % 2 !== 0;
  if (isOdd) {
    players.push({ name: 'Bye' });
  }

  const totalRounds = players.length - 1;

  // Create a list of pairs for the round-robin format
  for (let round = 0; round < totalRounds; round++) {
    const currentRound = [];
    for (let i = 0; i < players.length / 2; i++) {
      const player1 = players[i];
      const player2 = players[players.length - 1 - i];

      if (player1.name !== 'Bye' && player2.name !== 'Bye') {
        currentRound.push({ team: [player1.name, player2.name], isActive: true });
      }
    }

    rounds.push(currentRound);

    // Rotate players for next round
    const lastPlayer = players.pop();
    players.splice(1, 0, lastPlayer); // Insert at index 1
  }

  return rounds.flatMap(round => round);
}

function canBeScheduled(match, lastMatch) {
  const pairsCurrent = [match.team1.join('-'), match.team2.join('-')];
  const pairsLast = [lastMatch.team1.join('-'), lastMatch.team2.join('-')];

  // Ensure no pairs overlap between consecutive matches
  return pairsCurrent.every(pair => !pairsLast.includes(pair));
}

export function sortMatches(matches) {
  let sortedMatches = [];
  let unscheduledMatches = [...matches];

  while (unscheduledMatches.length > 0) {
    if (sortedMatches.length === 0) {
      // Add the first match
      sortedMatches.push(unscheduledMatches.shift());
    } else {
      let lastMatch = sortedMatches[sortedMatches.length - 1];
      let found = false;

      // Iterate over all unscheduled matches and find a valid one
      for (let i = 0; i < unscheduledMatches.length; i++) {
        if (canBeScheduled(unscheduledMatches[i], lastMatch)) {
          sortedMatches.push(unscheduledMatches.splice(i, 1)[0]);
          found = true;
          break;
        }
      }

      if (!found) {
        // If no valid match can be scheduled, relax the rule and push the next available match
        sortedMatches.push(unscheduledMatches.shift());
      }
    }
  }

  return sortedMatches;
}

export function scheduleMatches (activePlayers){
    let updatedList = generateRounds(activePlayers);

    // const completedMatches = matches.filter(match => !match.isActive);
    // const updatedList = [...completedMatches, ...newRound];

    let allMatches = []
    const donePair= [];

    for(let i=0; i<updatedList.length; i++) {
      
      const currentPair = updatedList[i].team;
      const pairWithOutCurr = updatedList.reduce((sum, {team}) => {
          const p1 = team[0]
          const p2 = team[1]
          if(donePair.includes(team.join('-'))){
            return sum;
          }
          if(currentPair.includes(p1) || currentPair.includes(p2)){
            return sum
          }
          return [...sum, { team1: currentPair, team2: team, isActive: true}]

      },[])
      donePair.push(currentPair.join('-'))
      
      allMatches = [...allMatches, ...pairWithOutCurr]
    }
     
    const sortMatch = sortMatches(allMatches)

    return sortMatch
}

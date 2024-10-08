function generatePairs(players) {
    const teams = []
    for(let i = 0; i < players.length; i++) {
        const cursor1 = players[i]
        for(let j = i+1; j < players.length; j++) {
          const cursor2 = players[j];
          // teams.push({ team: [cursor1.name, cursor2.name]});
          teams.push([cursor1.name, cursor2.name]);
        }
    }
    return teams
  }
  
  function canBeScheduled(match, lastMatch) {
    const team1 = match.team1.join('-');
    const team2 = match.team2.join('-');
  
    // Ensure no team overlaps with the last match
    return ![team1, team2].some(pair => lastMatch.teams.includes(pair));
  }
  
  function sortMatches(matches) {
    let sortedMatches = [];
    let unscheduledMatches = [...matches];
  
    while (unscheduledMatches.length > 0) {
      if (sortedMatches.length === 0) {
        sortedMatches.push(unscheduledMatches.shift());
      } else {
        let lastMatch = sortedMatches[sortedMatches.length - 1];
        let found = false;
  
        for (let i = 0; i < unscheduledMatches.length; i++) {
          if (canBeScheduled(unscheduledMatches[i], lastMatch)) {
            sortedMatches.push(unscheduledMatches.splice(i, 1)[0]);
            found = true;
            break;
          }
        }
  
        if (!found) {
          sortedMatches.push(unscheduledMatches.shift());
        }
      }
    }
  
    return sortedMatches;
  }
  
  export function scheduleMatches(activePlayers) {
    let updatedList = generatePairs(activePlayers);
    let allMatches = [];
    const donePair = new Set();
  
    // Generate match combinations
    for (let i = 0; i < updatedList.length; i++) {
      const currentPair = updatedList[i];
      const pairKey = currentPair.join('-');
      
      if (donePair.has(pairKey)) continue; // Skip if already processed
  
      // Collect all valid pairings
      for (let j = i + 1; j < updatedList.length; j++) {
        const nextPair = updatedList[j];
  
        if (!currentPair.some(player => nextPair.includes(player))) {
          allMatches.push({
            team1: currentPair,
            team2: nextPair,
            isActive: true,
            teams: [currentPair.join('-'), nextPair.join('-')],
          });
        }
      }
  
      donePair.add(pairKey);
    }
  
    // Sort the matches to avoid consecutive repeat pairings
    const sortedMatches = sortMatches(allMatches);
  
    return sortedMatches;
  }
  
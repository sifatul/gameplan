function generatePairs(players) {
  const teams = [];
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      teams.push([players[i].name, players[j].name]);
    }
  }
  return teams;
}
function canBeScheduled(match, lastMatch) {
  const team1 = match.team1.join('-');
  const team2 = match.team2.join('-');

  // Ensure no team overlaps with the last match
  return ![team1, team2].some(pair => [lastMatch.team1.join('-'), lastMatch.team2.join('-')].includes(pair));
}

function sortMatches(matches) {
  let unscheduledMatches = [...matches];
  let sortedMatches = [unscheduledMatches.shift()];

  while (unscheduledMatches.length > 0) {
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

  return sortedMatches;
}

export function scheduleMatches(activePlayers) {
  let updatedList = generatePairs(activePlayers);
  let allMatches = [];

  for (let i = 0; i < updatedList.length; i++) {
    const currentPair = updatedList[i];

    for (let j = i + 1; j < updatedList.length; j++) {
      const nextPair = updatedList[j];

      if (!currentPair.some(player => nextPair.includes(player))) {
        allMatches.push({
          team1: currentPair,
          team2: nextPair,
          isActive: true,
        });
      }
    }
  }

   
  const sortedMatches = sortMatches(allMatches);

  return sortedMatches;
}

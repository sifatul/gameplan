 

// Example usage:

function generatePairs(players) {
  const teams = [];
  const waitingPairs = {};
  const waitingPlayers = {};
  const waitingCumPlayers = {};
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      teams.push([players[i].name, players[j].name]);
      const key = `${players[i].name}-${players[j].name}`;
      waitingPairs[key] = (waitingPairs[key] || 1) + 1;

      waitingPlayers[players[i].name] = (waitingPlayers[players[i].name] || 1) + 1;
      waitingPlayers[players[j].name] = (waitingPlayers[players[j].name] || 1) + 1;
    }
  }
  return { teams, waitingPairs };
}
function canBeScheduled(match, lastMatch) {
  const team1 = match.team1.join('-');
  const team2 = match.team2.join('-');

  // Ensure no team overlaps with the last match
  return ![team1, team2].some(pair => [lastMatch.team1.join('-'), lastMatch.team2.join('-')].includes(pair));
}

export function scheduleMatches(activePlayers) {
  let { teams, waitingPairs } = generatePairs(activePlayers);
  const allNames = activePlayers.map(player => player.name);
  let bench = [...allNames];
  let counter = 0;
  const output = [];
  const memory = {};
  while (counter < 1400) {
    const firstFour = bench.splice(0, 4);
    const match = {
      team1: [firstFour[0], firstFour[1]],
      team2: [firstFour[2], firstFour[3]],
      isActive: true,
    };
    const key1 = match.team1.sort().join('');
    const key2 = match.team2.sort().join('');
    const key = key1 + '-' + key2;
    if (!memory[key]) {
      output.push(match);
      memory[key] = match;
      bench = [...bench, ...firstFour];
    } else {
      // firstFour[0],firstFour[3],firstFour[1],firstFour[2]
      // bench = [firstFour[0],firstFour[2],firstFour[1],firstFour[3],...bench,firstFour[0],firstFour[3],firstFour[1],firstFour[2], ]
      bench = [...bench, firstFour[0], firstFour[3], firstFour[1], firstFour[2]];
    }
    counter++;
  }
 
  return output;
}

function hasCommonName(key1, key2) {
  // Split the keys into names
  const names1 = key1.split('-');
  const names2 = key2.split('-');

  // Use a Set to check for common names
  const nameSet = new Set(names1);

  // Check if any name from key2 exists in the set
  return names2.some(name => nameSet.has(name));
}

function sortMatches(matches, temp, allNames) {
  let bench = [...allNames];

  let len = Object.keys(temp);
  let counter = 0;
  let output = [];
  while (Object.keys(temp).length) {
    if (bench.size < 4) {
      bench = new Set([...Array.from(bench), ...allNames]); // Merge both sets or arrays
    }
    const benchArray = Array.from(bench); // Convert the Set to an array

    const fourPlayers = benchArray.splice(0, 4);
    bench = new Set(benchArray);
    const key = fourPlayers.join('-');

    if (!temp[key]) {
      console.log('dsd', key);
      bench = new Set([...bench, fourPlayers.pop()]); // Merge
      continue;
    }
    const match = temp[key];

    if (temp[key].length === 0) {
      delete temp[key];
    }
    if (match.length) {
      const item = match.splice(0, 1);
      output = [...output, item[0]];
    }

    counter++;
    len = Object.keys(temp);

    if (counter > 100) {
      break;
    }
  }
}

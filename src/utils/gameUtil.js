const players = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

// Step 1: Generate all unique pairs (teams) of players
function generateTeams(players) {
  const teams = [];
  for (let i = 0; i < players.length; i++) {
    for (let j = i + 1; j < players.length; j++) {
      teams.push([players[i], players[j]]);
    }
  }
  return teams;
}
function generateMatches(teams) {
  const matches = [];
  const usedTeams = new Set();

  // Helper to check if a team is already used
  function isTeamUsed(team1Str, team2Str) {  
    return usedTeams.has(`${team1Str}vs${team2Str}`) || usedTeams.has(`${team2Str}vs${team1Str}`)  
  }

  // Try forming matches by combining non-overlapping teams
  for (let i = 0; i < teams.length; i++) {
    const currentTeam = teams[i];
    const newRow = teams.filter(team => {
      const containDuplicate = team.includes(currentTeam[0]) || team.includes(currentTeam[1]);
      return !containDuplicate;
    });
    // console.log(newRow)
    for (let j = 0; j < newRow.length; j++) {
      const [team1, team2] = [teams[i], newRow[j]];
      const team1Str = team1.join('-');
      const team2Str = team2.join('-');

      if (!isTeamUsed(team1Str, team2Str)) {
        const playerList = [...team1Str.split('-'),...team2Str.split('-')];
       
        matches.push({match: `${team1Str} vs ${team2Str}`, t1count: 0, t2count:0});
        usedTeams.add(`${team2Str} vs ${team1Str}`);
        usedTeams.add(`${team1Str} vs ${team2Str}`);
      
        
        
      }
    }
  }

  return matches;
}

function sortMatch(matches, playCount){
    
    if(matches.length <=1) return matches;
    // if(matches.length === 1) return matches;
    
    matches.sort(function(a, b){
        if(a.t1count === b.t1count){
            return a.t2count - b.t2count
        }
        return a.t1count - b.t1count
        
    });
    
    const output = matches.splice(0,1);
    const currentPlayers = output[0].match.split('vs').flatMap(item=> item.split('-')).map(item=>item.trim())
    // console.log("currentPlayers",currentPlayers)
    
    currentPlayers.forEach((player)=>{
        playCount[player.trim()] +=1;
    
    })
    

    
    matches.forEach(match=>{
        const teams = match.match.split('vs');
        const t1= teams[0].split('-').map(item=>item.trim())
        const t2= teams[1].split('-').map(item=>item.trim())
         
        
        const totalPoint1 = t1.reduce((acc,player)=>{
                acc += playCount[player];
            return acc
            }, 0)
            
            
                    const totalPoint2 = t2.reduce((acc,player)=>{
                acc += playCount[player];
            return acc
            }, 0)
      
            match.t1count =totalPoint1
            match.t2count =totalPoint2
            
    })
     

    return [output[0], ...sortMatch(matches, playCount)]
}

export function scheduleMatches(activePlayers) {
  // Generate teams and matches
  const playerNames = activePlayers.map(player => player.name);
  const teams = generateTeams(playerNames);
  const matches = generateMatches(teams);

  const playCount = playerNames.reduce((acc, player) => {
    acc[player] = 0;
    return acc;
  }, {});

  const sorted = sortMatch(matches, playCount)

  // return sorted

  const temp = sorted.map(match => {
    const teams = match.match.split('vs');
    return { team1: teams[0].split('-'), team2: teams[1].split('-'), isActive: true };
  });
  console.log('Matches:', sorted);
  // console.log('Player appearances:', playerUsage);
  return temp;
}

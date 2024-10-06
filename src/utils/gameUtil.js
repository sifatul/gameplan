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
        players.splice(1, 0, lastPlayer);  // Insert at index 1
    }

    return rounds.flatMap(round => round);
}

// Testing the function with three players
// const players = ['Alice', 'Bob', 'Charlie'];
// const result = generateRounds(players);
// console.log(result);
function PlayerList(props) {
  const { teams } = props;
  return (
    <>
      <div className="PlayerList">
        <h3>Teams and Players</h3>
        <ul>
          {teams.map((team, index) => (
            <li key={index}>
              <h3>{team.name}</h3>
              <ul>
                {team.players.map((player, playerIndex) => (
                  <li key={playerIndex}>
                    <input type="text" defaultValue={player} />
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
export default PlayerList;

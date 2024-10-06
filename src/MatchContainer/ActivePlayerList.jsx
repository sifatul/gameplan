import React, { useCallback } from 'react';
import { IoIosWarning, IoMdPeople } from 'react-icons/io';
import { usePlayers } from '../context/PlayersContext';

function ActivePlayerListPage() {
  const { players, changePlayerStatus } = usePlayers();

  // Use callback to update player's active state
  const setInActivePlayer = useCallback(
    idx => {
      // Update the state with the new list
      changePlayerStatus(idx, false);
    },
    [players],
  );

  return (
    <>
      <ul className="long-list">
        {players.map((player, index) => {
          const { isActive } = player;
          return (
            <div key={`active-player-${index}-${isActive}`} className={`match-team ${isActive ? 'active' : ''}`}>
              {player.isActive}
              <div className="flex-row">
                <IoMdPeople size={30} className={isActive ? '' : 'icon-inactive'} style={{ marginRight: '10px' }} />
                <span>{player.name}</span>
              </div>
              <IoIosWarning size={20} onClick={() => setInActivePlayer(index)} />
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default ActivePlayerListPage;

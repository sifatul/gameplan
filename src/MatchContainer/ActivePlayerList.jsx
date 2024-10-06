import React, { useCallback } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { IoIosWarning } from 'react-icons/io';

function ActivePlayerListPage(props) {
  const { playerList, setPlayerList } = props;

  // Use callback to update player's active state
  const setInActivePlayer = useCallback(
    idx => {
      // Create a new list with the updated player status
      const updatedPlayerList = playerList.map((player, index) => (index === idx ? { ...player, isActive: false } : player));

      // Update the state with the new list
      setPlayerList(updatedPlayerList);
    },
    [playerList, setPlayerList],
  );

  console.log('playerList', playerList);

  return (
    <>
      <ul className='long-list'>
        {playerList.map((player, index) => {
            const { isActive} = player;
            return <div key={`active-player-${index}-${isActive}`} className={`match-team ${isActive ? 'active' : ''}`}>
            {player.isActive}
            <div className="flex-row">
              <IoMdPeople size={30} 
              className={isActive ? '' : 'icon-inactive'}
              style={{ marginRight: '10px' }} />
              <span>{player.name}</span>
            </div>
            <IoIosWarning size={20} onClick={() => setInActivePlayer(index)} />
          </div>
        })}
      </ul>
    </>
  );
}

export default ActivePlayerListPage;

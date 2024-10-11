import React, { useCallback } from 'react';
import { IoMdPeople } from 'react-icons/io';
import { TbBed, TbBedOff } from "react-icons/tb";
import { useMatch } from '../context/MatchContext';
import { usePlayers } from '../context/PlayersContext';




function ActivePlayerListPage() {
  const { players, setPlayerStatus, getActivePlayers } = usePlayers();
  const { matches, setMatchList, changeMatchStatus, getActiveMatches } = useMatch();

   const activePlayers = getActivePlayers()
  const handlePlayerStatusChange = useCallback((idx,status) => {
    setPlayerStatus(idx, status)
  }, []);


  return (
    <>
      <ul className="long-list">
        {players.map((player, index) => {
          const { isActive } = player;
          return (
            <div key={`active-player-${index}-${isActive}`} className={`match-team ${isActive ? 'active' : ''}`}>
              {player.isActive}
              <div className="flex-row">
                <IoMdPeople size={25} className={isActive ? '' : 'icon-inactive'} style={{ marginRight: '10px' }} />
                <span className='player-name'>{player.name}</span>
              </div>

              {isActive && activePlayers.length > 4 && <TbBed className="status-icon" size={25} onClick={() => handlePlayerStatusChange(index, false)} />}
              {!isActive && <TbBedOff className="status-icon" size={25} onClick={() => handlePlayerStatusChange(index, true)} />}
            </div>
          );
        })}
      </ul>
    </>
  );
}

export default ActivePlayerListPage;

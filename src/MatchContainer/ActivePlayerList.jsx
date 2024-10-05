import React, { useCallback, useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
function ActivePlayerListPage(props) {
    const {playerList} = props;
  return (
    <>
      <ul>
        {playerList.map((player, index) => {
          return (
            <div key={`active-player-${index}`} className="match-team">
                    <IoMdPeople size={30} style={{ marginRight: '10px' }} />
                   <span>{player.name}</span>
                  </div>
          );
        })}
      </ul>
    </>
  );
}
export default ActivePlayerListPage;

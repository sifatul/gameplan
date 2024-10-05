import React, { useCallback, useEffect, useState } from 'react';
import { IoMdPeople } from 'react-icons/io';
function MatchListPage(props) {
    const {rounds} = props;
  return (
    <>
      <ul>
        {rounds.map((round, index) => {
          return (
            <div key={`round-${index}`}>
              {round.map((pair, idx) => {
                return (
                  <div key={`round-${idx}`} className="match-team">
                    <IoMdPeople size={30} style={{ marginRight: '10px' }} />
                    <span> {pair[0]}</span> & <span>{pair[1]}</span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </ul>
    </>
  );
}
export default MatchListPage;

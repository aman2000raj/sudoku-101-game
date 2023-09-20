import React from 'react';
import CONSTANT from '../constants/constant';

function StartScreen({
  playerName,
  setPlayerName,
  selectedLevel,
  handleLevel,
  gameStarted,
  handleInterface,
}) {
  return (
    <div
      className={`start-screen ${!gameStarted ? 'active' : ''}`}
      id='start-screen'
    >
      <input
        className='input-name'
        type='text'
        placeholder='Your Name'
        maxLength='11'
        id='input-name'
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <div className='btn' id='btn-level' onClick={handleLevel}>
        {CONSTANT.LEVEL_NAME[selectedLevel]}
      </div>
      {/* <div className='btn' id='btn-continue'>
        Continue
      </div> */}
      <div
        className='btn btn-blue'
        id='btn-play'
        onClick={() => handleInterface('create')}
      >
        New game
      </div>
    </div>
  );
}

export default StartScreen;

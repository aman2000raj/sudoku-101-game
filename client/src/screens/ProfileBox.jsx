import CONSTANT from '../constants/constant';

function ProfileBox({ playerName, selectedLevel }) {
  return (
    <div className='main-game-info'>
      <div className='main-game-info-box main-game-info-name'>
        <span id='player-name'>{playerName}</span>
      </div>
      <div className='main-game-info-box main-game-info-level'>
        <span id='game-level'>{CONSTANT.LEVEL_NAME[selectedLevel]}</span>
      </div>
    </div>
  );
}

export default ProfileBox;

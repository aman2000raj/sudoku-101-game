function TimerBox({ seconds, handleInterface, solveButtonPressed }) {
  // Function to format seconds into MM:SS format
  const showTime = (seconds) =>
    new Date(seconds * 1000).toISOString().substr(11, 8);

  const displayText = () => {
    if (solveButtonPressed) {
      return 'reset';
    }
    return 'solve';
  };
  return (
    <div className='main-game-second-info'>
      <div className='main-game-info-box main-game-info-time'>
        <span id='game-time'>{showTime(seconds)}</span>
      </div>
      <div
        className='main-game-info-box'
        onClick={() => {
          handleInterface(displayText());
        }}
      >
        <span>{displayText()}</span>
      </div>
    </div>
  );
}

export default TimerBox;

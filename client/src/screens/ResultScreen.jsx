function ResultScreen({ resultScreenActive, seconds, handleResultNewGame }) {
  // Function to format seconds into MM:SS format
  const showTime = (seconds) =>
    new Date(seconds * 1000).toISOString().substr(11, 8);

  return (
    <div
      className={`result-screen ${resultScreenActive ? 'active' : ''}`}
      id='result-screen'
    >
      <div className='congrate'>Completed</div>
      <div className='info'>Time</div>
      <div id='result-time'>{showTime(seconds)}</div>
      <div className='btn' id='btn-new-game-2' onClick={handleResultNewGame}>
        New game
      </div>
    </div>
  );
}

export default ResultScreen;

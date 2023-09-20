import Grid from './Grid';
import NumberBox from './NumberBox';
import ProfileBox from './ProfileBox';
import TimerBox from './TimerBox';

function GameScreen({
  gameStarted,
  playerName,
  selectedLevel,
  grid,
  handleClick,
  handleNumClick,
  selectedCell,
  initialGrid,
  inputNum,
  handleInterface,
  seconds,
  solveButtonPressed,
}) {
  // const [seconds, setSeconds] = useState(0);

  // // Timer logic using useEffect
  // useEffect(() => {
  //   let timer;
  //   if (gameStarted) {
  //     timer = setInterval(() => {
  //       setSeconds((prevSeconds) => prevSeconds + 1);
  //     }, 1000);
  //   }

  //   return () => clearInterval(timer);
  // }, [gameStarted]);

  return (
    <div
      className={`main-game ${gameStarted ? 'active' : ''}`}
      id='game-screen'
    >
      <Grid
        grid={grid}
        handleClick={handleClick}
        selectedCell={selectedCell}
        initialGrid={initialGrid}
      ></Grid>
      <ProfileBox playerName={playerName} selectedLevel={selectedLevel} />
      <TimerBox
        seconds={seconds}
        handleInterface={handleInterface}
        solveButtonPressed={solveButtonPressed}
      />
      {!solveButtonPressed && (
        <NumberBox handleNumClick={handleNumClick} inputNum={inputNum} />
      )}
    </div>
  );
}

export default GameScreen;

import { useRef, useState } from 'react';
import GameScreen from './GameScreen';
import StartScreen from './StartScreen';
import CONSTANT from '../constants/constant';
import { REST } from '../service/api';
import ResultScreen from './ResultScreen';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function getGrid() {
  const grid = [];
  for (let i = 0; i < 9; i++) {
    grid[i] = Array(9).fill(0);
  }
  return grid;
}

function copy2DArray(from, to) {
  for (let i = 0; i < from.length; i++) {
    to[i] = [...from[i]];
  }
}

const isFullGrid = (grid) => {
  return grid.every((row, i) => {
    return row.every((value, j) => {
      return value !== 0;
    });
  });
};

function MainScreen() {
  const [grid, setGrid] = useState(getGrid);
  const [ogGrid, setOgGrid] = useState(getGrid);
  const [playerName, setPlayerName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [inputNum, setInputNum] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);
  const [resultScreenActive, setResultScreenActive] = useState(false);
  const [gameWin, setGameWin] = useState(false);
  const [solveButtonPressed, setSolveButtonPressed] = useState(false);

  const initialGrid = useRef(getGrid());

  const showAlert = () => {
    toast.info(' INVALID SOLUTION! ', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const isGameWin = async () => {
    let status = await ValidateSolution();
    //console.log(status);
    if (!status) {
      showAlert();
    }
    setGameWin(status);
    //console.log(ValidateSolution());
  };

  //console.log(isGameWin());

  const showResult = () => {
    // console.log('A3');
    //setSeconds(0);
    setResultScreenActive(true);
  };

  useEffect(() => {
    if (gameWin) {
      // console.log('A1');
      removeGameInfo();
      showResult();
    }
  }, [gameWin]);

  const removeGameInfo = () => {
    // console.log('A2');
    setPlayerName('');
    setSelectedLevel(0);
    setGameStarted(false);
    setInputNum(0);
    setGrid(getGrid);
    setOgGrid(getGrid);
    setSelectedCell(null);
  };

  // Timer logic using useEffect
  useEffect(() => {
    let timer;
    if (gameStarted && !solveButtonPressed) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [gameStarted, solveButtonPressed]);

  const startGame = async () => {
    try {
      const response = await REST.getBoard(selectedLevel);
      const data = await response.json();
      setOgGrid([...data.game.original]);
      //console.log(ogGrid);
      return data.game.question;
    } catch (error) {
      console.log(error);
    }
  };

  const solvedGame = async () => {
    try {
      const response = await REST.solveBoard(grid);
      const data = await response.json();
      if (data.status) return data.solution;
      return null;
    } catch (error) {
      console.log(error);
    }
  };
  const ValidateSolution = async () => {
    try {
      const response = await REST.validateBoard(grid);
      const data = await response.json();
      return data.status;
    } catch (error) {
      console.log(error);
    }
  };

  const handleResultNewGame = () => {
    setResultScreenActive(false);
    setSeconds(0);
    setGameWin(false);
  };

  const handleLevel = (e) => {
    const newIndex =
      selectedLevel + 1 > CONSTANT.LEVEL_NAME.length - 1
        ? 0
        : selectedLevel + 1;
    setSelectedLevel(newIndex);
  };

  const handleNumClick = (idx) => {
    setInputNum(idx);
  };

  const handleClick = async (row, col, e) => {
    if (e.target.value === '' || inputNum) {
      if (initialGrid.current[row][col] === 0) {
        const newGrid = [...grid];
        newGrid[row][col] = inputNum;
        setSelectedCell(row * 9 + col);
        setGrid(newGrid);
        // console.log(grid);
        if (isFullGrid(grid)) {
          isGameWin();
        }
      }
    } else {
      if (ogGrid[row][col] === 0) {
        const tmpGrid = [...grid];
        tmpGrid[row][col] = 0;
        setSelectedCell(row * 9 + col);
        setGrid(tmpGrid);
      }
    }
    //isGameWin();
    // setSelectedCell(row * 9 + col);
  };

  async function handleInterface(action) {
    let newGrid;
    switch (action) {
      case 'create':
        newGrid = await startGame();

        //console.log(grid);
        setGrid(copy2DArray(newGrid, initialGrid.current));
        setGrid(newGrid);
        //console.log(grid);
        const name_input = document.querySelector('#input-name');
        if (playerName.trim().length > 0) {
          setGameStarted(true);
        } else {
          name_input.classList.add('input-err');
          setTimeout(() => {
            name_input.classList.remove('input-err');
            name_input.focus();
          }, 500);
        }
        break;

      case 'solve':
        newGrid = await solvedGame();
        if (newGrid == null) showAlert();
        else {
          setGrid(newGrid);
          setSolveButtonPressed(true);
          setSeconds(0);
        }

        break;
      case 'reset':
        setSolveButtonPressed(false);
        removeGameInfo();
        handleResultNewGame();
        break;
    }
  }

  return (
    <div className='main'>
      <div className='screen'>
        <ToastContainer />
        <StartScreen
          playerName={playerName}
          setPlayerName={setPlayerName}
          selectedLevel={selectedLevel}
          handleLevel={handleLevel}
          gameStarted={gameStarted}
          handleInterface={handleInterface}
        />
        <GameScreen
          gameStarted={gameStarted}
          playerName={playerName}
          selectedLevel={selectedLevel}
          grid={grid}
          handleClick={handleClick}
          handleNumClick={handleNumClick}
          selectedCell={selectedCell}
          initialGrid={ogGrid}
          inputNum={inputNum}
          handleInterface={handleInterface}
          seconds={seconds}
          solveButtonPressed={solveButtonPressed}
        />
        <ResultScreen
          resultScreenActive={resultScreenActive}
          seconds={seconds}
          handleResultNewGame={handleResultNewGame}
        />
      </div>
    </div>
  );
}

export default MainScreen;

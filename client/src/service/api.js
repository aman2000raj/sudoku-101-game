export const REST = {
  getBoard: function (selectedLevel) {
    return fetch(`https://sudoku-101-game.onrender.com/puzzle?puzzleLevel=${selectedLevel}`);
  },
  solveBoard: function (grid) {
    const data = {
      board: grid,
    };
    console.log(grid);
    return fetch('https://sudoku-101-game.onrender.com/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
  validateBoard: function (grid) {
    const data = {
      board: grid,
    };
    return fetch(`https://sudoku-101-game.onrender.com/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};

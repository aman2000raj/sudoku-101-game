export const REST = {
  getBoard: function (selectedLevel) {
    return fetch(`http://localhost:5000/puzzle?puzzleLevel=${selectedLevel}`);
  },
  solveBoard: function (grid) {
    const data = {
      board: grid,
    };
    console.log(grid);
    return fetch('http://localhost:5000/solve', {
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
    return fetch(`http://localhost:5000/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  },
};

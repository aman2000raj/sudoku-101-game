//import CONSTANT from '../client/src/constants/constant';

const CONSTANT = {
  UNASSIGNED: 0,
  GRID_SIZE: 9,
  BOX_SIZE: 3,
  NUMBERS: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  LEVEL_NAME: ['Easy', 'Medium', 'Hard', 'Very hard', 'Insane', 'Inhuman'],
  LEVEL: [27, 33, 44, 55, 65, 74],
};

const newGrid = (size) => {
  let arr = new Array(size);

  for (let i = 0; i < size; i++) {
    arr[i] = new Array(size);
  }

  for (let i = 0; i < Math.pow(size, 2); i++) {
    arr[Math.floor(i / size)][i % size] = CONSTANT.UNASSIGNED;
  }

  return arr;
};

// check duplicate number in col
const isColSafe = (grid, col, value) => {
  for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};

// check duplicate number in row
const isRowSafe = (grid, row, value) => {
  for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
    if (grid[row][col] === value) return false;
  }
  return true;
};

// check duplicate number in 3x3 box
const isBoxSafe = (grid, box_row, box_col, value) => {
  for (let row = 0; row < CONSTANT.BOX_SIZE; row++) {
    for (let col = 0; col < CONSTANT.BOX_SIZE; col++) {
      if (grid[row + box_row][col + box_col] === value) return false;
    }
  }
  return true;
};

// check in row, col and 3x3 box
const isSafe = (grid, row, col, value) => {
  return (
    isColSafe(grid, col, value) &&
    isRowSafe(grid, row, value) &&
    isBoxSafe(grid, row - (row % 3), col - (col % 3), value) &&
    value !== CONSTANT.UNASSIGNED
  );
};

// find unassigned cell
const findUnassignedPos = (grid, pos) => {
  for (let row = 0; row < CONSTANT.GRID_SIZE; row++) {
    for (let col = 0; col < CONSTANT.GRID_SIZE; col++) {
      if (grid[row][col] === CONSTANT.UNASSIGNED) {
        pos.row = row;
        pos.col = col;
        return true;
      }
    }
  }
  return false;
};

// shuffle arr
const shuffleArray = (arr) => {
  let curr_index = arr.length;

  while (curr_index !== 0) {
    let rand_index = Math.floor(Math.random() * curr_index);
    curr_index -= 1;

    let temp = arr[curr_index];
    arr[curr_index] = arr[rand_index];
    arr[rand_index] = temp;
  }

  return arr;
};

// check puzzle is complete
const isFullGrid = (grid) => {
  return grid.every((row, i) => {
    return row.every((value, j) => {
      return value !== CONSTANT.UNASSIGNED;
    });
  });
};

const sudokuCreate = (grid) => {
  let unassigned_pos = {
    row: -1,
    col: -1,
  };

  if (!findUnassignedPos(grid, unassigned_pos)) return true;

  let number_list = shuffleArray([...CONSTANT.NUMBERS]);

  let row = unassigned_pos.row;
  let col = unassigned_pos.col;

  number_list.forEach((num, i) => {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num;

      if (isFullGrid(grid)) {
        return true;
      } else {
        if (sudokuCreate(grid)) {
          return true;
        }
      }

      grid[row][col] = CONSTANT.UNASSIGNED;
    }
  });

  return isFullGrid(grid);
};

export const sudokuSolve = (grid) => {
  let unassigned_pos = {
    row: -1,
    col: -1,
  };

  if (!findUnassignedPos(grid, unassigned_pos)) return true;
  let R = unassigned_pos.row;
  let C = unassigned_pos.col;
  // Else for each-row backtrack
  for (let num = 1; num <= CONSTANT.GRID_SIZE; num++) {
    if (isSafe(grid, R, C, num)) {
      grid[R][C] = num;
      if (sudokuSolve(grid)) {
        return true;
      } else {
        grid[R][C] = 0;
      }
    }
  }
  return false;

  // grid.forEach((row, i) => {
  //   row.forEach((num, j) => {
  //     if (isSafe(grid, i, j, num)) {
  //       if (isFullGrid(grid)) {
  //         return true;
  //       } else {
  //         if (sudokuCreate(grid)) {
  //           return true;
  //         }
  //       }
  //     }
  //   });
  // });

  //return isFullGrid(grid);
};

const rand = () => Math.floor(Math.random() * CONSTANT.GRID_SIZE);

const removeCells = (grid, level) => {
  let res = [...grid];
  let attemps = level;
  while (attemps > 0) {
    let row = rand();
    let col = rand();
    while (res[row][col] === 0) {
      row = rand();
      col = rand();
    }
    res[row][col] = CONSTANT.UNASSIGNED;
    attemps--;
  }
  return res;
};

// generate sudoku base on level
export const sudokuGen = (level) => {
  let Level = CONSTANT.LEVEL[level];
  let sudoku = newGrid(CONSTANT.GRID_SIZE);
  let check = sudokuCreate(sudoku);
  if (check) {
    let question = removeCells(sudoku, Level);
    return {
      original: sudoku,
      question: question,
    };
  }
  return undefined;
};

// check duplicate number in 3x3 box for local
// const isBoxSafeLocal = (grid, box_row, box_col, value) => {
//   for (let row = box_row; row < box_row + CONSTANT.BOX_SIZE; row++) {
//     for (let col = box_col; col < box_col + CONSTANT.BOX_SIZE; col++) {
//       if (grid[row][col] === value) return false;
//     }
//   }
//   return true;
// };

// const isSafetoSolve = (grid, row, col, value) => {
//   return (
//     isColSafe(grid, col, value) &&
//     isRowSafe(grid, row, value) &&
//     isBoxSafeLocal(grid, row - (row % 3), col - (col % 3), value)
//   );
// };

// export const sudokuSolve = (grid) => {
//   // if(isFullGrid(grid)) return true;

//   grid.forEach((row, i) => {
//     row.forEach((num, j) => {
//       if (num === 0) {
//         for (let possibleNumber = 1; possibleNumber <= 9; possibleNumber++) {
//           if (isSafe(grid, i, j, possibleNumber)) {
//             grid[i][j] = possibleNumber;
//             if (isFullGrid(grid)) {
//               return true;
//             } else {
//               if (sudokuCreate(grid)) {
//                 return true;
//               }
//             }
//             grid[i][j] = 0;
//           }
//         }
//         return false;
//       }
//     });
//   });

//   return isFullGrid(grid);
// };

export const validSudoku = (grid) => {
  //console.table(grid);
  if (!isFullGrid(grid)) return false;
  //console.table(grid);
  // for (let i = 0; i < CONSTANT.GRID_SIZE; i++) {
  //   for (let j = 0; j < CONSTANT.GRID_SIZE; j++) {
  //     if (!isSafeGrid(grid, i, j, grid[i][j])) {
  //       return false;
  //     }
  //   }
  // }
  const rows = new Array(9).fill(null).map(() => new Set());
  const cols = new Array(9).fill(null).map(() => new Set());
  const subgrids = new Array(9).fill(null).map(() => new Set());

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const num = grid[i][j];
      if (num === 0) continue;

      const subgridIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);

      if (
        rows[i].has(num) ||
        cols[j].has(num) ||
        subgrids[subgridIndex].has(num)
      ) {
        return false;
      }

      rows[i].add(num);
      cols[j].add(num);
      subgrids[subgridIndex].add(num);
    }
  }

  return true;
};

// let sudokuSolver = sudokuGen(50);
// console.table(sudokuSolver.original);
// sudokuSolve(sudokuSolver.question);
// console.table(sudokuSolver.question);

//module.exports.sudokuGen = sudokuGen;

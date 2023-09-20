import express from 'express';
import cors from 'cors';
import { sudokuGen, sudokuSolve, validSudoku } from './sudoku.js';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(5000, () => {
  console.log('server running at port 5000');
});

app.get('/puzzle', (req, res) => {
  const puzzleLevel = req.query.puzzleLevel;
  //console.log(puzzleLevel);
  let puzzle = sudokuGen(puzzleLevel);
  //console.table(puzzle.question);
  res.send({ game: puzzle });
});

app.post('/solve', (req, res) => {
  let puzzle = [];
  puzzle = [...req.body.board];
  //console.table(puzzle);
  let status = sudokuSolve(puzzle);

  res.send({ solution: puzzle, status: status });
});

app.post('/validate', (req, res) => {
  let puzzle = [];
  puzzle = [...req.body.board];
  let status = validSudoku(puzzle);
  res.send({ status: status });
});

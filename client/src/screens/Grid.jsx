import Cell from './Cell';
import CONSTANT from '../constants/constant';

function Grid({ grid, handleClick, selectedCell, initialGrid }) {
  //console.log(grid);
  const renderCells = () => {
    const cells = [];
    for (let i = 0; i < Math.pow(CONSTANT.GRID_SIZE, 2); i++) {
      const row = Math.floor(i / CONSTANT.GRID_SIZE);
      const col = i % CONSTANT.GRID_SIZE;
      // console.log(grid);
      cells.push(
        <Cell
          key={i}
          row={row}
          col={col}
          val={grid[row][col]}
          handleClick={handleClick}
          selectedCell={selectedCell === i}
          initialGrid={initialGrid}
        ></Cell>
      );
    }
    return cells;
  };

  return <div className='main-sudoku-grid'>{renderCells()}</div>;
}

export default Grid;

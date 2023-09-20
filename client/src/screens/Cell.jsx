const Cell = ({ row, col, val, handleClick, selectedCell, initialGrid }) => {
  const cellStyle = {
    marginBottom: row === 2 || row === 5 ? '10px' : '0',
    marginRight: col === 2 || col === 5 ? '10px' : '0',
  };

  const checkInitial = () => {
    if (initialGrid[row][col] === 0) {
      return true;
    }
    return false;
  };
  return (
    <div
      className={`main-grid-cell ${!checkInitial() ? 'filled' : ''} ${
        selectedCell ? 'selected' : ''
      }`}
      style={cellStyle}
      data-value={val}
      onClick={(e) => handleClick(row, col, e)}
    >
      {val !== 0 ? val : ''}
    </div>
  );
};

export default Cell;

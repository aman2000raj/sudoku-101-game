function NumberBox({ handleNumClick, inputNum }) {
  const renderCells = () => {
    const cells = [];
    for (let i = 1; i < 10; i++) {
      cells.push(
        <div
          className={`number ${inputNum === i ? 'selected' : ''}`}
          key={i}
          onClick={() => handleNumClick(i)}
        >
          {i}
        </div>
      );
    }

    return cells;
  };
  return (
    <div className='numbers'>
      {renderCells()}
      <div
        className={`delete ${!inputNum ? 'selected' : ''}`}
        id='btn-delete'
        onClick={() => handleNumClick(0)}
      >
        X
      </div>
    </div>
  );
}

export default NumberBox;

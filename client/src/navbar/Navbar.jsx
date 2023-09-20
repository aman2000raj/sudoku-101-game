import DarkModeToggle from './DarkModeToggle';


function Navbar() {
  return (
    <nav>
      <div className='nav-container'>
        <a href='#' className='nav-logo'>
          Sudoku
        </a>
        <DarkModeToggle />
      </div>
    </nav>
  );
}

export default Navbar;

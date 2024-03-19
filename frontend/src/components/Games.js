import React from 'react';
import { Link } from 'react-router-dom';

const Games = () => {
  return (
    <div>
      <header>
        <h1>Welcome</h1>
      </header>
      <main>
        {/* <p>List of Games</p> */}
        <div className="btn-group" role="group" aria-label="Authentication Buttons">
          <Link to="/components/SudokuGame" className="btn btn-primary">Play Sudoku</Link>
          {/* <Link to="/components/KillerSudoku" className="btn btn-primary">Play Killer Sudoku</Link> */}
        </div>
        <div className="btn-group" role="group" aria-label="Logout Button">
          <Link to="/components/auth?mode=signin" className="btn btn-primary">Logout</Link>
        </div>
      </main>
    </div>
  );
}

export default Games;
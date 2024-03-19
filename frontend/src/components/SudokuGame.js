import React from 'react';
import { Link } from 'react-router-dom';

const SudokuGame = () => {
  return (
    <div>
      <header>
        <h1>Sudoku App</h1>
      </header>
      <main>
        <p>Sudoku Game</p>
        <div className="btn-group" role="group" aria-label="Authentication Buttons">
          <Link to="/components/Games" className="btn btn-primary">Back</Link>

        </div>
      </main>
    </div>
  );
}

export default SudokuGame;

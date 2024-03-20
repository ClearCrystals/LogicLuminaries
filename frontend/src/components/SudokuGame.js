import React from 'react';
import { Link } from 'react-router-dom';

/**
 * SudokuGame component for displaying the Sudoku game interface.
 *
 * This component renders the Sudoku game page within the Sudoku App.
 * It includes a header and a button that allows users to navigate back
 * to the main games selection page. The main section is intended to host
 * the actual game interface or related content.
 *
 * @returns {React.Component} A React component that represents the Sudoku
 *         game interface within the Sudoku App, including a navigation
 *         option to return to the main games selection page.
 */

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

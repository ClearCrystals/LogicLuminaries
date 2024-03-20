import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Games component that displays a list of game options.
 *
 * This component renders a welcome message and provides buttons
 * for different game options, such as playing Sudoku. It also includes
 * a logout button that redirects the user to the signin page. Additional
 * games can be added as commented out, like the Killer Sudoku option.
 *
 * @returns {React.Component} A React component representing the games
 *         selection interface, including navigation options for each game
 *         and a logout button.
 */

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
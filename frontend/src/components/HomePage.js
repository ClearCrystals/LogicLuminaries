import React from 'react';
import { Link } from 'react-router-dom';

/**
 * HomePage component serving as the landing page of the Sudoku App.
 *
 * This component displays a welcome message and provides navigation options for
 * user authentication. It includes buttons for 'Signup' and 'Signin', each
 * directing the user to the corresponding authentication mode within the app.
 *
 * @returns {React.Component} A React component that represents the home page
 *         of the Sudoku App, including options to navigate to signup or signin.
 */

const HomePage = () => {
  return (
    <div>
      <header>
        <h1>Sudoku App</h1>
      </header>
      <main>
        <p>Welcome to the home page! This is a basic example of a React project.</p>
        <div className="btn-group" role="group" aria-label="Authentication Buttons">
          <Link to="/components/auth?mode=signup" className="btn btn-primary">Signup</Link>
          <Link to="/components/auth?mode=signin" className="btn btn-primary">Signin</Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

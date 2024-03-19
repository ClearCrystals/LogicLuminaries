import React from 'react';
import { Link } from 'react-router-dom';

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

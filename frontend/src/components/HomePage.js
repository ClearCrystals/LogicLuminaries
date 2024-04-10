import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

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
    <Container>
      <Row>
        <Col><Image src="frontend\public\free_sudoku.jpg" alt="board image" fluid /></Col>
        <Col>
        {
        <div>
          <header>
            <h1>Sudoku App</h1>
          </header>
          <main>
            <h2>Welcome to Sudoku<br></br></h2>
            <h5>Solve, save, and explore new board styles in one place.<br></br></h5>
            <h5>Register or Login to begin.<br></br></h5>
            <div className="btn-group" role="group" aria-label="Authentication Buttons">
              <Link to="/components/auth?mode=signup" className="btn btn-primary">Register</Link>
              <Link to="/components/auth?mode=signin" className="btn btn-primary">Login</Link>
            </div>
          </main>
        </div>
        }
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;

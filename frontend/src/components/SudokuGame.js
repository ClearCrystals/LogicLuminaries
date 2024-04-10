import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Button, Navbar, Nav} from 'react-bootstrap';

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
      <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
        <Link to="/components/Games"><Navbar.Brand>Sudoku</Navbar.Brand></Link>
        <Link to="/"><Nav>Logout</Nav></Link>
        </Container>
      </Navbar>
    </div>
    <div>
      <Container id="gameSpace">
      <h2><b>Generated game</b></h2>
      <br></br>
      <p>I'm assuming that the 9x9 board generation is on grace's branch... or I just didn't pull from main recently enough...</p>
      <br></br>
      <Link to="/components/Games">
        <Button variant = "secondary">Back</Button>
      </Link>
      </Container>
    </div>
    </div>
  );
}

export default SudokuGame;

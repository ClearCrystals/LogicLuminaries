import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

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
      <div>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Sudoku</Navbar.Brand>
            <Link to="/">
              <Nav>Logout</Nav>
            </Link>
          </Container>
        </Navbar>
      </div>
      <div>
        <Container id="gamesContainer">
          <header>
            <br></br>
            <h1>
              <b>Welcome</b>
            </h1>
            <br></br>
          </header>
          <Row>
            <Col className="gamesCol">
              <h3>
                <b>Play classic sudoku</b>
              </h3>
              <br></br>
              <div>
                <Link to="/components/SudokuGame">
                  <Button variant="secondary" size="lg">
                    Generate
                  </Button>
                </Link>
              </div>
            </Col>
            <Col className="gamesCol">
              <div>
                <h3>
                  <b>Play killer sudoku</b>  
                </h3>
                <br></br>
                <p>TODO add killer generation</p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Games;

import React from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useUser } from "./UserContext";

const emailRegex = /^(.*?)@/; // Regular expression to get text before '@'

const Games = () => {
  const { username } = useUser();

  // If username is an email, extract the part before '@'
  const displayName = username.match(emailRegex)?.[1] || username; // Use match to extract and handle possible null/undefined cases

  return (
    <div>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Sudoku</Navbar.Brand>
          <Link to="/">
            <Nav>Logout</Nav>
          </Link>
        </Container>
      </Navbar>

      <Container id="gamesContainer">
        <header>
          <br />
          <h1>
            <b>Welcome, {displayName}</b> {/* Corrected to use the extracted part */}
          </h1>
          <br />
        </header>
        <Row>
          <Col className="gamesCol">
            <h3>
              <b>Play classic sudoku</b>
            </h3>
            <br />
            <div>
              <Link to="/components/SudokuGame">
                <Button variant="secondary" size="lg">
                  Generate
                </Button>
              </Link>
            </div>
          </Col>
          <Col className="gamesCol">
            <h3>
              <b>Play killer sudoku</b>
            </h3>
            <br />
            <p>TODO add killer generation</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Games;

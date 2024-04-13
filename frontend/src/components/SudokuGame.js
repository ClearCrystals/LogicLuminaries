import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Container, Button, Navbar, Nav, ButtonGroup} from 'react-bootstrap';
import SudokuGrid from './SudokuGrid';
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
  const [gameMode, setGameMode] = useState(''); // 'new' or 'saved'
  const [difficulty, setDifficulty] = useState(null);
  const [savedGridData, setSavedGridData] = useState(null);

  const loadSavedGame = async () => {
    try {
      // Fetch the saved game data from your backend
      // Example: const response = await axios.get('http://your-backend-url/api/saved-game');
      // setSavedGridData(response.data.gridData);
      // setDifficulty(response.data.difficulty);
    } catch (error) {
      console.error('Error fetching saved game data', error);
    }
  };

  const handleGameModeSelect = (mode) => {
    setGameMode(mode);
    if (mode === 'saved') {
      loadSavedGame();
    }
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    // Fetch new grid data based on the selected difficulty here (if necessary)
  };

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
        {!gameMode && (
          <div>
            <h3>Game Mode Select</h3>
            <br></br>
            <ButtonGroup size="lg" className='mb-2'>
              <Button onClick={() => handleGameModeSelect('new') } variant="primary">New Game</Button>
              <Button onClick={() => handleGameModeSelect('saved')} variant="primary">Load Saved Game</Button>
            </ButtonGroup>
          </div>
          )}
          {gameMode === 'new' && !difficulty && (
          <div>
            <h3>Difficulty Select</h3>
            <p>An easy board will have fewer empty cells. A hard one will have the most.</p>
            <br></br>
            <ButtonGroup size="lg" className='mb-2'>
              <Button onClick={() => handleDifficultySelect('Easy')} variant="primary">Easy</Button>
              <Button onClick={() => handleDifficultySelect('Medium')} variant="primary">Medium</Button>
              <Button onClick={() => handleDifficultySelect('Hard')} variant="primary">Hard</Button>
            </ButtonGroup>
          </div>
        )}
        {difficulty && <SudokuGrid difficulty={difficulty} />}
        {gameMode === 'saved' && savedGridData && <SudokuGrid gridData={savedGridData} />}
        <br></br>
        <Link to="/components/Games">
          <Button variant = "secondary">Back</Button>
        </Link>
      </Container>
      </div>
    </div>
  );
};

export default SudokuGame;

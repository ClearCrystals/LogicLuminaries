import React from 'react';
import { Link } from 'react-router-dom';
import {Container, Button, Navbar, Nav} from 'react-bootstrap';
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
      <h2><b>Generated game</b></h2>
      <br></br>
      {!gameMode && (
          <div className="btn-group" role="group" aria-label="Game Mode Selection Buttons">
            <button onClick={() => handleGameModeSelect('new')} className="btn btn-primary">New Game</button>
            <button onClick={() => handleGameModeSelect('saved')} className="btn btn-primary">Load Saved Game</button>
          </div>
        )}
        {gameMode === 'new' && !difficulty && (
          <div className="btn-group" role="group" aria-label="Difficulty Selection Buttons">
            <button onClick={() => handleDifficultySelect('Easy')} className="btn btn-primary">Easy</button>
            <button onClick={() => handleDifficultySelect('Medium')} className="btn btn-primary">Medium</button>
            <button onClick={() => handleDifficultySelect('Hard')} className="btn btn-primary">Hard</button>
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

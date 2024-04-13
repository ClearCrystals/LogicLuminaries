

import React, { useState } from 'react';
import SudokuGrid from './SudokuGrid'; // Ensure this path is correct
import { Link } from 'react-router-dom';
import {Container, Button, Navbar, Nav, ButtonGroup} from 'react-bootstrap';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUser } from './UserContext';

const SudokuGame = () => {
  const [gameMode, setGameMode] = useState(''); // 'new' or 'saved'
  const [difficulty, setDifficulty] = useState(null);
  const [savedGames, setSavedGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const { username, setUsername } = useUser();

  const data = {
    "username": username
  }
  const loadSavedGame = async () => {
    try {
      //Fetch the saved game data from your backend
      const csrfToken = Cookies.get('csrfToken')
      const response = await axios.get('http://localhost:8000/api/saved-game/', {
        params: { username: username },
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        }
      });
      console.log(response);
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

  const handleSavedGameSelect = (gameId) => {
    // Find and set the specific saved game data
    const game = savedGames.find(game => game.id === gameId);
    setSelectedGame(game); // Set the selected game state
    setGameMode('saved'); // Update game mode to 'saved'
  };

  const handleDifficultySelect = (selectedDifficulty) => {
    setDifficulty(selectedDifficulty);
    // Fetch new grid data based on the selected difficulty here (if necessary)
  }; 
  
  const handleUsernameSelect = (selectedUsername) => {
    setUsername(selectedUsername);
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
        {gameMode === 'saved' && savedGames.length > 0 && (
          <div className="btn-group" role="group" aria-label="Saved Games Selection">
            {savedGames.map(game => (
              <button key={game.id} onClick={() => handleSavedGameSelect(game.id)} className="btn btn-secondary">
                Load Game {game.id}
              </button>
            ))}
          </div>
        )}
        {difficulty && <SudokuGrid difficulty={difficulty} username={username} />}
        {selectedGame && <SudokuGrid gridData={selectedGame.gridData} />}
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

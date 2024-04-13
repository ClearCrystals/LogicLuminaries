import React, { useState } from 'react';
import SudokuGrid from './SudokuGrid'; // Ensure this path is correct
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
      <header>
        <h1>Sudoku App</h1>
      </header>
      <main>
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
        
      </main>
    </div>
  );
};

export default SudokuGame;

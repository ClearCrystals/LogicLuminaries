import React, { useState } from 'react';
import SudokuGrid from './SudokuGrid'; // Ensure this path is correct

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
        {difficulty && <SudokuGrid difficulty={difficulty} />}
        {gameMode === 'saved' && savedGridData && <SudokuGrid gridData={savedGridData} />}
      </main>
    </div>
  );
};

export default SudokuGame;

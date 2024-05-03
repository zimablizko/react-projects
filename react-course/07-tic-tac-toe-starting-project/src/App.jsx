import { useState } from 'react';
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver';
import Log from './components/Log';
import Player from './components/Player';
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2',
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = 'X';
  if (turns.length && turns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];
  for (const { square, player } of gameTurns) {
    const { rowIndex, cellIndex } = square;
    gameBoard[rowIndex][cellIndex] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].rowIndex][combination[0].cellIndex];
    const secondSquare = gameBoard[combination[1].rowIndex][combination[1].cellIndex];
    const thirdSquare = gameBoard[combination[2].rowIndex][combination[2].cellIndex];
    if (firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      console.log('Winner:', firstSquare);
      winner = players[firstSquare];
    }
  }
  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState(PLAYERS);
  let currentPlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, cellIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);
      return [
        {
          square: {
            rowIndex: rowIndex,
            cellIndex: cellIndex,
          },
          player: currentPlayer,
        },
        ...prevTurns,
      ];
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={currentPlayer === 'X'}
            initialName={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayerNameChange}
          />
          <Player
            isActive={currentPlayer === 'O'}
            initialName={PLAYERS.O}
            symbol="O"
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver onRematch={handleRematch} winner={winner} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;

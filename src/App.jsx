import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import {WINNING_COMBINATIONS} from './winningCombinations.js';
import GameOver from "./components/GameOver.jsx";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function activePlayerHelper(gameTurns) {
  let currentActivePlayer = 'X';

    if(gameTurns.length && gameTurns[0].player === 'X') {
      currentActivePlayer = 'O';
    }

    return currentActivePlayer;
}

function deriveWinnerHelper(gameBoard, players) {
  let winner;

  for(const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  const gameBoard = [...initialBoard.map(innnerArray => [...innnerArray])];

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayer] = useState({
    'X': 'Player 1',
    'O': 'Player2'
  });
  // const [activePlayer, setActivePlayer] = useState('X');

  const activePlayer = activePlayerHelper(gameTurns);


  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinnerHelper(gameBoard, players);

  const isDraw = gameTurns.length === 9 && !winner;

  function handleRestart() {
    setGameTurns([]);
  }

  function savePlayerName(symbol, name) {
    setPlayer(prevPlayerInfo => {
      return {
        ...prevPlayerInfo,
        [symbol]: name
      }
    })
  }

  function handleSelectSquares(rowIndex, colIndex) {
    // setActivePlayer((prevActiveSymbol) => prevActiveSymbol === 'X' ? 'O' : 'X');
    setGameTurns((prevTurns) => {
      
      const currentActivePlayer = activePlayerHelper(prevTurns);
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentActivePlayer},
        ...prevTurns
      ];

      return updatedTurns;
    })
  }
  
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player1" symbol="X" isActivePlayer={activePlayer === 'X'} handleSave={savePlayerName}/>
          <Player initialName="Player2" symbol="O" isActivePlayer={activePlayer === 'O'} handleSave={savePlayerName}/>
        </ol>
        {(winner || isDraw) && <GameOver restartMatch={handleRestart} winner={winner} />}
        <GameBoard onSquareSelected={handleSelectSquares} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App

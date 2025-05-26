// ////////////////////////////////////////////////////////////////////////////

// game logic module: (immediately invoked function expression IIFE)
const TicTacToeGame = (function () {
  // game state variables
  let boardState = Array(9).fill(null); // track 9 cells: null = empty
  let currentPlayer = 'X'; // track turn: X or O
  let gameWinner = null; // track winner: X or O or null
  let lastLoser = null; // track last player to lose: X or O or null

  // check if game is over (win or draw)
  function checkGameOver() {
    const winPatterns = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    // check for win
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;

      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[b] === boardState[c]
      ) {
        gameWinner = boardState[a]; // set the winner
        lastLoser = gameWinner === 'X' ? 'O' : 'X'; // set loser as opposite
        return true; // Game over
      }
    }

    // check for draw (board full)
    if (!boardState.includes(null)) {
      lastLoser = currentPlayer;
      return true; // Game over (draw)
    }
    return false; // Game not over
  }

  // make a move at a position
  function makeMove(position) {
    if (!boardState[position] && !gameWinner) {
      boardState[position] = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // switch turn
    }
  }

  // reset game state
  function resetGame() {
    boardState = Array(9).fill(null);
    currentPlayer = lastLoser || 'X'; // start with loser of last game or default to x if no loser
    gameWinner = null;
    lastLoser = null; // clear loser for new game
  }

  // getters (exposing state)
  function getBoard() {
    return boardState;
  }

  function getWinner() {
    return gameWinner;
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  return {
    checkGameOver,
    makeMove,
    getBoard,
    getWinner,
    getCurrentPlayer,
    resetGame,
  };
})();

// UI module:
const TicTacToeDisplay = (function () {
  const boardElement = document.getElementById('gameBoard');
  const resultElement = document.getElementById('gameResult');
  const resetButton = document.createElement('button'); // create reset button

  // initialize reset button
  resetButton.textContent = 'Play Again';
  resetButton.classList.add('reset-button');
  resetButton.style.display = 'none'; // hide by default
  resultElement.insertAdjacentElement('afterend', resetButton); // places button after result div

  // render the board with clickable cells
  function renderBoard(board, onCellClick) {
    boardElement.innerHTML = ''; // clear board
    board.forEach((value, index) => {
      const cell = document.createElement('button');
      cell.classList.add('cell');
      cell.textContent = value || ''; // show X O or empty
      cell.addEventListener('click', () => onCellClick(index)); // bind click handler
      boardElement.appendChild(cell);
    });
  }

  //display game result and show reset button
  function showGameOver(winner) {
    resultElement.textContent = winner
      ? `${winner} won the game!`
      : 'Game ended in a draw';
    resetButton.style.display = 'block'; // show reset button
  }

  // hide reset button
  function hideResetButton() {
    resetButton.style.display = 'none';
    resultElement.textContent = ''; // clear the result message
  }

  // allow controller to attach reset handler
  function setResetHandler(handler) {
    resetButton.onclick = handler;
  }

  return { renderBoard, showGameOver, hideResetButton, setResetHandler };
})();

// game controller:
function gameController() {
  // initial render
  TicTacToeDisplay.renderBoard(TicTacToeGame.getBoard(), handleMove);

  // set up reset button handler
  TicTacToeDisplay.setResetHandler(handleReset);

  // handle cell clicks
  function handleMove(position) {
    TicTacToeGame.makeMove(position); // update game state

    TicTacToeDisplay.renderBoard(TicTacToeGame.getBoard(), handleMove); // re-render UI

    if (TicTacToeGame.checkGameOver()) {
      TicTacToeDisplay.showGameOver(TicTacToeGame.getWinner());

      // disable further clicks
      TicTacToeDisplay.renderBoard(TicTacToeGame.getBoard(), () => {});
    }
  }

  // handle reset:
  function handleReset() {
    TicTacToeGame.resetGame(); // reset game state
    TicTacToeDisplay.hideResetButton(); // hide reset button and clear result
    TicTacToeDisplay.renderBoard(TicTacToeGame.getBoard(), handleMove); // re-render board with click handlers
  }
}

gameController(); // start the game

const Gameboard = (function () {
  // define the game board
  let gameboardArray = ["", "", "", "", "", "", "", "", ""];

  // get the board function
  const getBoard = () => gameboardArray;

  // set a mark function
  const placeMark = (index, mark) => {
    // if the position is empty, place mark and return true
    if (gameboardArray[index] === "") {
      gameboardArray[index] = mark;
      console.log("Mark placed successfully"); // For dev
      return true; // for UI
      // otherwise, there is a mark, only return false
    } else {
      console.log("Position taken, choose another"); // For dev
      return false; // for UI
    }
  };

  // reset the board
  const resetBoard = () => {
    gameboardArray = ["", "", "", "", "", "", "", "", ""];
    return gameboardArray;
  };

  return {
    getBoard,
    placeMark,
    resetBoard,
  };
})();

// ////////////////////////////////////////////////////////////////////////////

// Player Factory (multiple instances possible)
const CreatePlayer = function (name, mark) {
  const getName = () => name;

  const getMark = () => mark;

  return {
    getName,
    getMark,
  };
};

// ////////////////////////////////////////////////////////////////////////////

// Game Controller Module (single instance with IIFE)
const Game = (function () {
  // Move players into the returned object to maintain state

  let players = [];
  let currentPlayerIndex;
  let gameOver;
  let lastStartingPlayer = 0;

  function startGame(player1Name, player2Name) {
    // initialize players using factory func
    const playerOne = CreatePlayer(player1Name, "O");
    const playerTwo = CreatePlayer(player2Name, "X");

    // adding players to an array
    players = [playerOne, playerTwo];

    // setting the current player index to the lastStartingPlayer
    currentPlayerIndex = lastStartingPlayer;

    // gameOver only true when conditions are met
    gameOver = false;

    // check if players are created
    console.log({
      nameP1: playerOne.getName(),
      markP1: playerOne.getMark(),
    });
    console.log({
      nameP2: playerTwo.getName(),
      markP2: playerTwo.getMark(),
    });
  }

  function switchPlayer() {
    // if the current player index is 0, switch
    if (currentPlayerIndex === 0) {
      console.log("current player index is 0, changing to 1");
      currentPlayerIndex = 1;
      // if the current player index is 1, switch
    } else if (currentPlayerIndex === 1) {
      console.log("current player index is 1, changing to 0");
      currentPlayerIndex = 0;
    }
  }
  function checkWin() {
    // getting the gameboard
    let currentGameboard = Gameboard.getBoard();
    console.log(currentGameboard);

    // getting current players mark
    let currentMark = players[currentPlayerIndex].getMark();
    console.log(currentMark);

    // Array of winning combos stored in their own mini arrays
    const winningCombos = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal TL-BR
      [2, 4, 6], // Diagonal TR-BL
    ];

    // loop through winningCombo's
    for (let i = 0; i < winningCombos.length; i++) {
      // define current 3-cell combo from winningCombos array on each iteration
      let combo = winningCombos[i];

      // check each combo array for 3 matching marks
      if (
        currentGameboard[combo[0]] === currentMark &&
        currentGameboard[combo[1]] === currentMark &&
        currentGameboard[combo[2]] === currentMark
      ) {
        // return true if all 3 match
        return true;
      }
    }
    // otherwise return false if there was no matches
    return false;
  }

  function checkTie() {
    let currentGameboard = Gameboard.getBoard(); // Get board

    // loop through currentGamebard
    for (let i = 0; i < currentGameboard.length; i++) {
      // Loop through all 9 spots and check if they are empty
      if (currentGameboard[i] === "") {
        // false if there is an empty spot
        return false;
      }
    }

    // if the board is full, check if there was a win
    if (checkWin()) {
      // if check win was true, there is no tie - checkTie = false
      return false;
    }

    // otherwise checkwin was false and there is a tie = true
    return true;
  }

  function playTurn(index) {
    // define current player
    let currentPlayer = players[currentPlayerIndex];

    // if placing a mark is successful
    if (Gameboard.placeMark(index, currentPlayer.getMark())) {
      // check if placing mark led to a win
      if (checkWin()) {
        console.log(`current player ${currentPlayer.getName()} wins`);
        gameOver = true;
        // if not a win, was there a tie
      } else if (checkTie()) {
        console.log(`Tie between two players`);
        gameOver = true;
        // if no win or tie, continue playing and switch players
      } else {
        switchPlayer();
      }
      // if placing a mark is unsuccessful
    } else {
      console.log(
        `${currentPlayer.getName()}, spot ${index + 1} is taken, pick another!`
      );
    }
  }

  function resetGame() {
    if (gameOver) {
      console.log("Game Over, Resetting Game Now.");

      // flip starting player
      lastStartingPlayer = lastStartingPlayer === 0 ? 1 : 0;
      currentPlayerIndex = lastStartingPlayer;

      // set gameOver to false
      gameOver = false;
      Gameboard.resetBoard();
    }
  }

  function getNextStartingPlayer() {
    return players[lastStartingPlayer === 0 ? 1 : 0]; // Return next starter
  }

  return {
    startGame,
    playTurn,
    resetGame,
    checkWin,
    checkTie,
    getGameOver: () => gameOver, // Expose gameOver for UI
    getCurrentPlayer: () => players[currentPlayerIndex], // Expose current player for UI
    getNextStartingPlayer, // Expose the next player
  };
})();

// ////////////////////////////////////////////////////////////////////////////

// Display Controller Module (single instance with IIFE)

const DisplayController = (function () {
  // get elements
  const gameContainer = document.getElementById("game-container");
  const setupDiv = document.getElementById("setup");
  const gameButton = document.getElementById("game-button");
  const vsMachineCheckbox = document.getElementById("vs-machine"); // Checkbox for machine mode
  const bodyBackground = document.body;

  let messageEl = document.getElementById("message");

  // check if message exists, if not make one
  if (!messageEl) {
    messageEl = document.createElement("p");
    messageEl.id = "message";
    bodyBackground.appendChild(messageEl);
  }

  let isVsMachine = false; // Track if playing against machine

  function renderBoard() {
    console.log("Rendering board...");
    // clear old grid each render
    gameContainer.innerHTML = "";

    // get board array
    const board = Gameboard.getBoard();
    console.log("Board array:", board); // See the array

    // loop 9 positions
    board.forEach((mark, index) => {
      const cell = document.createElement("div"); // create a new cell div
      cell.classList.add("cell");
      cell.textContent = mark; // show mark
      cell.dataset.index = index; // dataset attribute for index in array

      // if game is not over, add listener
      if (!Game.getGameOver()) {
        cell.addEventListener("click", () => handleClick(index));
      }

      console.log("Created cell:", index, mark); // Confirm each cell

      // add cells for each element in the array
      gameContainer.appendChild(cell);
    });
  }

  function updateDisplay(message) {
    // set message and get next player
    const nextStarter = Game.getNextStartingPlayer().getName(); // Get next starter’s name
    messageEl.textContent = `${message} ${nextStarter} will start next round.`; // Combine

    messageEl.textContent = `${message} ${nextStarter} will start next round.`; // Combine messages
    // swap button if game is over
    if (message) {
      gameButton.textContent = "Reset Game";
      gameButton.style.display = "block";
    }
  }

  function machineMove() {
    const board = Gameboard.getBoard();
    const emptySpots = [];
    const machineMark = "X"; // Machine is always "X"
    const playerMark = "O"; // Player is "O"

    // Find all empty spots
    board.forEach((spot, index) => {
      if (spot === "") emptySpots.push(index);
    });

    if (emptySpots.length > 0) {
      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
      ];

      // Priority 1: Check if Machine can win
      for (let spot of emptySpots) {
        let testBoard = [...board]; // Copy board
        testBoard[spot] = machineMark; // Test placing "X"
        for (let combo of winningCombos) {
          if (
            testBoard[combo[0]] === machineMark &&
            testBoard[combo[1]] === machineMark &&
            testBoard[combo[2]] === machineMark
          ) {
            Game.playTurn(spot); // Win if possible
            renderBoard();
            if (Game.getGameOver()) {
              const winner = Game.getCurrentPlayer().getName();
              console.log("Winner:", winner, "Win?", Game.checkWin());
              if (Game.checkWin()) {
                updateDisplay(`${winner} wins!`);
              } else {
                updateDisplay("Tie between two players.");
              }
            }
            return; // Exit after move
          }
        }
      }

      // Priority 2: Block player from winning
      for (let spot of emptySpots) {
        let testBoard = [...board];
        testBoard[spot] = playerMark; // Test placing "O"
        for (let combo of winningCombos) {
          if (
            testBoard[combo[0]] === playerMark &&
            testBoard[combo[1]] === playerMark &&
            testBoard[combo[2]] === playerMark
          ) {
            Game.playTurn(spot); // Block player's win
            renderBoard();
            if (Game.getGameOver()) {
              const winner = Game.getCurrentPlayer().getName();
              console.log("Winner:", winner, "Win?", Game.checkWin());
              if (Game.checkWin()) {
                updateDisplay(`${winner} wins!`);
              } else {
                updateDisplay("Tie between two players.");
              }
            }
            return; // Exit after move
          }
        }
      }

      // Fallback: Random move
      const randomIndex =
        emptySpots[Math.floor(Math.random() * emptySpots.length)];
      Game.playTurn(randomIndex);
      renderBoard();
      if (Game.getGameOver()) {
        const winner = Game.getCurrentPlayer().getName();
        console.log("Winner:", winner, "Win?", Game.checkWin());
        if (Game.checkWin()) {
          updateDisplay(`${winner} wins!`);
        } else {
          updateDisplay("Tie between two players.");
        }
      }
    }
  }

  function handleClick(index) {
    // play move
    Game.playTurn(index);

    // update the grid accordingly
    renderBoard();
    console.log("Game over?", Game.getGameOver()); // Check this

    // check if the game is over
    if (Game.getGameOver()) {
      const winner = Game.getCurrentPlayer().getName();
      console.log("Winner:", winner, "Win?", Game.checkWin()); // Check win/tie
      // check if the game was a win or a tie
      if (Game.checkWin()) {
        updateDisplay(`${winner} wins!`);
      } else {
        updateDisplay("Tie between two players.");
      }
    } else if (isVsMachine && !Game.getGameOver()) {
      machineMove(); // Machine takes its turn
    }
  }

  function initializeEventListeners() {
    // check if its working
    console.log("Game button:", gameButton); // Check if it’s null
    // show button on load
    gameButton.style.display = "block";

    // add a button listener
    gameButton.addEventListener("click", () => {
      // start mode settings
      if (gameButton.textContent === "Start Game") {
        const name1 = document.getElementById("player1").value || "Player 1";
        const name2 = vsMachineCheckbox.checked
          ? "Machine"
          : document.getElementById("player2").value || "Player 2"; // Machine if checked

        // set machine mode
        isVsMachine = vsMachineCheckbox.checked;

        // start the game with names from the inputs
        Game.startGame(name1, name2);

        // hide the inputs and button during play
        setupDiv.style.display = "none";
        gameButton.style.display = "none";
        // show the grid
        renderBoard();

        // If vs Machine and Machine starts (index 1), make it move
        if (isVsMachine && Game.getCurrentPlayer().getMark() === "X") {
          machineMove();
        }

        // reset mode settings
      } else if (gameButton.textContent === "Reset Game") {
        // reset game
        Game.resetGame();

        // clear the grid
        clearDisplay();

        // fresh grid
        renderBoard();
        gameButton.textContent = "Start Game";
        setupDiv.style.display = "block"; // show inputs
        gameButton.style.display = "block"; // show button

        // If vs Machine and Machine starts after reset, make it move
        if (isVsMachine && Game.getCurrentPlayer().getMark() === "X") {
          machineMove();
        }
      }
    });
  }

  function clearDisplay() {
    gameContainer.innerHTML = "";
    messageEl.innerHTML = "";
  }

  return {
    renderBoard,
    initializeEventListeners,
    clearDisplay,
  };
})();

// ////////////////////////////////////////////////////////////////////////////

// testing

// console.log("test 1: ", Gameboard.placeMark(2, "X"));
// console.log("test 2: ", Gameboard.placeMark(3, "O"));
// console.log("test 3: ", Gameboard.placeMark(3, "O"));

// console.log("get board after test: ", Gameboard.getBoard());

// Gameboard.resetBoard();

// // test a tie and double placement
// Game.startGame("chadelz", "opponent");

// Game.playTurn(0);
// Game.playTurn(1);
// Game.playTurn(2);
// Game.playTurn(3);
// Game.playTurn(5);
// Game.playTurn(4);
// Game.playTurn(6);
// Game.playTurn(8);
// Game.playTurn(8);
// Game.playTurn(7);

// console.log("get board after test: ", Gameboard.getBoard());

// // test a win
// Game.playTurn(0);
// Game.playTurn(7);

// Game.playTurn(3);
// Game.playTurn(5);

// Game.playTurn(6);
DisplayController.initializeEventListeners();

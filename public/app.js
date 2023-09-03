// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle a player's move
function handleMove(event) {
    const cell = event.target;
  
    // Check if the cell is empty and the game is active
    if (isGameActive && cell.value === '') {
      cell.value = currentPlayer;
      cell.disabled = true;
      cell.classList.add('played');
  
      // Check for a win or a draw
      if (checkWin()) {
        endGame(`Player ${currentPlayer} wins!`);
      } else if (checkDraw()) {
        endGame("It's a draw!");
      } else {
        // Switch to the other player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateResult();
      }
    }
  }
  
  // Function to check for a win
  function checkWin() {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        cells[a].value &&
        cells[a].value === cells[b].value &&
        cells[a].value === cells[c].value
      ) {
        return true;
      }
    }
    return false;
  }
  
  // Function to check for a draw
  function checkDraw() {
    return [...cells].every((cell) => cell.value !== '');
  }
  
  // Function to end the game
  function endGame(message) {
    isGameActive = false;
    cells.forEach((cell) => {
      cell.disabled = true;
    });
    resultContainer.textContent = message;
    resetButton.disabled = false;
  }
  
  // Function to reset the game
  function resetGame() {
    isGameActive = true;
    currentPlayer = 'X';
    cells.forEach((cell) => {
      cell.value = '';
      cell.disabled = false;
      cell.classList.remove('played');
    });
    resultContainer.textContent = "Player X's turn";
    resetButton.disabled = true;
  }
  
  // Function to update the result display
  function updateResult() {
    resultContainer.textContent = `Player ${currentPlayer}'s turn`;
  }

 
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

document.querySelector('#reset').addEventListener('click', resetGame);

resetGame();
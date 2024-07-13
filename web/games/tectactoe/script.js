const board = ["", "", "", "", "", "", "", "", ""];
const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('resetBtn');
const localButton = document.getElementById('localBtn');
const localAIButton = document.getElementById('localAIBtn');
const onlineButton = document.getElementById('onlineBtn');
const playerSelection = document.getElementById('player-selection');

let currentPlayer = "X";
let gameActive = false;
let playerSymbol = "X";
let computerSymbol = "O";
let mode = '';

localButton.addEventListener('click', () => selectMode('local'));
localAIButton.addEventListener('click', () => selectMode('localAI'));
onlineButton.addEventListener('click', () => selectMode('online'));
resetButton.addEventListener('click', resetGame);

// Create "X" and "O" buttons for player selection
const xButton = document.createElement('button');
xButton.textContent = 'X';
xButton.addEventListener('click', () => selectPlayerSymbol('X'));
playerSelection.appendChild(xButton);

const oButton = document.createElement('button');
oButton.textContent = 'O';
oButton.addEventListener('click', () => selectPlayerSymbol('O'));
playerSelection.appendChild(oButton);

function selectMode(selectedMode) {
    mode = selectedMode;
    resetGame();
}

function selectPlayerSymbol(symbol) {
    playerSymbol = symbol;
    computerSymbol = symbol === 'X' ? 'O' : 'X';
    startGame();
}

function startGame() {
    gameActive = true;
    statusDisplay.innerText = `Player ${playerSymbol}'s turn`;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('winner');
        cell.addEventListener('click', handleCellClick);
    });

    if (mode === 'localAI' && playerSymbol === 'O') {
        makeComputerMove();
    }
}

function handleCellClick(clickedCellEvent) {
    if (!gameActive) return;

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (board[clickedCellIndex] !== "") return;

    board[clickedCellIndex] = playerSymbol;
    clickedCell.innerText = playerSymbol;
    checkWinner(playerSymbol);

    if (mode === 'localAI' && gameActive && currentPlayer === computerSymbol) {
        makeComputerMove();
    }
}

function makeComputerMove() {
    const emptyCells = board.reduce((acc, val, idx) => {
        if (val === '') acc.push(idx);
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMoveIndex = emptyCells[randomIndex];

    board[computerMoveIndex] = computerSymbol;
    cells[computerMoveIndex].innerText = computerSymbol;
    checkWinner(computerSymbol);
}

function checkWinner(symbol) {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] === symbol && board[b] === symbol && board[c] === symbol) {
            endGame(combo);
            return;
        }
    }

    if (board.every(cell => cell !== "")) {
        statusDisplay.innerText = "It's a draw!";
        gameActive = false;
    }
}

function resetGame() {
    currentPlayer = "X";
    gameActive = false;
    board.fill("");
    statusDisplay.innerText = `Select your mode`;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('winner');
        cell.removeEventListener('click', handleCellClick);
    });
}

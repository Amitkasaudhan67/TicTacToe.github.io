const cells = document.querySelectorAll('.cell');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const popupRestartButton = document.getElementById('popup-restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
}

function handleClick(event) {
    const index = event.target.dataset.index;
    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    event.target.textContent = currentPlayer;
    const winner = checkWin();

    if (winner) {
        displayPopup(`${winner} wins!`);
        isGameActive = false;
    } else if (!board.includes('')) {
        displayPopup("It's a draw!");
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function displayPopup(message) {
    popupMessage.textContent = message;
    popup.style.display = 'flex';
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    popup.style.display = 'none';
    cells.forEach(cell => cell.textContent = '');
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
popupRestartButton.addEventListener('click', restartGame);

const board = Array(4).fill().map(() => Array(4).fill(''));
const gameBoard = document.getElementById('gameBoard');
const player1Wins = document.getElementById('player1Wins');
const player1Losses = document.getElementById('player1Losses');
const player2Wins = document.getElementById('player2Wins');
const player2Losses = document.getElementById('player2Losses');
let currentPlayer = 'X';
let xMineCounter = 1;
let oMineCounter = 1;
let mineMode = false;

const createBoard = () => {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

const handleCellClick = (event) => {
    const row = event.target.dataset.row;
    const col = event.target.dataset.col;

    if (mineMode) {
        if ((currentPlayer === 'X' && board[row][col] === 'O') || (currentPlayer === 'O' && board[row][col] === 'X')) {
            board[row][col] = '';
            event.target.innerHTML = '';
            mineMode = false;
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    } else if (board[row][col] === '') {
        if (currentPlayer === 'X') {
            board[row][col] = 'X';
            event.target.innerHTML = '<div class="x-mark">X</div>';
        } else {
            board[row][col] = 'O';
            event.target.innerHTML = '<div class="o-mark">O</div>';
        }

        if (checkWin()) {
            if (currentPlayer === 'X') {
                player1Wins.textContent = parseInt(player1Wins.textContent) + 1;
                player2Losses.textContent = parseInt(player2Losses.textContent) + 1;
            } else {
                player2Wins.textContent = parseInt(player2Wins.textContent) + 1;
                player1Losses.textContent = parseInt(player1Losses.textContent) + 1;
            }
            resetGame();
        } else if (checkDraw()) {
            resetGame();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

const checkWin = () => {
    for (let i = 0; i < 4; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2] && board[i][0] === board[i][3]) {
            return true;
        }
        if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i] && board[0][i] === board[3][i]) {
            return true;
        }
    }
    if (board[0][0] && board[0][0] === board[1][1] && board[0][0] === board[2][2] && board[0][0] === board[3][3]) {
        return true;
    }
    if (board[0][3] && board[0][3] === board[1][2] && board[0][3] === board[2][1] && board[0][3] === board[3][0]) {
        return true;
    }
    return false;
}

const checkDraw = () => {
    return board.flat().every(cell => cell !== '');
}

const resetGame = () => {
    board.forEach(row => row.fill(''));
    createBoard();
    currentPlayer = 'X';
    mineMode = false;
    resetMineCounters();
}

const resetMineCounters = () => {
    xMineCounter = 1;
    oMineCounter = 1;
    document.getElementById('xMine').textContent = `X Mines: ${xMineCounter}`;
    document.getElementById('oMine').textContent = `O Mines: ${oMineCounter}`;
    document.getElementById('xMine').disabled = false;
    document.getElementById('oMine').disabled = false;
}

const useMine = (mark) => {
    if ((mark === 'X' && xMineCounter > 0 && currentPlayer === 'X') || (mark === 'O' && oMineCounter > 0 && currentPlayer === 'O')) {
        if (mark === 'X') {
            xMineCounter--;
            document.getElementById('xMine').textContent = `X Mines: ${xMineCounter}`;
            document.getElementById('xMine').disabled = true;
        } else {
            oMineCounter--;
            document.getElementById('oMine').textContent = `O Mines: ${oMineCounter}`;
            document.getElementById('oMine').disabled = true;
        }
        mineMode = true;
    }
}

createBoard();

import { softReset, playerDetails } from './gamesetupUI';

// content update functions
function updateConstName() {
  const name1 = document.querySelector('.player1ships span');
  const name2 = document.querySelector('.player1stats h3');

  name1.textContent = playerDetails.name;
  name2.textContent = playerDetails.name;
}

function turnDisplay(name) {
  const nameEl = document.querySelector('.turnDisplay span');

  nameEl.textContent = name;
}

function stateMessage(message) {
  const mes = document.querySelector('.gameStateMessage');

  mes.textContent = '';
  mes.textContent = message;
}

function renderPlayerBoard() {
  const playrBoard = document.querySelector('#p1');

  const board = playerDetails.player.playerBoard.board;

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (board[i][j]) {
        const el = board[i][j];
        const cell = playrBoard.querySelector(
          `[data-x-coord="${i}"][data-y-coord="${j}"]`,
        );
        cell.classList.add('hasShip', `${el.name}`);
      }
    }
  }
}

function hitMarker(cell) {
  cell.innerHTML = `&#x1F4A5;`;
  cell.classlist.add('hit');
}

function sunkMarker(cell, name) {
  cell.classlist.add('hasShip', 'sunk', name);
}

// event listener
function restartGame() {
  const rstGame = document.querySelector('.restartGame');

  rstGame.addEventListener('click', () => {
    softReset();
  });
}

// UI updater
function initUI() {
  updateConstName();
  renderPlayerBoard();
  turnDisplay(playerDetails.name);
  stateMessage('waiting for first move...');
  restartGame();
}

export { initUI };

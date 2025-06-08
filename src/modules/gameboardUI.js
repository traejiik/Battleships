import { restartGame, playerDetails, comp } from './gamesetupUI';
import setupPlayerAttackListeners from './gamecontroller';

// content update functions
function updateConstName() {
  const name1 = document.querySelector('.player1ships span');
  const name2 = document.querySelector('.player1stats h3');

  name1.textContent = playerDetails.name;
  name2.textContent = playerDetails.name;
}

function updateStats() {
  const user = playerDetails.player;
  // player 1
  const p1oppHit = document.querySelector('.player1stats .oppHits span');
  const p1mySunk = document.querySelector('.player1stats .mySunk span');
  const p1myMiss = document.querySelector('.player1stats .myMiss span');
  const p1myHits = document.querySelector('.player1stats .myHits span');
  const p1oppSunk = document.querySelector('.player1stats .oppSunk span');
  // player 2
  const p2oppHit = document.querySelector('.player2stats .oppHits span');
  const p2mySunk = document.querySelector('.player2stats .mySunk span');
  const p2myMiss = document.querySelector('.player2stats .myMiss span');
  const p2myHits = document.querySelector('.player2stats .myHits span');
  const p2oppSunk = document.querySelector('.player2stats .oppSunk span');

  p1oppHit.textContent = comp.stats.hits
  p2oppHit.textContent = user.stats.hits

  p1mySunk.textContent = comp.stats.oppSunk
  p2mySunk.textContent = user.stats.oppSunk

  p1myMiss.textContent = user.stats.misses
  p2myMiss.textContent = comp.stats.misses

  p1myHits.textContent = user.stats.hits
  p2myHits.textContent = comp.stats.hits

  p1oppSunk.textContent = user.stats.oppSunk
  p2oppSunk.textContent = comp.stats.oppSunk
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
  cell.classList.add('hit', 'placed');
}

function sunkMarker(cell, name) {
  cell.classList.add('hasShip', 'sunk', name);
}

// event listener
function restartGameListener() {
  const rstGame = document.querySelector('.restartGame');

  rstGame.addEventListener('click', () => {
    restartGame();
  });
}

// UI updater
function initUI() {
  updateConstName();
  renderPlayerBoard();
  turnDisplay(playerDetails.name);
  stateMessage('waiting for first move...');
  restartGameListener();
  setupPlayerAttackListeners();
}

export { initUI, turnDisplay, stateMessage, hitMarker, sunkMarker, updateStats };

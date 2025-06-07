import { comp, playerDetails } from './gamesetupUI';
import {
  stateMessage,
  turnDisplay,
  hitMarker,
  sunkMarker,
} from './gameboardUI';
import { dispAlert } from './generalUI';

let playerTurnActive = true;
const compAttackQueue = [];
let currentTarget = {
  hits: [],
  direction: null,
};

function checkWin() {
  const playerS = playerDetails.player;
  const gameboards = document.querySelector('grids .gameboard');

  if (playerS.stats.oppSunk == 5) {
    dispAlert('Well Done! You Win :)')
  } else if (comp.stats.oppSunk == 5) {
    dispAlert('Too Bad! Computer Wins :(')
  }

  gameboards.classList.add('gameover');
}

function computerTurn() {
  const board = playerDetails.player.playerBoard.board;
  let x, y, target, cell;

  if (compAttackQueue.length > 0) {
    [x, y] = compAttackQueue.shift();
  } else {
    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
      cell = document.querySelector(
        `#p1 .cell[data-x-coord="${x}"][data-y-coord="${y}"]`,
      );
    } while (
      !cell ||
      cell.classList.contains('hit') ||
      cell.classList.contains('miss')
    );
  }

  const state = playerDetails.player.playerBoard.receiveAttack(x, y);
  cell = document.querySelector(
    `#p1 .cell[data-x-coord="${x}"][data-y-coord="${y}"]`,
  );

  if (state.hit) {
    hitMarker(cell);
    comp.stats.hits += 1;
    if (state.sunk) {
      comp.stats.oppSunk += 1;
      const sunkShip = playerDetails.player.playerBoard.board[x][y].name;
      sunkMarker(cell, sunkShip);
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (board[i][j].name == sunkShip) {
            const targetCell = document.querySelector(
              `#p1 .cell[data-x-coord="${i}"][data-y-coord="${j}"]`,
            );
            if (targetCell) {
              sunkMarker(targetCell, sunkShip);
            }
            const shipIcon = document.querySelector(
              `.player1ships .${sunkShip}`,
            );
            if (shipIcon) {
              shipIcon.classList.add('sunk');
              shipIcon.innerHTML = `&#x274C;`;
            }
          }
        }
      }

      compAttackQueue.length = 0;
      currentTarget.hits = [];
      currentTarget.direction = null;
    } else {
      currentTarget.hits.push([x, y]);

      // Determine direction if we have two or more hits
      if (!currentTarget.direction && currentTarget.hits.length >= 2) {
        const [[x1, y1], [x2, y2]] = currentTarget.hits.slice(0, 2);
        if (x1 === x2) {
          currentTarget.direction = 'horizontal';
        } else if (y1 === y2) {
          currentTarget.direction = 'vertical';
        }
      }

      // If direction is known, queue only in that direction
      if (currentTarget.direction) {
        const [firstHitX, firstHitY] = currentTarget.hits[0];
        const [lastHitX, lastHitY] =
          currentTarget.hits[currentTarget.hits.length - 1];
        let forwardCoord, backwardCoord;

        if (currentTarget.direction === 'horizontal') {
          forwardCoord = [lastHitX, lastHitY + 1];
          backwardCoord = [firstHitX, firstHitY - 1];
        } else {
          forwardCoord = [lastHitX + 1, lastHitY];
          backwardCoord = [firstHitX - 1, firstHitY];
        }

        [forwardCoord, backwardCoord].forEach(([dx, dy]) => {
          if (dx >= 0 && dx < 10 && dy >= 0 && dy < 10) {
            const cellEl = document.querySelector(
              `#p1 .cell[data-x-coord="${dx}"][data-y-coord="${dy}"]`,
            );
            if (
              cellEl &&
              !cellEl.classList.contains('hit') &&
              !cellEl.classList.contains('miss')
            ) {
              compAttackQueue.push([dx, dy]);
            }
          }
        });
      } else {
        // If direction unknown, try all adjacent
        const directions = [
          [x - 1, y],
          [x + 1, y],
          [x, y - 1],
          [x, y + 1],
        ];
        directions.forEach(([dx, dy]) => {
          if (dx >= 0 && dx < 10 && dy >= 0 && dy < 10) {
            const cellEl = document.querySelector(
              `#p1 .cell[data-x-coord="${dx}"][data-y-coord="${dy}"]`,
            );
            if (
              cellEl &&
              !cellEl.classList.contains('hit') &&
              !cellEl.classList.contains('miss')
            ) {
              compAttackQueue.push([dx, dy]);
            }
          }
        });
      }
    }
    setTimeout(computerTurn, 800);
  } else {
    cell.classList.add('miss', 'placed');
    playerTurnActive = true;
    comp.stats.misses += 1;
    turnDisplay(playerDetails.name);
    stateMessage('Computer Missed. Your Turn!');
  }
}

function handlePlayerClick(event) {
  if (!playerTurnActive) return;

  const cell = event.currentTarget;
  const x = Number(cell.dataset.xCoord);
  const y = Number(cell.dataset.yCoord);

  const state = comp.playerBoard.receiveAttack(x, y);
  console.log(state);
  if (!state.hit) {
    playerTurnActive = false;
    playerDetails.player.stats.misses += 1;
    cell.classList.add('miss', 'placed');
    stateMessage('You Miss. Switching Turns...');
    setTimeout(computerTurn, 1000);
    turnDisplay('Computer');
  } else {
    hitMarker(cell);
    playerDetails.player.stats.hits += 1;
    stateMessage('You made a Hit. Play Again.');
    if (state.sunk) {
      playerDetails.player.stats.oppSunk += 1;
      const sunkShip = comp.playerBoard.board[x][y].name;
      sunkMarker(cell, sunkShip);
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (comp.playerBoard.board[i][j].name == sunkShip) {
            document
              .querySelector(
                `#p2Comp .cell[data-x-coord="${i}"][data-y-coord="${j}"]`,
              )
              .classList.add('hasShip', 'sunk', `${sunkShip}`);
            document
              .querySelector(`.player2ships .${sunkShip}`)
              .classList.add('sunk');
            document.querySelector(`.player2ships .${sunkShip}`).innerHTML =
              `&#x274C;`;
          }
        }
      }
    }
  }
}

export default function setupPlayerAttackListeners() {
  const cells = document.querySelectorAll('#p2Comp .cell');
  cells.forEach((cell) => {
    cell.removeEventListener('click', handlePlayerClick); // remove if already attached
    cell.addEventListener('click', handlePlayerClick);
  });
}

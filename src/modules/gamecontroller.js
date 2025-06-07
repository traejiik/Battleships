import { comp, playerDetails } from './gamesetupUI';
import {
  stateMessage,
  turnDisplay,
  hitMarker,
  sunkMarker,
} from './gameboardUI';

let playerTurnActive = true;

function computerTurn() {
  const board = playerDetails.player.playerBoard.board;
  let x, y, target, cell;

  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
    target = board[x][y];
    cell = document.querySelector(
      `#p1 .cell[data-x-coord="${x}"][data-y-coord="${y}"]`,
    );
  } while (cell.classList.contains('hit') || cell.classList.contains('miss'));

  const state = playerDetails.player.playerBoard.receiveAttack(x, y);

  if (state.hit) {
    hitMarker(cell);
    if (state.sunk) {
      sunkMarker(cell, playerDetails.player.playerBoard.board[x][y].name);

      const sunkShip = playerDetails.player.playerBoard.board[x][y].name;
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          if (playerDetails.player.playerBoard.board[i][j].name == sunkShip) {
            document
              .querySelector(
                `#p2Comp .cell[data-x-coord="${i}"][data-y-coord="${j}"]`,
              )
              .classList.add('hasShip', 'sunk', `${sunkShip}`);
            document
              .querySelector(`.player1ships .${sunkShip}`)
              .classList.add('sunk');
            document.querySelector(`.player1ships .${sunkShip}`).innerHTML =
              `&#x274C;`;
          }
        }
      }
    }

    setTimeout(computerTurn, 1000);
  } else {
    cell.classList.add('miss', 'placed');
    playerTurnActive = true;
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
    console.log(comp)
    cell.classList.add('miss', 'placed');
    stateMessage('You Miss. Switching Turns...');
    setTimeout(computerTurn, 1000);
    turnDisplay('Computer');
  } else {
    hitMarker(cell);
    stateMessage('You made a Hit. Play Again.');
    if (state.sunk) {
      const sunkShip = comp.playerBoard.board[x][y].name;
      sunkMarker(cell, sunkShip)
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


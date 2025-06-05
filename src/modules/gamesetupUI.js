import Ship from './ship';
import Player from './player';
import gamePlacement from '../pages/placer';
import { initUI } from './gameboardUI';
import { createGrids } from './dom';

// ships
const playerShips = {};
const compShips = {};
const globalShips = [
  ['carrier', 5],
  ['battleship', 4],
  ['cruiser', 3],
  ['submarine', 3],
  ['destroyer', 2],
];

const player = new Player('user');
const comp = new Player('comp');

let playerDetails = {};

let activeShip = null;

// create ships onto player grids
function createShips() {
  globalShips.forEach(([name, length]) => {
    playerShips[name] = {
      ship: new Ship(name, length),
      placed: false,
      orientation: 'horizontal',
    };
    compShips[name] = new Ship(length);
  });
}

function renderSelectedShip(ship, orientation, cell, isHovering = true) {
  const row = Number(cell.dataset.xCoord);
  const col = Number(cell.dataset.yCoord);
  const isHorizontal = orientation === 'horizontal';

  for (let i = 0; i < ship.length; i++) {
    const hoveredRow = isHorizontal ? row : row + i;
    const hoveredCol = isHorizontal ? col + i : col;

    if (hoveredRow > 9 || hoveredCol > 9) return;

    const hoveredCell = document.querySelector(
      `[data-x-coord="${hoveredRow}"][data-y-coord="${hoveredCol}"]`,
    );

    if (!hoveredCell) continue;

    if (isHovering) {
      const overflows =
        (isHorizontal && col + ship.length - 1 > 9) ||
        (!isHorizontal && row + ship.length - 1 > 9);

      hoveredCell.classList.add(overflows ? 'hover-invalid' : 'hover-valid');
    } else {
      hoveredCell.classList.remove('hover-valid', 'hover-invalid');
    }
  }
}

// button functions
function rotateShip(shipName) {
  if (!shipName || !playerShips[shipName]) return;

  const shipData = playerShips[shipName];
  shipData.orientation =
    shipData.orientation === 'horizontal' ? 'vertical' : 'horizontal';
}

function shipPlacement() {
  const cells = document.querySelectorAll('#initBoard .cell');
  cells.forEach((cell) => {
    cell.addEventListener('mouseenter', () => {
      if (!activeShip) return;
      const shipData = playerShips[activeShip];
      renderSelectedShip(shipData.ship, shipData.orientation, cell, true);
    });

    cell.addEventListener('mouseleave', () => {
      if (!activeShip) return;
      const shipData = playerShips[activeShip];
      renderSelectedShip(shipData.ship, shipData.orientation, cell, false);
    });

    cell.addEventListener('click', () => {
      const selected = document.querySelectorAll('.placeShipBtn');
      const unplacedShips = Object.values(playerShips).filter(
        (ship) => !ship.placed,
      );
      if (!activeShip) return;

      const shipData = playerShips[activeShip];
      if (shipData.placed) return;

      const isHorizontal = shipData.orientation === 'horizontal';
      player.playerBoard.placeShip(
        shipData.ship,
        shipData.orientation,
        Number(cell.dataset.xCoord),
        Number(cell.dataset.yCoord),
      );
      shipData.placed = true;
      selected.forEach((select) => {
        if (select.textContent == activeShip) {
          select.classList.add('placed', 'selected');
        }
      });

      const row = Number(cell.dataset.xCoord);
      const col = Number(cell.dataset.yCoord);
      for (let i = 0; i < shipData.ship.length; i++) {
        const selectRow = isHorizontal ? row : row + i;
        const selectCol = isHorizontal ? col + i : col;
        const selectCell = document.querySelector(
          `[data-x-coord="${selectRow}"][data-y-coord="${selectCol}"]`,
        );
        if (selectCell) {
          selectCell.classList.add(`${activeShip}`, 'placed', 'hasShip');
        }
      }
      if (unplacedShips.length == 0) {
        activeShip = null;
      }
    });
  });
}

function randomiseCompShips() {
  Object.entries(compShips).forEach(([name, ship]) => {
    let placed = false;

    while (!placed) {
      const orientation = Math.random() < 0.5 ? 'horizontal' : 'vertical';
      const maxRow = orientation === 'horizontal' ? 9 : 10 - ship.length;
      const maxCol = orientation === 'horizontal' ? 10 - ship.length : 9;

      const x = Math.floor(Math.random() * (maxRow + 1));
      const y = Math.floor(Math.random() * (maxCol + 1));

      placed = comp.playerBoard.placeShip(ship, orientation, x, y);
    }
  });
}

function UIupdater() {
  const restartBtn = document.querySelector('.restartGame');
  const activeGame = document.querySelector('.gameActive');
  const initGame = document.querySelector('.gameInit');

  activeGame.style.display = 'flex';
  activeGame.classList.remove('hidden');
  initGame.classList.add('hidden');
  initGame.style.display = 'none';
  restartBtn.classList.remove('hiddenBtn');
}

function UIinvert() {
  const restartBtn = document.querySelector('.restartGame');
  const activeGame = document.querySelector('.gameActive');
  const initGame = document.querySelector('.gameInit');

  gamePlacement();

  initGame.classList.remove('hidden');
  initGame.style.display = 'block';
  activeGame.style.display = 'none';
  activeGame.classList.add('hidden');
  restartBtn.classList.add('hiddenBtn');
  activeShip = null;
}

function softReset() {
  Object.values(playerShips).forEach((shipObj) => {
      shipObj.placed = false;
    });
  comp.playerBoard.resetBoard();
  player.playerBoard.resetBoard();
  randomiseCompShips();
  UIinvert();
  createGrids();
  createShips()
  setupHelper();
}

// event listener
function newGame() {
  const btn = document.querySelector('.newGame');
  createShips();

  btn.addEventListener('click', () => {
    randomiseCompShips();
    gamePlacement();
    createGrids();
    setupHelper();
  });
}

function startGame() {
  const btn = document.querySelector('.startGame');
  const inpt = document.querySelector('.nameInput');
  const shipAlrt = document.querySelector('#shipAlert');
  const nameAlrt = document.querySelector('#nameAlert');

  btn.addEventListener('click', () => {
    const unplacedShips = Object.values(playerShips).filter(
      (ship) => !ship.placed,
    );

    console.log('Unplaced ships:', unplacedShips);

    if (unplacedShips.length > 0) {
      shipAlrt.showModal();
      document
        .querySelector('#shipAlert .closer')
        .addEventListener('click', () => {
          shipAlrt.close();
        });
      return;
    }
    if (!inpt || inpt.value.length < 2) {
      nameAlrt.showModal();
      document
        .querySelector('#nameAlert .closer')
        .addEventListener('click', () => {
          nameAlrt.close();
        });
        console.log(playerShips)
      return;
    }

    // Game starts
    playerDetails = {
      name: inpt.value,
      player: player,
      ships: playerShips,
    };
    UIupdater();
    initUI();
  });
}

function rotateBtn() {
  const btn = document.querySelector('.rotateGame');
  const selected = document.querySelectorAll('.placeShipBtn');

  selected.forEach((select) => {
    select.addEventListener('click', () => {
      activeShip = select.textContent;
      console.log(activeShip);
      console.log(playerShips[activeShip]);
    });
  });

  btn.addEventListener('click', () => {
    rotateShip(activeShip);
    console.log(playerShips[activeShip]);
  });
}

function resetBtn() {
  const btn = document.querySelector('.resetGame');
  const selected = document.querySelectorAll('.placeShipBtn');
  const cells = document.querySelectorAll('#initBoard div');

  btn.addEventListener('click', () => {
    player.playerBoard.resetBoard();
    Object.values(playerShips).forEach((shipObj) => {
      shipObj.placed = false;
    });
    selected.forEach((select) => {
      select.classList.remove('placed', 'selected');
    });
    cells.forEach((cell) => {
      cell.className = 'cell';
    });
  });
}

function setupHelper() {
  startGame();
  rotateBtn();
  resetBtn();
  shipPlacement();
}

export { newGame, softReset, playerDetails, comp };

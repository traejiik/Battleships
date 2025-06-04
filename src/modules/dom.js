import Player from './player';
import Ship from './ship';
import gamePlacement from '../pages/placer';

// ships
const globalShips = [
  ['Carrier', 5],
  ['Battleship', 4],
  ['Cruiser', 3],
  ['Submarine', 3],
  ['Destroyer', 2],
];

const playerShips = {};
const compShips = {};

// create grids
function createGrids() {
  const grids = document.querySelectorAll('.gameboard');
  grids.forEach((grid) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const index = i * 10 + j;
        const square = document.createElement('div');
        square.classList.add('cell');
        square.dataset.xCoord = i;
        square.dataset.yCoord = j;

        grid.appendChild(square);
      }
    }
  });
}

// create ships onto player grids
function createShips() {
  globalShips.forEach(([name, length]) => {
    playerShips[name] = {
      ship: new Ship(length),
      placed: false,
      orientation: 'horizontal',
    };
    compShips[name] = new Ship(length);
  });
}

// rotate ships
function rotateShip(activeShip) {
  playerShips[activeShip].orientation = 'vertical';
}

// test
function testlistener() {
  const btn = document.querySelector('.gameStart');

  btn.addEventListener('click', () => {
    gamePlacement();
    createGrids();
  });
}

// create player instances

export default function init() {
  testlistener();
}

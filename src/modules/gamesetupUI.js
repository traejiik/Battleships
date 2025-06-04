import Ship from './ship';
import gamePlacement from '../pages/placer';
import { createGrids } from './dom';

// ships
const playerShips = {};
const compShips = {};
const globalShips = [
  ['Carrier', 5],
  ['Battleship', 4],
  ['Cruiser', 3],
  ['Submarine', 3],
  ['Destroyer', 2],
];

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

// event listener
function newGame() {
  const btn = document.querySelector('.newGame');

  btn.addEventListener('click', () => {
    gamePlacement();
    createGrids();
  });
}

function startGame() {
  const btn = document.querySelector('.startGame');
  const resetBtn = document.querySelector('.restartGame');
  const activeGame = document.querySelector('.gameActive');
  const initGame = document.querySelector('.gameInit');

  btn.addEventListener('click', () => {
    createShips()
    const unplacedShips = Object.values(playerShips).filter(
      (ship) => !ship.placed,
    );

    console.log('Unplaced ships:', unplacedShips);

    if (unplacedShips.length > 0) {
      alert('Place your ships!');
      return;
    }

    // Game starts
    activeGame.style.display = 'flex';
    activeGame.classList.remove('hidden');
    initGame.classList.add('hidden');
    initGame.style.display = 'none';
    resetBtn.classList.remove('hiddenBtn');
  });
}

export { newGame, startGame, playerShips };

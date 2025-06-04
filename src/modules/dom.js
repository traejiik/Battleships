// create grids
function createGrids() {
  const grids = document.querySelectorAll('.gameboard');
  grids.forEach((grid) => {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const square = document.createElement('div');
        square.classList.add('cell');
        square.dataset.xCoord = i;
        square.dataset.yCoord = j;

        grid.appendChild(square);
      }
    }
  });
}

// rotate ships
function rotateShip(activeShip) {
  playerShips[activeShip].orientation = 'vertical';
}


export { createGrids };

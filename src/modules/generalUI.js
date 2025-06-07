// create grids
function createGrids() {
  const grids = document.querySelectorAll('.gameboard');
  grids.forEach((grid) => {
    grid.innerHTML = '';
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

export { createGrids };

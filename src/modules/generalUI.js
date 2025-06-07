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

function dispAlert(message) {
  const alrt = document.querySelector('#dispAlert');
  const mes = document.querySelector('#dispAlert h3');

  mes.textContent = message
  alrt.showModal();
  document.querySelector('#dispAlert .closer').addEventListener('click', () => {
    alrt.close();
  });
}

export { createGrids, dispAlert};

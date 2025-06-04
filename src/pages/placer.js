export default function gamePlacement() {
  const container = document.querySelector('.gameInit');
  container.innerHTML = '';

  const contCtn = document.createElement('div');
  contCtn.classList.add('playerInit');

  // ship placer & name
  const aside = document.createElement('div');
  aside.classList.add('detailInitCtn');
  const nameCtn = document.createElement('div');
  nameCtn.classList.add('playerNameCtn');
  const shipCtn = document.createElement('div');
  shipCtn.classList.add('placerCtn');

  // gameboard
  const board = document.createElement('div');
  board.classList.add('initBoardCtn');
  const gameboardCtn = document.createElement('div');
  gameboardCtn.id = 'initBoard';
  gameboardCtn.classList.add('gameboard');

  // minor content container
  aside.appendChild(nameCtn);
  aside.appendChild(shipCtn);
  board.appendChild(gameboardCtn);

  //append container
  contCtn.appendChild(aside);
  contCtn.appendChild(board);
  container.appendChild(contCtn);
}

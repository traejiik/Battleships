import { startGame } from "../modules/gamesetupUI";

export default function gamePlacement() {
  const container = document.querySelector('.gameInit');
  container.innerHTML = '';

  const contCtn = document.createElement('div');
  contCtn.classList.add('playerInit');

  const pageTitle = document.createElement('p');
  pageTitle.textContent = 'place your ships';
  const pageDesc = document.createElement('p');
  pageDesc.textContent = 'select a ship and place it on the grid';
  pageDesc.id = 'pageDesc';

  // ship placer & name
  const aside = document.createElement('div');
  aside.classList.add('detailInitCtn');
  const nameCtn = document.createElement('div');
  nameCtn.classList.add('playerNameCtn');
  const placerCtn = document.createElement('div');
  placerCtn.classList.add('placerCtn');

  const nameTitle = document.createElement('p');
  nameTitle.textContent = 'enter your name:';
  const nameInput = document.createElement('input');
  nameInput.classList.add('nameInput');
  nameInput.type = 'text';

  nameCtn.appendChild(nameTitle);
  nameCtn.appendChild(nameInput);

  const shipsTitle = document.createElement('p');
  shipsTitle.textContent = 'ships';
  const shipsCtn = document.createElement('div');
  shipsCtn.classList.add('placerShips');
  const btnCtn = document.createElement('div');
  btnCtn.classList.add('placerBtnCtn');

  const carShip = document.createElement('div');
  carShip.classList.add('placeShipBtn');
  carShip.classList.add('altColour');
  carShip.classList.add('carrier');
  carShip.textContent = 'carrier';
  const batShip = document.createElement('div');
  batShip.classList.add('placeShipBtn');
  batShip.classList.add('battleship');
  batShip.classList.add('altColour');
  batShip.textContent = 'battleship';
  const cruShip = document.createElement('div');
  cruShip.classList.add('placeShipBtn');
  cruShip.classList.add('cruiser');
  cruShip.textContent = 'cruiser';
  const subShip = document.createElement('div');
  subShip.classList.add('placeShipBtn');
  subShip.classList.add('submarine');
  subShip.textContent = 'submarine';
  const desShip = document.createElement('div');
  desShip.classList.add('placeShipBtn');
  desShip.classList.add('destroyer');
  desShip.textContent = 'destroyer';

  const resetBtn = document.createElement('button');
  resetBtn.classList.add('resetGame');
  resetBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
	<path fill="currentColor" d="M4.02 9.46A5.002 5.002 0 0 0 14 9c0-2.76-2.24-5-5-5H1.71l2.15 2.15a.5.5 0 0 1-.707.707l-3-3a.5.5 0 0 1 0-.707l3-3a.5.5 0 0 1 .707.707l-2.15 2.15H9c3.31 0 6 2.69 6 6s-2.69 6-6 6c-3.13 0-5.7-2.4-5.98-5.46a.5.5 0 0 1 .996-.09z" />
	<path fill="currentColor" d="M10.7 10.1a.5.5 0 0 1-.447.895l-2-1a.5.5 0 0 1-.276-.447v-3a.5.5 0 0 1 1 0v2.69l1.72.862z" />
</svg>`;
  const rotateBtn = document.createElement('button');
  rotateBtn.classList.add('rotateGame');
  rotateBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
	<path fill="currentColor" d="M118.868 319.999q27.586 0 41.735 15.981q13.641 15.474 13.641 45.503q0 28.91-10.281 50.897q-10.281 21.886-30.335 30.946q-13.335 6.006-33.287 6.006q-11.808 0-26.365-2.545l3.156-26.772q12.52 3.868 22.903 3.868q19.545 0 29.928-12.622q8.348-10.078 9.467-25.449q-13.54 12.622-31.556 12.622q-20.868 0-32.778-12.724Q64 393.698 64 371.914q0-23.209 12.724-36.443q14.862-15.472 42.144-15.472m137.799-.207q32.981 0 46.927 25.246q9.365 17.101 9.365 49.472q0 35.424-11.502 52.832q-14.354 21.784-44.79 21.784q-32.88 0-46.928-25.245q-9.365-17-9.365-50.287q0-34.61 11.503-52.018q14.353-21.784 44.79-21.784m0 25.449q-12.114 0-17.967 11.91t-5.853 36.748q0 25.754 5.7 37.563q5.904 12.215 18.12 12.215q12.215 0 18.017-11.961q5.803-11.961 5.803-37.206q0-25.347-5.599-37.053q-5.904-12.216-18.221-12.216m-138.003-.608q-10.485 0-16.44 6.871t-5.955 18.883q0 11.096 5.65 17.204q5.649 6.107 15.931 6.107q11.706 0 18.526-8.042q5.395-6.31 5.395-15.88q0-12.01-6.107-18.425q-6.311-6.718-17-6.718m30.795-301.961l-.027 57.387a173 173 0 0 1 6.843-7.247c66.649-66.65 174.709-66.65 241.359 0c65.392 65.392 66.626 170.647 3.701 237.543l-3.43 3.545l-30.169-30.172c49.715-50.009 49.624-130.85-.272-180.746c-49.987-49.987-131.032-49.987-181.019 0a130 130 0 0 0-4.748 5.006l53.095.017v42.667h-128v-128z" />
</svg>`;
  const startBtn = document.createElement('button');
  startBtn.classList.add('startGame');
  startBtn.textContent = 'start game';

  shipsCtn.appendChild(carShip);
  shipsCtn.appendChild(batShip);
  shipsCtn.appendChild(cruShip);
  shipsCtn.appendChild(subShip);
  shipsCtn.appendChild(desShip);

  btnCtn.appendChild(resetBtn);
  btnCtn.appendChild(rotateBtn);
  btnCtn.appendChild(startBtn);

  placerCtn.appendChild(shipsTitle);
  placerCtn.appendChild(shipsCtn);
  placerCtn.appendChild(btnCtn);

  // gameboard
  const board = document.createElement('div');
  board.classList.add('initBoardCtn');
  const gameboardCtn = document.createElement('div');
  gameboardCtn.id = 'initBoard';
  gameboardCtn.classList.add('gameboard');

  // minor content container
  aside.appendChild(nameCtn);
  aside.appendChild(placerCtn);
  board.appendChild(gameboardCtn);

  //append container
  contCtn.appendChild(aside);
  contCtn.appendChild(board);
  container.appendChild(pageTitle);
  container.appendChild(pageDesc);
  container.appendChild(contCtn);

  startGame()
}

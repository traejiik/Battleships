import Gameboard from '../src/modules/gameboard';
import Ship from '../src/modules/ship';

const ship1 = new Ship(4);
const ship2 = new Ship(4);
const ship3 = new Ship(4);
const board = new Gameboard();

board.placeShip(ship1, 'horizontal', 1, 3);

describe('Testing board', () => {
  test('Check ship placement', () => {
    expect(board.board[1][3]).toBe(ship1);
  });

  test('Check occupied spots', () => {
    expect(board.ships[0].endY).toBe(6);
  });
});

describe('Test collision function', () => {
  test('Check active collision', () => {
    expect(board.checkCollision(ship2, 'horizontal', 2, 3)).toBe(false);
  });

  test('Check no collision', () => {
    expect(board.checkCollision(ship3, 'vertical', 2, 8)).toBe(true);
  });
});

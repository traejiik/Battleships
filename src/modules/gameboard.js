export default class Gameboard {
  constructor() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    this.ships = [];
    this.missed = [];
  }

  placeShip(ship, direction, x, y) {
    if (
      (direction === 'horizontal' && y + ship.length > 10) ||
      (direction === 'vertical' && x + ship.length > 10)
    ) {
      return false;
    }

    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        if (this.board[x][y + i] !== 0) return false;
      } else if (direction === 'vertical') {
        if (this.board[x + i][y] !== 0) return false;
      }
    }

    if (!this.checkCollision(ship, direction, x, y)) return false;
    for (let i = 0; i < ship.length; i++) {
      if (direction === 'horizontal') {
        this.board[x][y + i] = ship;
      } else if (direction === 'vertical') {
        this.board[x + i][y] = ship;
      }
    }

    this.ships.push({
      name: ship,
      startX: x,
      startY: y,
      endX: direction === 'horizontal' ? x : x + ship.length - 1,
      endY: direction === 'horizontal' ? y + ship.length - 1 : y,
    });

    return true;
  }

  receiveAttack(x, y) {
    const target = this.board[x][y];
    if (target == 'miss' || target == 'hit') {
      return false;
    }

    if (target == 0) {
      this.board[x][y] = 'miss';
      this.missed.push([x, y]);
      return true;
    }

    if (typeof target == 'object') {
      target.hit();
      this.board[x][y] = 'hit';
      return true;
      // return {hit: true, sunk: false}
      // return {hit: true, sunk: target.sunk}
    }
  }

  allSunk() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (typeof this.board[i][j] == 'object') {
          return false;
        }
      }
    }
    return true;
  }

  resetBoard() {
    this.board = Array(10)
      .fill()
      .map(() => Array(10).fill(0));
    this.missed = [];
    this.ships = [];
  }

  checkCollision(ship, direction, x, y) {
    for (let i = 0; i < ship.length; i++) {
      if (direction == 'horizontal') {
        if (this.board[x][y + i] !== 0) return false;
        if (y + i > 0 && this.board[x][y + i - 1] !== 0) return false;
        if (y + i < 9 && this.board[x][y + i + 1] !== 0) return false;

        if (x > 0 && this.board[x - 1][y + i] !== 0) return false;
        if (x < 9 && this.board[x + 1][y + i] !== 0) return false;
      } else if (direction == 'vertical') {
        if (this.board[x + i][y] !== 0) return false;
        if (x + i < 9 && this.board[x + i + 1][y] !== 0) return false;
        if (x + i > 0 && this.board[x + i - 1][y] !== 0) return false;

        if (y > 0 && this.board[x + i][y - 1] !== 0) return false;
        if (y < 9 && this.board[x + i][y + 1] !== 0) return false;
      }
    }
    return true;
  }
}

import Gameboard from './gameboard';

export default class Player {
  constructor(name) {
    this.playerName = name;
    this.playerBoard = new Gameboard();
    this.stats = {
      misses: 0,
      hits: 0,
      oppSunk: 0,
    };
  }
}

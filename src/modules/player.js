import Gameboard from './gameboard';

export default class Player {
  constructor(name) {
    this.playerName = name;
    this.playerBoard = new Gameboard();
    this.wins = 0;
    this.loses = 0;
  }
}

import { Rotor } from './Rotor.js';
import { Reflector } from './Reflector.js';
import { PlugBoard } from './PlugBoard.js';

export class Enigma {
  constructor() {
    this.rotor1 = new Rotor(0, 1);
    this.rotor2 = new Rotor(1, 2);
    this.rotor3 = new Rotor(2, 3);
    this.reflector = new Reflector();
    this.plugBoard = new PlugBoard();
  }

  setRotors(r1, r2, r3) {
    if (r1 === r2 || r1 === r3 || r2 === r3) return false;
    this.rotor1.setRotorNo(r1);
    this.rotor2.setRotorNo(r2);
    this.rotor3.setRotorNo(r3);
    return true;
  }

  setPositions(p1, p2, p3) {
    this.rotor1.position = p1;
    this.rotor2.position = p2;
    this.rotor3.position = p3;
  }

  setPlugPairs(pairs) {
    this.plugBoard.setPairs(pairs);
  }

  randomize() {
    const nums = [0,1,2,3,4];
    const shuffle = () => nums.sort(() => Math.random() - 0.5);
    shuffle();
    this.rotor1.setRotorNo(nums[0]);
    this.rotor2.setRotorNo(nums[1]);
    this.rotor3.setRotorNo(nums[2]);
    this.rotor1.position = Math.floor(Math.random() * 26);
    this.rotor2.position = Math.floor(Math.random() * 26);
    this.rotor3.position = Math.floor(Math.random() * 26);
    this._randomizePlugs();
  }

  _randomizePlugs() {
    const indices = Array.from({length: 26}, (_, i) => i).sort(() => Math.random() - 0.5);
    const pairs = [];
    for (let i = 0; i < 10; i++) {
      pairs.push([indices[i * 2], indices[i * 2 + 1]]);
    }
    this.plugBoard.setPairs(pairs);
  }

  pressKey(charIndex) {
    if (this.rotor1.rotorNo === this.rotor2.rotorNo ||
        this.rotor2.rotorNo === this.rotor3.rotorNo ||
        this.rotor1.rotorNo === this.rotor3.rotorNo) {
      return -1;
    }

    let cur = charIndex;
    cur = this.plugBoard.runThrough(cur);
    cur = this.rotor1.runThrough(cur, true);
    cur = this.rotor2.runThrough(cur, true);
    cur = this.rotor3.runThrough(cur, true);
    cur = this.reflector.runThrough(cur);
    cur = this.rotor3.runThrough(cur, false);
    cur = this.rotor2.runThrough(cur, false);
    cur = this.rotor1.runThrough(cur, false);
    cur = this.plugBoard.runThrough(cur);

    this._stepRotors();
    return cur;
  }

  _stepRotors() {
    this.rotor1.position = (this.rotor1.position + 1) % 26;
    if (this.rotor1.position === 0) {
      this.rotor2.position = (this.rotor2.position + 1) % 26;
      if (this.rotor2.position === 0) {
        this.rotor3.position = (this.rotor3.position + 1) % 26;
      }
    }
  }

  getState() {
    return {
      rotors: [this.rotor1.rotorNo, this.rotor2.rotorNo, this.rotor3.rotorNo],
      positions: [this.rotor1.position, this.rotor2.position, this.rotor3.position],
      plugPairs: [...this.plugBoard.pairs],
    };
  }
}

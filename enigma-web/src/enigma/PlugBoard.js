export class PlugBoard {
  constructor() {
    this.pairs = []; // array of [a, b] index pairs
  }

  setPairs(pairs) {
    this.pairs = pairs.map(([a, b]) => [a, b]);
  }

  runThrough(input) {
    for (const [a, b] of this.pairs) {
      if (a === input) return b;
      if (b === input) return a;
    }
    return input;
  }
}

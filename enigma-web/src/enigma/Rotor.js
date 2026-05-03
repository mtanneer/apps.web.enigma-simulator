const WIRINGS = [
  [15,4,25,20,14,7,23,18,2,21,5,12,19,1,6,11,17,8,13,16,9,22,0,24,3,10],
  [25,14,20,4,18,24,3,10,5,22,15,2,8,16,23,7,12,21,1,11,6,13,9,17,0,19],
  [4,7,17,21,23,6,0,14,1,16,20,18,8,12,25,5,11,24,13,22,10,19,15,3,9,2],
  [8,12,4,19,2,6,5,17,0,24,18,16,1,25,23,22,11,7,10,3,21,20,15,14,9,13],
  [16,22,4,17,19,25,20,8,14,0,18,3,5,6,7,9,10,15,24,23,2,21,1,13,12,11],
];

export class Rotor {
  constructor(rotorNo, rotorPos) {
    this.rotorNo = rotorNo;
    this.rotorPos = rotorPos;
    this.position = 0;
    this.wiring = [...WIRINGS[rotorNo]];
  }

  setRotorNo(no) {
    this.rotorNo = no;
    this.wiring = [...WIRINGS[no]];
  }

  runThrough(input, forward) {
    if (forward) {
      const shifted = (input + this.position) % 26;
      return this.wiring[shifted];
    } else {
      for (let i = 0; i < 26; i++) {
        if (input === this.wiring[i]) {
          let output = (i - this.position) % 26;
          if (output < 0) output += 26;
          return output;
        }
      }
    }
    return -1;
  }
}

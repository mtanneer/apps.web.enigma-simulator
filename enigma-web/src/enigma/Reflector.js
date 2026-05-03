const WIRING = [21,10,22,17,6,8,4,19,5,25,1,20,18,15,16,13,14,3,12,7,11,0,2,24,23,9];

export class Reflector {
  runThrough(input) {
    return WIRING[input % 26];
  }
}

export interface pos {
  x: number;
  y: number;
}

export default class Position {
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly left: number;
  constructor(array?: pos[], preWidth?: number) {
    this.width = array ? array[1].x - array[0].x : 0;
    this.height = array ? array[3].y - array[0].y : 0;
    this.top = array ? array[0].y : 0;
    this.left = array ? array[0].x : 0;
    if (preWidth) {
      // this.width = this.width + preWidth;
      this.left = this.left + preWidth;
    }
  }
}

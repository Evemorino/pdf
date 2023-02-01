import Position from "./Position";

export interface ResultInterface {
  position?: Position;
  title?: string;
  options?: string;
  optionsNumber?: number;
  right?: number;
}

export default class Result {
  public position: Position;
  public title: string;
  public options: string;
  public optionsNumber: number;
  public right: number;
  constructor(target?: ResultInterface) {
    this.position = target
      ? target.position
        ? target.position
        : new Position()
      : new Position();
    this.title = target ? (target.title ? target.title : "") : "";
    this.options = target ? (target.options ? target.options : "") : "";
    this.optionsNumber = target
      ? target.optionsNumber
        ? target.optionsNumber
        : 0
      : 0;
    this.right = target ? (target.right ? target.right : -1) : -1;
  }
}

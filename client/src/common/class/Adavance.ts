import Position from "./Position";

interface AdvanceInterface {
  position?: Position;
  text?: string;
}

export default class Advance {
  public position: Position;
  public text: string;
  constructor(target: AdvanceInterface) {
    this.position = target
      ? target.position
        ? target.position
        : new Position()
      : new Position();
    this.text = target ? (target.text ? target.text : "") : "";
  }
}

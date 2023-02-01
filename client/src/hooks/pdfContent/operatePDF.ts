import { ref, Ref } from "vue";
import useMove from "../tools/useMove";

interface Result {
  topValue: Ref<number>;
  leftValue: Ref<number>;
  copyFlag: Ref<boolean>;
  startLeftOperatePDF: (e: MouseEvent) => void;
  startRightOperatePDF: (e: MouseEvent) => void;
  operatePDF: (e: MouseEvent) => void;
  stopOperatePDF: (e: MouseEvent) => void;
}

function movePDF(): Result {
  const { topValue, leftValue, moveFlag, startMove, moving, stopMove } =
    useMove();

  const copyFlag = ref<boolean>(false);

  function startLeftOperatePDF(e: MouseEvent): void {
    copyFlag.value = true;
  }

  function startRightOperatePDF(e: MouseEvent): void {
    startMove(e);
  }

  function operatePDF(e: MouseEvent): void {
    moving(e);
  }

  function stopOperatePDF(e: MouseEvent): void {
    stopMove(e);
    copyFlag.value = false;
  }

  return {
    topValue,
    leftValue,
    copyFlag,
    startLeftOperatePDF,
    startRightOperatePDF,
    operatePDF,
    stopOperatePDF,
  };
}

export default movePDF;

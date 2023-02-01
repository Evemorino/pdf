import { Ref, ref } from "@vue/runtime-dom";

interface Move {
  topValue: Ref<number>;
  leftValue: Ref<number>;
  moveFlag: Ref<boolean>;
  startMove: (e: MouseEvent) => void;
  moving: (e: MouseEvent) => void;
  stopMove: (e: MouseEvent) => void;
}

function useMove(): Move {
  const startPositionX = ref<number>(0);
  const startPositionY = ref<number>(0);

  const topValue = ref<number>(0);
  const leftValue = ref<number>(0);

  const moveFlag = ref<boolean>(false);

  function move(x: number, y: number): void {
    topValue.value = topValue.value + (y - startPositionY.value);
    leftValue.value = leftValue.value + (x - startPositionX.value);
    startPositionX.value = x;
    startPositionY.value = y;
  }

  function startMove(e: MouseEvent): void {
    moveFlag.value = true;
    startPositionX.value = e.clientX;
    startPositionY.value = e.clientY;
  }

  function moving(e: MouseEvent): void {
    if (moveFlag.value) {
      requestAnimationFrame(() => {
        move(e.clientX, e.clientY);
      });
    }
  }

  function stopMove(e: MouseEvent): void {
    moveFlag.value = false;
  }

  return {
    topValue,
    leftValue,
    moveFlag,
    startMove,
    moving,
    stopMove,
  };
}

export default useMove;

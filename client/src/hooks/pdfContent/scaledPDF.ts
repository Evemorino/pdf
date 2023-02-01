import { Ref, ref } from "vue";

interface Result {
  scaledValue: Ref<number>;
  scalePDF: (e: WheelEvent) => void;
}

function useScaledPDF(): Result {
  const scaledValue = ref<number>(1);

  const scalePDF = (e: WheelEvent): void => {
    let flag = e.deltaY > 0 ? true : false;
    if (flag) {
      if (scaledValue.value > 0.1) scaledValue.value = scaledValue.value - 0.1;
    } else {
      if (scaledValue.value < 2) scaledValue.value = scaledValue.value + 0.1;
    }
  };
  return {
    scaledValue,
    scalePDF,
  };
}

export default useScaledPDF;

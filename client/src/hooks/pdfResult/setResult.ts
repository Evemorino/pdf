import { storeToRefs } from "pinia";
import useTotalStore, { ResultContent } from "../../store/TotalStore";

interface ResultInterface {
  getLabel: (index: number) => string;
  getRight: (index: number, itemIndex: number) => void;
  setTitle: (index: number) => void;
  setOptions: (index: number) => void;
}

export default function useSetResult(): ResultInterface {
  const { resultArray, activeQuestionIndex } = storeToRefs(
    useTotalStore()
  ) as unknown as ResultContent;

  const labelMaps = new Map<number, string>([
    [0, "A"],
    [1, "B"],
    [2, "C"],
    [3, "D"],
    [4, "E"],
    [5, "F"],
    [6, "G"],
  ]);

  function getLabel(index: number): string {
    return labelMaps.has(index) ? (labelMaps.get(index) as string) : "多余";
  }

  function getRight(index: number, itemIndex: number): void {
    activeQuestionIndex.value = index;
    resultArray.value[index].right = itemIndex;
  }

  function setTitle(index: number): void {
    resultArray.value[index].title = resultArray.value[index].title.replace(
      /\s/g,
      ""
    );
  }

  function setOptions(index: number): void {
    if (resultArray.value[index].options.length > 0) {
      let optionsNumber = 1;
      for (let i = 0; i < resultArray.value[index].options.length; i++) {
        if (resultArray.value[index].options.charAt(i) == "\n") optionsNumber++;
      }
      resultArray.value[index].optionsNumber = optionsNumber;
    } else {
      resultArray.value[index].optionsNumber = 0;
    }
  }

  return {
    getLabel,
    getRight,
    setTitle,
    setOptions,
  };
}

import { storeToRefs } from "pinia";
import { toRaw } from "vue";
import Position from "../../common/class/Position";
import Result from "../../common/class/Result";
import useTotalStore, { PDFContent } from "../../store/TotalStore";

interface ResultInterface {
  getActiveQuestion: (index: number) => void;
  getActive: (index: number) => void;
  deleteQuestion: (index: number) => void;
  copyQuestion: (index: number) => void;
  addQuestion: (index: number) => void;
}

function useOperateResult(): ResultInterface {
  const { activeQuestionIndex, resultArray } = storeToRefs(
    useTotalStore()
  ) as unknown as PDFContent;

  function getActive(index: number): void {
    activeQuestionIndex.value = index;
  }

  function getActiveQuestion(index: number): void {
    activeQuestionIndex.value = index;
    (document.getElementById("result") as HTMLElement).scrollTop = (
      document.querySelector("#result_question-" + index) as HTMLElement
    ).offsetTop;
    // console.log(document.getElementById("result"));
  }

  function deleteQuestion(index: number): void {
    if (index == resultArray.value.length - 1 && index !== 0) {
      activeQuestionIndex.value--;
      resultArray.value.splice(activeQuestionIndex.value + 1, 1);
    } else {
      resultArray.value.splice(index, 1);
    }
  }

  function copyQuestion(index: number): void {
    const newResult = JSON.parse(
      JSON.stringify(toRaw(resultArray.value[index]))
    );
    newResult.position = new Position();
    // console.log(newResult);
    resultArray.value.splice(index + 1, 0, newResult);
  }

  function addQuestion(index: number): void {
    const newResult = new Result();
    resultArray.value.splice(index + 1, 0, newResult);
  }

  return {
    getActiveQuestion,
    getActive,
    deleteQuestion,
    copyQuestion,
    addQuestion,
  };
}

export default useOperateResult;

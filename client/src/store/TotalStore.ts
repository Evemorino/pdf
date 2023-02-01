import { defineStore, StoreDefinition } from "pinia";
import { Ref, ref, watch } from "vue";
import Advance from "../common/class/Adavance";
import Result from "../common/class/Result";

const useTotalStore: StoreDefinition = defineStore("total", function () {
  const token = ref<string>("");

  const pdfData = ref<string>();
  const totalPageNumber = ref<number[]>([]);
  const activePageIndex = ref<number>(-1);
  const activeType = ref<number>(1);
  const activeQuestionIndex = ref<number>(0);
  const pauseFlag = ref<boolean>(false);

  const resultArray = ref<Array<Result>>([]);
  const advanceArray = ref<Array<Advance>>([]);

  // function clearLocalStorage(): void {
  //   for (let i = 0; i < totalPageNumber.value.length; i++) {
  //     localStorage.removeItem(`pageData${i}`);
  //   }
  // }

  function initValue(): void {
    // clearLocalStorage();
    totalPageNumber.value = [];
    activePageIndex.value = -1;
    activeType.value = 1;
    activeQuestionIndex.value = 0;
    resultArray.value = [];
    advanceArray.value = [];
  }

  function initPage(): void {
    pauseFlag.value = false;
    activeType.value = 1;
    resultArray.value = [];
    advanceArray.value = [];
  }

  function initType(): void {
    pauseFlag.value = false;
    resultArray.value = [];
    advanceArray.value = [];
  }

  watch(pdfData, () => {
    const token = localStorage.getItem("token");
    localStorage.clear();
    localStorage.setItem("token", token as string);
    initValue();
  });

  return {
    token,

    pdfData,
    totalPageNumber,
    activePageIndex,
    activeType,
    activeQuestionIndex,
    pauseFlag,

    resultArray,
    advanceArray,

    initPage,
    initType,
    initValue,
  };
});
export default useTotalStore;

export interface Token {
  token: Ref<string>;
}

export interface PDF {
  pdfData: Ref<string>;
  totalPageNumber: Ref<number[]>;
  activePageIndex: Ref<number>;
}

export interface TotalPage {
  totalPageNumber: Ref<number[]>;
}

export interface ActiveQuestion {
  activeQuestionIndex: Ref<number>;
}

export interface PDFPage {
  pdfData: Ref<string>;
  totalPageNumber: Ref<number[]>;
}

export interface PDFActive {
  totalPageNumber: Ref<number[]>;
  activePageIndex: Ref<number>;
}

export interface PDFActivePage {
  totalPageNumber: Ref<number[]>;
  activePageIndex: Ref<number>;
  activeType: Ref<number>;
}

export interface PDFTotalPage {
  pdfData: Ref<string>;
  totalPageNumber: Ref<number[]>;
  activePageIndex: Ref<number>;
}

export interface ActiveType {
  activeType: Ref<number>;
  activePageIndex: Ref<number>;
  pauseFlag: Ref<boolean>;
  totalPageNumber: Ref<number[]>;
}

export interface ActivePDFPage {
  pdfData: Ref<string>;
  activePageIndex: Ref<number>;
}

export interface ResultStore {
  resultArray: Ref<Array<Result>>;
}

export interface AnalyzeStore {
  resultArray: Ref<Array<Result>>;
  advanceArray: Ref<Array<Advance>>;
  activeType: Ref<number>;
  pauseFlag: Ref<boolean>;
}

export interface LocalStorageStore {
  resultArray: Ref<Array<Result>>;
  advanceArray: Ref<Array<Advance>>;
  activePageIndex: Ref<number>;
}

export interface PDFContent {
  totalPageNumber: Ref<number[]>;
  activePageIndex: Ref<number>;
  activeQuestionIndex: Ref<number>;
  resultArray: Ref<Array<Result>>;
  advanceArray: Ref<Array<Advance>>;
}

export interface ResultContent {
  activeQuestionIndex: Ref<number>;
  resultArray: Ref<Array<Result>>;
}

export interface All {
  pdfData: Ref<string>;
  totalPageNumber: Ref<number[]>;
  activePageIndex: Ref<number>;
  activeType: Ref<number>;
}

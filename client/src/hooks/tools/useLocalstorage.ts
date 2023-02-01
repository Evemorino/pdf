import { storeToRefs } from "pinia";
import Advance from "../../common/class/Adavance";
import Result from "../../common/class/Result";
import useTotalStore, { LocalStorageStore } from "../../store/TotalStore";

interface ResultInterface {
  getLocal(type: number): boolean;
  setLocal(type: number): void;
  getStorage(page: number): LocalItem;
}

export interface LocalItem {
  [x: string]: unknown;
  paperCut: Array<Result>;
  paperStruct: Array<Result>;
  advance: Array<Advance>;
  paperCutFlag: boolean;
  advanceFlag: boolean;
  paperStructFlag: boolean;
}

export default function useLocalStorage(): ResultInterface {
  const TypeMapGetFunction = new Map<number, Function>([
    [1, setEduPaperCut],
    [2, setPaperStruct],
  ]);
  const TypeMapItemFlag = new Map<number, string>([
    [1, "paperCutFlag"],
    [2, "paperStructFlag"],
  ]);
  const TypeMapSetFunction = new Map<number, Function>([
    [1, setEduPaperCutLocal],
    [2, setEduPaperStructedLocal],
  ]);

  const { resultArray, advanceArray, activePageIndex } = storeToRefs(
    useTotalStore()
  ) as unknown as LocalStorageStore;

  function getLocal(type: number): boolean {
    const localItem = getStorage(activePageIndex.value);
    setAdvance(localItem);
    (TypeMapGetFunction.get(type) as Function)(localItem);
    return localItem[TypeMapItemFlag.get(type) as string] as boolean;
  }

  function setAdvance(local: LocalItem): void {
    if (local.advanceFlag) {
      advanceArray.value = local.advance;
    } else {
      advanceArray.value = [];
    }
  }

  function setEduPaperCut(local: LocalItem): void {
    if (local.paperCutFlag) {
      resultArray.value = local.paperCut;
    } else {
      resultArray.value = [];
    }
  }

  function setPaperStruct(local: LocalItem): void {
    if (local.paperStructFlag) {
      resultArray.value = local.paperStruct;
    } else {
      resultArray.value = [];
    }
  }

  function getStorage(page: number): LocalItem {
    const temp = JSON.parse(localStorage.getItem(`pageData${page}`) as string);
    let localItem: LocalItem;
    if (temp) {
      localItem = temp;
    } else {
      localItem = {
        paperCut: [],
        paperStruct: [],
        advance: [],
        paperCutFlag: false,
        advanceFlag: false,
        paperStructFlag: false,
      };
    }
    return localItem;
  }

  function setLocal(type: number): void {
    const localItem = getStorage(activePageIndex.value);
    setAdcanceLocal(localItem);
    (TypeMapSetFunction.get(type) as Function)(localItem);
    localStorage.setItem(
      `pageData${activePageIndex.value}`,
      JSON.stringify(localItem)
    );
  }

  function setAdcanceLocal(local: LocalItem): void {
    local.advance = advanceArray.value;
    local.advanceFlag = true;
  }

  function setEduPaperCutLocal(local: LocalItem): void {
    local.paperCut = resultArray.value;
    local.paperCutFlag = true;
  }

  function setEduPaperStructedLocal(local: LocalItem): void {
    local.paperStruct = resultArray.value;
    local.paperStructFlag = true;
  }

  return {
    getLocal,
    setLocal,
    getStorage,
  };
}

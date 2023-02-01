import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import useTotalStore, { ActiveType } from "../../store/TotalStore";
import useLocalStorage from "../tools/useLocalstorage";

interface Result {
  getItem: (index: number) => void;
  getTypes: (type: number, index: number) => void;
}

function useChangeNav(): Result {
  const store = useTotalStore();
  const { activeType, activePageIndex, pauseFlag, totalPageNumber } =
    storeToRefs(store) as unknown as ActiveType;
  const { setLocal } = useLocalStorage();

  /**
   * 设置页码
   * @param index 页码
   */
  function getItem(index: number): void {
    if (judgePagesIndex(index) && judgePause()) {
      setLocal(activeType.value);
      activePageIndex.value = index;
      store.initPage();
    }
    // if (pauseFlag.value) {

    // } else {
    //   ElMessage({
    //     message: "正在识别结果",
    //   });
    // }
  }

  /**
   * 设置分析方式
   * @param type 搜索方式
   */
  function getTypes(type: number, index: number): void {
    if (judgeTypesIndex(index, type) && judgePause()) {
      setLocal(activeType.value);
      activePageIndex.value = index;
      activeType.value = type;
      totalPageNumber.value[activePageIndex.value] = activeType.value;
      store.initType();
    }
    // if (pauseFlag.value && activeType.value !== totalPageNumber.value[index]) {

    // } else {
    //   ElMessage({
    //     message: "正在识别结果",
    //   });
    // }
  }

  function judgePagesIndex(index: number): boolean {
    if (activePageIndex.value !== index) {
      return true;
    } else {
      return false;
    }
  }

  function judgeTypesIndex(index: number, type: number): boolean {
    if (activePageIndex.value !== index) {
      return true;
    } else if (activeType.value !== type) {
      return true;
    } else {
      return false;
    }
  }

  function judgePause(): boolean {
    if (!pauseFlag.value) {
      ElMessage({
        message: "正在识别结果",
      });
    }
    return pauseFlag.value;
  }

  return {
    getItem,
    getTypes,
  };
}

export default useChangeNav;

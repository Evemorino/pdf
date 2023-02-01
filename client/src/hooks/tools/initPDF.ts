import { storeToRefs } from "pinia";
import useTotalStore, { PDFActive } from "../../store/TotalStore";

interface Result {
  setTotalPage: (page: number) => void;
  setActivePage: (index: number) => void;
}

function initPDF(): Result {
  const { totalPageNumber, activePageIndex } = storeToRefs(
    useTotalStore()
  ) as unknown as PDFActive;

  /**
   * 设置总页码数
   * @param page  总页码数
   */
  function setTotalPage(page: number): void {
    totalPageNumber.value.length = page;
    for (let i = 0; i < totalPageNumber.value.length; i++) {
      totalPageNumber.value[i] = 1;
    }
  }

  /**
   * 设置显示页码
   * @param index 页码
   */
  function setActivePage(index: number): void {
    activePageIndex.value = index;
  }

  return {
    setTotalPage,
    setActivePage,
  };
}

export default initPDF;

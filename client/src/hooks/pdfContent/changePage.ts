import { ElMessage } from "element-plus";
import { storeToRefs } from "pinia";
import useTotalStore, { PDFActive } from "../../store/TotalStore";

interface Result {
  Previous: () => void;
  Next: () => void;
}

function useChangePage(): Result {
  const { activePageIndex, totalPageNumber } = storeToRefs(
    useTotalStore()
  ) as unknown as PDFActive;
  /**
   * 向前
   */
  function Previous(): void {
    if (activePageIndex.value >= 1) {
      activePageIndex.value--;
    } else {
      ElMessage({
        message: "已到第一页",
      });
    }
  }

  /**
   * 向后
   */
  function Next(): void {
    if (activePageIndex.value < totalPageNumber.value.length - 1) {
      activePageIndex.value++;
    } else {
      ElMessage({
        message: "已到最后一页",
      });
    }
  }

  return {
    Previous,
    Next,
  };
}

export default useChangePage;

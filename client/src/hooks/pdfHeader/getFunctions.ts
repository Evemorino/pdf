import { ElMessage, ElMessageBox } from "element-plus";
import { storeToRefs } from "pinia";
import { Ref } from "vue";
import Result from "../../common/class/Result";
import useTotalStore, { PDF } from "../../store/TotalStore";
import exportFile from "../../utils/xlxs";
import useLocalstorage from "../tools/useLocalstorage";

interface ResultInterface {
  getPDF(): void;
  getExcel(): Promise<void>;
  getDownload(): void;
}

interface ExcelContent {
  sheet: any[];
  title: string;
}

interface excelQuestion {
  // [x: string]: string;
  题干: string | null;
  选项A: string | null;
  选项B: string | null;
  选项C: string | null;
  选项D: string | null;
  选项E: string | null;
  选项F: string | null;
  选项G: string | null;
  答案: string | null;
  试卷解析: string | null;
}

export default function useGetPDF(
  importFile: Ref<HTMLElement | null>
): ResultInterface {
  const { pdfData, totalPageNumber, activePageIndex } = storeToRefs(
    useTotalStore()
  ) as unknown as PDF;
  const { getStorage, setLocal } = useLocalstorage();

  const TypeMapItemFlag = new Map<number, string>([
    [1, "paperCutFlag"],
    [2, "paperStructFlag"],
  ]);

  const TypeMapArray = new Map<number, string>([
    [1, "paperCut"],
    [2, "paperStruct"],
  ]);

  const ExcelItemMap = new Map<number, string>([
    [0, "选项A"],
    [1, "选项B"],
    [2, "选项C"],
    [3, "选项D"],
    [4, "选项E"],
    [5, "选项F"],
    [6, "选项G"],
  ]);

  const ExcelRightMap = new Map<number, string>([
    [1, "A"],
    [2, "B"],
    [3, "C"],
    [4, "D"],
    [5, "E"],
    [6, "F"],
    [7, "G"],
  ]);

  function getPDF(): void {
    // window.location.reload();
    const filesData = (importFile.value as any).files[0];
    const reader = new FileReader();
    reader.readAsDataURL(filesData);
    reader.onload = async function (e) {
      if (this.result) {
        pdfData.value = atob(
          (this.result as string).substring(
            (this.result as string).indexOf(",") + 1
          )
        );
      }
    };
  }

  async function getExcel(): Promise<void> {
    if (pdfData.value) {
      setLocal(totalPageNumber.value[activePageIndex.value]);
      const { sheet, title } = checkExcel();
      confirmExcel(sheet, title);
    } else {
      ElMessage({
        message: "未导入pdf文件",
      });
    }
  }

  function checkExcel(): ExcelContent {
    const sheet: any[] = [];
    let noRenderNumber = 0;
    for (let i = 0; i < totalPageNumber.value.length; i++) {
      const localItem = getStorage(i);
      const flag =
        localItem[TypeMapItemFlag.get(totalPageNumber.value[i]) as string];
      const resultArray: Result[] = localItem[
        TypeMapArray.get(totalPageNumber.value[i]) as string
      ] as Result[];
      if (flag) {
        resultArray.forEach((value) => {
          sheet.push(createQuestionItem(value));
        });
      } else {
        noRenderNumber++;
      }
    }
    const title =
      noRenderNumber !== 0 ? `还有${noRenderNumber}页没有获取到数据` : "";
    return {
      sheet: sheet,
      title: title,
    };
  }

  function createQuestionItem(value: Result): excelQuestion {
    const item = {
      题干: "",
      选项A: "",
      选项B: "",
      选项C: "",
      选项D: "",
      选项E: "",
      选项F: "",
      选项G: "",
      答案: "",
      试卷解析: "",
    } as excelQuestion;
    item["题干"] = value.title;
    item["答案"] = ExcelRightMap.get(value.right)
      ? (ExcelRightMap.get(value.right) as string)
      : "";
    const valueArray = value.options.split("\n");
    valueArray.forEach((value, index) => {
      createItem(item, index, value);
    });
    return item;
  }

  function createItem(item: excelQuestion, index: number, value: string): void {
    switch (index) {
      case 0:
        item["选项A"] = value;
        break;
      case 1:
        item["选项B"] = value;
        break;
      case 2:
        item["选项C"] = value;
        break;
      case 3:
        item["选项D"] = value;
        break;
      case 4:
        item["选项E"] = value;
        break;
      case 5:
        item["选项F"] = value;
        break;
      case 6:
        item["选项G"] = value;
        break;
    }
  }

  async function confirmExcel(sheet: any, title: string): Promise<void> {
    try {
      await ElMessageBox.confirm(`${title}确认要导出Excel吗`, "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
      });
      exportFile(sheet, "选择题");
    } catch (error) {
      console.log(error);
    }
  }

  function getDownload(): void {
    const testCanvas = document.getElementById(
      "main-canvas"
    ) as HTMLCanvasElement;
    const link = document.createElement("a") as HTMLAnchorElement;
    link.download = new Date().getTime() + ".png";
    link.href = testCanvas.toDataURL("image/png");
    link.click();
  }

  return {
    getPDF,
    getExcel,
    getDownload,
  };
}

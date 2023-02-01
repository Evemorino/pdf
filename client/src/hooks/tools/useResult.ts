import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import Result from "../../common/class/Result";
import Advance from "../../common/class/Adavance";
import Position from "../../common/class/Position";
import {
  imageUrl,
  eduPaperCut,
  eduPaperStructed,
  advanced,
} from "../../common/request/api";
import useTotalStore, { AnalyzeStore } from "../../store/TotalStore";
import {
  createEduPaperCutContent,
  createEduPaperStructContent,
} from "../../utils/makeResult";
import { createAdavanceContent } from "../../utils/makeAdvance";
import useLocalstorage from "./useLocalstorage";
import { ElMessage } from "element-plus";
import router from "../../router";

interface ResultInterface {
  makeResult: () => Promise<void>;
}

function useResult(): ResultInterface {
  const url = ref<string>("");

  const { setLocal, getLocal } = useLocalstorage();

  const { resultArray, advanceArray, activeType, pauseFlag } = storeToRefs(
    useTotalStore()
  ) as unknown as AnalyzeStore;

  const typeMap = new Map<number, Function>([
    [1, getEduPaperCut],
    [2, getEduPaperStructed],
  ]);

  async function makeResult(): Promise<void> {
    await getImageUrl();
    if (!getLocal(activeType.value)) {
      await getAdvanced();
      await (typeMap.get(activeType.value) as Function)();
      setLocal(activeType.value);
    }
    pauseFlag.value = true;

    //测试
    // setEduPaperCutContent(localStorage.getItem("edupaperCut") as string);
    // setAdvancedContent(localStorage.getItem("advanced") as string);
    // setEduPaperStructedContent(
    //   localStorage.getItem("eduPaperStructed") as string
    // );
    // localStorage.setItem("testPage", JSON.stringify(localItem));
  }

  /**
   * 获取canvas数据
   * @returns canvas数据
   */
  function getCanvasData(): string {
    const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    return canvas.toDataURL("image/png");
  }

  async function getImageUrl(): Promise<void> {
    try {
      url.value = ((await imageUrl(getCanvasData())) as any).fullurl;
      console.log(url.value);
    } catch (error) {
      console.log(error);
      ElMessage({
        message: "登录过期，需要重新登陆",
      });
      router.push("./login");
    }
  }

  async function getEduPaperCut(): Promise<void> {
    try {
      if (url.value) {
        const data = await eduPaperCut(url.value);
        setEduPaperCutContent((data as any).body.data);
        console.log(JSON.parse((data as any).body.data));
        // localStorage.setItem("edupaperCut", (data as any).body.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getEduPaperStructed(): Promise<void> {
    try {
      if (url.value) {
        const data = await eduPaperStructed(url.value);
        setEduPaperStructedContent((data as any).body.data);
        console.log(JSON.parse((data as any).body.data));
        // localStorage.setItem("eduPaperStructed", (data as any).body.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getAdvanced(): Promise<void> {
    try {
      if (url.value) {
        const data = await advanced(url.value);
        setAdvancedContent((data as any).body.data);
        console.log(JSON.parse((data as any).body.data));
        // localStorage.setItem("advanced", (data as any).body.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function setEduPaperCutContent(jsonData: string): void {
    const data = JSON.parse(jsonData);
    const list = data.page_list[0].subject_list;
    for (let i = 0; i < list.length; i++) {
      const { title, options, optionsNumber, flag } = createEduPaperCutContent(
        list[i].prism_wordsInfo
      );
      if (flag) {
        const position = new Position(list[i].content_list_info[0].pos);
        resultArray.value.push(
          new Result({
            position: position,
            title: title,
            options: options,
            optionsNumber: optionsNumber,
          })
        );
      }
    }
  }

  function setAdvancedContent(jsonData: string): void {
    const data = JSON.parse(jsonData);
    const list = data.prism_wordsInfo;
    for (let i = 0; i < list.length; i++) {
      const { flag, text } = createAdavanceContent(list[i]);
      if (flag) {
        const position = new Position(list[i].pos);
        advanceArray.value.push(
          new Advance({
            position: position,
            text: text,
          })
        );
      }
    }
  }

  function setEduPaperStructedContent(jsonData: string): void {
    const data = JSON.parse(jsonData);
    for (let j = 0; j < data.part_info.length; j++) {
      const list = data.part_info[j].subject_list;
      for (let i = 0; i < list.length; i++) {
        if ([0, 9].includes(list[i].type)) {
          const { title, options, optionsNumber, flag } =
            createEduPaperStructContent(list[i].element_list);
          if (flag) {
            const position = new Position(list[i].pos_list[0]);
            resultArray.value.push(
              new Result({
                position: position,
                title: title,
                options: options,
                optionsNumber: optionsNumber,
              })
            );
          }
        }
      }
    }
  }

  watch(activeType, async () => {
    if (!getLocal(activeType.value)) {
      await getImageUrl();
      await (typeMap.get(activeType.value) as Function)();
      setLocal(activeType.value);
    }
    pauseFlag.value = true;
  });

  return {
    makeResult,
  };
}

export default useResult;

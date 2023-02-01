import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";
import {
  PDFDocumentProxy,
  PDFPageProxy,
  RenderParameters,
} from "pdfjs-dist/types/src/display/api";
import useTotalStore, { PDF } from "../../store/TotalStore";
import { storeToRefs } from "pinia";
import { watch } from "vue";
import useInitPDF from "../tools/initPDF";

interface Result {}

function useSetNav(): Result {
  let pdfTarget: PDFDocumentProxy; // pdfPromise对象
  //pdf总数据
  const { pdfData } = storeToRefs(useTotalStore()) as unknown as PDF;
  //引入初始化设置
  const { setTotalPage, setActivePage } = useInitPDF();

  /**
   * 设置全部数据
   */
  async function setMain(): Promise<void> {
    //获取数据
    pdfTarget = await pdfjs.getDocument({ data: pdfData.value }).promise;
    //设置
    setTotalPage(pdfTarget.numPages);
    setActivePage(0);
    //渲染
    await renderNav();
  }

  /**
   * 渲染nav
   */
  async function renderNav(): Promise<void> {
    for (let i = 0; i < pdfTarget.numPages; i++) {
      const pdfPage = await pdfTarget.getPage(i + 1);
      const renderContext = setRenderContext(pdfPage, i + 1);
      await pdfPage.render(renderContext).promise;
    }
  }

  /**
   * 设置渲染对象
   * @param page 页面pdf对象
   * @param i 页码
   * @returns 页面pdf设置对象
   */
  function setRenderContext(page: PDFPageProxy, i: number): RenderParameters {
    let canvas = document.getElementById(
      "nav-canvas-" + i
    ) as HTMLCanvasElement;
    let viewport = page.getViewport({ scale: 0.15 });
    let context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    return {
      canvasContext: context,
      viewport: viewport,
    } as RenderParameters;
  }

  /**
   * 初始化
   */
  watch(pdfData, () => {
    setMain();
  });

  return {};
}

export default useSetNav;

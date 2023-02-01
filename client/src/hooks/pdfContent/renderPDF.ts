import { ref, Ref, watch } from "vue";
import * as pdfjs from "pdfjs-dist";
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";
import { TextLayerBuilder } from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";
import {
  PDFDocumentProxy,
  RenderParameters,
  PDFPageProxy,
  TextContent,
} from "pdfjs-dist/types/src/display/api";
import useTotalStore, { ActivePDFPage } from "../../store/TotalStore";
import { storeToRefs } from "pinia";
import useResult from "../tools/useResult";

interface Result {
  PDFHeightValue: Ref<number>;
  PDFWidthValue: Ref<number>;
}

function useRenderPDF(): Result {
  const PDFHeightValue = ref<number>(0);
  const PDFWidthValue = ref<number>(0);

  const scaledValue: number = 2;

  let pdfTarget: PDFDocumentProxy;
  let pdfMainPage: PDFPageProxy;
  let textContent: TextContent;

  const { activePageIndex, pdfData } = storeToRefs(
    useTotalStore()
  ) as unknown as ActivePDFPage;

  const { makeResult } = useResult();

  /**
   *
   */
  async function renderMainPage(): Promise<void> {
    if (pdfData.value !== "") {
      //获取pdf数据
      pdfTarget = await pdfjs.getDocument({
        data: pdfData.value,
        cMapUrl: "https://unpkg.com/pdfjs-dist@2.14.305/cmaps/",
        cMapPacked: true,
      }).promise;
      //渲染pdf
      pdfMainPage = await pdfTarget.getPage(activePageIndex.value + 1);
      const renderContext = setRenderContext(pdfMainPage);
      await pdfMainPage.render(renderContext).promise;
      //渲染文本
      textContent = await pdfMainPage.getTextContent();
      deleteText();
      await renderText(textContent, pdfMainPage);
      //获取数据
      await makeResult();
    }
  }

  /**
   * 删除文本节点
   */
  function deleteText(): void {
    const target = document.querySelector(".textLayer") as HTMLElement;
    while (target.hasChildNodes()) {
      target.removeChild(target.firstChild as ChildNode);
    }
  }

  /**
   * 渲染本文
   * @param text 文本对象
   * @param page PDF对象
   */
  async function renderText(
    text: TextContent,
    page: PDFPageProxy
  ): Promise<void> {
    let viewport = page.getViewport({ scale: scaledValue });
    let textLayer = new TextLayerBuilder({
      textLayerDiv: document.querySelector(".textLayer") as HTMLElement,
      pageIndex: page._pageIndex,
      viewport: viewport,
      eventBus: null, //修改
    });
    textLayer.setTextContent(text);
    textLayer.render();
  }

  /**
   *  设置pdf渲染对象
   * @param page pdf每页对象
   * @returns  pdf渲染设置对象
   */
  function setRenderContext(page: PDFPageProxy): RenderParameters {
    const canvas = document.getElementById("main-canvas") as HTMLCanvasElement;
    const viewport = page.getViewport({ scale: scaledValue });
    const context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    /**设置 */
    setViewportBox(viewport.width, viewport.height);

    return {
      canvasContext: context,
      viewport: viewport,
    } as RenderParameters;
  }

  /**
   * 设置viewport盒子
   * @param width 宽度
   * @param height 高度
   */
  function setViewportBox(width: number, height: number): void {
    PDFHeightValue.value = height;
    PDFWidthValue.value = width;
  }

  watch(activePageIndex, () => {
    if (activePageIndex.value >= 0) {
      renderMainPage();
    }
  });

  return {
    PDFHeightValue,
    PDFWidthValue,
  };
}

export default useRenderPDF;

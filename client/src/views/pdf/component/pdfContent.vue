<template>
  <section
    class="pdf"
    @mousewheel="scalePDF"
    @mousedown.left="startLeftOperatePDF"
    @mousedown.right="startRightOperatePDF"
    @mousemove="operatePDF"
    @mouseup="stopOperatePDF"
  >
    <div class="pdf_view">
      <div
        class="pdf_page"
        :style="{
          top: topValue + 'px',
          left: leftValue + 'px',
          width: PDFWidthValue + 'px',
          height: PDFHeightValue + 'px',
          transform: 'scale(' + scaledValue + ')',
        }"
      >
        <canvas id="main-canvas"></canvas>

        <div :class="{ textLayer: true, totop: copyFlag }"></div>

        <div class="pdf_judge">
          <div
            class="pdf_judge_item"
            v-for="(value, index) in advanceArray"
            :key="index"
            :style="{
              height: value.position.height + 'px',
              width: value.position.width + 'px',
              top: value.position.top + 'px',
              left: value.position.left + 'px',
            }"
          ></div>
        </div>

        <div class="pdf_result">
          <div
            v-for="(value, index) in resultArray"
            :class="{
              pdf_result_item: true,
              pdf_result_item_active: activeQuestionIndex == index,
            }"
            :key="index"
            :style="{
              height: value.position.height + 'px',
              width: value.position.width + 'px',
              top: value.position.top + 'px',
              left: value.position.left + 'px',
            }"
            @mousedown.left="getActiveQuestion(index)"
          >
            <span class="watermarked">{{ index + 1 }}</span>
          </div>
        </div>
      </div>
    </div>
    <footer class="pdf_controller">
      <section class="pdf_controller_progress">
        <el-slider
          :max="2"
          :min="0.1"
          :step="0.1"
          :show-tooltip="true"
          v-model="scaledValue"
        />
      </section>

      <section class="pdf_controller_button">
        <div class="pdf_controller_button_previous" @click="Previous"></div>
        <div>{{ activePageIndex + 1 }}/{{ totalPageNumber.length }}</div>
        <div class="pdf_controller_button_next" @click="Next"></div>
      </section>
    </footer>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElSlider } from "element-plus";
import { storeToRefs } from "pinia";
import useTotalStore, { PDFContent } from "../../../store/TotalStore";
import useChangePage from "../../../hooks/pdfContent/changePage";
import useScaledPDF from "../../../hooks/pdfContent/scaledPDF";
import useRenderPDF from "../../../hooks/pdfContent/renderPDF";
import useOperatePDF from "../../../hooks/pdfContent/operatePDF";
import useOperateResult from "../../../hooks/pdfResult/operateResult";

export default defineComponent({
  name: "pdf-content",
  components: {
    "el-slider": ElSlider,
  },
  setup(props, context) {
    const store = useTotalStore();
    const {
      totalPageNumber,
      activePageIndex,
      activeQuestionIndex,
      resultArray,
      advanceArray,
    } = storeToRefs(store) as unknown as PDFContent;
    const { scaledValue, scalePDF } = useScaledPDF();
    const { Previous, Next } = useChangePage();
    const { PDFHeightValue, PDFWidthValue } = useRenderPDF();
    const {
      leftValue,
      topValue,
      copyFlag,
      startLeftOperatePDF,
      startRightOperatePDF,
      operatePDF,
      stopOperatePDF,
    } = useOperatePDF();
    const { getActiveQuestion } = useOperateResult();

    return {
      totalPageNumber,
      activePageIndex,
      activeQuestionIndex,
      resultArray,
      advanceArray,

      PDFHeightValue,
      PDFWidthValue,

      leftValue,
      topValue,

      copyFlag,

      startLeftOperatePDF,
      startRightOperatePDF,
      operatePDF,
      stopOperatePDF,

      scaledValue,
      scalePDF,

      Previous,
      Next,

      getActiveQuestion,
    };
  },
});
</script>

<style lang="css" scoped>
.pdf {
  /* overflow: hidden; */
  position: relative;
  z-index: 0;
}
.pdf_view {
  width: 100%;
  height: 90%;
  overflow: hidden;
  text-align: center;
  position: relative;
  z-index: 0;
}
.pdf_mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  cursor: move;
  background-color: transparent;
}
.pdf_page {
  position: absolute;
  z-index: 0;
  transform-origin: 50% 50%;
}
.pdf_page > canvas {
  position: relative;
  z-index: 1;
}
.textLayer {
  z-index: 2;
}
.totop {
  z-index: 4;
}
.pdf_controller {
  width: 100%;
  height: 10%;
  position: relative;
  z-index: 0;
  overflow: hidden;
  text-align: center;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.pdf_controller_progress {
  width: 200px;
  font-size: 12px;
  padding: 1em 2em;
  position: relative;
  z-index: 0;
  margin: 0 auto;
  overflow: hidden;
}
/* .pdf_controller_progress_line{ width: 100%; height: 6px; border-radius: 2px; background-color: #e4e4e4; position: relative; z-index: 0; } */
/* .pdf_controller_progress_icon{ box-sizing: border-box; width: 1.5em; height: 1.5em; border-radius: 50%; border: 3px solid #ababab; position: absolute; z-index: 1; top: 0.5em; left: 0; } */
/* .pdf_controller_progress_mask{ width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 2; } */
.pdf_controller_button {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  color: rgba(16, 16, 16, 1);
  z-index: 0;
  gap: 1em;
}
.pdf_controller_button_previous {
  width: 2em;
  height: 2em;
  background: url(../../../assets/left.png) center/cover no-repeat;
}
.pdf_controller_button_next {
  width: 2em;
  height: 2em;
  background: url(../../../assets/right.png) center/cover no-repeat;
}
.cursor {
  position: absolute;
}
.pdf_result {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
}
.pdf_result_item {
  position: absolute;
  box-shadow: 0 0 1px 1px #04a3be;
  background-color: transparent;
}

.pdf_result_item_active {
  background-color: rgba(0, 161, 191, 0.2);
  box-shadow: 0 0 1px 1px rgba(4, 163, 190, 0.5);
}
.pdf_judge {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
.pdf_judge_item {
  position: absolute;
  /* border-bottom: 1px solid red; */
  /* color: red; */
  background-color: red;
  opacity: 0.2;
}
.pdf_progress {
  position: absolute;
  width: 1em;
  height: 1em;
  /* background-color: rgba(16, 16, 16, 1); */
  top: 0;
  left: 0;
  z-index: 5;
  border-radius: 50%;
  overflow: hidden;
  border: 0.3em solid rgba(0, 161, 191, 1);
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30%, 50% 50%);
  animation: progress 0.5s infinite;
}
.watermarked {
  position: absolute;
  z-index: -1;
  font-size: 30px;
  font-weight: bold;
  color: rgba(16, 16, 16, 0.3);
  top: 50%;
  left: 0%;
  transform: translate(-100%, -50%);
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.double_recognize {
  display: none;
}
.recognize_dividingLine {
  height: 100%;
  width: 100%;
  /* background-color: brown; */
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
}
.recognize_dividingLine_line {
  position: absolute;
  height: 100%;
  width: 4px;
  background-color: brown;
  top: 0;
  cursor: pointer;
}
</style>

<template>
  <header class="header">
    <label class="header_button header_button_importPDF">
      <div class="header_button_image"></div>
      <div class="header_button_content importPDF">
        导入PDF
        <input
          ref="importFile"
          id="importPDF_input"
          class="importPDF_input"
          type="file"
          accept="application/pdf"
          @change="getPDF"
        />
      </div>
    </label>

    <label
      class="header_button header_button_exportExcel"
      @click="getExcel"
      ref="exportFile"
    >
      <div class="header_button_image"></div>
      <div class="header_button_content exportExcel">导出excel</div>
    </label>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import useGetPDF from "../../../hooks/pdfHeader/getFunctions";

export default defineComponent({
  setup(props, context) {
    const importFile = ref<HTMLInputElement | null>(null); //输入按钮
    const exportFile = ref<HTMLElement | null>(null); //输出按钮

    const { getPDF, getExcel } = useGetPDF(importFile);

    return {
      importFile,
      exportFile,

      getPDF,
      getExcel,
    };
  },
});
</script>

<style lang="css" scoped>
.header {
  width: 100%;
  height: 3em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1.2em;
  background-color: #1f1f1f;
  color: #fff;
  position: relative;
  z-index: 0;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.header_button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 2em;
  cursor: pointer;
}
.header_button_image {
  width: 2em;
  height: 2em;
}
.header_button_importPDF > .header_button_image {
  background: url(../../../assets/import.png) center/cover no-repeat;
}
.header_button_exportExcel > .header_button_image {
  background: url(../../../assets/export.png) center/cover no-repeat;
}
.selectInput {
  border-radius: 1em;
  margin-left: 1em;
}
</style>

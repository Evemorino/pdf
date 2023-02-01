<template>
  <nav class="nav">
    <div
      :class="{ nav_item: true, nav_item_active: index == activePageIndex }"
      v-for="(value, index) in totalPageNumber"
      :key="index"
      @click.stop="getItem(index)"
    >
      <canvas :id="`nav-canvas-${index + 1}`"></canvas>
      <a>{{ index + 1 }}</a>
      <div class="nav_item_popup">
        <div
          :class="{
            nav_item_popup_item: true,
            nav_item_popup_item_active:
              index == activePageIndex && activeType == 1,
          }"
          @click.stop="getTypes(1, index)"
        >
          切题识别
        </div>
        <div
          :class="{
            nav_item_popup_item: true,
            nav_item_popup_item_active:
              index == activePageIndex && activeType == 2,
          }"
          @click.stop="getTypes(2, index)"
        >
          结构识别
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import useTotalStore, { PDFActivePage } from "../../../store/TotalStore";
import useSetNav from "../../../hooks/pdfNav/setNav";
import useChangeNav from "../../../hooks/pdfNav/changeNav";

export default defineComponent({
  setup(props, context) {
    const { totalPageNumber, activePageIndex, activeType } = storeToRefs(
      useTotalStore()
    ) as unknown as PDFActivePage;
    useSetNav();
    const { getItem, getTypes } = useChangeNav();

    return {
      activePageIndex,
      totalPageNumber,
      activeType,

      getTypes,
      getItem,
    };
  },
});
</script>

<style lang="css" scoped>
.nav {
  flex-shrink: 0;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  width: 15em;
  background-color: #e4e4e4;
  z-index: 0;
  box-shadow: 0 0 2px 2px #e4e4e4;
  position: relative;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.nav_item {
  margin: 2em auto;
  margin-left: 1em;
  color: #101010;
  font-size: 14px;
  /* text-align: center; */
}
.nav_item > canvas {
  position: relative;
  margin: 0 auto;
}
.nav_item_active {
  color: rgba(0, 161, 191, 1);
}
.nav_item_active > canvas {
  box-shadow: 0 0 2px 2px rgba(0, 161, 191, 1);
}
.nav_item > a {
  display: block;
  text-align: center;
  margin-top: 0.5em;
}
.nav_item_popup {
  position: absolute;
  z-index: 1;
  /* background-color: #fff; */
  font-size: 12px;
  /* padding: 1em; */
  top: 0;
  right: 1em;
  color: #101010;
  /* transform: scale(0.833); */
}
.nav_item_popup_header {
  letter-spacing: 0.3em;
}
.nav_item_popup_item {
  margin-top: 2em;
  color: rgba(100, 100, 100, 1);
}
.nav_item_popup_item_active {
  color: rgba(0, 161, 191, 1);
}
.nav_item_popup_item_button {
  color: cadetblue;
  box-shadow: 0 0 1px 1px cadetblue;
  padding: 0.5em 0;
  width: 4em;
  text-align: center;
  margin-top: 2em;
}
.nav_item_popup_item_button:hover {
  box-shadow: 0 0 2px 2px cadetblue;
}
</style>

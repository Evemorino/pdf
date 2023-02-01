<template>
  <pdf-header @contextmenu.prevent="() => {}" @getExcel="() => {}"></pdf-header>
  <section class="section" @contextmenu.prevent="() => {}">
    <asides-nav></asides-nav>
    <div class="content">
      <pdf-content ref="pdf"></pdf-content>
      <pdf-result ref="result"></pdf-result>
    </div>
  </section>
</template>

<script lang="ts">
import { DefineComponent, defineComponent, ref } from "vue";

import pdfContent from "./component/pdfContent.vue";
import pdfResult from "./component/pdfResult.vue";
import pdfHeader from "./component/pdfHeader.vue";
import asidesNav from "./component/asidesNav.vue";

export default defineComponent({
  name: "pdf",
  components: {
    pdfContent,
    pdfResult,
    pdfHeader,
    asidesNav,
  },
  setup() {
    const pdf = ref<DefineComponent>();
    const result = ref<DefineComponent>();

    return {
      result,
      pdf,
    };
  },
});
</script>

<style lang="css" scoped>
.section {
  width: 100%;
  height: calc(100% - 3em);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  z-index: 0;
}

.content {
  width: calc(100% - 15em);
  height: 100%;
  overflow: hidden;
  position: relative;
  z-index: 0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 2%;
}
.content > section {
  width: 46%;
  height: 90%;
  position: relative;
  box-shadow: 0 0 3px 3px rgba(0, 0, 0, 0.16);
  border-radius: 2px;
  position: relative;
  z-index: 0;
  flex-shrink: 0;
  overflow: visible;
}
.content > section::before {
  display: block;
  content: " ";
  position: absolute;
  width: 100%;
  height: 4px;
  top: -4px;
  left: 0;
  background-color: #1f1f1f;
}
/* .content > section:nth-child(1) > section{ width: 100%; height: 100%; position: relative; z-index: 0; overflow: hidden; } */
</style>

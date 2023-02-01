<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    return {};
  },
});
</script>

<style lang="css">
@import url(./style/basic.css);
@import url(element-plus/theme-chalk/el-message.css);
@import url(element-plus/theme-chalk/el-message-box.css);
@import url(element-plus/theme-chalk/el-overlay.css);
</style>

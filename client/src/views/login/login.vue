<template>
  <section class="section">
    <div>
      <h1>登录</h1>
      <div class="input">
        <label>用户名</label>
        <el-input v-model="username" type="text"> </el-input>
      </div>
      <div class="input">
        <label>密码</label>
        <el-input v-model="password" type="password" show-password> </el-input>
      </div>

      <el-button class="button" type="primary" size="large" @click="login">
        登录
      </el-button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElInput, ElButton, ElMessage } from "element-plus";
import axios from "../../utils/axios/axios";
import router from "../../router";
import { storeToRefs } from "pinia";
import useTotalStore, { Token } from "../../store/TotalStore";

export default defineComponent({
  name: "login",
  components: {
    "el-input": ElInput,
    "el-button": ElButton,
  },
  setup() {
    const username = ref<string>("");
    const password = ref<string>("");

    const { token } = storeToRefs(useTotalStore()) as unknown as Token;

    async function login() {
      try {
        const res = (await axios.request({
          url: "http://jpds.evdo.vip/api/user/login",
          method: "POST",
          params: {
            account: username.value,
            password: password.value,
          },
        })) as any;
        console.log(res);
        ElMessage({
          message: res.msg,
        });
        if (res.code == 1) {
          localStorage.setItem("token", res.data.token);
          token.value = res.data.token;
          router.push({ name: "pdf" });
        }
      } catch (error) {
        console.log(error);
      }
    }

    return {
      username,
      password,

      login,
    };
  },
});
</script>

<style lang="css" scoped>
.section {
  width: 20vw;
  padding: 2em;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  box-shadow: 0 0 1px 1px rgba(192, 192, 192, 0.8);
  background-color: #fff;
  border-radius: 1em;
  text-align: center;
}
.section:hover {
  box-shadow: 0 0 3px 3px rgba(192, 192, 192, 0.8);
}
.input {
  margin: 0.5em 0;
  box-shadow: 0 0 1px 1px rgba(192, 192, 192, 0.8);
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.input > label {
  flex-shrink: 0;
  font-size: 14px;
  color: rgba(150, 150, 150, 1);
  width: 5em;
  text-align: center;
}
.button {
  margin-top: 1em;
}
</style>

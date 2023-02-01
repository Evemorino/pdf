<template>
  <section class="outer">
    <div id="result" class="result">
      <section
        :class="{
          result_question: true,
          result_question_active: index == activeQuestionIndex,
        }"
        :id="`result_question-${index}`"
        v-for="(value, index) in resultArray"
        :key="index"
        @click="getActive(index)"
      >
        <div class="result_question_header">
          <h1>题目{{ index + 1 }}</h1>
          <div class="result_question_header_item" @click="copyQuestion(index)">
            复制题目
          </div>
          <div
            class="result_question_header_item"
            @click="deleteQuestion(index)"
          >
            删除题目
          </div>
          <div class="result_question_header_item" @click="addQuestion(index)">
            新建题目
          </div>
        </div>

        <div class="result_question_content">
          <div
            :class="{
              result_question_content_title: true,
              result_question_content_title_active:
                index == activeQuestionIndex,
            }"
          >
            <div class="result_question_content_title_name">题目</div>
            <div class="result_question_content_title_input">
              <el-input
                type="textarea"
                :autosize="true"
                v-model="value.title"
                @input="setTitle(index)"
              ></el-input>
            </div>
          </div>

          <div
            :class="{
              result_question_content_options: true,
              result_question_content_options_active:
                index == activeQuestionIndex,
            }"
          >
            <div class="result_question_content_options_name">
              <div
                :class="{
                  result_question_content_options_name_item: true,
                  result_question_content_options_name_item_right:
                    value.right == options,
                }"
                v-for="(options, optionsIndex) in value.optionsNumber"
                :key="optionsIndex"
                @click.stop="getRight(index, options)"
              >
                {{ getLabel(optionsIndex) }}
              </div>
            </div>
            <div class="result_question_content_options_input">
              <el-input
                type="textarea"
                :autosize="true"
                :resize="'horizontal'"
                v-model="value.options"
                @input="setOptions(index)"
              ></el-input>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ElInput } from "element-plus";
import { storeToRefs } from "pinia";
import useTotalStore, { ResultContent } from "../../../store/TotalStore";
import useOperateResult from "../../../hooks/pdfResult/operateResult";
import useSetResult from "../../../hooks/pdfResult/setResult";

export default defineComponent({
  components: {
    "el-input": ElInput,
  },
  setup(props, context) {
    const { resultArray, activeQuestionIndex } = storeToRefs(
      useTotalStore()
    ) as unknown as ResultContent;
    const { getActive, deleteQuestion, copyQuestion, addQuestion } =
      useOperateResult();
    const { getLabel, getRight, setTitle, setOptions } = useSetResult();
    return {
      resultArray,
      activeQuestionIndex,

      getActive,
      deleteQuestion,
      copyQuestion,
      addQuestion,

      getLabel,
      getRight,
      setTitle,
      setOptions,
    };
  },
});
</script>

<style lang="css" scoped>
.result {
  overflow-x: scroll;
  overflow-y: scroll;
  position: relative;
  z-index: 0;
  padding: 0% 5%;
  margin: 5% 0;
  height: 90%;
  box-shadow: 0 0 1px 1px rgba(228, 228, 228, 1);
}
.result_textarea {
  position: relative;
  z-index: 0;
  overflow: hidden;
  display: flex;
  height: 20%;
  padding: 2% 5%;
}
.result_question {
  margin-bottom: 2em;
  position: relative;
  z-index: 0;
}

.result_question_active {
  z-index: 1;
}
.result_question_topactive {
  z-index: 2;
}
.result_question_item {
  margin-top: 1em;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
}
.result_question_item_label {
  width: 5em;
  text-align: center;
  flex-shrink: 0;
  font-size: 14px;
}
.result_question_item_title {
  background-color: rgba(228, 228, 228, 1);
  background-image: url(../../../assets/title.png);
  background-position: 0% 0%;
  background-size: 3%;
  background-repeat: no-repeat;
}
.result_question_title {
  background-color: rgba(228, 228, 228, 1);
  background-image: url(../../../assets/title.png);
  background-position: 0% 0%;
  background-size: 3%;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
.result_question_item_row {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  flex-wrap: nowrap;
  box-shadow: 0 0 1px 1px rgba(192, 192, 192, 1);
}
.result_question_options {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  position: relative;
  margin-top: 1em;
}
.result_question_answer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1em;
}
.result_question_answer_title {
  font-size: 14px;
  /* color: #fff; */
  margin-left: 1.2em;
  flex-shrink: 0;
  margin-top: 0.5em;
  user-select: none;
  text-align: center;
}
.result_question_answer_input {
  margin-left: 1em;
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 5px;
  width: 5em;
}
.result_question_options_target {
  line-height: 1.5;
  height: 100%;
  text-align: right;
}
.result_question_options_target::before {
  display: block;
  content: " ";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 5em;
  height: 1px;
  z-index: -1;
  background-color: rgba(192, 192, 192, 1);
}
.result_question_options_title {
  font-size: 14px;
  /* color: #fff; */
  width: 4.5em;
  margin-left: 1em;
  flex-shrink: 0;
  margin-top: 0.5em;
  user-select: none;
  text-align: center;
  overflow: visible;
  position: relative;
}

.result_question_content {
  position: relative;
  z-index: 0;
}
.result_question_content_title {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  position: relative;
  z-index: 0;
  width: 100%;
  box-shadow: 0 0 1px 1px rgba(192, 192, 192, 1);
  background-color: rgba(228, 228, 228, 1);
  background-image: url(../../../assets/title.png);
  background-position: 0% 0%;
  background-size: 3%;
  background-repeat: no-repeat;
}
.result_question_content_title_active {
  background-color: rgba(238, 246, 118, 0.3);
}
.result_question_content_title_name {
  font-size: 14px;
  width: 8em;
  text-align: center;
  line-height: 2;
  user-select: none;
}
.result_question_content_title_input {
  flex-shrink: 0;
  width: calc(100% - 8em);
}
.result_question_content_options {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;
  z-index: 0;
  min-width: 100%;
  box-shadow: 0 0 1px 1px rgba(192, 192, 192, 1);
  margin-top: 1em;
}
.result_question_content_options_active {
  background-color: rgba(238, 246, 118, 0.3);
}
.result_question_content_options_name {
  position: relative;
  z-index: 0;
  font-size: 14px;
  width: 8em;
  text-align: center;
  overflow: visible;
  user-select: none;
}
.result_question_content_options_name_item {
  line-height: 2;
  /* border-bottom: 1px solid red; */
}
.result_question_content_options_name_item_right::after {
  position: absolute;
  display: block;
  content: " ";
  width: 100vw;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 161, 191, 0.5);
  z-index: -1;
}
.result_question_content_options_name_item_right::before {
  display: block;
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  left: 0.5em;
  top: 0.8em;
  background-color: red;
  clip-path: polygon(0 30%, 30% 50%, 100% 0%, 100% 10%, 30% 60%, 0 40%);
}
.result_question_content_options_input {
  width: calc(100% - 8em);
  flex-shrink: 0;
  position: relative;
  overflow-x: scroll;
}
.result_question_options_input {
  margin-left: 0.5em;
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 5px;
}
.result_question_title_content {
  font-size: 14px;
  /* color: #fff; */
  width: 2em;
  margin-left: 1em;
  flex-shrink: 0;
  margin-top: 0.5em;
  user-select: none;
}
.result_question_title_input {
  margin-left: 3em;
  border: 1px solid rgba(192, 192, 192, 1);
  border-radius: 5px;
}
.result_question_item_input {
  position: relative;
  z-index: 0;
  border-radius: none;
  box-shadow: none;
  border: none;
}
.result_question_item_popover {
  background-color: #f5f5f5;
  font-size: 12px;
  color: #101010;
  position: absolute;
  z-index: 2;
  left: 70%;
  top: 0%;
}
.result_question_item_popover_item {
  padding: 1em 2em;
}
.result_question_item_popover_item:hover {
  background-color: #fff;
}
.mask {
  position: absolute;
  width: 3em;
  height: 3em;
  /* background-color: rgba(16, 16, 16, 1); */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  border-radius: 50%;
  overflow: hidden;
  border: 0.3em solid rgba(0, 161, 191, 1);
  clip-path: polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 30%, 50% 50%);
  animation: progress 0.5s infinite;
}
.result_question_header {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1em;
}
.result_question_header_item {
  padding: 0.2em 0.5em;
  margin-left: 1em;
  color: rgba(0, 161, 191, 1);
  cursor: pointer;
  user-select: none;
  /* box-shadow: 0 0 1px 1px rgba(0, 161, 191, 1); */
}

.result_textarea_button {
  position: relative;
  z-index: 0;
  font-size: 14px;
  width: 50%;
  text-align: center;
}
.result_textarea_button_item {
  color: rgba(0, 161, 191, 1);
  cursor: pointer;
  user-select: none;
}
.result_question_item_menus::after {
  display: block;
  content: " ";
  position: absolute;
  width: 1em;
  height: 1em;
  left: -2.5em;
  top: 1em;
  background-color: red;
  clip-path: polygon(0 30%, 30% 50%, 100% 0%, 100% 10%, 30% 60%, 0 40%);
}
</style>

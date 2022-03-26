<template>
  <div class="appWrapper">
    <router-view />
  </div>
</template>

<script setup>
import { KeyCodeMap } from "~utils";
import { onMounted , readonly} from "vue";
import { useStore } from 'vuex'
import moment from "moment";
const store = readonly(useStore())
onMounted(() => {
  registerShortcutKey();
});

const registerShortcutKey = () => {
  let isCtrlClick = false;
  document.addEventListener("keydown", (e) => {
    isCtrlClick = e.ctrlKey;
    e.preventDefault();
  });
  document.addEventListener("keyup", (e) => {
    const code = e.keyCode;
   
    if (isCtrlClick && code !== 17) {
      store.commit("common/saveShortcutKey", {
        ...KeyCodeMap[e.keyCode],
        updateTime:moment().valueOf()
      });
      e.preventDefault();
    }
  });
};
</script>

<style lange="less" scoped>
.appWrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>

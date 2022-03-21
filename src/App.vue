<template>
  <div class="appWrapper">
    <router-view />
  </div>
</template>

<script>
import { KeyCodeMap } from "~utils";
export default {
  name: "App",
  components: {},
  mounted() {
    this.registerShortcutKey();
  },
  methods: {
    registerShortcutKey() {
      let isCtrlClick = false;
      document.addEventListener("keydown", (e) => {
        isCtrlClick = e.ctrlKey;
        e.preventDefault()
      });
      document.addEventListener("keyup", (e) => {
        if (isCtrlClick) {
          console.log(e.keyCode,'e.keyCode')
          this.$store.commit("common/saveShortcutKey", KeyCodeMap[e.keyCode]);
          e.preventDefault()
        }
      });
    },
  },
};
</script>

<style lange="less" scoped>
.appWrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>

<template>
  <el-empty description="请拖拽到此"  v-if="!isEmpty"></el-empty>
  <div class="canvasWrapper" data-id="canvas" v-else>
      <enchanceUiContainer/>
  </div>
  <!--  -->
</template>

<script>
import { parsers } from "./../../components/index";
import { hasLen } from "../../utils/index";
export default {
  name: "canvasArea",
  props: {
    json: {
      type: Object,
    },
  },
  data() {
    return {
      components: [],
      isEmpty: hasLen(this.json.componentsTree.children) || true,
    };
  },
  mounted() {
      console.log(parsers,'解析')
  },
  components: {
    ...parsers,
  },
};
</script>
<style lang="less" scoped>
.canvasWrapper {
  width: 100%;
  height: 100%;
}
</style>

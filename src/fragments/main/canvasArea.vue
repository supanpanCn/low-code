<template>
  <div class="canvasBox">
    <el-empty
      description="请拖拽到此"
      v-if="!isEmpty"
    ></el-empty>
    <div class="empty" data-id="empty" v-if="!isEmpty"></div>
    <div class="canvasWrapper" data-id="canvas" v-else>
      <renderEngine :jsonSchema="jsonSchema"></renderEngine>
    </div>
  </div>
</template>

<script>
import { parsers } from "ui";
import { hasLen } from "~utils";
import renderEngine from "~utils/renderEngine";
export default {
  name: "canvasArea",
  props: {
    jsonSchema: {
      type: Object,
    },
  },
  data() {
    return {
      components: [],
      isEmpty: hasLen(this.jsonSchema.componentsTree.children),
    };
  },
  methods: {},
  mounted() {},
  components: {
    ...parsers,
    renderEngine,
  },
};
</script>
<style lang="less" scoped>
.canvasBox {
  width: 100%;
  height: 100%;
  position: relative;
  .canvasWrapper {
    width: 100%;
    height: 100%;
  }
  .empty {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
}
</style>

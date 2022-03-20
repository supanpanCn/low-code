<template>
  <div class="emptyBox" v-if="!isEmpty">
    <el-empty description="请拖拽到此"></el-empty>
    <div class="empty" data-id="empty" @dragover.prevent></div>
  </div>
  <renderEngine :jsonSchema="jsonSchema" :updateKey="updateKey" v-else></renderEngine>
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
    updateKey: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      components: [],
      isEmpty: hasLen(this.jsonSchema.componentsTree),
    };
  },
  updated() {
    this.isEmpty = hasLen(this.jsonSchema.componentsTree);
  },
  components: {
    ...parsers,
    renderEngine,
  },
};
</script>
<style lang="less" scoped>
.emptyBox {
  width: 100%;
  height: 100%;
  position: relative;
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

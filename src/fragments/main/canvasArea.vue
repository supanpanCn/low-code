<template>
  <el-empty description="请拖拽到此" v-if="!isEmpty"></el-empty>
  <div class="canvasWrapper" data-id="canvas" v-else>
    <!-- <enchanceUiContainer pIndex="0" />
    <enchanceUiContainer pIndex="1" />
    <enchanceUiContainer pIndex="2" :renderSlot="() => getCh(2)">
    </enchanceUiContainer>
    <enchanceUiContainer pIndex="3" :renderSlot="renderChildContainer">
      <template>
        <enchanceUiContainer pIndex="3-0">
          <template>
            <enchanceUiContainer pIndex="3-1"> </enchanceUiContainer>
          </template>
        </enchanceUiContainer>
      </template>
    </enchanceUiContainer>
    <enchanceUiButton type="primary" /> 
    
    <renderEngine :jsonSchema="jsonSchema"></renderEngine>
    -->
    <enchanceUiContainer pIndex="0" />
    <enchanceUiContainer pIndex="1" />
    <enchanceUiContainer pIndex="2">55555</enchanceUiContainer>
    <enchanceUiContainer pIndex="3">
      <enchanceUiContainer pIndex="3-0">
        <enchanceUiContainer pIndex="3-0-0">3-1</enchanceUiContainer>
      </enchanceUiContainer>
    </enchanceUiContainer>
    <enchanceUiButton type="primary" />
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
      type: Object
    }
  },
  data() {
    return {
      components: [],
      isEmpty: hasLen(this.jsonSchema.componentsTree.children) || true
    };
  },
  methods: {},
  mounted() {},
  components: {
    ...parsers,
    renderEngine
  }
};
</script>
<style lang="less" scoped>
.canvasWrapper {
  width: 100%;
  height: 100%;
}
</style>

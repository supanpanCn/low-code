<template>
  <div class="mainWrapper">
    <!-- 顶栏  -->
    <el-row class="topBarBox">
      <el-col :span="24">
        <TopBar />
      </el-col>
    </el-row>
    <!-- 主面板 -->
    <el-row class="mainBox">
      <!-- 物料堆 -->
      <el-col :span="3">
        <Stock />
      </el-col>
      <!-- 画布 -->
      <el-col :span="15">
        <CanvasArea :json="jsonSchema" @drop="handleDrop" @dragover.prevent />
      </el-col>
      <!-- 控制面板 -->
      <el-col :span="6">
        <ConfigWrapper />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from "./../fragments/main/topBar";
import Stock from "../fragments/main/stock.vue";
import CanvasArea from "../fragments/main/canvasArea.vue";
import ConfigWrapper from "../fragments/main/configWrapper.vue";
import { ElMessage } from "element-plus";
import { uiFlag } from "../utils/index";
export default {
  name: "Main",
  data() {
    return {
      jsonSchema: {
        componentsTree: {
          type: "root",
          children: [1],
        },
        layout: {},
        query: undefined,
      },
    };
  },
  methods: {
    handleDrop(e) {
      const { componentsTree: tree } = this.jsonSchema;
      const { children } = tree;
      // 判断是否存在交互组件
      const uiName = e.dataTransfer.getData("ui-component-name");
      if (uiName !== uiFlag.CONTAINER) {
        if (Array.isArray(children) && children.length === 0) {
          ElMessage.warning("请选择交互组件");
          return;
        }
        let node = e.target;
        let hasRoot = true;
        while (
          node.dataset.id !== uiFlag.CONTAINER &&
          node.dataset.id !== uiFlag.ROOT
        ) {
          node = node.parentNode;
        }
        if (node.dataset.id === uiFlag.ROOT) {
          hasRoot = false;
        }
        if (!hasRoot) {
          ElMessage.warning("请选择交互组件");
          return;
        }
      }
      // 组装schema
      const item = {
        type: uiName,
        children: [],
      };
      let node = e.target;
      let depth = 0
      while (node.dataset.id !== uiFlag.ROOT) {
        if(node.dataset.id === uiFlag.CONTAINER){
          depth++
          console.log(node.getAttribute('pIndex'))
        }
        node = node.parentNode;
      }
      console.log(depth,'深度')
      children.push(item);
    },
  },
  components: {
    TopBar,
    Stock,
    CanvasArea,
    ConfigWrapper,
  },
};
</script>

<style lang="less" scoped>
.mainWrapper {
  width: 100%;
  height: 100%;
  .topBarBox {
    height: 50px;
  }
  .mainBox {
    height: calc(100% - 50px);
  }
}
</style>

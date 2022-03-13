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
        <Stock @pick-component="(name) => (pickingComponentName = name)" />
      </el-col>
      <!-- 画布 -->
      <el-col :span="15">
        <CanvasArea
          @dragover.prevent
          @drop="handleDropOver"
          :json="jsonSchema"
        />
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
      pickingComponentName: null,
      jsonSchema: {
        componentsTree: {
          type: "root",
          children: [],
        },
        layout: {},
        query: undefined,
      },
    };
  },
  methods: {
    handleDropOver(e) {
      const { componentsTree: tree } = this.jsonSchema;
      const { children } = tree;
      // 判断是否存在交互组件
      let node = e.target;
      let hasRoot = false;
      if (node.dataset.id === uiFlag.ROOT) {
        for (let i = 0; i < node.children.length; i++) {
          let v = node.children[i];
          if (v.dataset.id === uiFlag.CONTAINER) {
            hasRoot = true;
            break;
          }
        }
      } else {
        hasRoot = true
        while (
          node.dataset.id !== uiFlag.CONTAINER &&
          node.dataset.id !== uiFlag.ROOT
        ) {
          node = node.parentNode;
        }
        if (node.dataset.id === uiFlag.ROOT) {
          hasRoot = false
        }
      }
      if (!hasRoot) {
        ElMessage.warning("请选择交互组件");
        return
      }

      //
      // if(e.target.className === 'el-empty' && this.pickingComponentName !== 'uiContainer'){
      //   ElMessage.warning('请选择交互组件')
      //   return
      // }
      // tree.
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

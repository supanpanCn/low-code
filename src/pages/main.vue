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
        <CanvasArea :jsonSchema="jsonSchema" @drop="handleDrop" @dragover.prevent />
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
import {
  uiFlag,
  showMsg,
  validiteHasContainer,
  createNode,
  getDepth
} from "~utils";
export default {
  name: "Main",
  data() {
    return {
      jsonSchema: {
        componentsTree: {
          // ...createNode("root")
          type: "root",
          children: [
            {
              type: "Container",
              children: []
            },
            {
              type: "Container",
              children: []
            },
            {
              type: "Container",
              children: []
            },
            {
              type: "Container",
              children: [
                {
                  type: "Container",
                  children: [
                    {
                      type: "Container",
                      children: [5]
                    }
                  ]
                }
              ]
            }
          ]
        },
        layout: {},
        query: undefined
      }
    };
  },
  methods: {
    combineSchema(infos, node, uiName) {
      function _find(children, infos, res) {
        for (let i = 0; i < children.length; i++) {
          let k = infos.shift();
          if (k == i) {
            res.push(children[i]);
            _find(children[i].children, infos, res);
            break;
          }
        }
      }
      const res = [node.children];
      infos.length && _find(node.children, infos, res);
      const target = res.pop();
      if (!Array.isArray(target.children)) {
        target.children = [];
      }
      target.children.push(createNode(uiName));
    },
    handleDrop(e) {
      const { componentsTree: tree } = this.jsonSchema;
      const { children } = tree;
      // 判断是否存在交互组件
      const uiName = e.dataTransfer.getData("ui-component-name");
      if (!validiteHasContainer(e, uiName, children)) return;
      // 获取节点深度
      const targetIndex = getDepth(e);
      // 组装schema
      const infos =
        targetIndex.indexOf("-") > -1 ? targetIndex.split("-") : [targetIndex];
      this.combineSchema(infos, children[infos.shift()], uiName);
    }
  },
  components: {
    TopBar,
    Stock,
    CanvasArea,
    ConfigWrapper
  }
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

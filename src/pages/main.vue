<template>
  <div class="mainWrapper">
    <!-- 顶栏  -->
    <el-row class="topBarBox">
      <el-col :span="24">
        <TopBar
          @revocation="handleRevocation"
          @save="handleSave"
          @back="handleBack"
          :active="active"
          :memo="memo"
        />
      </el-col>
    </el-row>
    <!-- 主面板 -->
    <el-row class="mainBox">
      <!-- 物料堆 -->
      <el-col :span="3">
        <Stock />
      </el-col>
      <!-- 画布 -->
      <el-col :span="16">
        <CanvasArea
          :jsonSchema="jsonSchema"
          :updateKey="updateKey"
          @drop="handleDrop"
        />
      </el-col>
      <!-- 控制面板 -->
      <el-col :span="5">
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
import moment from "moment";

import {
  createNode,
  createInitialSchame,
  getUuid,
  getNearestContainerId,
  uiFlag,
  showMsg,
  MemoList,
  Stack,
  isSameTree,
  getPooints,
  getRelativePos
} from "~utils";
export default {
  name: "Main",
  provide() {
    return {
      removeNode: this.handleRemoveNode,
    };
  },
  data() {
    return {
      jsonSchema: createInitialSchame(),
      updateKey: 0,
      stack: [],
      memo: {},
      active: false,
    };
  },
  watch: {
    updateKey: function () {
      const tree = this.jsonSchema.componentsTree;
      if (tree.type) {
        this.stack.push(JSON.parse(JSON.stringify(tree)));
        this.active = !!tree.children.length;
      } else {
        this.active = false;
      }
    },
  },
  created() {
    this.stack = new Stack();
    this.memo = new MemoList();
  },
  mounted() {
    this.$store.dispatch("common/setCommonData",getRelativePos());
  },
  methods: {
    handleRevocation() {
      const previousTree = this.stack.pop();
      this.handleBack(previousTree);
    },
    handleBack(tree) {
      this.jsonSchema.componentsTree = tree;
      this.updateKey++;
    },
    handleSave() {
      const tree = this.jsonSchema.componentsTree;
      if (tree.type) {
        const key = moment().format("YYYY-MM-DD HH:mm:ss");
        if (this.memo.length) {
          if (isSameTree(tree, this.memo.current)) {
            showMsg("保存成功-same", "success");
            return;
          }
        }
        this.memo.setMemo(key, JSON.parse(JSON.stringify(tree)));
        showMsg("保存成功", "success");
      }
    },
    handleRemoveNode(uid) {
      const { componentsTree: tree } = this.jsonSchema;
      let breakDfs = false;
      function del(node) {
        for (let i = 0; i < node.length && !breakDfs; i++) {
          if (node[i].uid === uid) {
            node.splice(i, 1);
            breakDfs = true;
          } else {
            del(node[i].children);
          }
        }
      }
      del(tree.children);
      this.updateKey++;
    },
    handleDrop(e) {
      console.log("执行");
      const { componentsTree: tree } = this.jsonSchema;
      // 判断是否存在交互组件
      const uiName = e.dataTransfer.getData("ui-component-name");
      if (!tree.type && uiName !== uiFlag.CONTAINER) {
        showMsg("请选择交互组件");
        return;
      }
      // 组装schema
      if (!tree.type) {
        //根节点
        tree.type = "Container";
        tree.uid = getUuid();
        tree.isRoot = true;
        tree.children = [];
      } else {
        const { x, y } = getPooints(e);
        const { uid } = getNearestContainerId(e);
        const stack = [tree];
        let schameNode = null;
        while (stack.length) {
          const node = stack.shift();
          if (node.uid === uid) {
            stack.length = 0;
            schameNode = node;
          } else {
            if (Array.isArray(node.children)) {
              for (let i = 0; i < node.children.length; i++) {
                stack.push(node.children[i]);
              }
            }
          }
        }
        if (!Array.isArray(schameNode.children)) {
          schameNode.children = [];
        }
        schameNode.children.push(
          createNode(uiName.slice(2), {
            attr: {
              x,
              y,
            },
          })
        );
      }
      this.updateKey++;
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
    #root {
      height: 100%;
      box-sizing: border-box;

      :deep > .uiContainer:nth-of-type(1) {
        height: 100%;
        box-sizing: border-box;
        display: block;
        border-top: 1px solid #ccc;
      }
    }
  }
}
</style>

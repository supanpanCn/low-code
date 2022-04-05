<template>
  <div class="mainWrapper">
    <!-- 顶栏  -->
    <el-row class="topBarBox">
      <el-col :span="24">
        <TopBar
          @revocation="handleRevocation"
          @save="handleSave"
          @back="handleBack"
          :active="state.active"
          :memo="state.memo"
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
        <snapAlignHoc>
          <CanvasArea
            :jsonSchema="state.jsonSchema"
            :updateKey="state.updateKey"
            @drop="handleDrop"
          />
        </snapAlignHoc>
      </el-col>
      <!-- 控制面板 -->
      <el-col :span="5">
        <ConfigWrapper />
      </el-col>
    </el-row>

    <!-- 提示区域 -->
    <el-row class="tipsBox">
      <el-col>
        <span class="tit">快捷键：</span>
        <span v-for="v in state.keyCodes" :key="v.value"
          >{{ v.label }}（{{ v.value }}）</span
        >
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Main",
};
</script>
<script setup>
import { ref, reactive, onMounted, provide, watch, toRaw } from "vue";
import { useStore } from "vuex";
import TopBar from "./../fragments/main/topBar";
import Stock from "../fragments/main/stock.vue";
import CanvasArea from "../fragments/main/canvasArea.vue";
import ConfigWrapper from "../fragments/main/configWrapper.vue";
import moment from "moment";
import useShortcut from "hooks/useShortcut";
import snapAlignHoc from "../hoc/snap-align-hoc.vue";
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
  getElementInfo,
  getRelativePos,
  KeyCodeMap,
  findById,
  deepCopy,
  getElementByUid,
} from "~utils";
const state = reactive({
  jsonSchema: createInitialSchame(),
  updateKey: 0,
  stack: [],
  memo: {},
  active: false,
  keyCodes: [],
  coping: false,
});
const store = useStore();

// 快捷键
useShortcut({
  copy: () => {
    if (!store.state.common.saveActiveSublineId) {
      showMsg("请选择要复制的组件");
      return;
    }
    state.coping = true;
    showMsg("已复制", "success");
  },
  paste: () => {
    if (!state.coping) {
      showMsg("没有要粘贴的组件");
      return;
    }
    const { jsonSchema } = state;
    const { componentsTree: tree } = jsonSchema;
    const { node, parentNode } = findById(
      tree,
      store.state.common.saveActiveSublineId
    );
    const { layout = {}, type } = node;
    const { x, y } = layout.attr || {};
    if (parentNode) {
      if (!Array.isArray(parentNode.children)) {
        parentNode.children = [];
      }
      const { uid } = node;
      const { uid: parentUid } = parentNode;
      const element = getElementByUid(uid);
      const parentElement = getElementByUid(parentUid);
      const { width, height } = getElementInfo({
        target: element,
      });
      const { width: parentWeidht, height: parentHeight } = getElementInfo({
        target: parentElement,
      });
      let newW = x + width + 5;
      if (newW > parentWeidht) {
        showMsg("无效复制");
        return;
      }
      parentNode.children.push(
        createNode(type, {
          attr: {
            x: newW,
            y,
          },
        })
      );
      state.coping = false;
      state.updateKey++;
    }
  },
});

onMounted(() => {
  store.commit("common/saveMenuAndBarElementInfo", getRelativePos());
  state.keyCodes = Object.values(KeyCodeMap);
});

const onCreated = () => {
  state.stack = new Stack();
  state.memo = new MemoList();
};
onCreated();

watch(
  () => state.updateKey,
  () => {
    const { jsonSchema, stack } = state;
    const tree = jsonSchema.componentsTree;
    if (tree.type) {
      stack.push(deepCopy(tree));
      state.active = !!tree.children.length;
    } else {
      state.active = false;
    }
    store.commit("common/saveTreeData", deepCopy(tree));
  }
);

// 保存
const handleSave = () => {
  const { jsonSchema, memo } = state;
  const tree = jsonSchema.componentsTree;
  if (tree.type) {
    const key = moment().format("YYYY-MM-DD HH:mm:ss");
    if (memo.length) {
      if (isSameTree(tree, memo.current)) {
        showMsg("保存成功-same", "success");
        return;
      }
    }
    memo.setMemo(key, deepCopy(tree));
    showMsg("保存成功", "success");
  }
};
// 撤销
const handleBack = (tree) => {
  const { jsonSchema } = state;
  jsonSchema.componentsTree = tree;
  state.updateKey++;
};
// 历史
const handleRevocation = () => {
  const { stack } = state;
  const previousTree = stack.pop();
  handleBack(previousTree);
};
// 删除节点
const handleRemoveNode = (uid) => {
  const { jsonSchema } = state;
  const { componentsTree: tree } = jsonSchema;
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
  state.updateKey++;
};
// 更新节点
const handleUpdateNode = (uid, { x, y }) => {
  const { jsonSchema } = state;
  const { componentsTree: tree } = jsonSchema;
  let { node: schameNode } = findById(tree, uid);
  const {
    layout: { attr },
  } = schameNode;
  attr.x = x;
  attr.y = y;
  state.updateKey++;
};
// 拖拽生成节点
const handleDrop = (e) => {
  const { jsonSchema } = state;
  const { componentsTree: tree } = jsonSchema;
  // 判断是否存在交互组件
  const uiName = e.dataTransfer.getData("ui-component-name");
  if (!uiName) return;
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
    const { x, y } = getElementInfo(e);
    const { uid } = getNearestContainerId(e);
    const stack = [tree];
    let { node: schameNode } = findById(tree, uid);
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
  state.updateKey++;
};
// 派发给子孙组件的函数
provide("removeNode", handleRemoveNode);
provide("updateNode", handleUpdateNode);
</script>

<style lang="less" scoped>
.mainWrapper {
  width: 100%;
  height: 100%;
  .topBarBox {
    height: 50px;
  }
  .mainBox {
    height: calc(100% - 80px);
    .snap-align {
      height: 100%;
      box-sizing: border-box;
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
  .tipsBox {
    height: 30px;
    border: 1px solid #ccc;
    line-height: 30px;
    .tit {
      color: red;
    }
  }
}
</style>

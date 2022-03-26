<template>
  <ul class="stockWrapper">
    <li
      class="stock-item"
      :draggable="true"
      @dragstart="handleDragStart(v, $event)"
      @dragend="handleDragEnd"
      @drag="handleDrag"
      v-for="v in stacks"
      :key="v.uiName"
    >
      {{ v.name }}
    </li>
  </ul>
</template>

<script>
import { uiComponents } from "ui/index.js";
import { parseUiName, Center, pxToNumber, getNearestPoint } from "~utils";
import { mapState } from "vuex";
export default {
  name: "Stock",
  data() {
    return {
      stacks: [],
    };
  },
  mounted() {
    this.stacks = Object.keys(uiComponents).map((name) => ({
      uiName: name,
      name: parseUiName(name),
    }));
  },
};
</script>

<script setup>
// 处理拖拽事件
import { uiComponents } from "ui/index.js";
import { parseUiName, Center, pxToNumber, getNearestPoint } from "~utils";
import { readonly, computed } from "vue";
import { useStore } from "vuex";
const store = useStore();

const center = readonly(Center.getInstance());
// 获取vuex
const barAndMenuInfo = computed(() => store.state.common.barAndMenuInfo);
const sublineId = computed(() => store.state.common.sublineId);
const tree = computed(() => store.state.common.tree);
// 开始拖拽
const handleDragStart = (item, event) => {
  center.notify(true);
  event.dataTransfer.setData("ui-component-name", item.uiName);
};
// 拖拽结束
const handleDragEnd = (event) => {
  center.notify(false);
  event.dataTransfer.clearData("ui-component-name");
  store.commit("common/saveActiveSublineId", "");
};
// 拖拽中
const handleDrag = (e) => {
  const { barHeight, menuWidth } = barAndMenuInfo.value;
  const paddingLeft = 10;
  const realMenuWidth = pxToNumber(menuWidth) - paddingLeft;
  const realBarHeight = pxToNumber(barHeight);
  if (e.clientX - realMenuWidth > 20 && e.clientY - realBarHeight > 10) {
    if (tree.value.type) {
      const item = getNearestPoint(tree.value, 80, e);
      if (item && item.uid !== sublineId.value) {
        store.commit("common/saveActiveSublineId", item.uid);
      }
      if (!item && sublineId.value) {
        store.commit("common/saveActiveSublineId", "");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.stockWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  flex-wrap: wrap;
  padding: 10px;
  border-right: solid 1px #e0e0e0;
  .stock-item {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
  }
}
</style>

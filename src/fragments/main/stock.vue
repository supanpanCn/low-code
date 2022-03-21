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
import { parseUiName, Center, pxToNumber } from "~utils";
import { mapState } from "vuex";
export default {
  name: "Stock",
  data() {
    return {
      stacks: [],
      center: null,
    };
  },
  computed: mapState({
    barAndMenuInfo: ({ common }) => common.barAndMenuInfo,
    tree: ({ common }) => common.tree,
    sublineId: ({ common }) => common.saveActiveSublineId,
  }),
  mounted() {
    this.stacks = Object.keys(uiComponents).map((name) => ({
      uiName: name,
      name: parseUiName(name),
    }));
    this.center = Center.getInstance();
  },
  methods: {
    handleDragStart(item, event) {
      this.center.notify(true);
      event.dataTransfer.setData("ui-component-name", item.uiName);
    },
    handleDragEnd(event) {
      this.center.notify(false);
      this.isEnter = false;
      event.dataTransfer.clearData("ui-component-name");
      this.$store.commit("common/saveActiveSublineId", '');
    },
    handleDrag(e) {
      const { barHeight, menuWidth } = this.barAndMenuInfo;
      const paddingLeft = 10;
      const realMenuWidth = pxToNumber(menuWidth) - paddingLeft;
      const realBarHeight = pxToNumber(barHeight);
      if (e.clientX - realMenuWidth > 20 && e.clientY - realBarHeight > 10) {
        function _find(tree) {
          const { children = [], layout = {}, type } = tree;
          const { attr = {} } = layout;
          const { x = 0, y = 0 } = attr;
          let res = null;
          const width = Math.abs(x - e.clientX);
          const height = Math.abs(y - e.clientY);
          const sideLen = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
          if (sideLen < 80 && type !== '"Container"') {
            res = tree;
          }
          for (let i = 0; i < children.length && !res; i++) {
            res = _find(children[i]);
          }
          return res;
        }
        if (this.tree.type) {
          const item = _find(this.tree);
          if (item && item.uid !== this.sublineId) {
            this.$store.commit("common/saveActiveSublineId", item.uid);
          }
          if(!item && this.sublineId){
            this.$store.commit("common/saveActiveSublineId", '');
          }
        }
      }
    },
  },
  components: {
    ...uiComponents,
  },
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

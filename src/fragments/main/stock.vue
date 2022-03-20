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
import { parseUiName, Center } from "~utils";
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
    },
    handleDrag(e) {
      console.log(this.barAndMenuInfo,'barHeight')
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

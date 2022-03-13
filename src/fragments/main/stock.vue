<template>
  <ul class="stockWrapper">
    <li 
        class="stock-item" 
        :draggable="true"
        @drag="handleDrag(v)"
        v-for="v in stacks" 
        :key="v.uiName"
    >
      {{ v.name }}
    </li>
  </ul>
</template>

<script>
import { uiComponents } from "../../components/index.js";
import { parseUiName } from "../../utils/index";
export default {
  name: "Stock",
  data() {
    return {
      stacks: [],
    };
  },
  mounted() {
    this.stacks = Object.keys(uiComponents).map(name=>({
        uiName:name,
        name:parseUiName(name)
    }))
  },
  methods:{
      handleDrag(item){
          this.$emit('pick-component',item.uiName)
      }
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

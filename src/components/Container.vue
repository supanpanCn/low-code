<template>
  <div
    class="uiContainer"
    :class="{ draging: draging }"
    :p-index="pIndex"
    data-id="uiContainer"
    @dragover.prevent
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "uiContainer",
  props: {
    draging: {
      type: Boolean,
      default: false,
    },
    pIndex: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    // console.log(this.$slots.default(), "插槽");
  },
};
</script>
<style lang="less" scoped>
.uiContainer {
  width: 100%;
  min-height: 150px;
  background-color: #fff;
  box-sizing: border-box;
  &.draging {
    border: 1px solid blue;
  }
}
</style>

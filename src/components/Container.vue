<template>
  <div
    :class="{ draging: draging,uiContainer:true }"
    :uid="uid"
    data-id="uiContainer"
    @dragover.prevent
  >
    <slot></slot>
  </div>
</template>
<script>
import { Observer, Center } from "~utils";
export default {
  name: "uiContainer",
  props: {
    pIndex: {
      type: String,
      default: "0"
    },
    id: {
      type: String,
      default: "-1"
    }
  },
  data() {
    return {
      draging: false,
      schame: null
    };
  },
  methods: {
    updateDraging(dragStatus) {
      this.draging = dragStatus;
    }
  },
  mounted() {
    new Observer(this, Center.getInstance());
  }
};
</script>
<style lang="less" scoped>
.uiContainer {
  width: 100%;
  min-height: 150px;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  &.draging {
    background:rgba(135, 135, 160,.3) ;
  }
}
</style>

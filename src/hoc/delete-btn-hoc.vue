<template>
  <div
    :class="{deleteBtnHoc:true,isContainer:type==='Container'}"
    @click="handleActivate"
    ref="child"
  >
    <div class="delete" @click="handleDelete" v-if="isShowDelete"></div>
    <slot />
  </div>
</template>
<script>
import { ActiveList, uiFlag } from "~utils";
export default {
  name: "deleteBtnHoc",
  props: ["uid", "type"],
  inject: ["removeNode"],
  data() {
    return {
      isShowDelete: false,
      actInstance: null
    };
  },
  mounted() {
    this.actInstance = ActiveList.getInstance();
    this.setDynamicWrapperW();
  },
  methods: {
    setDynamicWrapperW() {
      const wrapper = this.$refs.child;
      const childElement = wrapper.children[0];
      if (childElement.dataset.id !== uiFlag.CONTAINER) {
        const { width } = getComputedStyle(childElement);
        const w = width ? width.replace("px", "") : 180;
        wrapper.style.width = w > 180 ? "180px" : w + "px";
      }
    },
    handleActivate(e) {
      e.stopPropagation();
      if (this.actInstance) {
        this.actInstance.update("isShowDelete");
        this.actInstance.attach(this);
      }
      this.isShowDelete = true;
    },
    handleDelete() {
      if (this.actInstance) {
        this.actInstance.update("isShowDelete");
      }
      this.$nextTick(() => {
        setTimeout(() => {
          this.isShowDelete = false;
        }, 100);
      });
      this.removeNode(this.uid);
    }
  }
};
</script>
<style lang="less" scoped>
.deleteBtnHoc {
  width: auto;
  height: auto;
  position: relative;
  cursor: pointer;
  .delete {
    position: absolute;
    right: 0;
    top: 0;
    background: url("./../assets/img/delete.png") no-repeat;
    background-size: 100% 100%;
    width: 14px;
    height: 14px;
    cursor: pointer;
  }

  &.isContainer {
    width: 100%;
  }
}
</style>

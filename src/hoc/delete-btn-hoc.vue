<template>
  <div
    :class="{ deleteBtnHoc: true, isContainer: type === 'Container' }"
    :style="attribute"
    :id="this.uid"
    @click="handleActivate"
    @focus="handleFocus"
    ref="child"
  >
    <div class="delete" @click="handleDelete" v-if="isShowDelete"></div>

    <teleport to="body" v-if="isShowDelete">
      <div ref="subline-x"></div>
      <div ref="subline-y"></div>
    </teleport>
    <slot />
  </div>
</template>
<script>
import {
  ActiveList,
  uiFlag,
  EventBus,
  pxToNumber,
  parseLayout,
  getRootElement,
  getRelativePos,
  objToStr,
  setSubline,
  getNearestContainerId,
} from "~utils";
export default {
  name: "deleteBtnHoc",
  props: ["tree"],
  inject: ["removeNode"],
  data() {
    return {
      isShowDelete: false,
      actInstance: null,
      uid: this.tree.uid,
      type: this.tree.type,
      attribute: {},
    };
  },
  mounted() {
    this.actInstance = ActiveList.getInstance();
    this.setDynamicWrapperStyle();
    EventBus.on(this.uid, (e) => {
      this.handleActivate(e);
    });
  },
  methods: {
    setDynamicWrapperStyle() {
      const wrapper = this.$refs.child;
      const childElement = wrapper.children[0];
      if (childElement.dataset.id !== uiFlag.CONTAINER) {
        const { width } = getComputedStyle(childElement);
        const w = width ? pxToNumber(width) : 180;
        wrapper.style = objToStr({
          width: w > 180 ? "180px" : w + "px",
        });
        const { layout } = this.tree;
        const { attribute } = parseLayout(layout, {
          w,
        });
        this.attribute = attribute;
      } else {
        const { el } = getNearestContainerId(wrapper);
        const { width } = getRootElement();
        const children = el.children;
        const { barHeight } = getRelativePos();
        let lowest = barHeight;
        if (children.length > 1) {
          lowest = 0;
        }
        for (let i = 0; i < children.length - 1; i++) {
          const { height, top } = getComputedStyle(children[i]);
          const current = pxToNumber(top) + pxToNumber(height);
          lowest = Math.max(lowest, current);
        }
        wrapper.style = objToStr({
          top: lowest + 10 + "px",
          width,
        });
      }
    },
    handleActivate(e) {
      e.stopPropagation();
      if (this.actInstance) {
        this.actInstance.update("isShowDelete");
        this.actInstance.attach(this);
      }

      this.isShowDelete = true;
      this.$nextTick(() => {
        setSubline.call(this, this.attribute);
      });
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
      EventBus.off(this.uid);
      this.removeNode(this.uid);
    },
  },
};
</script>
<style lang="less" scoped>
.deleteBtnHoc {
  width: auto;
  height: auto;
  position: fixed;
  box-sizing: border-box;
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
    z-index: 99;
  }

  &.isContainer {
    width: 100%;
  }
}
</style>

<template>
  <div
    :class="{ deleteBtnHoc: true, isContainer: type === 'Container' }"
    :style="attribute"
    @click="handleActivate"
    @focus="handleFocus"
    ref="child"
  >
    <div class="delete" @click="handleDelete" v-if="isShowDelete"></div>

    <teleport to="body" v-if="isShowDelete">
      <div ref="subline-x" style="position: fixed; top: 3px"></div>
      <div ref="subline-y" style="position: fixed; top: 3px"></div>
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
  getPooints,
  objToStr,
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
    console.log(this.$refs["subline-x"], "绑定的");
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
        wrapper.style.width = w > 180 ? "180px" : w + "px";
        const { layout } = this.tree;
        const { attribute } = parseLayout(layout, {
          w,
        });
        this.attribute = attribute;
      } else {
        // const {el} = getNearestContainerId(wrapper)
        // const children = el.children
        // let lowest = 0
        // for(let i = 0 ; i < children.length - 1;i++){
        //   const {height,top} = getComputedStyle(children[i])
        //   const current = pxToNumber(top) + pxToNumber(height)
        //   console.log(current,'current')
        //   lowest = Math.max(lowest,current)
        // }
        // wrapper.style.top = lowest + 10 + 'px'
        // console.log(lowest,'lowest')
      }
    },
    setSubline() {
      // 设置辅助线
      const root = document.getElementById("root");
      const { width, height } = getComputedStyle(root);
      const { menuWidth, barHeight } = getPooints({});
      this.$refs["subline-x"].style = objToStr({
        width,
        height: "1px",
        top: pxToNumber(this.attribute.top) + pxToNumber(barHeight) + "px",
        left: pxToNumber(menuWidth) + "px",
        position: "absolute",
        background: "blue",
      });
      this.$refs["subline-y"].style = objToStr({
        width: "1px",
        height,
        left: pxToNumber(this.attribute.left) + pxToNumber(menuWidth) + "px",
        top: pxToNumber(barHeight) + "px",
        position: "absolute",
        background: "blue",
      });
    },
    handleActivate(e) {
      e.stopPropagation();
      if (this.actInstance) {
        this.actInstance.update("isShowDelete");
        this.actInstance.attach(this);
      }
      
      this.isShowDelete = true;
      this.$nextTick(()=>{
        this.setSubline()
      })
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
  position: absolute;
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

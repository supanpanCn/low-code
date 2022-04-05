<template>
  <div class="snap-align" @drag="handleDrag" @dragend="handleDragEnd">
    <slot />
  </div>
</template>

<script setup>
import { reactive, computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import {
  RefLine,
  getRootElement,
  EventBus,
  initRefLines,
  getElementInfo,
  pxToNumber,
} from "~utils";
const state = reactive({
  rectifyCb: null,
});
onMounted(() => {
  initRefLines();
  EventBus.on("rectify", (cb) => {
    state.rectifyCb = cb;
  });
});
const rl = new RefLine(30);
const store = useStore();
const dragingElementInfo =
  computed(() => store.state.common.dragingElementInfo) || {};

const handleDragEnd = () => {
  const rectifyInfo = rl.uncheck();
  if (typeof state.rectifyCb === "function") {
    const { left, top } = rectifyInfo;
    const { width, height ,x,y} = dragingElementInfo.value;
    const l = left ? pxToNumber(left)+width/2 : x
    const t = top ?  pxToNumber(top) : y
    state.rectifyCb(l , t);
  }
  
};
const handleDrag = (e) => {
  const info = dragingElementInfo.value;
  const { x, y, width, height } = getElementInfo(e);
  requestAnimationFrame(() => rl.check(info.el, ".drag-hoc"));
};
</script>

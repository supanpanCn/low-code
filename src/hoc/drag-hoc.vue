<template>
  <div
    class="drag-hoc"
    :draggable="true"
    @dragstart="handleDragStart"
    @drag="handleDraging"
    @dragend="handleDragEnd"
    ref="dragRef"
  >
    <slot />
  </div>
</template>

<script setup>
import {
  inject,
  useAttrs,
  onBeforeUnmount,
  ref,
  reactive,
  nextTick,
  provide,
  onMounted,
} from "vue";
import { useStore } from "vuex";
import {
  getElementInfo,
  getElementByUid,
  EventBus,
  getRootElement,
} from "~utils";
const dragRef = ref();
const store = useStore();
const state = reactive({
  cls: {
    visibility: "visible",
  },
});
const attrs = useAttrs();
const {
  tree: {
    uid,
    layout: { attr },
  },
  setUpKey,
} = attrs;

onMounted(() => {
  EventBus.emit("rectify", rectify);
});
onBeforeUnmount(() => {
  store.commit("common/saveDragingElementInfo", {});
});
const updateNode = inject("updateNode");
const handleDragStart = (ev) => {
  store.commit("common/saveActiveSublineId", "");
};
const rectify = (x, y) => {
  if (typeof updateNode === "function") {
    const attribute = {
      x,
      y,
    };
    console.log(attribute, "attribute");
    updateNode(uid, attribute);
    if (typeof setUpKey === "function") {
      setUpKey();
    }
  }
};
const handleDraging = (e) => {
  const { x, y } = getElementInfo(e);
  const { width, height } = getElementInfo({
    target: getElementByUid(uid),
  });
  store.commit("common/saveDragingElementInfo", {
    uid,
    width,
    height,
    el: dragRef,
    ...attr,
  });
  rectify(x, y);
};
</script>

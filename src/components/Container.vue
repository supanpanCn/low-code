<template>
  <div class="uiContainer" :class="{draging:draging}" data-id="uiContainer">
      
  </div>
</template>
<script>
export default {
  name: "uiContainer",
  props:{
    draging:{
      type:Boolean,
      default:false
    }
  }
};
</script>
<style lang="less" scoped>
.uiContainer{
    width: 100%;
    min-height: 150px;
    background-color: #fff;
    box-sizing: border-box;
    &.draging{
      border: 1px solid blue;
    }
}
</style>

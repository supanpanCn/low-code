<template>
  <div class="deleteBtnHoc">
    <slot/>
  </div>
</template>
<script>
export default {
  name: "deleteBtnHoc",
  data() {
    return {
        activeName:'props'
    };
  },
};
</script>
<style lang="less" scoped>
.deleteBtnHoc {
  width: 100%;
  height: 100%;
  background-color: #ccc;
}
</style>

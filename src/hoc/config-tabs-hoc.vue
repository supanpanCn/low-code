<template>
  <div class="configTabsHoc">
    <el-tabs v-model="activeName">
      <el-tab-pane label="属性" name="props">
          <slot name="props"></slot>
      </el-tab-pane>
      <el-tab-pane label="样式" name="style">
          <slot name="style"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "configTabsHoc",
  data() {
    return {
        activeName:'props'
    };
  },
};
</script>
<style lang="less" scoped>
.configTabsHoc {
  width: 100%;
  height: 100%;
  :deep .el-tabs__nav.is-top {
    width: 100%;
    .el-tabs__item{
        width: 50%;
        text-align: center;
    }
  }
}
</style>

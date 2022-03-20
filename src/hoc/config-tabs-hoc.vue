<template>
  <div class="configTabsHoc">
    <el-tabs @tab-click="handleTabClick" v-model="activeName">
      <el-tab-pane label="外观" name="attr">
        <div class="commom-attr">
          <div class="attr-coordinate">
            <div class="attr-coordinate-x">x坐标:</div>
            <el-input v-model="input" placeholder="请输入x坐标" />
          </div>
          <div class="attr-coordinate">
            <div class="attr-coordinate-y">y坐标:</div>
            <el-input v-model="input" placeholder="请输入y坐标" />
          </div>
          <div class="attr-area">
            <div class="attr-area-w">宽度:</div>
            <el-input v-model="input" placeholder="请输入宽度" />
          </div>
          <div class="attr-area">
            <div class="attr-area-h">高度:</div>
            <el-input v-model="input" placeholder="请输入高度" />
          </div>
        </div>
        <slot name="attr"></slot>
      </el-tab-pane>
      <el-tab-pane label="行为" name="behaviour">
        <slot name="behaviour"></slot>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "configTabsHoc",
  props: ["activeName"],
  mounted() {},
  data() {
    return {
      active: this.activeName,
    };
  },
  methods: {
    handleTabClick(act) {
      console.log(act);
    },
  },
};
</script>
<style lang="less" scoped>
.configTabsHoc {
  width: 100%;
  height: 100%;
  :deep .el-tabs {
    .el-tabs__nav.is-top {
      width: 100%;
      .el-tabs__item {
        width: 50%;
        text-align: center;
      }
    }
    .el-tabs__content {
      width: 100%;
      min-height: 250px;
      max-height: 500px;
      overflow-y: auto;
      box-sizing: border-box;
    }
  }
  .commom-attr {
    width: 100%;
    .attr-coordinate,
    .attr-area {
      color: #606266;
      box-sizing: border-box;
      padding: 0 15px;
      margin-bottom: 10px;
      &-x,
      &-y,
      &-w,
      &-h {
        height: 25px;
      }
      :deep .el-input {
        width: 180px;
      }
    }
  }
}
</style>

<template>
  <div class="mainWrapper">
    <!-- 顶栏  -->
    <el-row class="topBarBox">
      <el-col :span="24">
        <TopBar />
      </el-col>
    </el-row>
    <!-- 主面板 -->
    <el-row class="mainBox">
      <!-- 物料堆 -->
      <el-col :span="4">
        <Stock />
      </el-col>
      <!-- 画布 -->
      <el-col :span="15">
        <CanvasArea />
      </el-col>
      <!-- 控制面板 -->
      <el-col :span="5">
        <ConfigWrapper />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from "./../fragments/main/topBar";
import Stock from "../fragments/main/stock.vue";
import CanvasArea from "../fragments/main/canvasArea.vue";
import ConfigWrapper from "../fragments/main/configWrapper.vue";
export default {
  name: "Main",
  components: {
    TopBar,
    Stock,
    CanvasArea,
    ConfigWrapper,
  },
};
</script>

<style lang="less" scoped>
    .mainWrapper{
        width: 100%;
        height: 100%;
        .topBarBox{
            height: 50px;
        }
        .mainBox{
            height: calc(100% - 50px);
        }
    }
</style>

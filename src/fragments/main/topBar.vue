<template>
  <div class="topBarWrapper">
    <div class="logo"></div>
    <div class="r">
      <div class="history">
        <el-tooltip effect="dark" content="撤销" placement="bottom">
          <div :class="['revoke','item',active?'act':'']" @click="handleRevoke"></div>
        </el-tooltip>
        <el-tooltip effect="dark" content="历史" placement="bottom">
          <div :class="['past','item',active?'act':'']" @click="handlePast"></div>
        </el-tooltip>
        <el-tooltip effect="dark" content="保存" placement="bottom">
          <div class="save item" @click="handleSave"></div>
        </el-tooltip>
      </div>
      <div class="user">{{userName}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TopBar",
  props:['tree','updateKey'],
  data() {
    return {
      userName: "三岁就会写bug",
      active:false
    };
  },
  watch:{
      updateKey:function(){
        if(this.tree.type){
          this.active = !!this.tree.children.length 
        }else{
          this.active = false
        }
      }
  },
  methods: {
    handleRevoke() {

    },
    handlePast() {},
    handleSave() {}
  }
};
</script>
<style lang="less" scoped>
.bg(@url) {
  background: url(@url) no-repeat;
  background-size: 100% 100%;
}
.topBarWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
  .logo {
    height: 100%;
    width: 300px;
    background-color: #ccc;
    background: url("../../assets/img/logo.png") no-repeat;
    background-size: 100% 100%;
  }
  .r {
    width: 240px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .history {
      width: 100px;
      height: 100%;
      display: flex;
      align-items: center;
      .item {
        width: 28px;
        height: 25px;
        background-color: #ccc;
        margin-left: 10px;
        cursor: pointer;
        &.past {
          .bg("./../../assets/img/history-dormancy.png");
          width: 25px;
          &.act{
            .bg("./../../assets/img/history.png");
          }
        }
        &.save {
          .bg("./../../assets/img/save.png");
        }
        &.revoke {
          .bg("./../../assets/img/revoke-dormancy.png");
          &.act{
            .bg("./../../assets/img/revoke.png");
          }
        }
      }
    }
    .user {
      margin-right: 10px;
    }
  }
}
</style>

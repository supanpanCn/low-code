<template>
  <div class="topBarWrapper">
    <div class="logo"></div>
    <div class="r">
      <div class="history">
        <el-tooltip effect="dark" content="撤销" placement="bottom">
          <div
            :class="['revoke', 'item', active ? 'act' : '']"
            @click="active && $emit('revocation')"
          ></div>
        </el-tooltip>
        <el-tooltip effect="dark" content="历史" placement="bottom">
          <div
            :class="['past', 'item', memo.length ? 'act' : '']"
            @click="visible = !!memo.length"
          ></div>
        </el-tooltip>
        <el-tooltip effect="dark" content="保存" placement="bottom">
          <div class="save item" @click="active && $emit('save')"></div>
        </el-tooltip>
      </div>
      <div class="user">{{ userName }}</div>
      <el-dialog
        v-model="visible"
        title="历史"
        width="30%"
        custom-class="top-bar-modal"
        :before-close="handleClose"
      >
        <el-select v-model="selectItem" placeholder="请选择历史" size="large">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  showMsg,
} from "~utils";
export default {
  name: "TopBar",
  props: ["memo", "active"],
  data() {
    return {
      userName: "三岁就会写bug",
      visible: false,
      options: [],
      selectItem:undefined
    };
  },
  watch: {
    visible: function (value) {
      if (value) {
        this.options = Object.keys(this.memo.memos);
      }
    },
  },
  methods: {
    handleConfirm(){
      if(!this.selectItem){
        showMsg('请选择')
        return
      }
      let schameTree = this.memo.getMemo(this.selectItem)
      this.$emit('back',schameTree)
      this.visible = false
    }
  },
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
          &.act {
            .bg("./../../assets/img/history.png");
          }
        }
        &.save {
          .bg("./../../assets/img/save.png");
        }
        &.revoke {
          .bg("./../../assets/img/revoke-dormancy.png");
          &.act {
            .bg("./../../assets/img/revoke.png");
          }
        }
      }
    }
    :deep .top-bar-modal {
      .el-dialog__body {
        padding: 4px 20px;
      }
    }
    .user {
      margin-right: 10px;
    }
  }
}
</style>

<template>
  <div class="topBarWrapper">
    <div class="logo"></div>
    <div class="r">
      <div class="history">
        <el-tooltip effect="dark" content="撤销" placement="bottom">
          <div
            :class="['revoke', 'item', active ? 'act' : '']"
            @click="props.active && $emit('revocation')"
          ></div>
        </el-tooltip>
        <el-tooltip effect="dark" content="历史" placement="bottom">
          <div
            :class="['past', 'item', props.memo.length ? 'act' : '']"
            @click="state.visible = !!props.memo.length"
          ></div>
        </el-tooltip>
        <el-tooltip effect="dark" content="保存" placement="bottom">
          <div class="save item" @click="props.active && $emit('save')"></div>
        </el-tooltip>
      </div>
      <div class="user">{{ state.userName }}</div>
      <el-dialog
        v-model="state.visible"
        title="历史"
        width="30%"
        custom-class="top-bar-modal"
        :before-close="handleClose"
      >
        <el-select
          v-model="state.selectItem"
          placeholder="请选择历史"
          size="large"
        >
          <el-option
            v-for="item in state.options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="state.visible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确认</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch, defineProps, computed, defineEmits } from "vue";
import { showMsg } from "~utils";
import useShortcut from "hooks/useShortcut";
const state = reactive({
  userName: "三岁就会写bug",
  visible: false,
  options: [],
  selectItem: undefined,
});

const emit = defineEmits(["back", "revocation", "save"]);
const props = defineProps(["memo", "active"]);
useShortcut({
  revocation:()=>{
    props.active && emit("revocation");
  },
  history:()=>{
    state.visible = !!props.memo.length;
  },
  save:()=>{
    props.active && emit("save");
  }
});
watch(
  () => state.visible,
  (visible) => {
    if (visible) {
      state.options = Object.keys(props.memo.memos);
    }
  }
);
const handleConfirm = () => {
  if (!state.selectItem) {
    showMsg("请选择");
    return;
  }
  let schameTree = props.memo.getMemo(state.selectItem);
  emit("back", schameTree);
  state.visible = false;
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

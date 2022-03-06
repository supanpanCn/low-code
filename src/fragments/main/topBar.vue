<template>
    <div class="topBarWrapper">
        <div class="logo"></div>
        <div class="user">
            三岁就会写bug
        </div>
    </div>
</template>
<script>
export default {
  name: "TopBar",
};
</script>
<style lang="less" scoped>
.topBarWrapper{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%);
    .logo{
        height: 100%;
        width: 300px;
        background-color: #ccc;
        background: url('../../assets/img/logo.png') no-repeat;
        background-size: 100% 100%;
    }
    .user{
        margin-right: 10px;
    }
}
</style>

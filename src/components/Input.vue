<template>
  <el-input v-bind="$attrs" data-id="uiInput"></el-input>
</template>
<script>
export default {
  name: "uiInput",
  props:{
      placeholder:{
          type:String,
          default:'请输入'
      }
  },
};
</script>

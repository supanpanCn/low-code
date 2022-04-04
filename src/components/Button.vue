<template> 
  <el-button data-id="uiButton" >{{ text }}</el-button>
</template>
<script>
export default {
  name: "uiButton",
  props:{
      text:{
          type:String,
          default:'确认'
      }
  },
};
</script>

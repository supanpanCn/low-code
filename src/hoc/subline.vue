<template>
  <div class="subline">
      subline
  </div>
</template>
<script>
export default {
  name: "SublineHoc",
  props:{
      text:{
          type:String,
          default:'确认'
      }
  },
};
</script>

<template>
  <div v-if="activeName=='attr'">
      <div>ssss</div>
  </div>
  <div v-else>behaviour</div>
</template>
<script>
export default {
  name: "uiButtonConfig",
  props: ["activeName"],
  data() {
    return {
      attr: {},
      behaviour: {},
    };
  },
  mounted(){
      console.log(this.activeName,'activeName')
  }
};
</script>

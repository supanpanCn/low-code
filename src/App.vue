<template>
  <div class="appWrapper">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
  },
}
</script>

<style lange="less" scoped>
.appWrapper{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>

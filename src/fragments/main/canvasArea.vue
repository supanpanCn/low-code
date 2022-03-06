<template>
    <div class="canvasWrapper">
        <div v-for="(v,i) in components" :key="i">
            <component :is="v"></component>
        </div>
    </div>
</template>

<script>
import Components from './../../components/index'
export default {
  name: "canvasArea",
  data(){
      return {
          components:[]
      }
  },
  components: {
      ...Components
  },
};
</script>
<style lang="less" scoped>
.canvasWrapper{
    width: 100%;
    height: 100%;
}
</style>

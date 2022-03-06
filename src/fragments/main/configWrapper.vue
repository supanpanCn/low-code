<template>
  <div class="configWrapper">
    <ConfigTabsHoc>
      <template v-slot:props>
        属性配置
      </template>
      <template v-slot:style>
        样式配置
      </template>
    </ConfigTabsHoc>
  </div>
</template>

<script>
import ConfigTabsHoc from "../../hoc/config-tabs-hoc.vue";
export default {
  name: "configWrapper",
  components: {
    ConfigTabsHoc,
  },
};
</script>

<style lang="less" scoped>
.configWrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-left: solid 1px #e0e0e0;
}
</style>

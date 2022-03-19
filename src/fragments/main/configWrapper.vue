<template>
  <div class="configWrapper">
    <ConfigTabsHoc :activeName="activeName" ref="tabs">
      <template v-slot:attr> 
        <component :is="currentComponent" activeName='attr' />
      </template>
      <template v-slot:behaviour> 
        <component :is="currentComponent" activeName='behaviour' />
      </template>
    </ConfigTabsHoc>
  </div>
</template>

<script>
import ConfigTabsHoc from "../../hoc/config-tabs-hoc.vue";
import { uiConfig } from "../../config";
export default {
  name: "configWrapper",
  components: {
    ConfigTabsHoc,
    ...uiConfig
  },
  data(){
    return {
      activeName:'attr',
      currentComponent:uiConfig['uiButtonConfig']
    }
  },
  mounted() {
    console.log(uiConfig, "uiConfig");
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

<template>
  <div class="mainWrapper">
    <!-- 顶栏  -->
    <el-row class="topBarBox">
      <el-col :span="24">
        <TopBar />
      </el-col>
    </el-row>
    <!-- 主面板 -->
    <el-row class="mainBox">
      <!-- 物料堆 -->
      <el-col :span="3">
        <Stock />
      </el-col>
      <!-- 画布 -->
      <el-col :span="15">
        <CanvasArea :jsonSchema="jsonSchema" :updateKey="updateKey" @drop="handleDrop"/>
      </el-col>
      <!-- 控制面板 -->
      <el-col :span="6">
        <ConfigWrapper />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import TopBar from "./../fragments/main/topBar";
import Stock from "../fragments/main/stock.vue";
import CanvasArea from "../fragments/main/canvasArea.vue";
import ConfigWrapper from "../fragments/main/configWrapper.vue";
import {
  createNode,
  createInitialSchame,
  getUuid,
  getNearestContainerId,
  uiFlag,
  showMsg
} from "~utils";
export default {
  name: "Main",
  provide(){
    return {
      removeNode:this.handleRemoveNode
    }
  },
  data() {
    return {
      jsonSchema: createInitialSchame(),
      updateKey:0
    };
  },
  methods: {
    handleRemoveNode(uid){
      const { componentsTree: tree } = this.jsonSchema;
      function del(node){
        for(let i=0;i<node.length;i++){
          if(node[i].uid === uid){
            node.splice(i,1)
            break
          }else{
            del(node[i].children)
          }
        }
      }
      del(tree.children)
      this.updateKey++
    },
    handleDrop(e) {
      const { componentsTree: tree } = this.jsonSchema;
      // 判断是否存在交互组件
      const uiName = e.dataTransfer.getData("ui-component-name");
      if(!tree.type && uiName !== uiFlag.CONTAINER){
        showMsg('请选择交互组件');
        return
      }
      // 组装schema
      if (!tree.type) { //根节点
        tree.type='Container'
        tree.uid = getUuid()
        tree.isRoot = true
        tree.children = []
      } else {
        const uid = getNearestContainerId(e)
        const stack = [tree]
        let schameNode = null
        while(stack.length){
          const node = stack.shift()
          if(node.uid === uid){
            stack.length = 0
            schameNode = node
          }else{
            if(Array.isArray(node.children)){
              for(let i=0;i<node.children.length;i++){
                stack.push(node.children[i])
              }
            }
          }
        }
        if(!Array.isArray(schameNode.children)){
          schameNode.children = []
        }
        schameNode.children.push(createNode(uiName.slice(2)))
      }
      this.updateKey++
    }
  },
  components: {
    TopBar,
    Stock,
    CanvasArea,
    ConfigWrapper
  }
};
</script>

<style lang="less" scoped>
.mainWrapper {
  width: 100%;
  height: 100%;
  .topBarBox {
    height: 50px;
  }
  .mainBox {
    height: calc(100% - 50px);
    #app{
      height: 100%;
      :deep >.uiContainer:nth-of-type(1){
        height: 100%;
        box-sizing: border-box;
        padding-top: 20px;
      }
    }
  }
}
</style>

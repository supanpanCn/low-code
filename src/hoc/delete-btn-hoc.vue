<template>
  <div class="deleteBtnHoc"  @click="handleActivate">
    <div class="delete" @click="handleDelete" v-if="isShowDelete"></div>
    <slot />
  </div>
</template>
<script>
import { ActiveList } from "~utils";
export default {
  name: "deleteBtnHoc",
  props: ["uid"],
  inject:['removeNode'],
  data() {
    return {
      isShowDelete: false,
      actInstance:null
    };
  },
  mounted(){
    this.actInstance =  ActiveList.getInstance()
  },
  methods: {
    handleActivate(e) {
      e.stopPropagation();
      if(this.actInstance){
        this.actInstance.update()
        this.actInstance.attach(this)
      }
      this.isShowDelete = true;
      
    },
    handleDelete(){
      if(this.actInstance){
        this.actInstance.update()
      }
      this.$nextTick(()=>{
        setTimeout(()=>{
          this.isShowDelete = false
        },100)
      })
      this.removeNode(this.uid)
    }
  },
};
</script>
<style lang="less" scoped>
.deleteBtnHoc {
  width: 100px;
  height: auto;
  background-color: #ccc;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  .delete {
    position: absolute;
    right: 0;
    top: -20px;
    background: url("./../assets/img/delete.png") no-repeat;
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
}
</style>

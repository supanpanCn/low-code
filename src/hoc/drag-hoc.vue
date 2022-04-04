<template>
  <div class="drag-hoc" :draggable="true" @dragend="handleDragEnd">
    <slot />
  </div>
</template>

<script setup>
import { inject , useAttrs } from "vue";
import {getPooints} from '~utils'
const attrs = useAttrs()
const {tree:{
    uid,
},setUpKey} = attrs
const updateNode = inject('updateNode') 
const handleDragEnd = (e) => {
  const {x,y} = getPooints(e)
  if(typeof updateNode === 'function'){
      const attribute = {
          x,
          y
      }
      updateNode(uid,attribute)
      if(typeof setUpKey === 'function'){
          setUpKey()
      }
  }
};
</script>

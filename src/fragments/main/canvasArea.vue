<template>
  <el-empty description="请拖拽到此" v-if="!isEmpty"></el-empty>
  <div class="canvasWrapper" data-id="canvas" v-else>
    <!-- <enchanceUiContainer pIndex="0" />
    <enchanceUiContainer pIndex="1" />
    <enchanceUiContainer pIndex="2" :renderSlot="() => getCh(2)">
    </enchanceUiContainer>
    <enchanceUiContainer pIndex="3" :renderSlot="renderChildContainer">
      <template>
        <enchanceUiContainer pIndex="3-0">
          <template>
            <enchanceUiContainer pIndex="3-1"> </enchanceUiContainer>
          </template>
        </enchanceUiContainer>
      </template>
    </enchanceUiContainer>
    <enchanceUiButton type="primary" /> -->
  </div>
</template>

<script>
import { parsers } from "ui/index";
import { hasLen } from "~utils";
export default {
  name: "canvasArea",
  props: {
    json: {
      type: Object,
    },
  },
  data() {
    return {
      components: [],
      isEmpty: hasLen(this.json.componentsTree.children) || true,
      childs: [
        {
          type: "Container",
          children: [
            {
              type: "Container",
            },
          ],
        },
      ],
    };
  },
  methods: {
    getCh(pIndex) {
      let res = [];
      this.renderChildContainer(
        pIndex,
        [
          {
            type: "Container",
            children: [
              {
                type: "Container",
              },
            ],
          },
        ],
        res
      );
      console.log(res, "插入");
    },
    renderChildContainer(pIndex, children, arr) {
      if (Array.isArray(children)) {
        for (let i = 0; i < children.length; i++) {
          let v = children[i];
          arr.push(<enchanceUiContainer pIndex={pIndex + "-" + i} />);
          this.renderChildContainer(v.children);
        }
      }
    },
  },
  mounted() {
    // console.log(parsers, "解析");
    // for (let i = 0; i < this.childs.length; i++) {
    //       let v = this.childs[i];
    //       arr.push(<enchanceUiContainer pIndex={pIndex + "-" + i} />);
    //       this.renderChildContainer(v.children);
    //     }
  },
  components: {
    ...parsers,
  },
};
</script>
<style lang="less" scoped>
.canvasWrapper {
  width: 100%;
  height: 100%;
}
</style>

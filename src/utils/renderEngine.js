import { parsers } from "ui";
import {parseUrlParams,createInitialSchame,uiPrefix} from '~utils'
import DeleteHoc from '../hoc/delete-btn-hoc'
// 渲染引擎
export default {
    name: 'renderEngine',
    props: {
        jsonSchema: {
            type: Object,
            default: () => {
                return createInitialSchame()
            }
        },
    },
    data() {
        return {
            pageParams: null,
            layout:null,
            renderFunc:null,
        }
    },
    created() {
         this.init()
    },
    methods: {
        init(){
            const {componentsTree,layout} = this.jsonSchema
            this.pageParams = parseUrlParams(this.jsonSchema.query)
            this.layout = layout
            this.tree = componentsTree
        },
        renderTree(tree,h){
            let _children = null
            if(Array.isArray(tree.children) && tree.children.length){
                _children = this.renderChildren(tree,h)
            }
            return this.renderRealComponent(tree,_children,h)
        },
        renderChildren(node,h){
            let list = node.children || [].concat(node)
            return list.map((v)=>this.renderTree(v,h))
        },
        renderRealComponent(tree,children,h){
            const t = uiPrefix + tree.type
            const realCom =  parsers[t]
            if(realCom){
                if(tree.isRoot){
                    return realCom.render(h,tree,children)
                }
                return <DeleteHoc uid={tree.uid}>
                    {realCom.render(h,tree,children)}
                </DeleteHoc> 
            }
            return null
        }
    },
    render(h) {
        return <div id='app'>
            {this.renderTree(this.tree,h)}
        </div>
    },
    components: {
        ...parsers
    },
}
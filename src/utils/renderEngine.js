import { parsers } from "ui";
import { parseUrlParams, createInitialSchame, uiPrefix } from '~utils'
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
        updateKey:{
            type:Number
        }
    },
    data() {
        return {
            pageParams: null,
            layout: null,
            renderFunc: null,
        }
    },
    watch:{
        updateKey:function(){
            this.init()
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            const { componentsTree, layout } = this.jsonSchema
            this.pageParams = parseUrlParams(this.jsonSchema.query)
            this.layout = layout
            this.tree = componentsTree
        },
        renderTree(tree) {
            let _children = null
            if (Array.isArray(tree.children) && tree.children.length) {
                _children = this.renderChildren(tree)
            }
            return this.renderRealComponent(tree, _children)
        },
        renderChildren(node) {
            let list = node.children || [].concat(node)
            return list.map((v) => this.renderTree(v))
        },
        renderRealComponent(tree, children) {
            const t = uiPrefix + tree.type
            const realCom = parsers[t]
            if (realCom) {
                if (tree.isRoot) {
                    return realCom.render(tree, children)
                }
                return <DeleteHoc uid={tree.uid} type={tree.type} key={tree.type}>
                    {realCom.render(tree, children)}
                </DeleteHoc>
            }
            return null
        }
    },
    render() {
        
        return <div id='app'>
            {this.renderTree(this.tree)}
        </div>
    },
    components: {
        ...parsers
    },
}
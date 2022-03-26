import { uiComponents } from "ui";
import { parseUrlParams, createInitialSchame, uiPrefix } from '~utils'
import DeleteHoc from '../hoc/delete-btn-hoc'
import { h } from 'vue'
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
        updateKey: {
            type: Number
        }
    },
    data() {
        return {
            pageParams: null,
            layout: null,
            renderFunc: null,
        }
    },
    watch: {
        updateKey: function () {
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
        _h(realCom, children, tree) {
            return h(realCom, {
                uid: tree.uid,
            }, children)
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
            const realCom = uiComponents[t]
            if (realCom) {
                if (tree.isRoot) {
                    return this._h(realCom, children, tree)
                }
                return <DeleteHoc tree={tree} key={tree.uid}>
                    {this._h(realCom, children, tree)}
                </DeleteHoc>
            }
            return null
        }
    },
    render() {
        return <div id='root' style={{ position: 'relative' }}>
            {this.renderTree(this.tree)}
        </div>
    },
    components: {
        ...uiComponents
    },
}
import { parsers } from "ui";
// 渲染引擎
export default {
    props: {
        jsonSchema: {
            type: Object,
            default: () => {
                return {
                    type: 'root',
                    children: []
                }
            }
        }
    },
    components:{
        ...parsers
    },
    name: 'renderEngine',
    methods: {
        renderLi(items){
            const li = <div>li</div>
            let ul = []
            if(Array.isArray(items)){
                ul = items.map(v=>{
                    return this.renderLi(v.children)
                })
            }
            return [li,...ul]
        },
        renderContainer(children) {
            if (Array.isArray(children) && children.length) {
                return children.map(v => {
                    return <div>Container{this.renderLi(v.children)}</div>
                })
            }
            return null
        }
    },
    render() {
        const { componentsTree } = this.jsonSchema
        const { type: rootId, children } = componentsTree
        console.log('children', children,parsers)
        return <div id={rootId}>
            {this.renderContainer(children)}
            159
        </div>
    }
}
import UiContainer from '../components/Container'
import { bindActiveEvent } from '../utils/index'
export default {
    name:'enchanceUiContainer',
    components:{
        UiContainer
    },
    render() {
        // 发布订阅者模式，接收拖拽通知，高亮显示
        const _props = {
            ...bindActiveEvent(this)
        }
        return <UiContainer {..._props}/>
    },
}
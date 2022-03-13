import uiButton from '../components/Button.vue'
import { bindActiveEvent } from '../utils/index'
export default {
    name:'enchanceUiButton',
    components:{
        uiButton
    },
    render() {
        const _props = {
            ...bindActiveEvent(this)
        }
        return <uiButton {..._props}/>
    },
}
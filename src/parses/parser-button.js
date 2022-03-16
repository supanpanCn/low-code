import uiButton from 'ui/Button.vue'
import { bindActiveEvent } from '~utils'
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
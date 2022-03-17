import uiTag from 'ui/Tag'
import { bindActiveEvent } from '~utils'
export default {
    name:'enchanceUiTag',
    components:{
        uiTag
    },
    render() {
        const _props = {
        }
        return <uiTag {..._props}/>
    },
}
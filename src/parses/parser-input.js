import uiInput from 'ui/Input'
import { bindActiveEvent } from '~utils'
export default {
    name: 'enchanceUiInput',
    components: {
        uiInput
    },
    render() {
        const _props = {
            ...bindActiveEvent(this)
        }
        return <uiInput {..._props} />
    },
}
import uiInput from '../components/Input'
import { bindActiveEvent } from '../utils/index'
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
import uiInput from 'ui/Input'
import { bindActiveEvent, EventBus } from '~utils'
export default {
    name: 'enchanceUiInput',
    components: {
        uiInput
    },
    render(tree) {
        const _props = {
            ...bindActiveEvent(this),
            onFocus: (e) => {
                EventBus.emit(`${tree.uid}`, e)
            }
        }
        return <uiInput {..._props} />
    },
}
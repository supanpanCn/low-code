import UiContainer from 'ui/Container'
import { bindActiveEvent,getUuid } from '~utils'
export default {
    name: 'enchanceUiContainer',
    props: {
    },
    components: {
        UiContainer
    },
    render(_, tree, children) {
        this.schame = tree
        const {uid=getUuid()} = tree
        const _props = {
            uid,
            onDragover: () => {
                // console.log('炸')
            },
            ...bindActiveEvent(this)
        }
        return <UiContainer {..._props}>
            {children}
        </UiContainer>
    },
}
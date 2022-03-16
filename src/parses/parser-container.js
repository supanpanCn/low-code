import UiContainer from 'ui/Container'
import { bindActiveEvent } from '~utils'
export default {
    name: 'enchanceUiContainer',
    props: {
    },
    components: {
        UiContainer
    },
    render(_, tree, children) {
        this.schame = tree
        const _props = {
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
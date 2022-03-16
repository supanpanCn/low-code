import UiContainer from 'ui/Container'
import { bindActiveEvent,Observer,Center } from '~utils'
export default {
    name:'enchanceUiContainer',
    props:{
        renderSlot:{
            type:Function,
            default:()=>{}
        }
    },
    components:{
        UiContainer
    },
    data() {
        return {
            draging:false
        }
    },
    methods: {
        updateDraging(dragStatus){
            this.draging = dragStatus
        }
    },
    mounted() {
        new Observer(this,Center.getInstance())
    },
    render() {
        const _props = {
            draging:this.draging,
            onDragover:()=>{
                // console.log('炸')
            },
            ...bindActiveEvent(this)
        }
        return <UiContainer {..._props}>
            {this.$slots.default && this.$slots.default()}
        </UiContainer>
    },
}
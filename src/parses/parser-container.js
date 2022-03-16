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
        console.log(this.renderSlot(),'this',)
        const _props = {
            draging:this.draging,
            onDragover:()=>{
                // console.log('炸')
            },
            ...bindActiveEvent(this)
        }
        return <UiContainer {..._props}>
            {/* 怎么接收到slot的内容传递下去？ */}
            {/* {this.renderSlot()} */}
        </UiContainer>
    },
}
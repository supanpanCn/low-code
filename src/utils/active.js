export class ActiveList{
    constructor(){
        this.actives = []
    }
    attach(instance){
        this.actives.push(instance)
    }
    update(){
        this.actives.forEach(v=>{
            v.isActive = false
        })
    }
    static instance = null
    static getInstance(){
        if(ActiveList.instance){
            return ActiveList.instance
        }
        return ActiveList.instance = new ActiveList()
    }
}
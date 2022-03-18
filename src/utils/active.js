export class ActiveList{
    constructor(){
        this.actives = []
    }
    attach(instance){
        this.actives.push(instance)
    }
    update(key){
        this.actives.forEach(v=>{
            v[key] = false
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
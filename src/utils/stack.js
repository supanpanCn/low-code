export class Stack{
    constructor(){
        this.stack = []
    }
    push(item){
        this.stack.push(item)
    }
    pop(){
        this.stack.pop()
        return this.stack.pop()
    }
}
export class MemoList{
    constructor(){
        this.memos = {}
        this.length = 0
        this.current = null
    }
    getMemo(key){
        return this.memos[key]
    }
    setMemo(key,value){
        this.length++
        this.current = value
        this.memos[key] = value
    }
    
}
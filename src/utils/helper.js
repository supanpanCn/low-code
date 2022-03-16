const uiMap = {
    uiButton: '按钮',
    uiContainer: '交互组件',
    uiInput: '输入框'
}
// 将组件name映射为中文
export const parseUiName = (name) => {
    return uiMap[name]
}
// 为物料原子组件绑定激活事件
export const bindActiveEvent = (_this) => {
    return {
        onClick: e => {
            e.stopPropagation();
            _this.$emit('activate', {
                type: 'enchanceUiButton',
                id: _this._.uid
            })
        }
    }
}
// 判断画布是否为空
export const hasLen = (p) => {
    if (Array.isArray(p)) {
        return !!p.length
    }
    if (Object.prototype.toString.call(p) === '[object Object]') {
        return !!Object.keys(p).length
    }
    return false
}
// 关键组件标识
export const uiFlag = {
    ROOT: 'canvas',
    CONTAINER: 'uiContainer'
}
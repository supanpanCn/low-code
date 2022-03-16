import { ElMessage } from 'element-plus';
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
// 消息提示
export const showMsg = (msg, type = 'warning') => {
    ElMessage[type](msg)
}
// 校验是否存在交互组件
export const validiteHasContainer = (e, uiName, children) => {
    if (uiName !== uiFlag.CONTAINER) {
        if (Array.isArray(children) && children.length === 0) {
            showMsg('请选择交互组件');
            return false;
        }
        let node = e.target;
        let hasRoot = true;
        while (node.dataset.id !== uiFlag.CONTAINER && node.dataset.id !== uiFlag.ROOT) {
            node = node.parentNode;
        }
        if (node.dataset.id === uiFlag.ROOT) {
            hasRoot = false;
        }
        if (!hasRoot) {
            showMsg('请选择交互组件');
            return false;
        }
    }
    return true;
}
// 默认节点类型
export const createNode = (nodeName) => {
    return {
        type: nodeName,
        children: [],
    };
}
// 获取节点深度
export const getDepth = (e) => {
    let node = e.target;
    let targetIndex = -1
    while (node.dataset.id !== uiFlag.ROOT) {
        if (node.dataset.id === uiFlag.CONTAINER) {
            const t = node.getAttribute("p-index")
            targetIndex = targetIndex != -1 ? targetIndex : t
        }
        node = node.parentNode;
    }
    return targetIndex
}
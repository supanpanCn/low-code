import { ElMessage } from 'element-plus';
const uiMap = {
    uiButton: '按钮',
    uiContainer: '交互组件',
    uiInput: '输入框',
    uiTag: '标签'
}
// 关键组件标识
export const uiFlag = {
    ROOT: 'canvas',
    CONTAINER: 'uiContainer',
}
export const uiPrefix = 'enchanceUi'
// 将组件name映射为中文
export const parseUiName = (name) => {
    return uiMap[name]
}
// 为物料原子组件绑定激活事件
export const bindActiveEvent = (_this) => {
    return {
        onClick: e => {
            e.stopPropagation();
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

// 消息提示
export const showMsg = (msg, type = 'warning') => {
    ElMessage[type](msg)
}
// 默认节点类型
export const createNode = (nodeName) => {
    return {
        type: nodeName,
        children: [],
        uid: getUuid()
    };
}
// 获取交互组件
export const getNearestContainerId = (e) => {
    let node = e.target
    while (!node.className.includes(uiFlag.CONTAINER)) {
        node = node.parentNode
    }
    return node.getAttribute('uid')
}
//获取url参数
export const parseUrlParams = (params) => {
    return params
}
//获取初始schame
export const createInitialSchame = () => {
    return {
        componentsTree: {},
        layout: {},
        query: undefined
    }
}
// 生成唯一标识id
export const getUuid = () => {
    var d = new Date().getTime();
    if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now();
    }
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
}
// 判断两棵树是否相同
export const isSameTree = (p, q) => {
    if ((p == null && q != null) || (p != null && q == null)) {
        return false;
    }
    if (p == null && q == null) {
        return true;
    }
    if (p.uid != q.uid) {
        return false;
    }
    if (p.children.length != q.children.length) {
        return false;
    }
    return p.children.every((v, i) => isSameTree(v, q.children[i]))
}

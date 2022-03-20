import { ElMessage } from 'element-plus';
import { uiMap, attrMap } from './inner'

export const pxToNumber = (px) => {
    return px.replace('px', '') * 1
}
// 获取物料和顶栏宽高
export const getRelativePos = ()=>{
    const menuWrapper = document.getElementsByClassName('stockWrapper')[0]
    const barWrapper = document.getElementsByClassName('topBarWrapper')[0]
    const { width } = getComputedStyle(menuWrapper)
    const { height } = getComputedStyle(barWrapper)
    return {
        menuWidth:width,
        barHeight:height
    }
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
export const createNode = (nodeName, layout) => {
    return {
        type: nodeName,
        layout,
        children: [],
        uid: getUuid()
    };
}
// 获取交互组件
export const getNearestContainerId = (e) => {
    let node = e.target || e
    while (!node.className.includes(uiFlag.CONTAINER)) {
        node = node.parentNode
    }
    return {
        uid: node.getAttribute('uid'),
        el: node
    }
}

// 获取物料在画布中的位置
export const getPooints = (e) => {
    return {
        x: e.clientX,
        y: e.clientY,
    }
}
// 解析layout
export const parseLayout = (layout, config) => {
    const { attr } = layout
    const { w } = config
    const attribute = {}
    const { menuWidth:width, barHeight:height } = getRelativePos()

    for (let key in attr) {
        let t = attrMap[key] == 'left' ? attr[key] - (w >> 1): attr[key]
        if (attrMap[key] == 'left') {
            if (Math.abs(attr[key] - pxToNumber(width)) < (w>>1)) {
                t = pxToNumber(width)
            }
        }

        if (attrMap[key] == 'top') {
            if (Math.abs(attr[key] - pxToNumber(height)) < 10) {
                t = pxToNumber(height)
            }
        }
        attribute[attrMap[key]] = t + 'px'
    }

    return {
        attribute
    }
}
// 获取根元素
export const getRootElement = () => {
    const root = document.getElementById("root");
    const { width, height } = getComputedStyle(root);
    return {
        width,
        height
    }
}
// 设置辅助线
export const setSubline = function (attribute) {
    const { width, height } = getRootElement();
    const { menuWidth, barHeight } = getRelativePos();
    const { top, left } = attribute
    this.$refs["subline-x"].style = objToStr({
        width,
        height: "1px",
        top: pxToNumber(top) + "px",
        left: pxToNumber(menuWidth) + "px",
        position: "fixed",
        background: "blue",
    });
    this.$refs["subline-y"].style = objToStr({
        width: "1px",
        height,
        left: pxToNumber(left) + "px",
        top: pxToNumber(barHeight) + "px",
        position: "fixed",
        background: "blue",
    })
}
// 对象转str
export const objToStr = (obj) => {
    let str = ''
    for (let key in obj) {
        str += key + ':' + obj[key] + ';'
    }
    return str
}
//获取url参数
export const parseUrlParams = (params) => {
    return params
}
//获取初始schame
export const createInitialSchame = () => {
    return {
        componentsTree: {},
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

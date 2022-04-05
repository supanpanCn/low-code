import { ElMessage } from 'element-plus';
import { uiMap, attrMap } from './inner'
import {getRootElementInfo,getRelativePos} from './document'
export const KeyCodeMap = {
    90: {
        label: '撤销',
        value: 'ctrl+z'
    },
    72: {
        label: '历史',
        value: 'ctrl+x'
    },
    83: {
        label: '保存',
        value: 'ctrl+s'
    },
    67: {
        label: '复制',
        value: 'ctrl+c'
    },
    86: {
        label: '粘贴',
        value: 'ctrl+v'
    }
}

// px转数字
export const pxToNumber = (px) => {
    return px.replace('px', '') * 1
}

// 关键组件标识
export const uiFlag = {
    ROOT: 'canvas',
    CONTAINER: 'uiContainer',
}
export const uiPrefix = 'ui'
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



// 解析layout
export const parseLayout = (layout, config) => {
    const { attr } = layout
    const { w } = config
    const attribute = {}
    const { menuWidth: width, barHeight: height } = getRelativePos()

    for (let key in attr) {
        let t = attrMap[key] == 'left' ? attr[key] - (w >> 1) : attr[key]
        if (attrMap[key] == 'left') {
            if (Math.abs(attr[key] - pxToNumber(width)) < (w >> 1)) {
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

// 设置辅助线
export const setSubline = function (attribute) {
    const { width, height } = getRootElementInfo();
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
// 获取最近节点
export const getNearestPoint = (tree, distance, e) => {
    const { children = [], layout = {}, type } = tree;
    const { attr = {} } = layout;
    const { x = 0, y = 0 } = attr;
    let res = null;
    const width = Math.abs(x - e.clientX);
    const height = Math.abs(y - e.clientY);
    const sideLen = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    if (sideLen < distance && type !== '"Container"') {
        res = tree;
    }
    for (let i = 0; i < children.length && !res; i++) {
        res = getNearestPoint(children[i], distance, e);
    }
    return res;
}
// 根据id查找节点
export const findById = (tree, uid) => {
    const stack = [tree];
    let currentNode = null;
    let parentNode = null
    while (stack.length) {
        const node = stack.shift();
        if (node.uid === uid) {
            stack.length = 0;
            currentNode = node;
        } else {
            if (Array.isArray(node.children) && node.children.length) {
                parentNode = node
                for (let i = 0; i < node.children.length; i++) {
                    stack.push(node.children[i]);
                }
            }
        }
    }
    return {
        node: currentNode,
        parentNode
    }
}
// 深拷贝
export const deepCopy = target => {
    if (target && typeof target === 'object') {
      const result = Array.isArray(target) ? [] : {};
      for (const k in target) {
        if (typeof target[k] === 'object') {
          result[k] = deepCopy(target[k])
        }
        else {
          result[k] = target[k]
        }
      }
  
      return result
    }
  
    return target
  }

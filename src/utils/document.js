import { pxToNumber, uiFlag } from './helper'
// 获取物料在画布中的位置、宽高
export const getElementInfo = (e) => {
    const { width, height } = getComputedStyle(e.target) || document.getBoundingClientRect(e.target)
    return {
        x: e.clientX,
        y: e.clientY,
        width: pxToNumber(width),
        height: pxToNumber(height)
    }
}
// 获取根元素
export const getRootElement = () => {
    return document.getElementById("root") || document.getElementsByClassName('snap-align')[0];
}
// 获取根元素
export const getRootElementInfo = () => {
    const root = getRootElement();
    const { width, height } = getComputedStyle(root);
    return {
        width,
        height
    }
}
// 获取物料和顶栏宽高
export const getRelativePos = () => {
    const menuWrapper = document.getElementsByClassName('stockWrapper')[0]
    const barWrapper = document.getElementsByClassName('topBarWrapper')[0]
    const { width } = getComputedStyle(menuWrapper)
    const { height } = getComputedStyle(barWrapper)
    return {
        menuWidth: width,
        barHeight: height
    }
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
// 根据uid获取dom
export const getElementByUid = (uid,wrapper=document) => {
    let element = wrapper.getElementById(uid)
    if (!element) {
        const res = Array.from(wrapper.getElementsByClassName('uiContainer')).filter(v => v.getAttribute('uid') == uid)
        element = res[0]
    }
    return element
}
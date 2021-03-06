import { getRelativePos, getRootElementInfo } from './document'
// 6 条线
let lines = {
    xt: null,
    xc: null,
    xb: null,
    yl: null,
    yc: null,
    yr: null
}
// 横3竖3
export function initRefLines() {
    const { width, height } = getRootElementInfo();
    const { menuWidth, barHeight } = getRelativePos()
    for (let l in lines) {
        let node = lines[l] = document.createElement('div')
        node.classList.add('ref-line', l)
        node.style.cssText =
            ` display: none;
      opacity: 0.7;
      position: absolute;
      background: steelblue;
      z-index: 99999;
      ${l[0] === 'x' ? `width: ${width}; height: 1px; left: ${menuWidth}` : `width: 1px; height: ${height}; top: ${barHeight}`}
    `
        node.show = function () {
            this.style.display = 'block'

        }
        node.hide = function () {
            this.style.display = 'none'
        }
        document.body.appendChild(node)
    }
}

export class RefLine {
    constructor(gap) {
        this.gap = gap
        this.rectifyInfo = {}
    }
    check(draging, othersClsStr, parent = document.body) {
        const allOthersNode = document.querySelectorAll(othersClsStr);
        let dragRect = draging.getBoundingClientRect()
        let parentRect = parent.getBoundingClientRect()
        this.rectifyInfo = {}
        this.uncheck()
        Array.from(allOthersNode).forEach(item => {
            item.classList.remove('ref-line-active');
            if (draging === item) return;
            let { top, height, width, left, right, bottom } = item.getBoundingClientRect()
            let dragWidthHalf = dragRect.width / 2
            let dragHeightHalf = dragRect.height / 2
            let itemWidthHalf = width / 2
            let itemHeightHalf = height / 2
            let conditions = {
                top: [
                    // xt-top
                    {
                        isNearly: this.__isNearly(dragRect.top, top),
                        lineNode: lines.xt,
                        lineValue: top,
                        dragValue: top
                    },
                    // xt-bottom
                    {
                        isNearly: this.__isNearly(dragRect.bottom, top),
                        lineNode: lines.xt,
                        lineValue: top,
                        dragValue: top - dragRect.height
                    },
                    // cx
                    {
                        isNearly: this.__isNearly(dragRect.top + dragHeightHalf, top + itemHeightHalf),
                        lineNode: lines.xc,
                        lineValue: top + itemHeightHalf,
                        dragValue: top + itemHeightHalf - dragHeightHalf
                    },
                    // xb-top
                    {
                        isNearly: this.__isNearly(dragRect.bottom, bottom),
                        lineNode: lines.xb,
                        lineValue: bottom,
                        dragValue: bottom - dragRect.height
                    },
                    // xb-bottom
                    {
                        isNearly: this.__isNearly(dragRect.top, bottom),
                        lineNode: lines.xb,
                        lineValue: bottom,
                        dragValue: bottom
                    }
                ],
                left: [
                    {
                        isNearly: this.__isNearly(dragRect.left, left),
                        lineNode: lines.yl,
                        lineValue: left,
                        dragValue: left
                    },
                    {
                        isNearly: this.__isNearly(dragRect.right, left),
                        lineNode: lines.yl,
                        lineValue: left,
                        dragValue: left - dragRect.width
                    },
                    {
                        isNearly: this.__isNearly(dragRect.left + dragWidthHalf, left + itemWidthHalf),
                        lineNode: lines.yc,
                        lineValue: left + itemWidthHalf,
                        dragValue: left + itemWidthHalf - dragWidthHalf
                    },
                    {
                        isNearly: this.__isNearly(dragRect.right, right),
                        lineNode: lines.yr,
                        lineValue: right,
                        dragValue: right - dragRect.width
                    },
                    {
                        isNearly: this.__isNearly(dragRect.left, right),
                        lineNode: lines.yr,
                        lineValue: right,
                        dragValue: right
                    }
                ]
            }
            
            for (let key in conditions) {
                conditions[key].forEach(condition => {
                    if (!condition.isNearly) return;
                    item.classList.add('ref-line-active');
                    this.rectifyInfo[key] = `${parseInt(condition.dragValue) - parseInt(parentRect[key])}px`
                    condition.lineNode.style[key] = `${parseInt(condition.lineValue)}px`
                    condition.lineNode.show()
                })
            }
        })
    }

    uncheck() {
        Object.values(lines).forEach(item => item.hide())
        Array.from(document.querySelectorAll('.ref-line-active')).forEach(node => node.classList.remove('ref-line-active'))
        return this.rectifyInfo
    }

    __isNearly(a, b) {
        return Math.abs(a - b) < this.gap
    }
}
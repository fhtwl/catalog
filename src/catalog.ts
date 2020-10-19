// 原数据
interface data {
    html: string,
    title: string
}


// dom对象
interface dom {
    childElementCount: number
    childNodes: []
    tagName: string
    [propname: string]: any
}
// 虚拟dom
interface documentFragment {
    // readonly childElementCount: number
    // readonly children: dom[]
    [propname: string]: any
}
// tree对象
interface treeNode {
    class: string,
    text: string,
    children: treeNode [],
    id: string
    [propname: string]: any
}
class CatalogTree {
    html: string = ''
    title: string = ''
    tree: treeNode[] = []
    private level: number = 1 //初始层级
    private levelArr: number [] = [1]
    private treeArr: dom [] = []
    private arr: treeNode [] = []
    constructor(data: data) {
        this.html = data.html
        this.title = data.title
        let tree = this.getDomTree(this.html)
        this.tree = this.ergodic(tree,this.title)
        // this.tree = this.ergodic(tree,this.title)
    }
    ergodic (tree: documentFragment,title: string): treeNode[] { //遍历dom，转化为数组
        
        for(let i: number = 0,len: number = tree.childElementCount; i < len ; i++){
            this.treeArr.push(tree.childNodes[i])
        }
        let isH1 = this.treeArr.filter( (v: dom) => {
            return v.tagName && v.tagName.indexOf('H1') > -1
        })
        console.log(isH1)
        if(this.title.length > 0) {
            this.arr.push({
                class: 'H1',
                text: title,
                children: [],
                id: 'tree-body'
            })
        }
        else if(!this.title && isH1.length == 0) {
            this.arr.push({
                class: 'H1',
                text: title,
                children: [],
                id: 'tree-body'
            })
        }
        this.domArrayEach(this.treeArr)
        return this.arr
    }
    getDomTree(str: string): documentFragment {
        return document.createRange().createContextualFragment(str)
    }
    domArrayEach(treeArr: dom[]) { //递归遍历dom树
        treeArr.forEach(v => {
            if(v.tagName && v.tagName.indexOf('H') > -1) {
                //判断是否是h标签
                if(v.tagName.replace('H','') === this.level.toString()) {
                    // 判断h标签的层级是否与上一个节点相等
                    this.lEach(this.arr,v)
                    this.level = Number(v.tagName.replace('H',''))
                }
                else if(v.tagName.replace('H','') > this.level.toString()) {
                    // 判断h标签层级是否小于上一个节点
                    this.sEach(this.arr,v)
                    this.level = Number(v.tagName.replace('H',''))
                    this.levelArr.push(this.level)
                }
                else {

                    let dqLeaveId: number = Number(v.tagName.replace('H',''))
                    // 当前标签层级大于上一个节点
                    if(Number(this.levelArr.indexOf(dqLeaveId)) > -1) {
                        //之前存在相同的节点
                        this.hEach(this.arr,v,dqLeaveId)
                    }
                    else {
                        throw new Error('标题层级异常');
                    }
                    this.level = Number(v.tagName.replace('H',''))
                }
            }
        })
    }
    lEach(arr: treeNode[],v: dom) {
        if(arr[arr.length - 1].children) {
            let lid = arr[arr.length - 1].class
            let leaveId = 'H' + this.level.toString()
            if(lid == leaveId) {
                arr.push({
                    class: v.tagName,
                    text: v.innerText,
                    id: v.firstChild.id,
                    children: []
                })
            }
            else {
                this.lEach(arr[arr.length - 1].children,v)
            }
        }
    }
    sEach(arr: treeNode[],v: dom) {
        if(arr[arr.length - 1].children.length > 0) {
            this.sEach(arr[arr.length - 1].children,v)
        }
        else {
            let children = v.children
            let id = v.firstChild.id
            for(let ai = 0;ai<children.length;ai++) {
                if(children[ai].tagName == 'A') {
                    id = children[ai].id
                    break
                }
            }
            arr[arr.length - 1].children.push({
                class: v.tagName,
                text: v.innerText,
                children: [],
                id: id
            })
        }
    }
    hEach(arr: treeNode[],v: dom,dqLeaveId: number) {
        if(arr[arr.length - 1] && arr[arr.length - 1].children) {
            let lid = arr[arr.length - 1].class
            let leaveId = 'H' + dqLeaveId
            if(lid == leaveId) {
                arr.push({
                    class:v.tagName,
                    text: v.innerText,
                    id: v.firstChild.id,
                    children: []
                })
            }
            else {
                this.hEach(arr[arr.length - 1].children,v,dqLeaveId)
            }
        }
    }
}
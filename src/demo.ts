function CatalogTree(data) {
    let { html = '',title = '' } = data
    this.html = html
    this.title = title
    this.tree = []
}
//遍历
CatalogTree.prototype.ergodic = function (tree,title) {
    let level = 1 //初始层级
    let levelArr = ['1']
    let treeArr = []
    let arr = []
    for(let i = 0,len = tree.childElementCount; i < len ; i++){
        treeArr.push(tree.childNodes[i])
    }
    let isH1 = treeArr.filter( v => {
        return v.tagName && v.tagName.indexOf('H1') > -1
    })
    if(this.title) {
        arr.push({
            class: 'H1',
            text: title,
            children: [],
            id: '1'
        })
    }
    else if(!this.title && isH1.length == 0) {
        arr.push({
            class: 'H1',
            text: title,
            children: [],
            id: '1'
        })
    }
    function each(treeArr) {
        if(Array.isArray(treeArr)) {
            treeArr.forEach(v => {
                function sEach(arr) {
                    if(arr[arr.length - 1].children.length > 0) {
                        sEach(arr[arr.length - 1].children)
                    }
                    else {
                        let children = v.children
                        let id = ''
                        for(let ai = 0;ai<children.length;ai++) {
                            if(children[ai].tagName == 'A') {
                                id = children[ai].id
                                break
                            }
                        }
                        
                        console.log(id)
                        arr[arr.length - 1].children.push({
                            class:v.tagName,
                            text: v.innerText,
                            children: [],
                            id: id
                        })
                    }
                }
                function lEach(arr) {
                    if(arr[arr.length - 1].children) {
                        let lid = arr[arr.length - 1].class
                        let leaveId = 'H' + level
                        if(lid == leaveId) {
                            arr.push({
                                class:v.tagName,
                                text: v.innerText,
                                children: []
                            })
                        }
                        else {
                            lEach(arr[arr.length - 1].children)
                        }
                    }
                }

                // const parentArr = arr
                if(v.tagName && v.tagName.indexOf('H') > -1) {
                    //判断是否是h标签
                    if(v.tagName.replace('H','') - level == 0) {
                        // 判断h标签的层级是否与上一个节点相等
                        lEach(arr)
                        level = v.tagName.replace('H','')
                    }
                    else if(v.tagName.replace('H','') - level > 0) {
                        // 判断h标签层级是否小于上一个节点
                        sEach(arr)
                        level = v.tagName.replace('H','')
                        levelArr.push(level)
                    }
                    else {

                        let dqLeaveId = v.tagName.replace('H','')
                        // 当前标签层级大于上一个节点
                        if(levelArr.indexOf(dqLeaveId) > -1) {
                            //之前存在相同的节点
                            this.hEach(arr,v,dqLeaveId)
                        }
                        else {
                            // function aEach() {
                            //     dqLeaveId++
                            //     let index = levelArr.findIndex((v,i)=> {
                            //         return v ==  dqLeaveId
                            //     })
                            //     if(index == -1) {
                            //         aEach()
                            //     }
                            //     else {
                            //         v.tagName = 'H' + dqLeaveId
                            //         hEach(arr)
                            //     }
                            // }
                            // aEach()
                            throw new Error('标题层级异常');
                        }

                        level = v.tagName.replace('H','')
                    }
                }


            })
        }

    }
    each(treeArr)
    return arr
}
//html转换为虚拟dom
CatalogTree.prototype.getDomTree = function (str) {
    return document.createRange().createContextualFragment(str);
}
//初始化
CatalogTree.prototype.init = function() {
    let tree = this.getDomTree(this.html)
    this.tree = this.ergodic(tree,this.title)
}
CatalogTree.prototype.add = function (nodeClass,child,index) {
    this.tree[index].push({
        class: nodeClass,
        text: child.innerText
    })
}
CatalogTree.prototype.hEach = function(arr,v,dqLeaveId) {
    if(arr[arr.length - 1] && arr[arr.length - 1].children) {
        let lid = arr[arr.length - 1].class
        let leaveId = 'H' + dqLeaveId
        if(lid == leaveId) {
            arr.push({
                class:v.tagName,
                text: v.innerText,
                children: []
            })
        }
        else {
            this.hEach(arr[arr.length - 1].children,v,dqLeaveId)
        }
    }

}
export default CatalogTree
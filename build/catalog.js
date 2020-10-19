"use strict";
var CatalogTree = /** @class */ (function () {
    function CatalogTree(data) {
        this.html = '';
        this.title = '';
        this.tree = [];
        this.level = 1; //初始层级
        this.levelArr = [1];
        this.treeArr = [];
        this.arr = [];
        this.html = data.html;
        this.title = data.title;
        var tree = this.getDomTree(this.html);
        this.tree = this.ergodic(tree, this.title);
        // this.tree = this.ergodic(tree,this.title)
    }
    CatalogTree.prototype.ergodic = function (tree, title) {
        for (var i = 0, len = tree.childElementCount; i < len; i++) {
            this.treeArr.push(tree.childNodes[i]);
        }
        var isH1 = this.treeArr.filter(function (v) {
            return v.tagName && v.tagName.indexOf('H1') > -1;
        });
        console.log(isH1);
        if (this.title.length > 0) {
            this.arr.push({
                class: 'H1',
                text: title,
                children: [],
                id: 'tree-body'
            });
        }
        else if (!this.title && isH1.length == 0) {
            this.arr.push({
                class: 'H1',
                text: title,
                children: [],
                id: 'tree-body'
            });
        }
        this.domArrayEach(this.treeArr);
        return this.arr;
    };
    CatalogTree.prototype.getDomTree = function (str) {
        return document.createRange().createContextualFragment(str);
    };
    CatalogTree.prototype.domArrayEach = function (treeArr) {
        var _this = this;
        treeArr.forEach(function (v) {
            if (v.tagName && v.tagName.indexOf('H') > -1) {
                //判断是否是h标签
                if (v.tagName.replace('H', '') === _this.level.toString()) {
                    // 判断h标签的层级是否与上一个节点相等
                    _this.lEach(_this.arr, v);
                    _this.level = Number(v.tagName.replace('H', ''));
                }
                else if (v.tagName.replace('H', '') > _this.level.toString()) {
                    // 判断h标签层级是否小于上一个节点
                    _this.sEach(_this.arr, v);
                    _this.level = Number(v.tagName.replace('H', ''));
                    _this.levelArr.push(_this.level);
                }
                else {
                    var dqLeaveId = Number(v.tagName.replace('H', ''));
                    // 当前标签层级大于上一个节点
                    if (Number(_this.levelArr.indexOf(dqLeaveId)) > -1) {
                        //之前存在相同的节点
                        _this.hEach(_this.arr, v, dqLeaveId);
                    }
                    else {
                        throw new Error('标题层级异常');
                    }
                    _this.level = Number(v.tagName.replace('H', ''));
                }
            }
        });
    };
    CatalogTree.prototype.lEach = function (arr, v) {
        if (arr[arr.length - 1].children) {
            var lid = arr[arr.length - 1].class;
            var leaveId = 'H' + this.level.toString();
            if (lid == leaveId) {
                arr.push({
                    class: v.tagName,
                    text: v.innerText,
                    id: v.firstChild.id,
                    children: []
                });
            }
            else {
                this.lEach(arr[arr.length - 1].children, v);
            }
        }
    };
    CatalogTree.prototype.sEach = function (arr, v) {
        if (arr[arr.length - 1].children.length > 0) {
            this.sEach(arr[arr.length - 1].children, v);
        }
        else {
            var children = v.children;
            var id = v.firstChild.id;
            for (var ai = 0; ai < children.length; ai++) {
                if (children[ai].tagName == 'A') {
                    id = children[ai].id;
                    break;
                }
            }
            arr[arr.length - 1].children.push({
                class: v.tagName,
                text: v.innerText,
                children: [],
                id: id
            });
        }
    };
    CatalogTree.prototype.hEach = function (arr, v, dqLeaveId) {
        if (arr[arr.length - 1] && arr[arr.length - 1].children) {
            var lid = arr[arr.length - 1].class;
            var leaveId = 'H' + dqLeaveId;
            if (lid == leaveId) {
                arr.push({
                    class: v.tagName,
                    text: v.innerText,
                    id: v.firstChild.id,
                    children: []
                });
            }
            else {
                this.hEach(arr[arr.length - 1].children, v, dqLeaveId);
            }
        }
    };
    return CatalogTree;
}());

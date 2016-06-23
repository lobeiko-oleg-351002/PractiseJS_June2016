"use strict";

var bootSeq = [];

var TreeManager = (function() {
    var instance;
    
    function init() {
        var tree = [];
        
        function File(name) {
            this.name = name;
            this.children = [];
        }
        
        function checkBranch(nodeName, checkedNode) {
            if (nodeName === checkedNode.name) {
                return checkedNode;
            } 
            else {
                for (var i = 0; i < checkedNode.children.length; i++) {
                    var node = checkBranch(nodeName,checkedNode.children[i]);
                    if (node != undefined) {
                        return node;
                    }
                }
                return undefined;
            }
        }
        
        function findOrCreateNode(nodeName, rootChildren) {
            var node = undefined;              
            for (var i = 0; i < tree.length; i++) {
                node = checkBranch(nodeName,tree[i]);
            }
            if (node === undefined) {
                node = new File(nodeName);
            }
            rootChildren.push(node);
            return node;
        }
        
        function printNodes(root) {
            for (var i = 0; i < root.children.length; i++) {
                printNodes(root.children[i]);
            }    
            if (bootSeq.indexOf(root.name) == -1) {
                bootSeq.push(root.name);
            }
        }
        
        return {
            addNodes: function(rootName, nodeNames) {
                var root = findOrCreateNode(rootName,tree);
                for (var i = 0; i < nodeNames.length; i++) {
                    findOrCreateNode(nodeNames[i],root.children);
                }
            },
            
            printTree: function() {
                for (var i = 0; i < tree.length; i++) {
                    printNodes(tree[i]);
                }
            }
        }
    }
    return {
        getInstance: function() {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

function removeEmptyNames(nodeNames) {
    for (var j = 0; j < nodeNames.length; j++) {
        if (nodeNames[j] === '') {
            nodeNames.splice(j,1);
        }
    }
    return nodeNames;
}

function bootFromFile(inputStrings)
{
    var treeManager = TreeManager.getInstance();
    for (var i = 0; i < inputStrings.length; i++) {
        var str = inputStrings[i].replace(/\s*/g,"");
        var fileAndInners = str.split(':');
        var rootName = fileAndInners[0];
        var nodeNames = fileAndInners[1].split(',');
        nodeNames = removeEmptyNames(nodeNames);
        treeManager.addNodes(rootName,nodeNames);
    }
    treeManager.printTree();
    console.log(bootSeq);
}

function readFile() {
    var fs = require('fs');
    var output = fs.readFileSync('libs.txt').toString().split("\n");
    return output;
}

bootFromFile(readFile());
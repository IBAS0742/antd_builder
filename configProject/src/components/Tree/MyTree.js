import {
    Tree
} from 'ant-design-vue'
import {Folder} from "../Step/defaultStep/AddPage/Page";

let buildMethod = {
    renderPageTreeNode(h,obj,treeData) {
        let key = obj.getIndex();
        treeData[key] = obj;
        return h(Tree.TreeNode,{
            props: {
                label: key,
                title: obj.pageName,
                isLeaf: true
            },
            domProps: {
                key
            }
        })
    },
    renderFolderTreeNode(h,obj,treeData) {
        let $this = this;
        let key = obj.getIndex();
        treeData[key] = obj;
        return h(Tree.TreeNode,{
            props: {
                label: key,
                title: obj.FolderName
            },
            domProps: {
                key
            }
        },[
            (() => {
                let fs = [];
                obj.folders.forEach((_) => {
                    fs.push($this.renderFolderTreeNode(h,_,treeData))
                });
                return fs;
            })(),
            (() => {
                let fs = [];
                obj.pages.forEach(_ => {
                    fs.push($this.renderPageTreeNode(h,_,treeData));
                });
                return fs;
            })()
        ])
    }
};

export default {
    component: {
        Tree,
        DirectoryTree: Tree.DirectoryTree
    },
    props: {
        pages: {
            type: Folder
        }
    },
    data() {
        return {
            treeData: {}
        }
    },
    methods: {
        getTreeData(key) {
            return this.treeData[key];
        }
    },
    render(h) {
        let $this = this;
        return h(Tree,{
            props: {
                showLine: true,
                defaultExpandAll: true
            },
            on: {
                rightClick(obj) {
                    $this.$emit('rightClick',obj);
                },
                select(key,{ node }) {
                    $this.$emit('click',node,key);
                }
            }
        },[
            buildMethod.renderFolderTreeNode.bind(buildMethod)(h,$this.$props.pages,this.treeData)
        ])
    }
}
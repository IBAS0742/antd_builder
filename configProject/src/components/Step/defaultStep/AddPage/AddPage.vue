<template>
    <AddPageFramework @changeWidth="ret => framework.width = ret">
        <div slot="left">
            <div style="height: 30px;"></div>
            <MyModal :visible="qModal.qModalVisible" :width="qModal.width">
                <div style="text-align: center" v-show="qModal.qModalType === 'folder'">
                    <a-button @click="action('createFolder')" type="primary" icon="folder">创建文件夹</a-button>
                    <br/>
                    <a-button @click="action('createPage')" icon="file-text" style="margin-top: 1em;">创建页面</a-button>
                    <br/>
                    <a-button @click="action('delete')" type="danger" icon="delete" style="margin-top: 1em;">删除文件夹</a-button>
                    <br/>
                    <a-button @click="qModal.qModalVisible = false" icon="close" style="margin-top: 1em;">取消</a-button>
                </div>
                <div style="text-align: center" v-show="qModal.qModalType === 'pages'">
                    <!--<a-button @click="action('copy')" icon="folder">Copy Page</a-button>-->
                    <!--<br/>-->
                    <a-button @click="action('delete')" type="danger" icon="delete" style="margin-top: 1em;">删除页面</a-button>
                    <br/>
                    <a-button @click="qModal.qModalVisible = false" icon="close" style="margin-top: 1em;">取消</a-button>
                </div>
            </MyModal>
            <MyModal :visible="qFolder.visible">
                <a-input v-model="qFolder.folderName">
                    <a-button slot="enterButton">确定</a-button>
                </a-input>
            </MyModal>
            <MyModal :visible="qPage.visible">
                <a-input v-model="qPage.pageName">
                    <a-button slot="enterButton">确定</a-button>
                </a-input>
            </MyModal>
            <MyTree @rightClick="rightClick"
                    @click="click"
                    :pages="pages" ref="mytree"></MyTree>
        </div>
        <div slot="right">
            <div v-if="selectNodeTag">
                <div v-if="selectNodeTag.type === 'folder'">
                    <div style="margin-bottom: 5px;">
                        <a-button style="margin-right: 5px;" @click="action('createFolder')" type="primary" icon="folder">创建文件夹</a-button>
                        <a-button style="margin-right: 5px;" @click="action('createPage')" icon="file-text">创建页面</a-button>
                        <a-button style="margin-right: 5px;" @click="action('delete')" type="danger" icon="delete">删除文件夹</a-button>
                    </div>
                    <div style="display: inline-block;width: 100px;">文件夹名称</div>
                    <a-input style="display: inline-block;width: calc(100% - 100px);" v-model="selectNodeTag.FolderName"></a-input>
                </div>
                <div v-else-if="selectNodeTag.type === 'page'">
                    <div style="margin-bottom: 0.5em;">
                        <div style="display: inline-block;width: 100px;">页面文件的名称</div>
                        <a-input style="display: inline-block;width: calc(100% - 100px);" v-model="selectNodeTag.pageName"></a-input>
                    </div>
                    <div style="margin-bottom: 0.5em;">
                        <div style="display: inline-block;width: 100px;">页面名称</div>
                        <a-input style="display: inline-block;width: calc(100% - 100px);" v-model="selectNodeTag.info.pageName"></a-input>
                    </div>
                    <div style="margin-bottom: 0.5em;">
                        <div style="display: inline-block;width: 100px;">页面路由</div>
                        <a-input style="display: inline-block;width: calc(100% - 100px);"
                                 v-model="selectNodeTag.info.router"></a-input>
                    </div>
                    <div style="margin-bottom: 0.5em;">
                        <Components :width="framework.width" :components="selectNodeTag.info.components"></Components>
                    </div>
                </div>
            </div>
            <div v-else>
                点击树节点修改信息
            </div>
        </div>
    </AddPageFramework>
</template>

<script>
    import MyModal from "../../../MyModal";
    import {
        Folder
    } from './Page';
    import MyTree from "../../../Tree/MyTree";
    import Components from "./Components";
    import AddPageFramework from "./AddPageFramework";
    const comps = require('./../../../../buildConfig/components');

    let tmp = new Folder("views");
    tmp.components = comps;

    export default {
        name: "AddPage",
        components: {AddPageFramework, Components, MyTree, MyModal},
        data() {
            return {
                qModal: {
                    qModalVisible: false,
                    qModalType: 'folder',
                    width: '380px',
                },
                qFolder: {
                    visible: false,
                    folderName: ''
                },
                qPage: {
                    visible: false,
                    pageName: ''
                },
                pages: tmp,
                selectNodeTag: null,
                rightSelectNodeTag: null,
                actions: {
                    defaultFolderName: 'folder',
                    defaultPageName: 'page',
                },
                framework: {
                    width: (6 / 24 * 100) + '%'
                }
            }
        },
        methods: {
            click(node) {
                this.rightSelectNodeTag = this.pages.getPageOrFolderByNode(node.label);
                this.selectNodeTag = this.pages.getPageOrFolderByNode(node.label);
            },
            rightClick({ node }) {
                this.qModal.qModalVisible = true;
                this.qModal.qModalType = node.isLeaf ? 'pages' : 'folder';
                this.qModal.width = node.isLeaf ? '300px' : '300px';
                this.rightSelectNodeTag = this.pages.getPageOrFolderByNode(node.label);
            },
            action(act) {
                this.qModal.qModalVisible = false;
                if (act === 'delete') {
                    this.rightSelectNodeTag.deleteSelf();
                } else if (act === 'createFolder') {
                    this.rightSelectNodeTag.addFolder(this.actions.defaultFolderName + '_' + this.rightSelectNodeTag.folders.length);
                } else if (act === 'createPage') {
                    this.rightSelectNodeTag.addPage(this.actions.defaultPageName + '_' + this.rightSelectNodeTag.pages.length);
                }
            },
            update() {
                return tmp.toString();
            },
            setParam(obj) {
                tmp.clearAll().set(obj);
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
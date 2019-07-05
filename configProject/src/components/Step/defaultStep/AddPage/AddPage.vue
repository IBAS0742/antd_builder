<template>
    <a-row>
        <a-col :span="6">
            <MyModal :visible="qModal.qModalVisible" :width="qModal.width">
                <div style="text-align: center" v-show="qModal.qModalType === 'folder'">
                    <a-button @click="action('createFolder')" type="primary" icon="folder">Create Directory</a-button>
                    <br/>
                    <a-button @click="action('createPage')" icon="file-text" style="margin-top: 1em;">Create Page</a-button>
                    <br/>
                    <a-button @click="action('delete')" type="danger" icon="delete" style="margin-top: 1em;">Delete Directory</a-button>
                    <br/>
                    <a-button @click="qModal.qModalVisible = false" icon="close" style="margin-top: 1em;">Cancel</a-button>
                </div>
                <div style="text-align: center" v-show="qModal.qModalType === 'pages'">
                    <!--<a-button @click="action('copy')" icon="folder">Copy Page</a-button>-->
                    <!--<br/>-->
                    <a-button @click="action('delete')" type="danger" icon="delete" style="margin-top: 1em;">Delete Page</a-button>
                    <br/>
                    <a-button @click="qModal.qModalVisible = false" icon="close" style="margin-top: 1em;">Cancel</a-button>
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
        </a-col>
        <a-col :span="18">
            <div v-if="selectNodeTag">
                <div v-if="selectNodeTag.type === 'folder'">
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
                        <Components :components="selectNodeTag.info.components"></Components>
                    </div>
                </div>
            </div>
            <div v-else>
                点击树节点修改信息
            </div>
        </a-col>
    </a-row>
</template>

<script>
    import MyModal from "../../../MyModal";
    import {
        Folder
    } from './Page';
    import MyTree from "../../../Tree/MyTree";
    import Components from "./Components";
    const comps = require('./../../../../buildConfig/components');

    let tmp = new Folder("views");
    tmp.components = comps;

    export default {
        name: "AddPage",
        components: {Components, MyTree, MyModal},
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
                }
            }
        },
        methods: {
            click(node) {
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
            window.$ap = this;
        }
    }
</script>

<style scoped>

</style>
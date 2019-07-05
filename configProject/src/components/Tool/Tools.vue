<template>
    <div>
        <a-button type="primary" @click="antTableColumnBuildTool = true">antTableColumnBuildTool</a-button>
        <a-drawer
                title="antTableColumnBuildTool"
                :width="childDrawerWidth"
                :closable="false"
                @close="antTableColumnBuildTool = false"
                :visible="antTableColumnBuildTool">
            <AntTableColumnBuildTool></AntTableColumnBuildTool>
        </a-drawer>

        <a-button type="primary" @click="AntFormItemBuildTool = true">AntForm 表单工具</a-button>
        <a-drawer
                title="AntFormItemBuildToolr"
                :width="childDrawerWidth"
                :closable="false"
                @close="AntFormItemBuildTool = false"
                :visible="AntFormItemBuildTool">
            <AntFormItemBuildTool></AntFormItemBuildTool>
        </a-drawer>
    </div>
</template>

<script>
    import AntTableColumnBuildTool from "./AntTableColumnBuildTool.vue";
    import AntFormItemBuildTool from "./AntFormItemBuildTool.vue";
    export default {
        name: "Tools",
        components: {AntFormItemBuildTool, AntTableColumnBuildTool},
        data() {
            return {
                childDrawerWidth: 800,
                antTableColumnBuildTool: false,
                AntFormItemBuildTool: false
            }
        }
    }
</script>

<style scoped>
    button {
        margin-top: 5px;
    }
</style>
<template>
    <div>
        <a-row style="margin-top: 5px;">
            <div style="position: absolute;top: 5px;left: -10px;z-index: 1000;">
                <a-button style="border-left: none;border-top-left-radius: 0;border-bottom-left-radius: 0;" @click="setting.visible = true;">
                    <a-icon type="setting" />
                </a-button>
            </div>
            <a-col :span="setting.value">
                <slot name="left"></slot>
            </a-col>
            <a-col :span="24 - setting.value">
                <slot name="right"></slot>
            </a-col>
        </a-row>
        <a-drawer
                title="设置"
                placement="bottom"
                @close="setting.visible = false;"
                :visible="setting.visible">
            <div>调节左右面板的宽度 {{ setting.value }} : {{ 24 - setting.value }}</div>
            <a-slider v-model="setting.value" :max="24" :min="0"/>
        </a-drawer>
    </div>
</template>

<script>
    export default {
        name: "AddPageFramework",
        data() {
            return {
                setting: {
                    visible: false,
                    value: 6
                }
            }
        }
    }
</script>

<style scoped>

</style>
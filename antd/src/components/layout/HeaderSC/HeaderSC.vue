<template>
    <a-layout style="height: 100%;width: 100%;">
        <a-layout-header class="def-header" style="height: 64px;width: 100%;padding: 0 6px">
            <slot name="header"></slot>
        </a-layout-header>
        <a-layout>
            <a-layout-sider class="def-sider" :trigger="null" collapsible v-model="collapsed" :width="silderWidth">
                <slot name="sider"></slot>
            </a-layout-sider>
            <a-layout-content class="def-content">
                <slot name="content"></slot>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    import ALayoutSider from "ant-design-vue/es/layout/Sider";
    export default {
        name: "HeaderSC",
        props: {
            collapsed: {
                default() {
                    return false;
                }
            },
            silderWidth: {
                default() {
                    return '300px'
                }
            }
        },
        components: {ALayoutSider}
    }
</script>

<style scoped>
    .def-sider {
        background: #ffffff !important;
    }
    .def-header {
        background: #40a9ff !important;
    }
    .def-content {
        background: #f0f2f5 !important;
        padding: 5px;
    }
</style>
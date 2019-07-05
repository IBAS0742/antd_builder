<template>
    <a-layout style="height: 100%;width: 100%;">
        <a-layout-sider class="def-sider" :trigger="null" collapsible v-model="collapsed" :width="sliderWidth"
            :style="{ 'background-color': sliderBgColor + '!important'}">
            <div class="def-logo" style="height: 64px">
                <slot name="logo"></slot>
            </div>
            <div style="height: calc(100% - 64px);">
                <slot name="sider"></slot>
            </div>
        </a-layout-sider>
        <a-layout style="overflow: hidden;">
            <a-layout-header class="def-header" :style="{ ...headerStyle , height: '64px'}">
                <slot name="header"></slot>
            </a-layout-header>
            <a-layout-content class="def-content">
                <slot name="content"></slot>
            </a-layout-content>
            <a-layout-footer v-if="hasFoot" class="def-fotter" style="height: 30px;line-height: 0px;">
                <slot name="footer"></slot>
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    export default {
        name: "SliderHCF",
        props: {
            collapsed: {
                default() {
                    return false;
                }
            },
            sliderWidth: {
                default() {
                    return '300px'
                }
            },
            sliderBgColor: {
                default() {
                    return '#fff';
                }
            },
            headerStyle: {
                required: false,
                default() {
                    return {
                        background: '#40a9ff !important',
                        padding: '0 12px 0 0'
                    }
                }
            },
            hasFoot: {
                required: false,
                default() {
                    return false;
                }
            }
        },
    }
</script>
<style>
    .def-sider {
        background: #001529 !important;
    }
    .def-header {
        /*background: #40a9ff !important;*/
    }
    .def-content {
        background: #f0f2f5 !important;
        position: relative;
        padding: 5px;
    }
    .def-fotter {
        background: #fff !important;
    }
    .def-logo {
        width: 100%;
        height: 64px;
        line-height: 64px;
        padding-left: 24px;
        -webkit-transition: all 0.3s;
        transition: all 0.3s;
        overflow: hidden;
        z-index: 9;
    }
</style>
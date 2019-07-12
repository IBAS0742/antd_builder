<template>
    <slider-h-c-f :has-foot="hasFoot" :collapsed="collapsed" :layoutStyle="layoutStyle"
                  :header-style="headerStyle" :slider-width="sliderWidth"
                  :slider-bg-color="sliderBackground">
        <div slot="header" class="header">
            <MenuCollapsed :collapsed="collapsed" @toggle="toggle"
                           v-if="headerComponents.includes('MenuCollapsed')"></MenuCollapsed>
            <UserMenu v-if="headerComponents.includes('UserMenu')"></UserMenu>
        </div>
        <template slot="logo">
            <h1>LOGO</h1>
        </template>
        <template slot="sider">
            <SMenu :menu="testRoute" theme="light"></SMenu>
        </template>
        <GeminiScrollbar slot="content" :style="{height: contentHeight}">
            <PageHeader v-if="Breadcrumb"></PageHeader>
            <transition name="page-transition">
                <div>布局二</div>
            </transition>
        </GeminiScrollbar>
        <tmplate slot="footer">
            {{footContent}}
        </tmplate>
    </slider-h-c-f>
</template>

<script>
    import SliderHCF from "./SliderHCF";
    import SMenu from "../../menu/SMenu";
    import UserMenu from "../../tools/UserMenu";
    import MenuCollapsed from "../../tools/menuCollapsed";
    import PageHeader from "../../tools/PageHeader";
    import { testRoute } from "../testRoute";

    export default {
        name: "SliderHcfPage",
        components: {PageHeader, MenuCollapsed, UserMenu, SMenu, SliderHCF},
        props: {
            layoutStyle: {
                default() {
                    return {};
                }
            },
            Breadcrumb: {
                default() {
                    return true;
                }
            },
            headerComponents: {
                default() {
                    return ['MenuCollapsed','UserMenu'];
                }
            },
            sliderWidth: {
                default() {
                    return '300px';
                }
            },
            footContent: {
                default() {
                    return '';
                }
            },
            hasFoot: {
                default() {
                    return false;
                }
            },
            headerStyleBackground: {
                default() {
                    return '#40a9ff !important'
                }
            },
            headerStylePadding: {
                default() {
                    return '0 12px 0 0'
                }
            },
            sliderBackground: {
                default() {
                    return '#fff'
                }
            }
        },
        computed: {
            headerStyle() {
                return {
                    'background' : this.headerStyleBackground,
                    'padding' : this.headerStylePadding
                }
            }
        },
        data() {
            return {
                testRoute,
                collapsed: false,
                contentHeight: ''
            }
        },
        methods: {
            toggle() {
                this.collapsed = !this.collapsed;
            }
        },
        mounted() {
            let $this = this;
            window.onresize = function () {
                $this.contentHeight = (window.innerHeight - (this.hasFoot ? 112 : 64)) + 'px';
            };
            $this.contentHeight = (window.innerHeight - (this.hasFoot ? 112 : 64)) + 'px';
        }
    }
</script>

<style scoped>

    .page-transition-enter {
        opacity: 0;
    }

    .page-transition-leave-active {
        opacity: 0;
    }

    .page-transition-enter .page-transition-container,
    .page-transition-leave-active .page-transition-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
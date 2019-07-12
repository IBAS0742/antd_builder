<template>
    <header-s-c :collapsed="collapsed" :silderWidth="sliderWidth" :layoutStyle="layoutStyle">
        <div slot="header">
            <MenuCollapsed :collapsed="collapsed" @toggle="toggle"
                           v-if="headerComponents.includes('MenuCollapsed')"></MenuCollapsed>
			<UserMenu v-if="headerComponents.includes('UserMenu')"></UserMenu>
        </div>
        <template slot="sider">
            <SMenu :menu="testRoute" theme="light"></SMenu>
        </template>
        <!--<GeminiScrollbar slot="content" :style="{height: contentHeight}">-->
        <div slot="content">
            <!-- todo -->
            <PageHeader v-if="Breadcrumb"></PageHeader>
            <transition name="page-transition">
                <div>布局一</div>
            </transition>
        </div>
        <!--</GeminiScrollbar>-->
    </header-s-c>
</template>

<script>
    import HeaderSC from "./HeaderSC";
    import SMenu from "../../menu/SMenu";
    import UserMenu from "../../tools/UserMenu";
    import MenuCollapsed from "../../tools/menuCollapsed";
    import PageHeader from "../../tools/PageHeader";
    import { testRoute } from "../testRoute";

    export default {
        name: "HeaderSCPage",
        components: {PageHeader, MenuCollapsed, UserMenu, SMenu, HeaderSC},
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
            }
        },
        data() {
            return {
                collapsed: false,
                contentHeight: '',
                testRoute
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
                $this.contentHeight = (window.innerHeight - 64) + 'px';
            };
            $this.contentHeight = (window.innerHeight - 64) + 'px';
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

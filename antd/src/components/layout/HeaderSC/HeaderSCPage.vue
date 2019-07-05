<template>
    <header-s-c :collapsed="collapsed" silderWidth="300px">
        <div slot="header">
            <MenuCollapsed :collapsed="collapsed" @toggle="toggle"></MenuCollapsed>
			<UserMenu></UserMenu>
        </div>
        <template slot="sider">
            <SMenu :menu="$router.options.routes" theme="light"></SMenu>
        </template>
        <GeminiScrollbar slot="content" :style="{height: contentHeight}">
            <!-- todo -->
            <PageHeader></PageHeader>
            <transition name="page-transition">
                <router-view/>
            </transition>
        </GeminiScrollbar>
    </header-s-c>
</template>

<script>
    import HeaderSC from "./HeaderSC";
    import SMenu from "../../menu/SMenu";
    import UserMenu from "../../tools/UserMenu";
    import MenuCollapsed from "../../tools/menuCollapsed";
    import PageHeader from "../../tools/PageHeader";
    export default {
        name: "HeaderSCPage",
        components: {PageHeader, MenuCollapsed, UserMenu, SMenu, HeaderSC},
        data() {
            return {
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
            window.$page = this;
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

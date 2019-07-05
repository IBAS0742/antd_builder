<noscript>Mon, 10 Jun 2019 10:04:12 GMT</noscript>
<template>
    <slider-h-c-f :has-foot="hasFoot" :collapsed="collapsed" :header-style="headerStyle" :slider-width="sliderWidth" :slider-bg-color="sliderBackground">
        <div slot="header" class="header">
            <MenuCollapsed :collapsed="collapsed" @toggle="toggle"></MenuCollapsed>
			<UserMenu></UserMenu>
        </div>
        <template slot="logo">
            <h1>LOGO</h1>
        </template>
        <template slot="sider">
            <SMenu :menu="$router.options.routes" theme="light"></SMenu>
        </template>
        <GeminiScrollbar slot="content" :style="{height: contentHeight}">
            
            <transition name="page-transition">
                <router-view/>
            </transition>
        </GeminiScrollbar>
        <tmplate slot="footer">
            
        </tmplate>
    </slider-h-c-f>
</template>

<script>
    import SliderHCF from "./SliderHCF";
    import SMenu from "../../menu/SMenu";
    import UserMenu from "../../tools/UserMenu";
    import MenuCollapsed from "../../tools/menuCollapsed";
    import PageHeader from "../../tools/PageHeader";
    export default {
        name: "SliderHcfPage",
        components: {PageHeader, MenuCollapsed, UserMenu, SMenu, SliderHCF},
        data() {
            return {
                collapsed: false,
                headerStyle: {
                    'background' : '#40a9ff !important',
					'padding' : '0 12px 0 0'
                },
                sliderWidth: '300px',
                sliderBackground: '#fff',
                contentHeight: '',
                hasFoot: false
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
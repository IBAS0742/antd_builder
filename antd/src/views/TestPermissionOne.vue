<template>
    <div>
        <h1>This is an about page</h1>
        <div v-action:add>add content</div>
        <div v-action:delete>delete content</div>
        <div v-action:update>update content</div>
        <div v-action:ibas>ibas content</div>
        <div style="width: 256px">
            <a-button type="primary" @click="toggleCollapsed" style="margin-bottom: 16px">
                <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
            </a-button>
            <a-menu
                    mode="inline"
                    theme="dark"
                    :inlineCollapsed="collapsed"
            >
                <a-menu-item key="1">
                    <a-icon type="pie-chart" />
                    <span>Option 1</span>
                </a-menu-item>
            </a-menu>
            <SMenu :collapsed="collapsed" :menu="$router.options.routes"></SMenu>
        </div>
    </div>
</template>

<script>
    import SMenu from "../components/menu/SMenu";
    export default {
        components: {SMenu},
        data () {
            return {
                collapsed: false,
            }
        },
        methods: {
            toggleCollapsed () {
                this.collapsed = !this.collapsed
            },
        },
    }
</script>
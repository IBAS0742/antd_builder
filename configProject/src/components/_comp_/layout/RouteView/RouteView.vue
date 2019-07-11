<script>
    export default {
        name: 'RouteView',
        data () {
            return {}
        },
        render () {
            // 因为这里还没有加入 vuex 所以先去掉
            // const { $route: { meta }, $store: { getters } } = this
            const { $route: { meta } } = this
            const inKeep = (
                <keep-alive>
                <router-view />
                </keep-alive>
        )
            const notKeep = (
                <router-view />
        )
            // 这里增加了 multiTab 的判断，当开启了 multiTab 时
            // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
            // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
            if (meta.keepAlive === false) {
                return notKeep
            }
            // return getters.multiTab || meta.keepAlive ? inKeep : notKeep
            return meta.keepAlive ? inKeep : notKeep
        }
    }
</script>

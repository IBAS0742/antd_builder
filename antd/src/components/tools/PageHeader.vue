<template>
    <div class="page-header">
        <div class="page-header-index-wide">
            <a-breadcrumb class="breadcrumb">
                <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
                    <router-link
                            v-if="item.name != name && index != 1"
                            :to="{ path: item.path === '' ? '/' : item.path }"
                    >{{ item.meta.title }}</router-link>
                    <span v-else>{{ item.meta.title }}</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div v-if="title">
            <h1>{{title}}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageHeader',
        data () {
            return {
                name: '',
                breadList: [],
                title: ''
            }
        },
        created () {
            this.getBreadcrumb()
        },
        methods: {
            getBreadcrumb () {
                this.breadList = [];
                this.name = this.$route.name;
                this.title = this.$route.meta.title;
                this.$route.matched.forEach((item) => {
                    // item.name !== 'index' && this.breadList.push(item)
                    this.breadList.push(item)
                })
            }
        },
        watch: {
            $route () {
                this.getBreadcrumb()
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-header {
        background: #fff;
        padding: 16px 32px 0;
        border-bottom: 1px solid #e8e8e8;
        .breadcrumb {
            margin-bottom: 16px;
        }
    }
</style>

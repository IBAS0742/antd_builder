<template>
    <div class="page-header">
        <div class="page-header-index-wide">
            <a-breadcrumb class="breadcrumb" style="margin: 0;">
                <a-breadcrumb-item v-for="(item, index) in breadList" :key="index">
                    <span>{{ item }}</span>
                </a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div v-if="title">
            <h1 style="font-size:1.5em;margin: 0;">{{title}}</h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PageHeader',
        data () {
            return {
                name: 'home.page.test',
                breadList: ['home','page','test'],
                title: 'home.page.test'
            }
        }
    }
</script>

<style lang="less" scoped>
    .page-header {
        background: #fff;
        padding: 4px;
        border-bottom: 1px solid #e8e8e8;
        .breadcrumb {
            margin-bottom: 16px;
        }
    }
</style>

<template>
    <div>
        <div style="margin: 10px 0;">
            <a-button v-if="btns.includes('create')"
                      type="primary" @click="$emit('create')">新增</a-button>
            <a-button v-if="btns.includes('search')"
                      type="dashed" style="margin-left: 5px;"
                      @click="$emit('search')">查找</a-button>
            <a-button v-if="btns.includes('delete')"
                      v-show="selectedRowKeys.length" type="danger"
                      style="margin-left: 5px;"
                      @click="$emit('remove',selectedRowKeys,selectedRow)">删除</a-button>
            <a-button v-if="btns.includes('change')" v-show="selectedRowKeys.length === 1"
                      @click="$emit('change',selectedRowKeys,selectedRow)"
                      style="margin-left: 5px;">修改</a-button>
        </div>
        <STable :data="requireData"
                :rowSelection="{
                    selectedRowKeys: selectedRowKeys,
                    onChange: onSelectChange,
                    type:'checkbox'
                }"
                :columns="columns">
        </STable>
    </div>
</template>

<script>
    import STable from './pro/index.js';

    export default {
        name: "CDCSTable",
        components: {
            STable
        },
        props: {
            columns: {
                required: true,
                type: Array
            },
            requireData: {
                required: true,
            },
            btns: {
                required: false,
                default() {
                    return [
                        "create",
                        "delete",
                        "change",
                        "search"
                    ]
                }
            }
        },
        data() {
            return {
                "selectedRowKeys": [],
                "selectedRow": [],
            }
        },
        methods: {
            onSelectChange(selectedRowKeys,selectedRow) {
                this.selectedRowKeys = selectedRowKeys;
                this.selectedRow = selectedRow;
            }
        }
    }
</script>

<style scoped>

</style>
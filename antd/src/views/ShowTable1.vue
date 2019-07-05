<template>
    <CDCSTable :columns="columns" :require-data="requireData" @change="change"/>
</template>

<script>
    import CDCSTable from "../components/Table/CDCSTable";
    import { STableData } from "../api/table";

    export default {
        name: "ShowTable1",
        components: {CDCSTable},
        data() {
            return {
                columns: [
                    {
                        title: '规则编号',
                        dataIndex: 'id'
                    },
                    {
                        title: '描述',
                        dataIndex: 'description'
                    },
                    {
                        title: '状态',
                        dataIndex: 'status',
                        key: 'status',
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updatedAt',
                        sorter: true
                    }
                ],
                requireData: STableData
            }
        },
        methods: {
            change(rowkey,row) {
                console.log(rowkey,row);
            }
        }
    }
</script>

<style scoped>

</style>
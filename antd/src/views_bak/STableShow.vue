<template>
    <!--:rowKey="(record) => record.data.id"-->
    <STable ref="table" :rowSelection="{ selectedRowKeys: STable0.selectedRowKeys, onChange: STable0OnSelectChange,type:'checkbox' }"
            :data="STable0.getTableData1561974286116" :columns="STable0['columns']" :showPagination="STable0['showPagination']" :size="STable0['size']">
		<span slot="action" slot-scope="a,record,index">
			<a-divider type="vertical" />
			<a @click="deleteOne(record,index)">delete</a>
			<a-divider type="vertical" />
			<a @click="edit(record,index)">edit</a>
			<a-divider type="vertical" />
		</span>
    </STable>
</template>

<script>
    import STable from "../components/Table/pro/index.js"

    const getTableData1561974286116 = ({
                                           pageNo,
                                           pageSize
                                       }) => {
        return new Promise(s => {
            s({
                "message": "",
                "result": {
                    "data": [{}],
                    "pageSize": 10,
                    "pageNo": 0,
                    "totalPage": 0,
                    "totalCount": 0
                },
                "status": 200
            })
        }).then(_ => _.result)
    };
    export default {
        components: {
            STable
        },
        data() {
            return {
                "STable0": {
                    "columns": [
                        {
                            "title": "规则编号",
                            "dataIndex": "id"
                        },
                        {
                            "title": "描述",
                            "dataIndex": "description"
                        },
                        {
                            "title": "状态",
                            "dataIndex": "status",
                            "needTotal": true
                        },
                        {
                            "title": "更新时间",
                            "dataIndex": "updatedAt",
                            "sorter": true
                        },
                        {
                            "title": "操作",
                            "dataIndex": "action",
                            "scopedSlots": {
                                "customRender": "action"
                            }
                        }
                    ],
                    "showPagination": "auto",
                    "size": "default",
                    "action": [
                        "delete",
                        "edit"
                    ],
                    "rowSelection": "checkbox",
                    "selectedRowKeys": [],
                    "getTableData1561974286116": getTableData1561974286116
                },
            }
        },
        methods: {
            deleteOne(record, index) {
                console.log(record, index)
            },
            edit(record, index) {
                console.log(record, index)
            },
            STable0OnSelectChange(selectedRowKeys, selectedRows) {
                this.STable0.selectedRowKeys = selectedRowKeys;
            }
        }
    }
</script>
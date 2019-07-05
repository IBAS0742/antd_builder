<template>
    <div>
        <STable
                ref="table"
                size="default"
                :rowKey="(record) => record.id"
                :columns="columns"
                :data="loadData">
            <span slot="action" slot-scope="a,record,index">
              <a @click="edit(record,index)">编辑</a>
            </span>
        </STable>
        <a-upload ref="up"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                :fileList="fileList"
                :customRequest="customRequest">
            <div v-if="fileList.length < 3">
                <a-icon type="plus" />
                <div class="ant-upload-text">Upload</div>
            </div>
        </a-upload>
    </div>
</template>

<script>
    import STable from "../components/Table/pro";
    import { STableData } from "../api/table";

    export default {
        name: "ShowTable",
        components: {STable},
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
                        needTotal: true
                    },
                    {
                        title: '更新时间',
                        dataIndex: 'updatedAt',
                        sorter: true
                    },
                    {
                        title: '操作',
                        scopedSlots: {
                            customRender: 'action'
                        },
                    }
                ],
                // 加载数据方法 必须为 Promise 对象
                loadData: STableData,
                fileList: [],
                files: []
            }
        },
        methods: {
            edit(record,index) {
                console.log(record,index);
            },
            customRequest(a) {
                this.fileList.push({
                    uid: (new Date).getTime(),
                    name: (new Date).getTime(),
                    status: 'done',
                    url: window.URL.createObjectURL(a.file)
                });
                this.files.push(a.file);
            }
        },
        mounted() {
            window.$st = this;
        }
    }
</script>

<style scoped>

</style>
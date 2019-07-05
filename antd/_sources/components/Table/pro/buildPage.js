/**
 * @param eventBind ["ev1","ev2"]
 * @param params
 * @param paramStr [':propA="name.propA"']
 *
 * @return eventBind
 *          params
 *          template
 * */
module.exports = ({
    eventBind,
    params,
    paramStr,
    dataName
  }) => {
    let getTableDataMethodName = 'getTableData' + (new Date()).getTime();
    let tpl = `<!--:rowKey="(record) => record.data.id"-->
            <STable
                ref="table"
                ${params.rowSelection === '-' ? '' : `:rowSelection="{ selectedRowKeys: ${dataName}.selectedRowKeys, onChange: ${dataName}OnSelectChange,type:'${params.rowSelection}' }"`}
                :data="${dataName}.${getTableDataMethodName}"
                ${paramStr.filter(_ => !(_.indexOf(":action=") + 1)).filter(_ => !(_.indexOf(":rowSelection=") + 1)).join(' ')}>
                $tpl$
        </STable>`;
    let actionTpl = [];
    let defaultAction = `(record,index) { console.log(record,index) }`;
    if (params.action instanceof Array && params.action.length) {
        actionTpl.push('<span slot="action" slot-scope="a,record,index">');
        params.action.forEach(_ => {
            actionTpl.push(`<a @click="${dataName}${_}(record,index)">${_}</a>`);
            eventBind.push([dataName + _,defaultAction]);
        });
        actionTpl.push('</span>');
        params.columns.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: {
                customRender: 'action'
            },
        });
    }
    if (params.rowSelection !== '-') {
        eventBind.push([dataName + 'OnSelectChange',`(selectedRowKeys, selectedRows) { this.${dataName}.selectedRowKeys = selectedRowKeys; }`]);
        params['selectedRowKeys'] = [];
    }
    eventBind.push([dataName + 'RefreshTable()','{ this.$refs.table.refresh() }']);
    params[getTableDataMethodName] = "___getTableDataMethodName___";
    return {
        eventBind,
        params: JSON.stringify(params,'','\t').replace(`"___getTableDataMethodName___"`,`${getTableDataMethodName}`),
        template: tpl.replace('$tpl$',actionTpl.join('<a-divider type="vertical"/>\n')),
        more: `const ${getTableDataMethodName} = ({pageNo,pageSize}) => {
    return new Promise(s => { s({
        "message": "",
        "result": {
            "data": [],
            "pageSize": 10,
            "pageNo": 0,
            "totalPage": 0,
            "totalCount": 0
        },
        "status": 200
    }) }).then(_ => _.result)
};`
    }
};
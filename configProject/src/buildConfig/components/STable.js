const {
    Input,
    Textarea,
    objectType,
    RadioBoxGrop,
    Radio
} = require('../utils/FormItems');

const ComponentSetting = require('./../utils/ComponentSetting');

const STable = () => new ComponentSetting("STable")
    .setBuildEPT("/components/Table/pro/buildPage.js")
    .addPackages('lodash.get')
    .addDep([
        "/components/Table/pro/index.js",
    ])
    .setTemplateName('STable')
    .setImport('/components/Table/pro/index.js:STable')
    .addFormItems([
        new Textarea('columns','')
            .setTip('表格的列描述')
            .setMoreTip("可以参考 ant-design 官方文档，但不需要编写自定义操作的列")
            .setObjectType(objectType.array),
        new Input('showPagination','auto')
            .setTip("分页菜单"),
        new RadioBoxGrop("size")
            .addOption( new Radio("default").setTip("default") )
            .addOption( new Radio("small").setTip("small") )
            .setTip("size").selectFirst(),
        // new Selection("size","default")
        //     .addOptionRaw("default")
        //     .addOptionRaw("small"),
        new Input("action","[]")
            .setTip("操作按钮")
            .setObjectType(objectType.array),
        new RadioBoxGrop("rowSelection")
            .addOption( new Radio("checkbox").setTip("复选框") )
            .addOption( new Radio("radio").setTip("单选框") )
            .addOption( new Radio("-").setTip("不使用") )
            .setTip("列选择").selectFirst(),
        // new Selection("rowSelection",'checkbox')
        //     .setTip("在表头添加选择元素")
        //     .setMoreTip("- 表示不使用该功能，checkbox 复选框，radio 单选框")
        //     .addOptionRaw("checkbox")
        //     .addOptionRaw("radio")
        //     .addOptionRaw("-")
    ]).makeKeyVal();

STable.label = 'Ant-Design table 封装版本';
module.exports = STable;
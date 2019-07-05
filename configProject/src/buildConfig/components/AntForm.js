const {
    Input,
    Textarea,
    Radio,
    RadioBoxGrop,
    Switch,
    objectType
} = require('../utils/FormItems');

const ComponentSetting = require('./../utils/ComponentSetting');

const AntForm = () => new ComponentSetting("AntForm")
    .setBuildEPT("/components/Form/AntForm/buildPage.js")
    .addFormItems([
        new Textarea("FormItem",JSON.stringify([]))
            .setTip("表单项")
            .setMoreTip("可以在旁边的工具中，选用 AntForm 表单工具构建"),
        new RadioBoxGrop("layout")
            .addOption(
                new Radio("horizontal").setTip("horizontal")
            )
            .addOption(
                new Radio("vertical").setTip("vertical")
            )
            .addOption(
                new Radio("inline").setTip("inline")
            )
            .setTip("布局形式")
            .setObjectType(objectType.string)
            .selectFirst(),
        new Switch("hideRequiredMark",false)
            .setTip("隐藏所有表单项的必选标记"),
        new Switch("colon",false)
            .setTip("隐藏冒号"),
        new Textarea("labelCol","")
            .setObjectType(objectType.object)
            .setMoreTip("可以参考配置 https://vue.ant.design/components/grid-cn/#Col")
            .setTip("label 标签布局"),
        new Textarea("wrapperCol","")
            .setObjectType(objectType.object)
            .setMoreTip("可以参考配置 https://vue.ant.design/components/grid-cn/#Col")
            .setTip("输入控件 标签布局")
    ]).makeKeyVal();

AntForm.label = 'AntForm 基础使用';
module.exports = AntForm;
const {
    Input,
    objectType,
    defaultObjToProp
} = require('../utils/FormItems');
const {
    Preview
} = require('./../utils/Step');

const objectTypeDear = require('./../objectTypeDear');

const ComponentSetting = require('./../utils/ComponentSetting');

const MyDefinedOne = () => new ComponentSetting("MyDefinedOne") // 这个名称是可以随意的
    //.addPackages('leaflet') 这个是要 npm install 的包，刚刚定义的组件不需要
    .addDep([   // 这个是依赖的内容，指的是要从 _sources/ 目录下复制的文件，这里需要复制文件为
        "/components/MyDefinedOne/MyDefinedOne.vue"
    ])
    // 这个是模板在 vue 中的名字(标签名字)
    // <MyDefinedOne></MyDefinedOne>
    .setTemplateName('MyDefinedOne')
    // 这个是要引入到 vue 中的文件
    // （和上面 addDep 的区别是，dep 中可能引入了工具，而这些工具已经被其他组件引入不需要再引入）
    .setImport('/components/MyDefinedOne/MyDefinedOne.vue') // vue 默认就是组件
    // 如果定义的组件时 xxx.js 可以使用 "/component/MyComponent.js:MyComponent"
    // 这是一个例子
    // setImport('/components/Table/pro/DomUtils.js:STable')

    //这是一个表单，刚刚定义组件时，我定义了一个参数，
    // 这里同时表达一个事情，所有的东西最好通过 props 传递，因为个人能力问题
    .addFormItems([
        new Input('msg','IBAS')
            .setTip('这个是表单项标签')
            .setMoreTip("这个是更多提示信息")
            .setObjectType(objectType.string) // 这个是设置这个内容的类型，生成时会自动转换
    ])
    .setPreview(
        new Preview("MyDefinedOne",{
            msg: 'Haha 这个是一个测试啦'
        },true,(something) => {
            let val = something.makeKeyVal().keyVal;
            let type = something.keyType;
            return defaultObjToProp(val,type);
        }).setRebuildMethod("haha")
    )
    .makeKeyVal(); // 这个是必要的

MyDefinedOne.label = '这是一个测试组件';
module.exports = MyDefinedOne;
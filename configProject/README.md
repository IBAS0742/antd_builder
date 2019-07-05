# 项目定义说明

```
|->src
|---> buildConfig
|------- index.js 汇集所有的项目配置
|------> antConfig
|---------- antdConfig.js 定义一个 项目配置 导出一个 process 对象
|---------> src (可以用于展示)
|------------- layout1.png
|------------- layout2.jpg
```

- antdConfig.js 中使用的 Step ，在 ```./src/buildConfig/utils/Step.js``` 中

> Process 的 addStep ，名称不能以 _ 开头，这部分被定义给默认步骤

> 定义在 defaultStep 中的默认步骤需要人为将其定义，默认定义在 ```./src/components/Step/defaultStep``` 目录下

```
// ./src/buildConfig/utils/Step.js
// 这部分定义需要定义特定的组件和方法
const defaultStep = {
    addPage: '_addPage'
};

// ./src/components/Step/defaultStep 这里的 _addPage 就是上面定义的
<component ref="ss" :is="(() => {
    if ('_addPage' === title) {
        return 'AddPage'
    } else if (....) {....} // 继续定义其他组件
})()"></component>
```

### 组件定义说明

> 组件定义可以参考 ```./src/buildConfig/components/STable.js```

```
class ComponentSetting {
    constructor(name) {
        this.name = name;
        // 这部分是要安装的依赖 npm install xxx
        this.packages = [];
        // 这部分是要引入的，默认所有代码放在项目的 根目录下 的 _sources 目录下
        // 并且将被直接复制到 src 下的对应位置
        // 例如 _sources/components/Form/AndForm/buildPage.js 将被复制到 src/components/Form/AndForm/buildPage.js
        // 定义时应该写
        // dep = [ 'src/components/Form/AndForm/buildPage.js' ]
        this.dep = [];
        // 这个是表单，参考 具体使用的写法
        this.formItems = [];
        // keyVal keyInd keyType 是导出时用的，keyType 会对应一个处理函数集合
        // (处理函数在 antd 项目的 src/_buildPages.js 的 objectTypeDear)
        this.keyVal = {};
        this.keyInd = {};
        this.keyType = {};
        // 如果没有定义自己的 etl 就是用这个名字
        // `<${templateName}></${templateName}>`
        this.templateName = '';
        // 需要 import 的内容，注意这里使用的是和 src 相对的目录，
        // import = ["src/components/Table/pro/index.js:STable"]
        // 将被渲染为
        // import STable from "****/src/components/Table/pro/index.js" // 并加入到 export default { components:{ STable } }
        // ****/ 会自动修正
        this.import = [];
        // 这里只定义名称不写内容，内容在生成后再编写
        // events = ['checkOne']
        // export default { methods: { checkOne(){} } }
        this.events = [];
        // 用于构建模板和修改数据及方法的 特定文件
        // ( module.exports = ({eventBind,params}) => { return { eventBind,params,template } })
        // EPT 分别指
        //      event   就是上面的 this.event
        //      params  对应 formItems 部分，因为有时候会定义部分额外的内容调整模板，
        //              而不是作为参数，当然可以使用 再封装组件 来避开定义该方法
        //      template    这里将抛弃上面定义的 templateName
        this.buildEPT = false;
    }
}
```

### 导出内容使用方法

```
通过导出得到的 JSON 直接复制到 antd 项目的 src/_config.js 即可，然后直接运行 node _buildAll.js 就可以生成
```

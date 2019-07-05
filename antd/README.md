#### 配合 configProject 的说明

> 1.要定义在 configProject 的组件需要事先复制到 _sources 目录下，并不重名

> 2.布局类组件例外，直接放在 src/components/layout 底部然后根据里面的规则编写就好（后期有空再改）

> 3.执行 node _buildAll.js 后生成的页面默认在 views_bak 但是不会加到路由，目前不知道怎么实现先不做

> 4.目前还没自动安装依赖的功能，所以所有依赖默认写在 package.json 里了

> 5.所有自定义的工具以 _ 开头命名，以便后期生成后自动删除


#### 本项目的说明

> 考虑问题

- 1.先完成单用户单角色登录解决方案(后面提供多角色解决改进方案)

- 2.先考虑权限控制方案(然后提供解绑权限方法)(暂时无法提供权限特殊配置方案)

- 3.不考虑过多的耦合 store ，因为想实现模块化的配置（但是一个模块内允许使用 store 进行管理，但是要明确模块的范围，方便解耦）

- 3.x store 仅用于以下几点：

- 3.1 权限的管理(提供解耦方案)

- 4.使用 vue-ls 的方案进行数据管理，包含以下几点：

- 4.1 登录 token

> 权限说明

没权限是否显示页面(按钮点击时提示没有权限)

```javascript
ajax('userInfo').then(console.log)
// 请求结果如下
{
    code: 200,
    data: {
        userInfo: {
            username: '',
            // token: '' 这部分在 login 接口中提供
        },
        permission: [
            'home', // home 页面
            'home:add', // home 页面的 add 按钮
            'home:*', // home 页面的 所以 按钮
        ]
    }
};
```

- 格式 vue 代码
https://github.com/peakchen90/vue-beautify

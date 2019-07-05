/**
 * 过滤菜单项的方法
 * @param menu 菜单，默认是 router.config.js 中的 asyncRouterMap
 * @param permission ajax 请求回来的数据，默认格式是 { code: 200, data: { userInfo: {}, permission: [] } }
 *          permission 默认内容格式为 [页面, 页面:add 页面:delete]
 */
export default (menu,/*data*/{ data : { permission } }) => {
    let filter = (function(permission,aMenu) {
        let permissionTrue = true;
        if (aMenu.meta.permission) {
            permissionTrue = !!(permission.indexOf(aMenu.meta.permission) + 1);
        }
        if (aMenu.children && aMenu.children.length) {
            aMenu.children = aMenu.children.filter(filter);
            return permissionTrue && aMenu.children.length;
        } else {
            return permissionTrue;
        }
    }).bind(null,Array.from(new Set(permission.map(_ => _.split(':')[0]))));

    return menu.filter(filter);
};
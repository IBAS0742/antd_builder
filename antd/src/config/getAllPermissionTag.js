// let userInfoResponse = {
//     code: 200,
//     data: {
//         userInfo: {
//             username: '',
//             // token: '' 这部分在 login 接口中提供
//         },
//         permission: [
//             'home', // home 页面
//             'home:add', // home 页面的 add 按钮
//             'home:*', // home 页面的 所以 按钮
//         ]
//     }
// };

/**
 * 获取权限标识
 * @param permission 相对于 userinfo 请求回来的 permission 部分
 */
export const getAllPermissionTag = (permission) => {
    let ret = {};
    permission.filter(_ => _.split(':').length === 1).forEach(_ => ret[_] = {});
    permission.filter(_ => _.split(':').length > 1).forEach(_ => {
        let __ = _.split(':');
        if (!(__[0] in ret)) {
            ret[__[0]] = {
                [__[1]]: true
            };
        } else {
            ret[__[0]][__[1]] = true;
        }
    });
    return ret;
};
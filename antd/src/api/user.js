export const getUserInfo = () => {
    return new Promise((s/*,f*/) => {
        s({
            code: 200,
            data: {
                userInfo: {
                    username: '',
                    token: ''
                },
                permission: [
                    'home', // home 是必须有的
                    'home:*',   // 如果对 home 进行了神奇的按钮配置，
                                // 又希望暴露所有操作，可以只有该配置
                    'about:add', // home 页面
                    'about:delete', // home 页面
                    'tpone:*',
                    'tptwo',
                ]
            }
        });
    });
};
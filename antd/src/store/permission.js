// import Vue from 'vue';

export default {
    permission: {
        namespaced: true,
        // 模块内容（module assets）
        state: {
            permission: {
                // pagePermission: {   // 表示某一个页内的按钮权限配置
                //     '*': true,  // 表示所有都有权限
                //     add: false,     // 表示 add 按钮没有权限
                //     delete: true    // 表示 delete 按钮没有权限
                // }
            }
        }, // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
        // getters: {
        //     isAdmin() {
        //     } // -> getters['account/isAdmin']
        // },
        // actions: {
        //     login() {
        //     } // -> dispatch('account/login')
        // },
        mutations: {
            addPermission(state,permission) {
                state.permission = {
                    ...state.permission,
                    ...permission
                }
                // for (let i in permission) {
                //     // Vue.$set(state,i,permission[i]);
                //     state[i] = permission[i];
                // }
            }
        },
    }
}
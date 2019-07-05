/* eslint-disable no-console */
import Vue from 'vue'
import NProgress from 'nprogress';
import * as kw from './keyword'
import router from './../router/index'
import state from './../store/index';
import { asyncRouterMap } from "./router.config";
import notification from 'ant-design-vue/es/notification'
import filterRouteMethod from './filterRouteMethod';
import { getAllPermissionTag } from "./getAllPermissionTag";

import { getUserInfo } from "../api/user";

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 *
 *  @see https://github.com/sendya/ant-design-pro-vue/pull/53
 */
export const action = Vue.directive('action', {
    bind: function (el, binding, vnode) {
        let { state: { permission : { permission } } } = state;
        let { arg } = binding;
        let pagePermission = vnode.context.$route.meta.permission;
        if (pagePermission && pagePermission in permission) {
            if (!permission[pagePermission][kw.ALL_ALLOW]) {
                if (!permission[pagePermission][arg]) {
                    el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
                }
            } else {
                return true;
            }
            // return true;
        }
    }
});

NProgress.configure({ showSpinner: true }); // NProgress Configuration
const whiteList = ['login', 'register', 'registerResult']; // no redirect whitelist

router.beforeEach((to, from, next) => {
    NProgress.start();
    // 如果已经存在 token ，则进入这里
    if (Vue.ls.get(kw.ACCESS_TOKEN)) {
        /* has token */
        if (to.path === '/user/login') {
            // next({ path: '/dashboard/workplace' })
            next();
            NProgress.done()
        } else {
            // 这里要去获取用户信息，
            // 并将获取到的信息动态添加到缓存，
            // 同时将菜单动态显示，
            // 权限表动态配置好
            if (!Vue.ls.get(kw.ROUTER_ADDED)) {
                getUserInfo().then((data) => {
                    let filteredRouter = filterRouteMethod(asyncRouterMap,data);
                    router.addRoutes(filteredRouter);
                    // 不知道为什么 addRoutes 后 router.options.routes 没有更新
                    router.options.routes.push(filteredRouter[0]);

                    state.commit('permission/addPermission',getAllPermissionTag(data.data.permission));

                    const redirect = decodeURIComponent(from.query.redirect || to.path);
                    Vue.ls.set(kw.ROUTER_ADDED,true);
                    if (to.path === redirect) {
                        // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                        next({ ...to, replace: true })
                    } else {
                        // 跳转到目的路由
                        next({ path: redirect })
                    }
                }).catch(() => {
                    notification.error({
                        message: '错误',
                        description: '请求用户信息失败，请重试'
                    });
                    next({ path: '/user/login', query: { redirect: to.fullPath } });
                    NProgress.done();   // if current page is login will not trigger afterEach hook, so manually handle it
                });
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // next({ path: '/user/login', query: { redirect: to.fullPath } })
            next({ path: '/user/login', query: { redirect: to.fullPath } });
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
});

router.afterEach(() => {
    NProgress.done() // finish progress bar
});

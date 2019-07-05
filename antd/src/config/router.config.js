import {
    RouteView,
    defaultLayout
} from './../components/layout/index'

export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        // component: SliderHCFPage,
        component: defaultLayout,
        meta: { icon: 'my-icon-guanliyuan', title: '首页' },
        redirect: '/dashboard/Home',
        children: [
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/Home',
                component: RouteView,
                meta: { title: '仪表盘', icon: 'my-icon-yinle' , keepAlive: true },
                children: [
                    {
                        path: '/dashboard/Home',
                        name: 'Home',
                        component: () => import('./../views/Home.vue'),
                        meta: { title: '主页', keepAlive: false, permission: 'home' }
                    },
                    {
                        path: '/dashboard/About',
                        name: 'About',
                        component: () => import('./../views/About.vue'),
                        meta: { title: '关于', keepAlive: false, permission: 'about' }
                    },
                    {
                        path: '/dashboard/tpone',
                        name: 'tpone',
                        component: () => import('./../views/TestPermissionOne.vue'),
                        meta: { title: '测试一', keepAlive: false, permission: 'tpone' }
                    },
                    {
                        path: '/dashboard/tptwo',
                        name: 'tptwo',
                        component: () => import('./../views/TestPermissionTwo.vue'),
                        meta: { title: '测试二', keepAlive: false, permission: 'tptwo' }
                    },
                    {
                        path: '/dashboard/showTable',
                        name: 'showTable',
                        component: () => import('./../views/ShowTable.vue'),
                        meta: { title: 'showTable', keepAlive: false }
                    },
                    {
                        path: '/dashboard/showTable1',
                        name: 'showTable1',
                        component: () => import('./../views/ShowTable1.vue'),
                        meta: { title: 'showTable1', keepAlive: false }
                    },
                    {
                        path: '/dashboard/TestForm1',
                        name: 'TestForm1',
                        component: () => import('./../views/TestForm1.vue'),
                        meta: { title: 'TestForm1', keepAlive: false }
                    },
                    // {
                    //     path: '/dashboard/showTableVue',
                    //     name: 'showTableVue',
                    //     component: () => import('./../views_bak/STableShow'),
                    //     meta: { title: 'showTable', keepAlive: false }
                    // },
                    // {
                    //     path: '/dashboard/IBAS',
                    //     name: 'IBAS',
                    //     component: () => import('./../views_bak/IBAS.vue'),
                    //     meta: { title: '测试三', keepAlive: false }
                    // },
                    // {
                    //     path: '/dashboard/Bing',
                    //     name: 'Bing',
                    //     component: () => import('./../views_bak/Bing.vue'),
                    //     meta: { title: '测试三', keepAlive: false }
                    // },
                ]
            }
        ]
    }
];

// 这里是默认的路由，不需要进行权限认定的
export const constantRouterMap = [
    {
        path: '/user',
        component: RouteView,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('./../views/Login.vue')
            }
        ]
    }
];
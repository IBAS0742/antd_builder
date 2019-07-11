export const testRoute = [
    {
        path: '/',
        name: 'index',
        meta: { icon: 'my-icon-guanliyuan', title: '首页' },
        redirect: '/dashboard/Home',
        children: [
            // dashboard
            {
                path: '/dashboard',
                name: 'dashboard',
                redirect: '/dashboard/Home',
                meta: { title: '仪表盘', icon: 'my-icon-yinle' , keepAlive: true },
                children: [
                    {
                        path: '/dashboard/Home',
                        name: 'Home',
                        meta: { title: '主页', keepAlive: false }
                    },
                    {
                        path: '/dashboard/About',
                        name: 'About',
                        meta: { title: '关于', keepAlive: false }
                    },
                    {
                        path: '/dashboard/tpone',
                        name: 'tpone',
                        meta: { title: '测试一', keepAlive: false }
                    }
                ]
            }
        ]
    }
];
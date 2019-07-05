let filterRouteMethods = (menu,/*data*/{ data : { permission } }) => {
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
    }).bind(null,permission.filter(_ => _.split(':').length === 1));

    return menu.filter(filter);
};

let formMenu = (name,per,children) => {
    if (children) {
        return {
            name,
            meta: {
                permission: per || ''
            },
            children
        };
    } else {
        return {
            name,
            meta: {
                permission: per || ''
            }
        };
    }
};

let menu = [
    formMenu('index',false,[
        formMenu('subOne',false,[
            formMenu('subOne-1','subOne-1'),
            formMenu('subOne-2','subOne-2')
        ]),
        formMenu('subTwo',false,[
            formMenu('subTwo-1','subTwo-1'),
            formMenu('subTwo-2','subTwo-2'),
        ])
    ]),
    formMenu('product',false,[
        formMenu('subThree',false,[
            formMenu('subThree-1','subThree-1'),
            formMenu('subThree-2','subThree-2')
        ]),
        formMenu('subFour',false,[
            formMenu('subFour-1','subFour-1'),
            formMenu('subFour-2','subFour-2'),
        ])
    ]),
    formMenu('user',false,[
        formMenu('login',false),
        formMenu('register',false)
    ])
];

let ajaxData = {
    code: 200,
    data: {
        userInfo: {},
        permission: [
            'subOne-1',
            'subOne-1:add',
            'subOne-1:remove',
            'subOne-2:add'
        ]
    }
};

let ret = [
    {
        "name": "index",
        "meta": {
            "permission": ""
        },
        "children": [
            {
                "name": "subOne",
                "meta": {
                    "permission": ""
                },
                "children": [
                    {
                        "name": "subOne-1",
                        "meta": {
                            "permission": "subOne-1"
                        }
                    }
                ]
            }
        ]
    },
    {
        "name": "product",
        "meta": {
            "permission": ""
        },
        "children": []
    },
    {
        "name": "user",
        "meta": {
            "permission": ""
        },
        "children": [
            {
                "name": "login",
                "meta": {
                    "permission": ""
                }
            },
            {
                "name": "register",
                "meta": {
                    "permission": ""
                }
            }
        ]
    }
];

JSON.stringify(filterRouteMethods(menu,ajaxData)) === JSON.stringify(ret);
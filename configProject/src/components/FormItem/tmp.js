let tmp = {
    "Permission": {
        "name": "Permission",
        "config": {
            "permission": {
                "key": "permission",
                "value": true,
                "tip": "是否需要权限",
                "pic": "",
                "type": "switch"
            }
        },
        "configs": {},
        "configsDefaultVal": "",
        "configsBaseOn": "",
        "multi": false
    },
    "Layout": {
        "name": "Layout",
        "config": {
            "Layout": {
                "key": "Layout",
                "value": "HeaderSC",
                "tip": "",
                "pic": "",
                "type": "radioGroup",
                "options": [
                    {
                        "key": "HeaderSC",
                        "value": false,
                        "tip": "布局一",
                        "pic": "./src/img/layout/layout1.png",
                        "type": "radio"
                    },
                    {
                        "key": "SliderHCF",
                        "value": false,
                        "tip": "布局二",
                        "pic": "./src/img/layout/layout2.png",
                        "type": "radio"
                    }
                ]
            }
        },
        "configs": {},
        "configsDefaultVal": "",
        "configsBaseOn": "",
        "multi": false
    },
    "LayoutSetting": {
        "name": "LayoutSetting",
        "config": {},
        "configs": {
            "HeaderSC": {
                "header.components": {
                    "key": "header.components",
                    "value": [
                        "MenuCollapsed",
                        "UserMenu"
                    ],
                    "tip": "头部组件",
                    "pic": "",
                    "type": "checkboxGroup",
                    "options": [
                        {
                            "key": "MenuCollapsed",
                            "value": true,
                            "tip": "菜单折叠按钮",
                            "pic": "",
                            "type": "checkbox"
                        },
                        {
                            "key": "UserMenu",
                            "value": true,
                            "tip": "用户信息",
                            "pic": "",
                            "type": "checkbox"
                        }
                    ]
                },
                "Breadcrumb": {
                    "key": "Breadcrumb",
                    "value": true,
                    "tip": "面包屑",
                    "pic": "",
                    "type": "checkbox"
                },
                "slider.width": {
                    "key": "slider.width",
                    "value": "300px",
                    "tip": "设置侧栏宽度",
                    "pic": "",
                    "type": "input"
                }
            },
            "SliderHCF": {
                "Breadcrumb": {
                    "key": "Breadcrumb",
                    "value": true,
                    "tip": "面包屑",
                    "pic": "",
                    "type": "checkbox"
                },
                "slider.width": {
                    "key": "slider.width",
                    "value": "300px",
                    "tip": "设置侧栏宽度",
                    "pic": "",
                    "type": "input"
                },
                "header.style.background": {
                    "key": "header.style.background",
                    "value": "#40a9ff !important",
                    "tip": "头部背景颜色",
                    "pic": "",
                    "type": "input"
                },
                "header.style.padding": {
                    "key": "header.style.padding",
                    "value": "0 12px 0 0",
                    "tip": "头部 padding",
                    "pic": "",
                    "type": "input"
                },
                "header.components": {
                    "key": "header.components",
                    "value": [
                        "MenuCollapsed",
                        "UserMenu"
                    ],
                    "tip": "头部组件",
                    "pic": "",
                    "type": "checkboxGroup",
                    "options": [
                        {
                            "key": "MenuCollapsed",
                            "value": true,
                            "tip": "菜单折叠按钮",
                            "pic": "",
                            "type": "checkbox"
                        },
                        {
                            "key": "UserMenu",
                            "value": true,
                            "tip": "用户信息",
                            "pic": "",
                            "type": "checkbox"
                        }
                    ]
                },
                "slider.background": {
                    "key": "slider.background",
                    "value": "#fff",
                    "tip": "设置侧栏背景颜色",
                    "pic": "",
                    "type": "input"
                },
                "hasFoot": {
                    "key": "hasFoot",
                    "value": true,
                    "tip": "是否有foot部分",
                    "pic": "",
                    "type": "checkbox"
                },
                "footer.content": {
                    "key": "footer.content",
                    "value": "",
                    "tip": "foot 内容(html)",
                    "pic": "",
                    "type": "input"
                }
            }
        },
        "configsDefaultVal": "HeaderSC",
        "configsBaseOn": "Layout.Layout",
        "multi": true
    },
    "_addPage": {
        "name": "_addPage",
        "config": {},
        "configs": {},
        "configsDefaultVal": "",
        "configsBaseOn": "",
        "multi": false
    }
}
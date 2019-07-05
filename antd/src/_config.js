module.exports = {
    "_addPage": {
        "FolderName": "views",
        "pages": [
            {
                "pageName": "IBAS",
                "info": {
                    "pageName": "IBAS",
                    "components": [
                        {
                            "params": {
                                "url": "http://11.11.11.164:8080/geoserver/et/wms",
                                "params": "{\n                    \"styles\": \"et:et\",\n                    \"format\": \"image/png\",\n                    \"VERSION\": \"1.1.1\",\n                    \"layers\": \"et:ET_2016_113\",\n                    \"transparent\": true\n                }",
                                "center": "",
                                "zoom": "5",
                                "attribution": "@ Your Company",
                                "baseMap": "",
                                "colorMap": "",
                                "controls": "[]"
                            },
                            "name": "BaseLeaflet",
                            "dep": [
                                "/components/leafletMap/utils/addControl.js",
                                "/components/leafletMap/BaseLeafLet.vue"
                            ],
                            "packages": [
                                "leaflet"
                            ],
                            "objectType": {
                                "url": "string",
                                "params": "object",
                                "center": "array",
                                "zoom": "int",
                                "attribution": "string",
                                "baseMap": "string",
                                "colorMap": "string",
                                "controls": "array"
                            },
                            "templateName": "BaseLeafLet",
                            "import": [
                                "/components/leafletMap/BaseLeafLet.vue"
                            ],
                            "events": []
                        }
                    ]
                }
            },
            {
                "pageName": "Bing",
                "info": {
                    "pageName": "Bing",
                    "router": "Bing",
                    "components": [
                        {
                            "params": {
                                "url": "[\"http://11.11.11.164:8080/geoserver/swat/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=swat%3Aamu_lower&outputFormat=application%2Fjson\"]",
                                "center": "",
                                "zoom": "5",
                                "attribution": "@ Your Company",
                                "baseMap": "",
                                "controls": "[]"
                            },
                            "name": "LeafletShp",
                            "dep": [
                                "/components/leafletMap/utils/addControl.js",
                                "/components/leafletMap/LeafletShp.vue"
                            ],
                            "packages": [
                                "leaflet"
                            ],
                            "objectType": {
                                "url": "array",
                                "center": "array",
                                "zoom": "int",
                                "attribution": "string",
                                "baseMap": "string",
                                "controls": "array"
                            },
                            "templateName": "LeafletShp",
                            "import": [
                                "/components/leafletMap/LeafletShp.vue"
                            ],
                            "events": [
                                "mouseover",
                                "click"
                            ]
                        }
                    ]
                }
            },
            {
                "pageName": "STableShow",
                "info": {
                    "pageName": "STableShow",
                    "router": "STableShow",
                    "components": [
                        {
                            "params": {
                                "columns": "[\n\t{\n\t\t\"title\": \"规则编号\",\n\t\t\"dataIndex\": \"id\"\n\t},\n\t{\n\t\t\"title\": \"描述\",\n\t\t\"dataIndex\": \"description\"\n\t},\n\t{\n\t\t\"title\": \"状态\",\n\t\t\"dataIndex\": \"status\",\n\t\t\"needTotal\": true\n\t},\n\t{\n\t\t\"title\": \"更新时间\",\n\t\t\"dataIndex\": \"updatedAt\",\n\t\t\"sorter\": true\n\t}\n]",
                                "showPagination": "auto",
                                "size": "default",
                                "action": "[\"delete\",\"edit\"]",
                                "rowSelection": "checkbox"
                            },
                            "name": "STable",
                            "dep": [
                                "/components/Table/pro/index.js"
                            ],
                            "packages": [
                                "lodash.get"
                            ],
                            "objectType": {
                                "columns": "array",
                                "showPagination": "string",
                                "size": "string",
                                "action": "array",
                                "rowSelection": "string"
                            },
                            "templateName": "STable",
                            "import": [
                                "/components/Table/pro/index.js:STable"
                            ],
                            "events": [],
                            "buildEPT": "/components/Table/pro/buildPage.js"
                        }
                    ]
                }
            }
        ],
        "folder": []
    },
    "Permission": {
        "permission": true
    },
    "Layout": {
        "Layout": "HeaderSC"
    },
    "LayoutSetting": {
        "header.components": [
            "MenuCollapsed",
            "UserMenu"
        ],
        "Breadcrumb": true,
        "slider.width": "300px"
    }
};

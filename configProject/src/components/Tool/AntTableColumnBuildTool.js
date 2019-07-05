export const AntTableColumnBuildToolSchema = {
    type: "array",
    title: "Columns",
    format: "tabs",
    items: {
        type: "object",
        properties: {
            "align": {
                title: "对齐方式 align",
                type: "string",
                "enum": ['left','right','center']
            },
            "dataIndex": {
                title: "字段 dataIndex",
                type: 'string',
                "options": {
                    "infoText": "数据对象的属于名称，及字段，用于显示到对应的列"
                }
            },
            title: {
                title: "表头 title",
                type: "string"
            },
            width: {
                title: "宽度 width",
                type: "string"
            },
            fixed: {
                title: "固定 fixed",
                "enum": [false,'left','right']
            },
            filters: {
                title: 'filters',
                type: "array",
                items: {
                    type: 'object',
                    properties: {
                        "text": {
                            title: "文字描述",
                            type: "string"
                        },
                        "value": {
                            title: "值",
                            type: "string"
                        }
                    }
                }
            }
        }
    }
};
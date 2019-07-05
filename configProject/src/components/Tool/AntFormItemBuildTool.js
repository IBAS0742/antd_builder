const allCommon = {
    placeholder: {
        title: "输入框提示文字",
        type: "string",
        default: "请输入"
    },
    "disabled": {
        type: 'boolean',
        default: false,
        title: "禁用"
    },
};

const DateMonthRangeWeekPickerCommon = {
    ...allCommon,
    "allowClear": {
        type: 'boolean',
        default: true,
        title: "是否允许再次点击后清除"
    },
    "autoFocus": {
        type: 'boolean',
        default: true,
        title: "自动获取焦点"
    },
};

export const AntFormItemBuildSchema = {
    type: "array",
    title: "AntFormItem",
    format: "tabs",
    items: {
        title: 'FormItem',
        oneOf: [
            {
                title: "input",
                properties: {
                    formtype: {
                        title: "类型",
                        type: "string",
                        enum: ['input'],
                        default: "input"
                    },
                    "label": {
                        title: "标签",
                        type: "string",
                    },
                    "key": {
                        title: "字段名（提交服务器）",
                        type: "string",
                    },
                    ...allCommon,
                    validate: {
                        title: '校验规则',
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                title: "id 必须是唯一的"
                            },
                            rules: {
                                title: 'Rules',
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        "len": {
                                            type: 'number',
                                            default: -1,
                                            title: '字段长度'
                                        },
                                        "max": {
                                            type: 'number',
                                            default: -1,
                                            title: '最大长度'
                                        },
                                        "min": {
                                            type: 'number',
                                            default: -1,
                                            title: '最小长度'
                                        },
                                        "required": {
                                            type: 'boolean',
                                            default: false,
                                            title: '是否必填'
                                        },
                                        "pattern": {
                                            type: 'string',
                                            default: '',
                                            title: '正则表达式'
                                        },
                                        "whitespace": {
                                            type: 'boolean',
                                            default: true,
                                            title: '必选时，空格是否会被视为错误'
                                        },
                                        other: {
                                            type: 'string',
                                            title: '自定义',
                                            enum: [
                                                "string",
                                                "number",
                                                "boolean",
                                                "method",
                                                "regexp",
                                                "integer",
                                                "float",
                                                "array",
                                                "object",
                                                "data",
                                                "url",
                                                "hex",
                                                "email",
                                                "selfDefined"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            {
                title: "textarea",
                properties: {
                    "label": {
                        title: "标签",
                        type: "string",
                    },
                    "key": {
                        title: "字段名（提交服务器）",
                        type: "string",
                    },
                    ...allCommon,
                }
            },
            {
                title: "radio",
                properties: {
                    ...allCommon,
                    "label": {
                        title: "标签",
                        type: "string",
                    },
                    "key": {
                        title: "字段名（提交服务器）",
                        type: "string",
                    },
                    "button": {
                        title: "使用按钮风格",
                        type: 'boolean',
                        default: false
                    },
                    "buttonStyle": {
                        title: "按钮的风格类型",
                        type: "string",
                        moreTip: "只有使用『按钮风格』后才有效",
                        enum: ["outline","solid"]
                    },
                    options: {
                        title: "Options",
                        type: "array",
                        format: "tabs",
                        items: {
                            type: 'object',
                            title: "option",
                            properties: {
                                "label": {
                                    title: "标签",
                                    type: "string",
                                },
                                "value": {
                                    title: "字段名（提交服务器）",
                                    type: "string",
                                }
                            }
                        }
                    }
                }
            },
            {
                title: "checkbox",
                properties: {
                    ...allCommon,
                    "label": {
                        title: "标签",
                        type: "string",
                    },
                    "key": {
                        title: "字段名（提交服务器）",
                        type: "string",
                    },
                    options: {
                        title: "Options",
                        type: "array",
                        format: "tabs",
                        items: {
                            type: 'object',
                            title: "option",
                            properties: {
                                "label": {
                                    title: "标签",
                                    type: "string",
                                },
                                "value": {
                                    title: "字段名（提交服务器）",
                                    type: "string",
                                }
                            }
                        }
                    }
                }
            },
            {
                title: "rate",
                properties: {
                    ...allCommon,
                    "allowClear": {
                        type: 'boolean',
                        default: true,
                        title: "是否允许再次点击后清除"
                    },
                    "allowHalf": {
                        type: 'boolean',
                        default: true,
                        title: "是否允许半选"
                    },
                    "autoFocus": {
                        type: 'boolean',
                        default: true,
                        title: "自动获取焦点"
                    },
                    "character": {
                        type: 'string',
                        default: true,
                        title: "自定义字符"
                    },
                    "count": {
                        type: 'number',
                        default: 5,
                        title: "星星的数量"
                    },
                    "defaultValue": {
                        type: 'number',
                        default: 0,
                        title: "默认值"
                    },
                }
            },
            {
                title: "slider",
                properties: {
                    ...allCommon,
                    "autoFocus": {
                        type: 'boolean',
                        default: true,
                        title: "自动获取焦点"
                    },
                    "defaultValue": {
                        type: 'number',
                        default: 0,
                        title: "默认值"
                    },
                    "vertical": {
                        type: 'boolean',
                        default: false,
                        title: "垂直"
                    },
                    "tooltipVisible": {
                        type: 'boolean',
                        default: true,
                        title: "是否显示当前的数值"
                    },
                    "range": {
                        type: 'boolean',
                        default: false,
                        title: "两个滑块模式"
                    },
                    "max": {
                        type: 'number',
                        default: 100,
                        title: "最大"
                    },
                    "min": {
                        type: 'number',
                        default: 0,
                        title: "最小"
                    },
                    "step": {
                        type: 'number',
                        default: 1,
                        title: "步长"
                    },
                    "marks": {
                        type: "string",
                        moreTip: "参考 https://vue.ant.design/components/slider-cn/",
                        default: "{0: 0.0,1: 1.0}"
                    }
                }
            },
            {
                title: 'switch',
                properties: {
                    ...allCommon,
                    "autoFocus": {
                        type: 'boolean',
                        default: true,
                        title: "自动获取焦点"
                    },
                    "size": {
                        type: "string",
                        enum: ["default","small"],
                        title: "开关大小"
                    },
                    "checkedChildren": {
                        type: "string",
                        title: "选中时的内容"
                    },
                    "unCheckedChildren": {
                        type: "string",
                        title: "非选中时的内容"
                    },
                }
            },
            {
                title: "timePicker",
                properties: {
                    ...allCommon,
                    allowEmpty: {
                        type: 'boolean',
                        default: true,
                        title: '是否展示清除按钮'
                    },
                    use12Hours: {
                        type: 'boolean',
                        default: false,
                        title: '12 小时制',
                        moreTip: "为 true 时，format 为 h:mm:ss a"
                    },
                    clearText: {
                        type: 'string',
                        moreTip: "默认为clear",
                        default: "",
                        title: '清楚按钮显示的文字'
                    },
                    "autoFocus": {
                        type: 'boolean',
                        default: true,
                        title: "自动获取焦点"
                    },
                    "defaultOpenValue": {
                        type: 'string',
                        default: "moment('12:00:00', 'HH:mm:ss')",
                        title: "默认打开面板是的时间"
                    },
                    "defaultValue": {
                        type: 'string',
                        default: "moment('12:00:00', 'HH:mm:ss')",
                        title: "默认打开面板是的时间"
                    },
                    "disabledHours": {
                        type: 'boolean',
                        default: false,
                        title: "禁用『时』的部分"
                    },
                    "disabledMinutes": {
                        type: 'boolean',
                        default: false,
                        title: "禁用『分』的部分"
                    },
                    "disabledSeconds": {
                        type: 'boolean',
                        default: false,
                        title: "禁用『秒』的部分"
                    },
                    "format": {
                        type: 'string',
                        default: "HH:mm:ss",
                        title: "时间格式（发送服务器时）"
                    },
                }
            },
            {
                title: 'DatePicker',
                properties: {
                    ...DateMonthRangeWeekPickerCommon,
                    defaultValue: {
                        title: "默认日期",
                        type: "string",
                        default: "moment('2019-01-01', 'YYYY-MM-DD')"
                    },
                    "format": {
                        type: 'string',
                        default: "YYYY-MM-DD",
                        title: "日期格式（发送服务器时）"
                    },
                    "showTime": {
                        type: 'boolean',
                        default: false,
                        title: "增加时间功能"
                    },
                    "showToday": {
                        type: 'boolean',
                        default: false,
                        title: "是否展示『今天』按钮"
                    },
                }
            },
            {
                title: 'MonthPicker',
                properties: {
                    ...DateMonthRangeWeekPickerCommon,
                    defaultValue: {
                        title: "默认日期",
                        type: "string",
                        default: "moment('2019-01', 'YYYY-MM')"
                    },
                    "format": {
                        type: 'string',
                        default: "YYYY-MM",
                        title: "日期格式（发送服务器时）"
                    },
                }
            },
            {
                title: 'WeekPicker',
                properties: {
                    ...DateMonthRangeWeekPickerCommon,
                    defaultValue: {
                        title: "默认日期",
                        type: "string",
                        default: "moment('2019-01', 'YYYY-wo')"
                    },
                    "format": {
                        type: 'string',
                        default: "YYYY-wo",
                        title: "日期格式（发送服务器时）"
                    },
                }
            },
            {
                title: 'RangePicker',
                properties: {
                    ...DateMonthRangeWeekPickerCommon,
                    defaultValue: {
                        title: "默认日期",
                        type: "string",
                        default: "[moment('2019-01-01', 'YYYY-MM-DD'),moment('2019-01-02', 'YYYY-MM-DD')]"
                    },
                    "format": {
                        type: 'string',
                        default: "YYYY-MM-DD HH:mm:ss",
                        title: "日期格式（发送服务器时）"
                    },
                    "showTime": {
                        type: 'boolean',
                        default: false,
                        title: "增加时间功能"
                    },
                }
            }
        ]
    }
};
import {
    Form,
    Switch
} from 'ant-design-vue';
import {renderTip} from "./renderTip";

// let settingExample = {
//     "key": "permission",
//     "value": true,
//     "tip": "",
//     "pic": "",
//     "type": "switch"
// };

export default {
    name: 'MySwitch',
    components: {
        FormItem: Form.Item,
        Switch
    },
    props: {
        setting: {
            type: Object,
            required: true
        }
    },
    computed: {
        settingCP() {
            return this.$props.setting;
        },
        hasPic() {
            return this.$props.setting.options.some(_ => _.pic);
        },
        update() {
            this.$emit('update',this.settingCP)
        }
    },
    methods: {
    },
    render(h) {
        let $this = this;
        return h(Form.Item,{
            props: {
                // label: this.settingCP.tip
                colon: false
            }
        },[
            renderTip(h,this.settingCP),
            h(Switch,{
                props: {
                    checked: $this.settingCP.value
                },
                on: {
                    change: function (val) {
                        $this.settingCP.value = val;
                    }
                }
            }),
            h('div',{
                style: {
                    'display': 'inline-block',
                    'padding-left': '10px',
                    'line-height': '22px'
                }
            },$this.settingCP.checkedTip.split('%')[$this.settingCP.value ? 0 : 1])
        ])
    }
};

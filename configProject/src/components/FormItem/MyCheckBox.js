import {
    Form,
    Checkbox
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
    name: 'MyInput',
    components: {
        FormItem: Form.Item,
        Checkbox
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
        }
    },
    methods: {
        update() {
            this.$emit('update',this.settingCP)
        }
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
            h(Checkbox,{
                props: {
                    checked: this.settingCP.value
                },
                on: {
                    input: function (val) {
                        $this.settingCP.value = val;
                    }
                }
            },this.settingCP.checkedTip.split('%')[this.settingCP.value ? 0 : 1])
        ]);
    }
};

import {
    Form,
    Input
} from 'ant-design-vue';
import { renderTip } from "./renderTip";

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
        Input
    },
    props: {
        setting: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: false,
            default() {
                return 'text'
            }
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
            h(Input,{
                props: {
                    value: this.settingCP.value,
                    type: this.$props.type
                },
                on: {
                    change: function (val) {
                        $this.settingCP.value = val.target.value;
                    }
                }
            })
        ]);
    }
};

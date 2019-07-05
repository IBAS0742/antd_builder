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
    name: 'MyRadioGroup',
    components: {
        FormItem: Form.Item,
        Checkbox,
        CheckboxGroup: Checkbox.Group,
        CheckboxButton: Checkbox.Button
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
        update() {},
        clickCheckBox() {
            let val = [];
            this.settingCP.options.forEach(_ => {
                if (_.value) {
                    val.push(_.key);
                }
            });
            this.settingCP.value.splice(0,this.settingCP.value.length,val);
        }
    },
    render(h) {
        return h(Form.Item,{
            props: {
                // label: this.settingCP.tip
                colon: false
            }
        },[
            renderTip(h,this.settingCP),
            /*h(Checkbox.Group,{
                props: {
                    value: this.settingCP.value
                },
            },*/(() => {
                let $this = this;
                let radios = [];
                this.settingCP.options.forEach(_ => {
                    radios.push(h(Checkbox,{
                        props: {
                            checked: _.value
                        },
                        on: {
                            change(e) {
                                _.value = e.target.checked;
                                $this.clickCheckBox();
                            }
                        }
                    },_.tip));
                });
                return radios;
            })()/*)*/
        ])
    }
};

import {
    Form,
    Radio
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
        Radio,
        RadioGroup: Radio.Group,
        RadioButton: Radio.Button
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
        clickRadio(ind,val) {
            if (val) {
                this.settingCP.options.map((_,_ind) => {
                    if (_ind === ind) {
                        _.value = true;
                    } else {
                        _.value = false;
                    }
                    return _;
                });
                this.settingCP.value = this.settingCP.options[ind].key;
            }
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
            /*h(Radio.Group,{
                props: {
                    value: this.settingCP.value
                },
            },*/(() => {
                let $this = this;
                let radios = [];
                this.settingCP.options.forEach((_,ind) => {

                    radios.push(h(Radio,{
                        props: {
                            checked: _.value
                        },
                        on: {
                            change(e) {
                                $this.clickRadio(ind,e.target.checked);
                            }
                        }
                    },[
                        $this.hasPic ? h('img',{
                            domProps: {
                                src: _.pic
                            }
                        }) : h('span',_.tip)
                    ]));
                });
                return radios;
            })()/*)*/
        ])
    }
};

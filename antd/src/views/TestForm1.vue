<template>
    <a-form :form="form">
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="Name">
            <a-input
                    v-decorator="[
          'username.hahah',
          {rules: [{ required: true, message: 'Please input your name' }]}
        ]"
                    placeholder="Please input your name"/>
        </a-form-item>
        <a-form-item
                :label-col="formItemLayout.labelCol"
                :wrapper-col="formItemLayout.wrapperCol"
                label="Nickname">
            <a-input v-decorator='[
                        "nickname",
                        {
                            rules: [
                                { required: true, message: "Please input your nickname" },
                                {
                                    validator(rule,value,cb) {
                                        if (value.length > 5) {
                                            cb("长度不能大于5");
                                            // return "长度不能大于5";
                                        } else {
                                            // cb(true);
                                            return true;
                                        }
                                    }
                                }
                            ]
                        }
                    ]'
                    placeholder="Please input your nickname"/>
        </a-form-item>
        <a-form-item
                :label-col="formTailLayout.labelCol"
                :wrapper-col="formTailLayout.wrapperCol">
            <a-button
                    type="primary"
                    @click="check">
                Check
            </a-button>
        </a-form-item>
    </a-form>
</template>

<script>
    const formItemLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8 },
    };
    const formTailLayout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 8, offset: 4 },
    };
    export default {
        data () {
            return {
                checkNick: false,
                formItemLayout,
                formTailLayout,
                form: this.$form.createForm(this),
                decorator: {
                    nickname: [
                        'nickname',
                        {
                            rules: [
                                // { required: checkNick, message: 'Please input your nickname' },
                                {
                                    validator(rule,value,cb) {
                                        if (value.length > 5) {
                                            cb('长度不能大于5');
                                            return '长度不能大于5';
                                        } else {
                                            // cb(true);
                                            return true;
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                }
            };
        },
        methods: {
            check  () {
                this.form.validateFields(
                    (err) => {
                        if (!err) {
                            console.info('success');
                        }
                    },
                );
            },
            handleChange  (e) {
                this.checkNick = e.target.checked;
                this.$nextTick(() => {
                    this.form.validateFields(['nickname'], { force: true });
                });
            },
        },
    };
</script>
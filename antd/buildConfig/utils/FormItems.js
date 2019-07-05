const {
    checkTypes
} = require('./smallUtils');

const FormItemName = {
    Input: 'input',
    CheckBox: 'checkbox',
    Radio: 'radio',
    Switch: 'switch',
    Selection: 'Selection'
};

class BaseFormItem {
    constructor(key,value) {
        this.key = key;
        this.value = value;
        this.tip = '';
        this.pic = '';
    }

    setTip(tip) {
        this.tip = tip;
        return this;
    }

    setPic(pic) {
        this.pic = pic;
        return this;
    }
}

class Input extends BaseFormItem{
    constructor(key,value) {
        super(key,value);
        this.type = FormItemName.Input;
    }
}

class CheckBox extends BaseFormItem {
    constructor(key,value) {
        super(key,!!value);
        this.type = FormItemName.CheckBox;
    }
}

class Radio extends BaseFormItem {
    constructor(key,value) {
        super(key,!!value);
        this.type = FormItemName.Radio;
    }
}

class Group extends BaseFormItem {
    constructor(key,value,type) {
        super(key,value);
        this.type = type;
        this.options = [];
    }
    addOption(fd) {
        this.options.push(fd);
        return this;
    }
}

class CheckBoxGrop extends Group {
    constructor(key,value) {
        super(key,value,FormItemName.CheckBox);
    }

    selectAll() {
        this.options.map(_ => {
            _.value = true;
            this.value.push(_.key);
        });
        return this;
    }

    selectNothing() {
        this.options.map(_ => {
            _.value = false;
        });
        this.value = [];
        return this;
    }

    /**
     * 用于避免设置错误
     * 这里是根据 option 中
     * 如果为 true 表示选中
     * 加入到 value 中
     */
    checkByOptions() {
        this.options.forEach(_ => {
            _.value ? this.value.push(_.value) : '';
        });
        return this;
    }
}
class RadioBoxGrop extends Group {
    constructor(key,value) {
        super(key,value,FormItemName.Radio);
    }
}

class Switch extends BaseFormItem {
    constructor(key,value) {
        super(key,!!value);
        this.type = FormItemName.Switch;
    }
}

class Options {
    constructor(key,value) {
        this.key = key;
        this.value = value;
    }
}
class Selection extends BaseFormItem {
    constructor(key,value) {
        if (!(value instanceof Array)) {
            value = [];
        }
        super(key,value);
        this.type = FormItemName.Selection;
        this.options = [];
    }

    addOption(opt) {
        checkTypes(opt,Options,true)
            .then(() => {
                this.options.push(opt);
            })
            .catch(_ => _());
        return this;
    }
}

module.exports = {
    Input,
    CheckBox,
    Radio,
    CheckBoxGrop,
    RadioBoxGrop,
    Switch,
    Selection
};
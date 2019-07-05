const {
    checkTypes
} = require('./smallUtils');

const FormItemName = {
    Input: 'input',
    Textarea: 'textarea',
    CheckBox: 'checkbox',
    Radio: 'radio',
    Switch: 'switch',
    Selection: 'Selection',
    Group: 'Group'
};

const objectType = {
    string: 'string',
    object: 'object',
    array: 'array',
    boolean: 'boolean',
    int: 'int',
    float: 'float',
};

class BaseFormItem {
    constructor(key,value) {
        this.key = key;
        this.value = value;
        this.tip = '';
        this.pic = '';
        this.moreTip = '';
        this.disable = false;
        this.objectType = objectType.string;
    }

    setTip(tip) {
        this.tip = tip;
        return this;
    }

    setPic(pic) {
        this.pic = pic;
        return this;
    }

    setValue(val) {
        this.value = val;
        return this;
    }

    setMoreTip(val) {
        this.moreTip = val;
        return this;
    }

    setDisable() {
        this.disable = true;
        return this;
    }

    setObjectType(type) {
        this.objectType = type;
        return this;
    }
}

class Input extends BaseFormItem{
    constructor(key,value) {
        super(key,value);
        this.type = FormItemName.Input;
    }
}

class Textarea extends BaseFormItem{
    constructor(key,value) {
        super(key,value);
        this.type = FormItemName.Textarea;
        this.setObjectType(objectType.string)
    }
}

class CheckBox extends BaseFormItem {
    constructor(key,value) {
        super(key,!!value);
        this.type = FormItemName.CheckBox;
        this.checkedTip = '是%否';
    }

    setCheckTip(tipTrue,tipFalse) {
        this.checkedTip = `${tipTrue}%${tipFalse}`;
        return this;
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
        this.type = type + FormItemName.Group;
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

    setValue(val) {
        super.setValue(val);
        this.options.forEach(_ => {
            if ((val.indexOf(_.key) + 1)) {
                _.value = true;
            } else {
                _.value = false;
            }
        });
    }
}
class RadioBoxGrop extends Group {
    constructor(key,value) {
        super(key,value,FormItemName.Radio);
    }

    selectNothing() {
        this.options.map(_ => {
            _.value = false;
        });
        this.value = '';
        return this;
    }

    selectFirst() {
        this.options.map(_ => {
            _.value = false;
        });
        this.options[0].value = true;
        this.value = this.options[0].key;
        return this;
    }

    setValue(val) {
        super.setValue(val);
        this.options.forEach(_ => {
            if (val === _.key) {
                _.value = true;
            } else {
                _.value = false;
            }
        });
    }
}

class Switch extends BaseFormItem {
    constructor(key,value) {
        super(key,!!value);
        this.type = FormItemName.Switch;
        this.checkedTip = '是%否';
        this.setObjectType(objectType.boolean)
    }

    setCheckTip(tipTrue,tipFalse) {
        this.checkedTip = `${tipTrue}%${tipFalse}`;
        return this;
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

    addOptionRaw(key,value) {
        this.options.push(new Options(key,value || key));
        return this;
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
    objectType,
    Input,
    Textarea,
    CheckBox,
    Radio,
    CheckBoxGrop,
    RadioBoxGrop,
    Switch,
    Selection,
    FormItemName,
};
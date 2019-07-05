const {
    FormItemName
} = require('./../../buildConfig/utils/FormItems');
import MyInput from './MyInput'
import MyTextarea from './MyTextarea'
import MySwitch from './MySwitch'
import MyRadioGroup from './MyRadioGroup'
import MyCheckBox from './MyCheckBox'
import MyCheckBoxGroup from './MyCheckBoxGroup'

window.String.prototype.UpperFirstChat = function () {
    let str = this;
    return str[0].toUpperCase() + str.substring(1);
};
export default {
    ["My" + FormItemName.Input.UpperFirstChat()]: MyInput,
    ["My" + FormItemName.Textarea.UpperFirstChat()]: MyTextarea,
    ["My" + FormItemName.Switch.UpperFirstChat()]: MySwitch,
    ["My" + FormItemName.Radio.UpperFirstChat() + FormItemName.Group]: MyRadioGroup,
    ["My" + FormItemName.CheckBox.UpperFirstChat()]: MyCheckBox,
    ["My" + FormItemName.CheckBox.UpperFirstChat() + FormItemName.Group]: MyCheckBoxGroup
}

// export default {
//     ["My" + FormItemName.Input]: MyInput,
//     ["My" + FormItemName.Switch]: MySwitch,
// }
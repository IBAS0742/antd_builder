const {
    Process
} = require('./utils/Step');
const {
    Input,
    Switch,
    RadioBoxGrop,
    Radio,
    CheckBox,
    CheckBoxGrop
} = require('./utils/FormItems');

let process = new Process();
process.addStep("Permission")
    .addConfig(
        new Switch("permission",true)
    );

let step2 = process.addStep("Layout")
    .addConfig(
        new RadioBoxGrop("Layout",'HeaderSC')
            .addOption(
                new Radio("HeaderSC",false)
                    .setTip("布局一")
                    .setPic("./src/img/layout/layout1.png")
            )
            .addOption(
                new Radio("SliderHCF",false)
                    .setTip("布局二")
                    .setPic("./src/img/layout/layout2.png")
            )
    );

let headerConponents = () => {
    return new CheckBoxGrop("header.components",[])
        .addOption(new CheckBox("MenuCollapsed",true).setTip("菜单折叠按钮"))
        .addOption(new CheckBox("UserMenu",true).setTip("用户信息"))
        .selectAll()
        .setTip("头部组件")
};

process.addStep("LayoutSetting")
    .setConfig(step2.config[0].value,step2.name + '.' + step2.config[0].key)
    .addConfigs(
        "HeaderSC",
        headerConponents(),
        new CheckBox('Breadcrumb',true).setTip("面包屑"),
        new Input('slider.width','300px').setTip("设置侧栏宽度")
    )
    .addConfigs(
        "SliderHCF",
        new CheckBox('Breadcrumb',true).setTip("面包屑"),
        new Input('slider.width','300px').setTip("设置侧栏宽度"),
        new Input('header.style.background','#40a9ff !important').setTip("头部背景颜色"),
        new Input('header.style.padding','0 12px 0 0').setTip("头部 padding"),
        headerConponents(),
        new Input('slider.width','300px').setTip("设置侧栏宽度"),
        new Input('slider.background','#fff').setTip("设置侧栏背景颜色"),
        new CheckBox('hasFoot',true).setTip("是否有foot部分"),
        new Input('footer.content','').setTip("foot 内容(html)"),
    );

process.addDefaultStep(process.defaultStep.addPage);

module.exports = process;

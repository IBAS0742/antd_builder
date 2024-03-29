const {
    Preview,
    Process
} = require('../utils/Step');
const {
    Input,
    Switch,
    RadioBoxGrop,
    Radio,
    CheckBox,
    CheckBoxGrop
} = require('../utils/FormItems');

let process = new Process();

process.addDefaultStep(process.defaultStep.addPage);
process.addStep("Permission")
    .addConfig(
        new Switch("permission",true).setTip("是否需要权限").setCheckTip("需要权限","不需要权限")
    );

let step2 = process.addStep("Layout")
    .addConfig(
        new RadioBoxGrop("Layout",'HeaderSC')
            .setTip("布局")
            .addOption(
                new Radio("HeaderSC",false)
                    .setTip("布局一")
                    //.setPic(require("./src/layout1.png"))
            )
            .addOption(
                new Radio("SliderHCF",false)
                    .setTip("布局二")
                    //.setPic(require("./src/layout2.jpg"))
            )
            .selectFirst()
    ).addPreviews([
        new Preview('HeaderSCPage',{
            layoutStyle: {
                height: '500px'
            }
        }),
        new Preview('SliderHcfPage',{
            layoutStyle: {
                height: '500px'
            }
        })
    ]);

let headerConponents = () => {
    return new CheckBoxGrop("header.components",[])
        .addOption(new CheckBox("MenuCollapsed",true).setTip("菜单折叠按钮"))
        .addOption(new CheckBox("UserMenu",true).setTip("用户信息"))
        .selectAll()
        .setTip("头部组件")
};

process.addStep("LayoutSetting")
    .setConfig('HeaderSC',step2.name + '.Layout')
    .addConfigs(
        "HeaderSC",
        headerConponents(),
        new CheckBox('Breadcrumb',true).setTip("面包屑").setCheckTip("有面包屑","无面包屑"),
        new Input('slider.width','300px').setTip("设置侧栏宽度")
    )
    .addConfigs(
        "SliderHCF",
        new CheckBox('Breadcrumb',true).setTip("面包屑").setCheckTip("有面包屑","无面包屑"),
        new Input('slider.width','300px').setTip("设置侧栏宽度"),
        new Input('header.style.background','#40a9ff !important').setTip("头部背景颜色"),
        new Input('header.style.padding','0 12px 0 0').setTip("头部 padding"),
        headerConponents(),
        new Input('slider.width','300px').setTip("设置侧栏宽度"),
        new Input('slider.background','#fff').setTip("设置侧栏背景颜色"),
        new CheckBox('hasFoot',true).setTip("是否有foot部分"),
        new Input('footer.content','').setTip("foot 内容(html)"),
    ).addPreviews([
        new Preview('HeaderSCPage',false,true,
        function(config) {
            let props = {};
            for (let i in config) {
                if (i.indexOf('.')) {
                    props[i.split('.').map((_,ind) => {
                        if (ind) {
                            return _[0].toUpperCase() + _.substring(1)
                        } else {
                            return _;
                        }
                    }).join('')] = config[i].value;
                } else {
                    props[i] = config[i].value;
                }
            }
            props.layoutStyle = {
                height: '500px'
            };
            // 获取props
            return props;
        },function (config,defaultVal) {
            // 获取组件名称
            if (defaultVal === 'HeaderSC') {
                return 'HeaderSCPage';
            } else {
                return 'SliderHcfPage';
            }
        })
    ]);


module.exports = process;

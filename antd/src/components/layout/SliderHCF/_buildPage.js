const fs = require('fs');
const path = require('path');

const tpl = `
<template>
    <slider-h-c-f :has-foot="hasFoot" :collapsed="collapsed" :header-style="headerStyle" :slider-width="sliderWidth" :slider-bg-color="sliderBackground">
        <div slot="header" class="header">
            <!--header-->
        </div>
        <template slot="logo">
            <h1>LOGO</h1>
        </template>
        <template slot="sider">
            <!--sider-->
        </template>
        <GeminiScrollbar slot="content" :style="{height: contentHeight}">
            <!--Breadcrumb-->
            <transition name="page-transition">
                <router-view/>
            </transition>
        </GeminiScrollbar>
        <tmplate slot="footer">
            <!--footer-->
        </tmplate>
    </slider-h-c-f>
</template>

<script>
    import SliderHCF from "./SliderHCF";
    import SMenu from "../../menu/SMenu";
    import UserMenu from "../../tools/UserMenu";
    import MenuCollapsed from "../../tools/menuCollapsed";
    import PageHeader from "../../tools/PageHeader";
    export default {
        name: "SliderHcfPage",
        components: {PageHeader, MenuCollapsed, UserMenu, SMenu, SliderHCF},
        data() {
            return {
                collapsed: false,
                headerStyle: {
                    /*headerStyle*/
                },
                sliderWidth: '$sliderWidth$',
                sliderBackground: '$sliderBackground$',
                contentHeight: '',
                hasFoot: $hasFoot$
            }
        },
        methods: {
            toggle() {
                this.collapsed = !this.collapsed;
            }
        },
        mounted() {
            let $this = this;
            window.onresize = function () {
                $this.contentHeight = (window.innerHeight - (this.hasFoot ? 112 : 64)) + 'px';
            };
            $this.contentHeight = (window.innerHeight - (this.hasFoot ? 112 : 64)) + 'px';
        }
    }
</script>

<style scoped>

    .page-transition-enter {
        opacity: 0;
    }

    .page-transition-leave-active {
        opacity: 0;
    }

    .page-transition-enter .page-transition-container,
    .page-transition-leave-active .page-transition-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>`;

let defaultSetting = [
    {
        "label": "Breadcrumb",
        "value": true,
        "type": "checkbox"
    },
    {
        "label": "hasFoot",
        "value": false,
        "type": "checkbox"
    },
    {
        "label": "header.components",
        "value": [
            "UserMenu",
            "MenuCollapsed"
        ],
        "type": "checkbox",
        "options": [
            {
                "value": "MenuCollapsed",
                "label": "<MenuCollapsed :collapsed=\"collapsed\" @toggle=\"toggle\"></MenuCollapsed>"
            },
            {
                "value": "UserMenu",
                "label": "<UserMenu></UserMenu>"
            }
        ]
    },
    {
        "label": "slider.comp",
        "value": "<SMenu :menu=\"$router.options.routes\" theme=\"light\"></SMenu>",
        "type": "input"
    },
    {
        "label": "header.style.background",
        "value": "#40a9ff !important",
        "type": "input"
    },
    {
        "label": "header.style.padding",
        "value": "0 12px 0 0",
        "type": "input"
    },
    {
        "label": "slider.style.width",
        "value": "300px",
        "type": "input"
    },
    {
        "label": "slider.style.background",
        "value": "#fff",
        "type": "input"
    },
    {
        "label": "footer.content",
        "value": "",
        "type": "input"
    }
];

let headerComponents = (tpl,obj) => {
    return tpl.replace('<!--header-->',() => {
        if (obj.value.length) {
            return obj.options.filter(_ => (obj.value.indexOf(_.value) + 1)).map(_ => _.label).join('\n\t\t\t');
        } else {
            return '';
        }
    });
};

let siderComponents = (tpl,obj) => {
    return tpl.replace('<!--sider-->',obj.value);
};

let headerStyles = (tpl,obj) => {
    return tpl.replace('/*headerStyle*/',obj.map(_ => {
        return `'${_.label.split('header.style.')[1]}' : '${_.value}'`;
    }).join(',\n\t\t\t\t\t'));
};

let sliderWidth = (tpl,obj) => {
    return tpl.replace('$sliderWidth$',obj.value);
};

let Breadcrumb = (tpl,obj) => {
    return tpl.replace('<!--Breadcrumb-->',obj.value ? '<PageHeader></PageHeader>' : '');
};

let sliderBackground = (tpl,obj) => {
    return tpl.replace('$sliderBackground$',obj.value);
};

let footerContent = (tpl,obj) => {
    return tpl.replace('<!--footer-->',obj.value);
};

module.exports = (setting,parPath) => {
    let tpl_cp = tpl;
    let headerStyle = [];
    parPath = parPath || './';
    setting = setting || defaultSetting;
    setting.forEach(_ => {
        if (_.label === "header.components") {
            tpl_cp = headerComponents(tpl_cp,_);
        } else if (_.label === "slider.comp") {
            tpl_cp = siderComponents(tpl_cp, _);
        } else if (_.label === 'footer.content') {
            tpl_cp = footerContent(tpl_cp,_);
        } else if (_.label === 'slider.style.width') {
            tpl_cp = sliderWidth(tpl_cp,_);
        } else if (_.label === 'slider.style.background') {
            tpl_cp = sliderBackground(tpl_cp,_);
        } else if (_.label.substring(0,'header.style.'.length) === "header.style.") {
            headerStyle.push(_);
        } else if (_.label === 'Breadcrumb') {
            tpl_cp = Breadcrumb(tpl_cp,_);
        } else if (_.label === 'hasFoot') {
            tpl_cp = tpl_cp.replace('$hasFoot$',_.value);
        }
    });
    tpl_cp = headerStyles(tpl_cp,headerStyle);
    fs.writeFileSync(path.join(parPath,'SliderHcfPage.vue'),`<noscript>${(new Date).toGMTString()}</noscript>` + tpl_cp);
};
const fs = require('fs');
const path = require('path');

const tpl = `
<template>
    <header-s-c :collapsed="collapsed" $#$
        <div slot="header">
            <!--header-->
        </div>
        <template slot="sider">
            <!--sider-->
        </template>
        <GeminiScrollbar slot="content" :style="{height: contentHeight}">
            <!--Breadcrumb-->
            <transition name="page-transition">
                <router-view/>
            </transition>
        </GeminiScrollbar>
    </header-s-c>
</template>

<script>
    import HeaderSC from "./HeaderSC";
    import SMenu from "../../menu/SMenu";
    import UserMenu from "../../tools/UserMenu";
    import MenuCollapsed from "../../tools/menuCollapsed";
    import PageHeader from "../../tools/PageHeader";
    export default {
        name: "HeaderSCPage",
        components: {PageHeader, MenuCollapsed, UserMenu, SMenu, HeaderSC},
        data() {
            return {
                collapsed: false,
                contentHeight: ''
            }
        },
        methods: {
            toggle() {
                this.collapsed = !this.collapsed;
            }
        },
        mounted() {
            window.$page = this;
            let $this = this;
            window.onresize = function () {
                $this.contentHeight = (window.innerHeight - 64) + 'px';
            };
            $this.contentHeight = (window.innerHeight - 64) + 'px';
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
</style>
`;

let defaultSetting = [
    {
        "label": "Breadcrumb",
        "value": true,
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
        "label": "sider.width",
        "value": "300px",
        "type": "input"
    },
    {
        "label": "sider.comp",
        "value": "<SMenu :menu=\"$router.options.routes\" theme=\"light\"></SMenu>",
        "type": "input"
    }
];

let Breadcrumb = (tpl,obj) => {
    return tpl.replace('<!--Breadcrumb-->',obj.value ? '<PageHeader></PageHeader>' : '');
};

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

let siderWidth = (tpl,obj) => {
    return tpl.replace('$#$',`silderWidth="${obj.value}">`);
};

module.exports = (setting,parPath) => {
    let tpl_cp = tpl;
    parPath = parPath || './';
    setting = setting || defaultSetting;
    setting.forEach(_ => {
        if (_.label === "header.components") {
            tpl_cp = headerComponents(tpl_cp,_);
        } else if (_.label === "sider.comp") {
            tpl_cp = siderComponents(tpl_cp,_);
        } else if (_.label === "sider.width") {
            tpl_cp = siderWidth(tpl_cp,_);
        } else if (_.label === 'Breadcrumb') {
            tpl_cp = Breadcrumb(tpl_cp,_);
        }
    });
    fs.writeFileSync(path.join(parPath,'HeaderScPage.vue'),`<noscript>${(new Date).toGMTString()}</noscript>` + tpl_cp);
};
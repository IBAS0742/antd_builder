class ComponentSetting {
    constructor(name) {
        this.name = name;
        this.packages = [];
        this.dep = [];
        this.formItems = [];
        this.keyVal = {};
        this.keyInd = {};
        this.keyType = {};
        this.templateName = '';
        this.import = [];
        this.events = [];
        // 用于构建模板和修改数据及方法的 特定文件
        // ( module.exports = ({eventBind,params}) => { return { eventBind,params,template } })
        this.buildEPT = false;
    }

    setBuildEPT(ept) {
        this.buildEPT = ept;
        return this;
    }

    addPackages(pks) {
        pks = (pks instanceof Array) ? pks : [pks];
        this.packages = this.packages.concat(pks);
        return this;
    }

    addDep(dep) {
        dep = (dep instanceof Array) ? dep : [dep];
        this.dep = this.dep.concat(dep);
        return this;
    }

    addFormItems(fis) {
        fis = (fis instanceof Array) ? fis : [fis];
        this.formItems = this.formItems.concat(fis);
        return this;
    }

    makeKeyVal(obj) {
        if (obj === undefined) {
            this.formItems.forEach((_,ind) => {
                this.keyInd[_.key] = ind;
                this.keyVal[_.key] = _.value;
                this.keyType[_.key] = _.objectType;
            });
        } else {
            for (let i in obj) {
                if (i in this.keyVal) {
                    this.formItems[this.keyInd[i]].value = obj[i];
                    this.keyVal[i] = obj[i];
                }
            }
        }
        return this;
    }

    setTemplateName(tpl) {
        this.templateName = tpl;
        return this;
    }

    /**
     * 相对于 src 目录下的资源
     * 默认   - 以 .vue 结尾表示引入组件
     *        - 包含 : 表示 组件位置:组件名称 /component/temp/a.js:MyComp
     *        - 以 .js 结尾表示工具类的脚本，仅引入
     * */
    setImport(ipr) {
        this.import = ipr instanceof Array ? ipr : [ipr];
        return this;
    }

    addEvent(event) {
        (event instanceof Array ? event : [event]).forEach(_ => {
            !this.events.includes(_) ? this.events.push(_) : true;
        });
        return this;
    }
}

module.exports = ComponentSetting;
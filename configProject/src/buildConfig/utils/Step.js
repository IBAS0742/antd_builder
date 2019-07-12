/**
 * 描述步骤
 * */

// const {
//     checkTypes
// } = require('./smallUtils');
//
// const executeCache = _ => _();

const defaultStep = {
    addPage: '_addPage'
};

class Preview {
    /**
     *
     * @param componentsName        组件名（即标签名）<componentsName></componentsName>
     * @param props                 props <componentsName v-bind="props"></componentsName>  这是一个对象
     * @param userDefaultProps      这个是使用用户默认props，如果该值不是 Yes 表示自定义props
     * @param dearProps             这个 dearProps 是一个函数 (something,def) => {}
     *                               这个函数有两个参数，是因为兼容了前面的语法所以才这样粗糙，
     *                               其实这里仅仅只有一个参数 something
     * @param getComponentName      这个也是一个函数 说明同 dearProps
     */
    constructor(componentsName,props,userDefaultProps,dearProps,getComponentName) {
        this.componentsName = componentsName;
        this.props = props;
        this.userDefaultProps = userDefaultProps || 'Yes';
        this.dearProps = dearProps || (_ => _);
        this.deafComponentName = getComponentName || (_ => _).bind(null,this.componentsName);
        this.rebuildMethod = null;
    }

    /**
     * 获取一个组件名
     * @param something     这里值得注意，他相当于 singleStep 中的 config 部分
     * @param defaultVal    这里是当有多组件限定时，呃，就是 layout 布局中需要不同布局进入到下一步
     *                      而选定的是什么布局就是这里的 defaultVal，这部分相当重要
     * @return {*}
     */
    getComponentName(something,defaultVal) {
        if (this.userDefaultProps === 'Yes') {
            return this.componentsName;
        } else {
            return this.deafComponentName.bind(this)(something,defaultVal);
        }
    }

    /** 解释同上 **/
    getProps(something,defaultVal) {
        if (this.userDefaultProps === 'Yes') {
            return this.props;
        } else {
            return this.dearProps.bind(this)(something,defaultVal);
        }
    }

    setRebuildMethod(name) {
        this.rebuildMethod = name;
        return this;
    }
}

class Step {
    constructor(name) {
        this.name = name;
        this.config = {};
        this.configs = {};
        this.configsDefaultVal = ''; //'stepName.key -> value';
        this.configsBaseOn = ''; //'stepName.key';
        this.multi = false;
        this.previews = [];
    }

    addConfig() {
        Array.prototype.slice.call(arguments).forEach(_ => this.config[_.key] = _);
        return this;
    }

    setConfig(defVal,baseOn) {
        this.multi = true;
        this.configsDefaultVal = defVal;
        this.configsBaseOn = baseOn;
        return this;
    }

    addConfigs(name) {
        this.multi = true;
        this.configs[name] = {};
        Array.prototype.slice.call(arguments).filter((_,ind) => ind).map(_ => {
            this.configs[name][_.key] = _;
        });
        return this;
    }

    addPreviews(p) {
        this.previews = this.previews.concat(p instanceof Array ? p : [p]);
        return this;
    }
}

class Process {
    constructor(steps) {
        this.steps = steps || {};
        this.defaultStep = defaultStep;
        this.stepList = [];
    }

    addStep(name) {
        let step = new Step(name);
        this.stepList.push(name);
        // this.steps.push(step);
        this.steps[name] = step;
        return step;
    }

    addDefaultStep(defaultStep) {
        return this.addStep(defaultStep);
    }

    toString() {
        return JSON.stringify(this.steps,'','\t');
    }
}

module.exports = {
    Preview,
    Step,
    Process,
};
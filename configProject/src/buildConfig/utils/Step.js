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
    constructor(componentsName,props,userDefaultProps,dearProps,getComponentName) {
        this.componentsName = componentsName;
        this.props = props;
        this.userDefaultProps = userDefaultProps || true;
        this.dearProps = dearProps || (_ => _);
        this.deafComponentName = getComponentName || (_ => _).bind(null,this.componentsName);
    }

    getComponentName(something) {
        if (this.userDefaultProps) {
            return this.componentsName;
        } else {
            return this.deafComponentName(something);
        }
    }

    getProps(something) {
        if (this.userDefaultProps) {
            return this.props;
        } else {
            return this.dearProps(something);
        }
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
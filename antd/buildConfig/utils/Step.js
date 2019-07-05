/**
 * 描述步骤
 * */
// const {
//     checkTypes
// } = require('./smallUtils');
//
// const executeCache = _ => _();

class Step {
    constructor(name) {
        this.name = name;
        this.config = [];
        this.configs = {};
        this.configsDefaultVal = 'stepName.key -> value';
        this.configsBaseOn = 'stepName.key';
    }

    addConfig() {
        Array.prototype.slice.call(arguments).forEach(_ => this.config.push(_));
        return this;
    }

    setConfig(defVal,baseOn) {
        this.configsDefaultVal = defVal;
        this.configsBaseOn = baseOn;
        return this;
    }

    addConfigs(name) {
        let conf = Array.prototype.slice.call(arguments).filter((_,ind) => ind);
        if (conf.length) {
            this.configs[name] = conf;
        }
        return this;
    }
}

class Process {
    constructor(steps) {
        this.steps = steps || [];
        this.defaultStep = {
            addPage: '_addPage'
        };
    }

    addStep(name) {
        let step = new Step(name);
        this.steps.push(step);
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
    Step,
    Process
};
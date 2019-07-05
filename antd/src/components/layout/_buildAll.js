const fs = require('fs');
const path = require('path');

let SliderHCF = require('./SliderHCF/_buildPage');
let HeaderSC = require('./HeaderSC/_buildPage');
// let config = require('../../_config');

let buildPage = {
    SliderHCF,
    HeaderSC
};

let indexJs = layoutName => {
    return `
import RouteView from './RouteView/RouteView'
import ${layoutName}Page from './${layoutName}/${layoutName}Page'

export {
    RouteView,
    ${layoutName}Page as defaultLayout
}
`;
};

module.exports = (config,parPath) => {
    parPath = parPath || './';
    buildPage[config.layout](config.layoutSetting,path.join(parPath,config.layout));
    fs.writeFileSync(path.join(parPath,"index.js"),indexJs(config.layout));
};

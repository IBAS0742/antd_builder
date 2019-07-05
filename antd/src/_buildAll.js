let config = require('./_config');
// let layoutBuild = require('./components/layout/_buildAll');
let buildPages = require('./_buildPages');

// layoutBuild(config,'./components/layout');
buildPages(config._addPage);

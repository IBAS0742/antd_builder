const objectTypeDear = {
    string: _ => _ + '',
    object: _ => {
        if (typeof _ === 'object') {
            return _;
        } else {
            if (_ === '') {
                return ''
            } else {
                return JSON.parse(_);
            }
        }
    },
    array: _ => {
        if (_ instanceof Array) {
            return _;
        } else {
            _ = _.trim();
            if (_ === '' || _ === '[]' || _ === '[ ]') {
                return '';
            } else {
                return JSON.parse(_);
            }
        }
    },
    boolean: _ => {
        if (typeof _ === 'boolean') {
            return _;
        } else {
            return !!_;
        }
    },
    int: _ => {
        if (typeof _ === 'number') {
            return _;
        } else {
            return parseInt(_)
        }
    },
    float: _ => {
        if (typeof _ === 'number') {
            return _;
        } else {
            return parseFloat(_)
        }
    }
};

const rootPath = 'views_bak';
const fs = require('fs');
const Path = require('path');
const beautifyVue = require('./_beautifyVue');

class PackageAndDep {
    constructor() {
        this.packages = [];
        this.deps = [];
    }

    addPackages(packages) {
        (packages instanceof Array ? packages : [packages]).forEach(pkg => {
            !this.packages.includes(pkg) ? this.packages.push(pkg) : true;
        });
    }

    addDeps(deps) {
        (deps instanceof Array ? deps : [deps]).forEach(dep => {
            !this.deps.includes(dep) ? this.deps.push(dep) : true;
        });
    }
}
class PageClass {
    constructor(folderPath,pagePath) {
        this.folderPath = folderPath;
        this.pagePath = pagePath;
        this.template = "";
        this.import = [];
        this.tpl = [];
        this.components = [];
        this.data = {};
        this.events = [];
        this.eventTemplate = '() { console.log(arguments); },';
        this.more = '';
    }

    setTemplate(tpl) {
        this.template = tpl || `<template>
            $tpl$
            </template>
            <script>
            $import$
            
            $more$
            export default {
                components: { $components$ },
                data() {
                    return $data$
                },
                methods: {
                    $methods$
                }
            }
            </script>`;
        return this;
    }

    addImport(ipr) {
        let pathDeep = Path.relative(this.folderPath,process.cwd());
        if (Path.sep === '\\') {
            pathDeep.replace(Path.sep,'/');
        }
        (ipr instanceof Array ? ipr : [ipr]).forEach(_ => {
            let importStr = Path.join(pathDeep,_).replace(/\\/g,'/');
            if (_.indexOf('.vue') + 1) {
                let __ = _.split('/');
                let importName = __[__.length - 1].split('.')[0];
                this.components.push(importName);
                this.import.push(`import ${importName} from "${importStr}"`);
            } else if (_.indexOf(':') + 1) {
                let vipr = _.split(':');
                this.components.push(vipr[1]);
                this.import.push(`import ${vipr[1]} from "${importStr.split(':')[0]}"`);
            } else {
                this.import.push(`import ${importStr}`);
            }
        });
    }

    // page.info.components[0]
    // buildEPT 是对 eventBind
    addData({
        objectType,
        params,
        templateName,
        events,
        buildEPT
    },ind) {
        let dataName = templateName + ind;
        let eventBind = [];
        let paramStr = [];
        (events instanceof Array ? events : [events]).forEach(ev => {
            eventBind.push([
                ev,
                templateName + ind + ev
            ])
        });
        for (let i in params) {
            params[i] = objectTypeDear[objectType[i]](params[i]);
            if (!params[i]) {
                delete params[i];
            } else {
                paramStr.push(`:${i}="${dataName}['${i}']"`)
            }
        }
        eventBind = eventBind.map(_ => _[1]);
        if (buildEPT) {
            let _buildEPT = require(Path.join(process.cwd(),'../_sources/',buildEPT));
            let obj = _buildEPT({eventBind,params,paramStr,dataName});
            eventBind = obj.eventBind;
            this.data[dataName] = obj.params;
            this.tpl.push(obj.template);
            this.more = obj.more;
        } else {
            this.tpl.push(`<${templateName} ${paramStr.join(' ')} ${eventBind.map(_ => `@${_[0]}="${_[1]}"`).join(' ')}> </${templateName}>`);
            this.data[dataName] = params;
        }
        return this.addEvents(eventBind);
    }

    /**
     * @param events
     * @example addEvents("test")
     * @example addEvents(["test"])
     * @example addEvents([["test","() {  }"]])
     * @example addEvents(["test","() {} "]) --> invalid
     * */
    addEvents(events) {
        events = (events instanceof Array ? events : [events]);
        this.events = this.events.concat(events.map(_ => {
            if (_ instanceof Array) {
                return _[0] + _[1];
            } else {
                return _ + this.eventTemplate
            }
        }));
        return this;
    }

    buildPage() {
        let template = this.template;
        if (this.tpl.length > 1) {
            template = this.template.replace('$tpl$','<div>$tpl$</div>')
        }
        template = template.replace('$tpl$',this.tpl.join('\n') || '<div></div>');
        template = template.replace('$import$',this.import.join('\n'));
        template = template.replace('$components$',this.components.join(','));
        template = template.replace('$data$',((data) => {
            let dataStr = "{\n";
            for (let i in data) {
                if (typeof data[i] === 'string') {
                    dataStr += '"' + i + '"' + ' : ' + data[i] + ','
                } else {
                    dataStr += '"' + i + '"' + ':' + JSON.stringify(data[i],'','\t');
                }
            }
            return dataStr + '}'
        })(this.data));
        template = template.replace('$methods$',this.events.join(',\n'));
        template = template.replace('$more$',this.more);
        this.writeToFile(template);
    }

    writeToFile(tpl) {
        fs.writeFileSync(this.pagePath,beautifyVue(tpl,true,4,true));
    }
}
const unlinkFolderSync = (path) => {
    let deleteFolder = function(path) {
        let files = [];
        if( fs.existsSync(path) ) {
            files = fs.readdirSync(path);
            files.forEach(function(file){
                let curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse
                    deleteFolder(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
    if (fs.existsSync(path)) {
        deleteFolder(path);
    }
};
const checkDirExist = (filePath) => {
    let root = process.cwd();
    if (filePath.indexOf(Path.sep) + 1) {
        filePath = filePath.split(Path.sep);
    } else {
        if (Path.sep === '/') {
            filePath = filePath.split("\\");
        } else {
            filePath = filePath.split("/");
        }
    }
    filePath.pop();
    for (let i = 0;i < filePath.length;i++) {
        root = Path.join(root,filePath[i]);
        if (!fs.existsSync(root)) {
            fs.mkdirSync(root);
        }
    }
};

const dearFolder = (folder,path,pad) => {
    let dirPath = Path.join(path,folder.FolderName);

    unlinkFolderSync(dirPath);
    fs.mkdirSync(dirPath);
    folder.pages.forEach(page => dearPage(page,dirPath,pad));
    folder.folder.forEach(fo => dearFolder(fo,dirPath,pad));
};

const dearPage = (page,path,pad) => {
    let pagePath = Path.join(path,page.pageName + '.vue');
    let pc = new PageClass(path,pagePath).setTemplate();
    unlinkFolderSync(pagePath);
    page.info.components.forEach((_,ind) => {
        pad.addPackages(_.packages);
        pad.addDeps(_.dep);
        pc.addImport(_.import);
        pc.addData(_,ind);
    });
    pc.buildPage();
};

module.exports = (config) => {
    let pad = new PackageAndDep();
    config.FolderName = Path.join(process.cwd(),rootPath);
    dearFolder(config,'',pad);
    pad.deps.forEach(depPath => {
        let src = Path.join(process.cwd(),'../_sources/',depPath);
        let dest = Path.join(process.cwd(),depPath);
        checkDirExist(depPath);
        fs.copyFileSync(src,dest);
    });
};
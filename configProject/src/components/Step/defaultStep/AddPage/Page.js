export class Info {
    constructor(pageName,router) {
        this.pageName = pageName;
        this.components = [];
        this.router = router || '';
    }

    setRouter(router) {
        this.router = router;
        return this;
    }

    toString() {
        return {
            pageName: this.pageName,
            router: this.router,
            components: this.components.map(_ => {
                return {
                    params: _.comp.makeKeyVal().keyVal,
                    name: _.name,
                    dep: _.comp.dep,
                    packages: _.comp.packages,
                    objectType: _.comp.keyType,
                    templateName: _.comp.templateName,
                    import: _.comp.import,
                    events: _.comp.events,
                    buildEPT: _.comp.buildEPT
                }
            })
        }
    }

    // "info": {
    //     "pageName": "f1-x1",
    //     "components": [
    //         {
    //             "params": {
    //                 "url": "",
    //                 "params": "{\"styles\":\"xxx\",\"format\":\"image/png\",\"VERSION\":\"1.1.1\",\"layers\":\"xxx\",\"transparent\":true}",
    //                 "center": "",
    //                 "zoom": "5",
    //                 "attribution": "@ Your Company",
    //                 "baseMap": "",
    //                 "colorMap": "",
    //                 "controls": "[]"
    //             },
    //             "name": "BaseLeaflet1"
    //         }
    //         ]
    // }
    set(obj,components) {
        this.pageName = obj.pageName;
        this.router = obj.router;
        obj.components.forEach(comp => {
            if (comp.name in components) {
                let p = components[comp.name]();
                p.makeKeyVal(comp.params);
                this.components.push({
                    name: comp.name,
                    comp: p
                });
            }
        });
    }
}

export class Page {
    constructor(pageName,folder) {
        this.type = "page";
        this.folder = folder || null;
        this.pageName = pageName;
        this.indStr = '';
        this.ind = 0;
        this.id = 'page_' + (new Date).getTime() + Math.random();
        this.info = new Info(pageName,((page) => {
            let router = [page.pageName];
            let f = page.folder;
            while (f) {
                router.push(f.FolderName);
                f = f.parentFolder;
            }
            router.pop();
            return router.reverse().join('/');
        })(this));
    }

    setLevelInd(indStr,ind) {
        this.indStr = indStr;
        this.ind = ind;
        return this;
    }

    getFolder() {
        return this.folder;
    }

    getIndex() {
        return `${this.type}-${this.indStr}-${this.ind}`;
    }

    deleteSelf() {
        this.folder.deleteTag(this.id,this.type);
    }

    toString() {
        return {
            pageName: this.pageName,
            info: this.info.toString()
        }
    }

    // {
    //     "pageName": "hi",
    //     "info": {
    //         "pageName": "hi",
    //         "components": []
    //     }
    // }
    set(obj,compoonents) {
        this.info.set(obj.info,compoonents || {});
    }
}

export class Folder {
    constructor(FolderName,parentFolder) {
        this.type = "folder";
        this.FolderName = FolderName;
        this.pages = [];
        this.folders = [];
        this.parentFolder = parentFolder || null;
        this.ind = 0;
        this.indStr = '';
        this.id = 'page_' + (new Date).getTime() + Math.random();
        this.components = {};
    }

    clearAll() {
        this.pages.splice(0,this.pages.length);
        this.folders.splice(0,this.folders.length);
        return this;
    }

    setLevelInd(indStr,ind) {
        this.indStr = indStr;
        this.ind = ind;
        return this;
    }

    addPage(pageName) {
        this.pages.push(new Page(pageName,this).setLevelInd((this.indStr ? this.indStr + '-' : '') + this.ind,this.pages.length));
        return this;
    }

    addPageObj(page) {
        this.pages.push(page.setLevelInd((this.indStr ? this.indStr + '-' : '') + this.ind,this.pages.length));
        return this;
    }

    addFolder(FolderName) {
        this.folders.push(new Folder(FolderName,this)
            .setLevelInd((this.indStr ? this.indStr + '-' : '') + this.ind,this.folders.length));
        return this;
    }

    /**
     * @param FolderObj
     * @param retFolder 是否将对象返回
     * */
    addFolderObj(FolderObj,retFolder) {
        this.folders.push(FolderObj.setLevelInd((this.indStr ? this.indStr + '-' : '') + this.ind,this.folders.length));
        return retFolder ? FolderObj : this;
    }

    /**
     * @param index 数组索引
     * */
    removePage(index) {
        this.pages.splice(index,1);
        return this;
    }

    getLastFolder() {
        if (this.folders.length) {
            return this.folders[this.folders.length - 1];
        } else {
            return null;
        }
    }

    getLastPage() {
        if (this.pages.length) {
            return this.pages[this.pages.length - 1];
        } else {
            return null;
        }
    }

    getParentFolder() {
        return this.parentFolder;
    }

    getIndex() {
        return `${this.type}-${this.indStr ? this.indStr + '-' : ''}${this.ind}`;
    }

    getPageOrFolderByNode(tag) {
        let $cur = this;
        let tags = tag.split('-').map((_,ind) => {
            return (ind) ? parseInt(_) : _;
        });
        let type = tags.shift();
        tags.shift();
        if (type === this.type) {
            // 找文件夹
            tags.forEach(_ => {
                $cur = $cur.folders[_];
            });
            return $cur;
        } else {
            // 找文件
            for (let i = 0;i < tags.length - 1;i++) {
                $cur = $cur.folders[tags[i]];
            }
            return $cur.pages[tags[tags.length - 1]];
        }
    }

    deleteSelf() {
        if (this.parentFolder) {
            this.parentFolder.deleteTag(this.id,this.type);
        } else {
            alert('canNotDelete');
            return false;
        }
    }

    deleteTag(id,type) {
        let ind = 0;
        type = (type || 'Folder').toLowerCase() + 's';
        for (;ind < this[type].length;ind++) {
            if (this[type][ind].id === id) {
                break;
            }
        }
        if (ind < this[type].length) {
            this[type].splice(ind,1);
        }
    }

    toString() {
        return {
            FolderName: this.FolderName,
            pages: this.pages.map(_ => _.toString()),
            folder: this.folders.map(_ => _.toString())
        }
    }

    set(obj,components) {
        this.FolderName = obj.FolderName;
        obj.pages.forEach(page => {
            let p = new Page(page.pageName);
            this.addPageObj(p);
            p.set(page,components || this.components);
        });
        obj.folder.forEach(folder => {
            let f = new Folder(folder.name);
            this.addFolderObj(f,true)
                .set(folder,components || this.components);
        });
    }
}
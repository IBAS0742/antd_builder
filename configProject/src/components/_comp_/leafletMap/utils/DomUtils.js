
HTMLElement.prototype.clearChild = function () {
    let len = this.childNodes.length - 1;
    for (let i = len;i >= 0;i--) {
        this.removeChild(this.childNodes[i]);
    }
    return this;
};

/**
 * options
 * */
HTMLElement.prototype.addChild = function (tagName,id,style,options) {
    let tag = document.createElement(tagName);
    tag.id = id;
    for (let i in style) {
        tag.style[i] = style[i];
    }
    if (options) {
        if ('innerText' in options) {
            tag.innerText = options.innerText;
        }
    }
    this.appendChild(tag);
    return this;
};

// String.prototype.startWith=function(str){
//     let reg=new RegExp("^"+str);
//     return reg.test(this);
// }
//测试ok，直接使用str.endWith("abc")方式调用即可
// String.prototype.endWith=function(str){
//     let reg=new RegExp(str+"$");
//     return reg.test(this);
// }

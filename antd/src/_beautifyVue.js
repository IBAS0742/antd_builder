/* eslint-disable no-console */
let beautify = require('js-beautify');

/**
 * beautify html/js/css
 * @param {string} text the source code
 * @param {boolean} [isTabIndent=false] indent with tab? default: false
 * @param {number} [indentSize=2] indent size, default: 2
 * @param isRootIndent
 * @return {string} beautify the code
 */
module.exports = function (text, isTabIndent, indentSize, isRootIndent) {

    if (isTabIndent === undefined) {
        isTabIndent = false;
    }
    if (indentSize === undefined) {
        indentSize = 2;
    }

    // options
    let options = {
        indentSize: indentSize,
        isTabIndent: isTabIndent
    };

    // find template
    text = text.replace(/([ \t]*<template[\s\S]*?>)([\s\S]*?)([ \t]*<\/template>[ \t]*)/g, function (match, tagStart, code, tagEnd) {
        tagStart = beautifyTagStart(tagStart);
        tagEnd = beautifyTagEnd(tagEnd);
        let lang = getLang(tagStart);
        lang = lang ? lang.toLowerCase() : 'html';

        if (lang === 'pug' || lang === 'jade') {
            return tagStart + code + tagEnd;
        }

        // beautify code
        code = beautifyHtml(code, options);

        // is root tag indent
        if (isRootIndent) {
            code = rootTagIndent(code, options);
        }

        return tagStart + '\n' + code + '\n' + tagEnd;
    });

    // find script
    text = text.replace(/([ \t]*<script[\s\S]*?>)([\s\S]*?)([ \t]*<\/script>[ \t]*)/g, function (match, tagStart, code, tagEnd) {
        tagStart = beautifyTagStart(tagStart);
        tagEnd = beautifyTagEnd(tagEnd);

        // beautify code
        code = beautifyJs(code, options);

        // is root tag indent
        if (isRootIndent) {
            code = rootTagIndent(code, options);
        }

        return tagStart + '\n' + code + '\n' + tagEnd;

    });

    // find style
    text = text.replace(/([ \t]*<style[\s\S]*?>)([\s\S]*?)([ \t]*<\/style>[ \t]*)/g, function (match, tagStart, code, tagEnd) {
        tagStart = beautifyTagStart(tagStart);
        tagEnd = beautifyTagEnd(tagEnd);
        let lang = getLang(tagStart);
        lang = lang ? lang.toLowerCase() : 'css';

        // not beautify stylus
        if (lang === 'stylus' || lang === 'sass') {
            return tagStart + code + tagEnd;
        }

        // beautify code
        code = beautifyCss(code, options);

        // is root tag indent
        if (isRootIndent) {
            code = rootTagIndent(code, options);
        }

        return tagStart + '\n' + code + '\n' + tagEnd;
    });

    return text
    // add new line on vue root end tags
        .replace(/(<\/template>|<\/script>|<\/style>)[ \t]*[\r\n]?</g, '$1\n\n<');
};

// beautify tagStart
function beautifyTagStart(str) {
    return str
    // remove any enpty lines at the top
        .replace(/^\s*/, '')
        // make template tag in a single line
        .replace(/\s+/g, ' ')
        // remove blank before '>'
        .replace(/\s*>$/, '>');

}

// beautify tagEnd
function beautifyTagEnd(str) {
    return str
    // remove blank
        .replace(/\s*/g, '');

}

// get lang
function getLang(str) {
    // get all lang attributes
    let langs = str.match(/lang=(['"])(\w+)\1/g);
    let lang = undefined;
    if (langs !== null) {
        lang = langs[langs.length - 1];
        lang = lang.replace(/lang=(['"])(\w+)\1/, '$2');
    }
    return lang;

}

// beautify template
function beautifyHtml(str, options) {
    return beautify.html(str, {
        indent_char: ' ',
        indent_size: options.indentSize,
        indent_with_tabs: options.isTabIndent
    });
}

// function beautifyHtml_file(str, options) {
//     options = {};
//     return str
//     // Remove any empty lines at the top of a file.
//         .replace(/^\s*/g, '')
//         // Normalize and condense all newlines
//         // .replace(/(\r\n|\n){2,}/g, '\n')
//         // fix multiline, Bootstrap-style comments
//         .replace(/(\s*)(<!--.+)\s*(===.+)/g, '$1$2$1$3')
//         // make <li><a></li> on one line, but only when li > a
//         .replace(/(<li>)(\s*)(<a .+)(\s*)(<\/li>)/g, '$1 $3 $5')
//         // make <a><span></a> on one line, but only when a > span
//         .replace(/(<a.+)(\s*)(<span .+)(\s*)(<\/a>)/g, '$1 $3 $5')
//         // Adjust spacing for button > span
//         .replace(/(<button.+)(<span.+)(\s*)(<\/button>)/g, '$1$3  $2$3$4')
//         // Adjust spacing for span > input
//         .replace(/(\s*)(<span.+)(\s*)(<input.+)(\s*)(<\/span>)/g, '$1$2$1  $4$1$6')
//         // Add a newline for tags nested inside <h1-6>
//         .replace(/(\s*)(<h[0-6](?:.+)?>)(.*)(<(?:small|span|strong|em)(?:.+)?)(\s*)(<\/h[0-6]>)/g, '$1$2$3$1  $4$1$6')
//         // Add a space above each comment
//         .replace(/(\s*<!--)/g, '\n$1')
//         // Fix conditional comments
//         .replace(/( *)(<!--\[.+)(\s*)(.+\s*)?(.+\s*)?(<!\[endif\]-->)/g, '$1$2\n  $1$4$1$5$1$6')
//         // Bring closing comments up to the same line as closing tag.
//         .replace(/\s*(<!--\s*\/.+)/g, '$1')
//         // Add a space after some inline elements, since prettifying strips them sometimes
//         .replace(/(<\/(a|small|span|strong|em)>(?:(?!,)))/g, '$1 ');
// }

// beautify template
// function beautifyPug(str, options) {
//     try {
//         str = pugBeautify(str, {
//             fill_tab: options.isTabIndent,
//             omit_div: false,
//             tab_size: options.indentSize
//         });
//     } catch (e) {
//         console.warn(e);
//     }
//     return str;
//
// }

// beautify script
function beautifyJs(str, options) {
    return beautify(str, {
        indent_char: ' ',
        indent_size: options.indentSize,
        indent_with_tabs: options.isTabIndent,
    });

}

// beautify style
function beautifyCss(str, options) {
    return beautify.css(str, {
        indent_char: ' ',
        indent_size: options.indentSize,
        indent_with_tabs: options.isTabIndent
    });

}

// root tag indent
function rootTagIndent(str, options) {
    let indent = getIndentString(options);
    return str.split(/[\r\n]/).map(function (line) {
        return indent + line;
    }).join('\n');

}

// get indent string
function getIndentString(options) {
    let indent = '';
    if (options.isTabIndent) {
        indent = '\t';
    } else {
        for (let i = 0; i < options.indentSize; i++) {
            indent += ' ';
        }
    }
    return indent;

}

//var code = beautify(text, true, 4, true);
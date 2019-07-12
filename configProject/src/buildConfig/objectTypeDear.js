module.exports = {
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

module.exports = {
    checkTypes(val,Class,defaultError) {
        let defaultErrorFn = defaultError ? () => {
            throw new Error(`val constructor is not ${Class.name}`);
        } : () => {};
        return new Promise((s,f) => {
            if (typeof val === 'object') {
                if (val.constructor === Class) {
                    s();
                } else {
                    f(defaultErrorFn);
                }
            } else {
                f(defaultErrorFn);
            }
        });
    }
};
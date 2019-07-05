/**
 * @param eventBind ["ev1","ev2"]
 * @param params
 * @param paramStr [':propA="name.propA"']
 *
 * @return eventBind
 *          params
 *          template
 * */
module.exports = ({
        eventBind,
        params,
        paramStr,
        dataName
    }) => {
    return {
        eventBind,
        params: "",
        template: "",
        more: ""
    }
};
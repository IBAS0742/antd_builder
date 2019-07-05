import L from 'leaflet';

export const addControl = {
    position: {
        topleft: 'topleft',
        topright: 'topright',
        bottomleft: 'bottomleft',
        bottomright: 'bottomright'
    },
    init(name,onAdd,position) {
        L.Control[name]= L.Control.extend({
            //在此定义参数
            options: {
                position: position || 'bottomleft'
            },
            //在此初始化
            initialize: function (options) {
                L.Util.extend(this.options, options);
            },
            onAdd
        });
        return L.Control[name];
    }
};

// 使用方法如下
// import
// init("XXX",function() { return DOM; } );
// let XXX = new L.Control.XXX
// XXX.addTo(map)
const {
    Input,
    Textarea,
    objectType
} = require('../utils/FormItems');

const ComponentSetting = require('./../utils/ComponentSetting');

const BaseLeaflet = () => new ComponentSetting("BaseLeaflet")
    .addPackages('leaflet')
    .addDep([
        "/components/leafletMap/utils/addControl.js",
        "/components/leafletMap/BaseLeafLet.vue"
    ])
    .setTemplateName('BaseLeafLet')
    .setImport('/components/leafletMap/BaseLeafLet.vue')
    .addFormItems([
        new Input('url','').setTip('地图的瓦片基础链接').setMoreTip("例如 http://11.11.11.164:8080/geoserver/et/wms"),
        new Textarea('params',JSON.stringify({
            'styles': 'xxx',
            'format': 'image/png',
            'VERSION': '1.1.1',
            "layers": 'xxx',
            transparent: true,
        },'','\t')).setTip('地图参数').setMoreTip("可以参考 geoserver 的 openlayer 例子")
            .setObjectType(objectType.object),
        new Input('center','').setTip('地图中心点').setMoreTip("格式是 [ lng,lat ]")
            .setObjectType(objectType.array),
        new Input('zoom','5').setTip('地图默认缩放比')
            .setObjectType(objectType.int),
        new Input('attribution','@ Your Company').setTip('copyright'),
        new Input('baseMap','').setTip('地图').setMoreTip("默认是谷歌地图"),
        new Input('colorMap','').setTip('色条').setMoreTip("地图的值的意义（链接，默认不需要）"),
        new Input('controls','[]').setTip('地图上控件')
            .setMoreTip("控件，需要自己定义，这里不要修改").setDisable()
            .setObjectType(objectType.array),
    ]).makeKeyVal();

BaseLeaflet.label = 'Leaflet地图插件--基础用法';
module.exports = BaseLeaflet;
const {
    Input,
    objectType,
    Textarea,
    defaultObjToProp
} = require('../utils/FormItems');

const ComponentSetting = require('./../utils/ComponentSetting');
const { Preview } = require('./../utils/Step');

const LeafletShp = () => new ComponentSetting("BaseLeafletShp")
    .addEvent(['mouseover','click'])
    .addPackages('leaflet')
    .addDep([
        "/components/leafletMap/utils/addControl.js",
        "/components/leafletMap/LeafletShp.vue"
    ])
    .setTemplateName('LeafletShp')
    .setImport('/components/leafletMap/LeafletShp.vue')
    .addFormItems([
        new Textarea('url','[]').setTip('地图的瓦片基础链接').setMoreTip("shpfile 的 geojson 路径，数组")
            .setObjectType(objectType.array),
        new Input('center','').setTip('地图中心点').setMoreTip("格式是 [ lng,lat ]")
            .setObjectType(objectType.array),
        new Input('zoom','5').setTip('地图默认缩放比')
            .setObjectType(objectType.int),
        new Input('attribution','@ Your Company').setTip('copyright'),
        new Input('baseMap','').setTip('地图').setMoreTip("默认是谷歌地图"),
        // new Input('colorMap','').setTip('色条').setMoreTip("地图的值的意义（链接，默认不需要）"),
        new Input('controls','[]').setTip('地图上控件')
            .setMoreTip("控件，需要自己定义，这里不要修改").setDisable()
            .setObjectType(objectType.array),
    ])
    .makeKeyVal()
    .setPreview(
        new Preview('LeafletShp',{},true,(config) => {
            return defaultObjToProp(config.makeKeyVal().keyVal,config.keyType);
        }).setRebuildMethod('renderMap')
    );

LeafletShp.label = 'Leaflet地图插件--矢量图展示';
module.exports = LeafletShp;
<template>
    <div id="umap" ref="rootmap">
        <div id="map"></div>
    </div>
</template>

<script>
    import L from 'leaflet';
    import { addControl } from "../../utils/leaflet/addControl";
    // import { drawMultiAngle } from "../../utils/leaflet/drawMultiAngle";
    import { makeMask } from "./utils/maskFroLeaflet";

    let initControl = (map,clickEvent,name) => {
        addControl.init(name,function () {
            let button = document.createElement('button');
            button.innerText = name;
            button.style.border = '2px solid rgba(0,0,0,0.2)';
            button.style.fontWeight = 'bold';
            button.style.backgroundClip = 'padding-box';
            button.style.background = 'white';
            button.style.color = 'black';
            button.onclick = clickEvent;
            return button;
        },addControl.position.topleft);
        (new L.Control[name]).addTo(map);
    };

    let initColorMapControl = (map,url) => {
        let name = 'colorMap';
        addControl.init(name,function () {
            let img = document.createElement('img');
            img.src = url;
            return img;
        },addControl.position.bottomright);
        (new L.Control[name]).addTo(map);
    };

    export default {
        name: "LeafletShowPart",
        props: {
            url: {
                required: true,
                type: String
            },
            params: {
                required: true,
                type: Object
            },
            center: {
                required: false,
                type: Array,
                default() {
                    return [61,45];
                }
            },
            projection: {
                required: false,
                type: String,
                default() {
                    return "EPSG:4326";
                }
            },
            zoom: {
                required: false,
                // type: Number,
                default() {
                    return 5;
                }
            },
            attribution: {
                required: false,
                default() {
                    return '@Copy IBAS'
                }
            },
            baseMap: {
                required: false,
                default() {
                    return 'http://mt0.google.cn/vt/lyrs=m@160000000&hl=zh-CN&gl=CN&src=app&y={y}&x={x}&z={z}&s=Ga';
                }
            },
            colorMap: {
                type: String,
                required: false,
                default() {
                    return '';
                }
            }
        },
        data() {
            return {
                map: {},
                zoom_: 0,
                paramsSetting: {
                    // env: `p:POLYGON((54 51, 71 48, 69 52, 57 53, 54 51))`
                }
            }
        },
        methods: {
            renderMap() {

                this.$refs.rootmap.clearChild().addChild('div','map',{
                    width: '100%',
                    height: '100%'
                });

                let layer = L.tileLayer(this.baseMap, { attribution: this.attribution });
                this.map = L.map('map', {
                        center :
                            {
                                lon : this.center[0],
                                lat : this.center[1]
                            },
                        zoom: this.zoom_ || this.zoom
                    });
                let popup = L.popup();
                let dma = makeMask(this.map,(arrArr => {
                    this.zoom_ = this.map._zoom;
                    this.paramsSetting.env = `p:POLYGON((${arrArr.map(_ => `${_[1]} ${_[0]}`).join(',')}))`;
                    this.renderMap();
                }).bind(this),
                ((map,e) => {
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(map);
                }).bind(null,this.map));
                //加载wms服务的图层
                let wmsLayer = L.tileLayer.wms(
                    this.url, Object.assign({},this.params,this.paramsSetting) );
                layer.addTo(this.map);
                wmsLayer.addTo(this.map);
                initControl(this.map,dma.toDraw.bind(dma),'draw');
                initControl(this.map,(() => {
                    this.zoom_ = this.map._zoom;
                    delete this.paramsSetting.env;
                    this.renderMap();
                }).bind(this),'clear');
                if (this.colorMap) {
                    initColorMapControl(this.map,this.colorMap);
                }
            }
        },
        mounted() {
            window.$leafletMap = this;
            window.L = L;
            this.renderMap();
        }
    }
</script>

<style scoped>
    @import "../../../node_modules/leaflet/dist/leaflet.css";
    #umap {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    #map {
        width: 100%;
        height: 100%;
    }
</style>

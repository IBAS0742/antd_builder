<template>
    <div id="umap" ref="rootmap">
        <div id="map"></div>
    </div>
</template>

<script>
    import L from 'leaflet';

    import { addControl } from "./utils/addControl";
    let initControl = (map,{
            position,
            promise
        }) => {
        promise.then(_ => {
            addControl.init(name,function () {
                return _;
            },position || addControl.position.topleft);
            (new L.Control[name]).addTo(map);
        })
    };

    export default {
        name: "BaseLeafLet",
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
            // projection: {
            //     required: false,
            //     type: String,
            //     default() {
            //         return "EPSG:4326";
            //     }
            // },
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
                required: false
            },
            controls: {
                type: Array,
                required: false,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                map: {}
            }
        },
        methods: {
            renderMap() {
                if (!this.params.layers) {
                    return;
                }
                let $this = this;
                this.$refs.rootmap.clearChild().addChild('div','map',{
                    width: '100%',
                    height: '100%'
                }).addChild('div','colorMap',{
                    // width: '180px',
                    // height: '180px',
                    position: 'absolute',
                    right: '10px',
                    bottom: '25px',
                    'z-index': 1000
                });
                this.colorMapImage = new Image();
                this.colorMapImage.src = this.colorMap;
                document.getElementById('colorMap').appendChild(this.colorMapImage);

                let layer = L.tileLayer(this.baseMap, { attribution: this.attribution });
                this.map = L.map('map',
                    {
                        center :
                            {
                                lon : this.center[0],
                                lat : this.center[1]
                            },
                        zoom: this.zoom
                    });
                //加载wms服务的图层
                let wmsLayer = L.tileLayer.wms(
                    this.url,
                    this.params,
                );
                this.map.on('click',function (e) {
                    $this.$emit("mapClick",e);
                });
                layer.addTo(this.map);
                wmsLayer.addTo(this.map);
                if (this.controls && (this.controls instanceof Array) && this.controls.length) {
                    // { name: '' , event: fn }
                    this.controls.forEach(_ => {
                        initControl(this.map,_);
                    });
                }
            }
        },
        mounted() {
            setTimeout(this.renderMap,500);
            window.$bll = this;
        },
        watch: {
            params: {
                deep: true,
                handler() {
                    this.renderMap();
                }
            },
            shpfileUrl() {
                this.renderMap();
            },
            colorMap() {
                this.colorMapImage.src = this.colorMap;
            }
        }
    }
</script>

<style scoped>
    @import "~leaflet/dist/leaflet.css";

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

<template>
    <div id="umap" ref="rootmap">
        <div id="map"></div>
    </div>
</template>

<script>
    import L from 'leaflet';
    // 解析 kml 文件
    import './utils/KML'
    // 根据一组边界进行裁剪(自定义的一个 wms )
    import './utils/BoundayCanvasWMS'

    const overInitWMS = function(shpfileUrl,wmsLayer,map) {
        fetch(shpfileUrl,{
            method: 'GET',
            mode: 'cors',
        }).then( res => res.text() )
            .then( kml => {
                let div = document.createElement("div");
                div.innerHTML = kml;
                const track = new L.KML(div);
                wmsLayer.options.boundary = track.toGeoJSON();
                wmsLayer.redrawAll({
                    // boundary: e.layer.toGeoJSON(),
                });
                map.fitBounds(track.getBounds());
            })
    };

    export default {
        name: "LeafletShowPartByShapfile",
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
            shpfileUrl: {
                type: String,
                required: true
            },
            colorMap: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                map: {},
                colorMapImage: '',
                options: 0
            }
        },
        methods: {
            renderMap() {
                this.options = this.map.options ? {
                    center: this.map.getCenter(),
                    zoom: this.map._zoom
                } : {
                    center :
                        {
                            lon : this.center[0],
                            lat : this.center[1]
                        },
                    zoom: this.zoom
                };
                // 重新创建一个 div#map
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
                // 初始化地图
                let layer = L.tileLayer(this.baseMap, { attribution: this.attribution });
                // 在 div#map 上初始化地图
                this.map = L.map('map',this.options);
                layer.addTo(this.map);
                //加载wms服务的图层
                let wmsLayer = L.tileLayer.mywms(this.url, {
                    ...this.params
                },true);
                overInitWMS(this.shpfileUrl,wmsLayer,this.map);
                this.$nextTick(() => {
                    wmsLayer.addTo(this.map);
                });
            }
        },
        mounted() {
            window.$leafletMap = this;
            window.L = L;
            setTimeout(() => {
                this.renderMap()
            },500);
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
    @import "../../../node_modules/leaflet/dist/leaflet.css";

    #umap {
        width: 100%;
        height: 100%;
        /*position: absolute;*/
    }
    #map {
        width: 100%;
        height: 100%;
    }
</style>
<template>
    <div id="umap" ref="rootmap">
        <div id="map"></div>
    </div>
</template>

<script>
    import L from 'leaflet';
    import 'leaflet-draw'
    import './utils/BoundayCanvasWMS'
    import './utils/KML'

    export default {
        name: "LeafletDrawAuth",
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
            }
        },
        data() {
            return {
                map: {}
            }
        },
        methods: {
            renderMap() {
                this.$refs.rootmap.clearChild().addChild('div','map',{
                    width: '100%',
                    height: '100%'
                });

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
                layer.addTo(this.map);
                let wmsLayer = L.tileLayer.mywms(this.url, {
                    ...this.params,
                    // boundary: {
                    //     "type":"Feature",
                    //     "properties":{},
                    //     "geometry":{
                    //         "type":"MultiPolygon",
                    //         "coordinates":[
                    //             [
                    //                 [[180, 90], [-180, 90], [-180, -90], [180, -90], [180, 90]]
                    //             ]
                    //         ]
                    //     }
                    // },
                },true);
                wmsLayer.addTo(this.map);

                /*********** For Edit *********/
                let drawnItems = L.featureGroup().addTo(this.map);
                L.control.layers(
                    {
                        "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
                            attribution: 'google'
                        })
                    },
                    {
                        'drawlayer': drawnItems
                    },
                    {
                        position: 'topleft',
                        collapsed: false,
                        hideSingleBase: true
                    }).addTo(this.map);
                /*********** For Edit End *********/
                //加载wms服务的图层
                // let wmsLayer = L.tileLayer.wms(
                //     this.url,
                //     this.params
                // );
                this.map.addControl(new L.Control.Draw({
                    edit: {
                        featureGroup: drawnItems,
                        poly: {
                            allowIntersection: false
                        }
                    },
                    draw: {
                        polygon: {
                            allowIntersection: false,
                            showArea: true
                        },
                        polyline: false,
                        // rectangle: false,
                        circle: false,
                        marker: false,
                        circlemarker: false,
                    }
                }));
                let changeSaved = function () {
                    let count = 0;
                    let coordinates = [];
                    for (let i in drawnItems._layers) {
                        let tmp = drawnItems._layers[i]._latlngs[0].map(_ => [_.lng,_.lat])
                        tmp.push(tmp[0]);
                        coordinates.push([tmp]);
                        count++;
                    }
                    if (count) {
                        wmsLayer.options.boundary = {
                            "type":"Feature",
                            "properties":{},
                            "geometry":{
                                "type":"MultiPolygon",
                                "coordinates": coordinates
                            }
                        };
                    } else {
                        wmsLayer.options.boundary = null;
                    }
                    wmsLayer.redrawAll({});
                };
                this.map.on(L.Draw.Event.DELETED, changeSaved);
                this.map.on(L.Draw.Event.EDITSTOP, changeSaved);
                this.map.on(L.Draw.Event.CREATED, function (e) {
                    if (wmsLayer.options.boundary) {
                        wmsLayer.options.boundary.geometry.coordinates.push(e.layer.toGeoJSON().geometry.coordinates)
                    } else {
                        wmsLayer.options.boundary = {
                            "type":"Feature",
                            "properties":{},
                            "geometry":{
                                "type":"MultiPolygon",
                                "coordinates": [e.layer.toGeoJSON().geometry.coordinates]
                            }
                        };
                    }
                    wmsLayer.redrawAll({
                        // boundary: e.layer.toGeoJSON(),
                    });
                    let layer = e.layer;
                    drawnItems.addLayer(layer);
                });
                window.drawnItems = drawnItems;
                window.wmsLayer = wmsLayer;
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

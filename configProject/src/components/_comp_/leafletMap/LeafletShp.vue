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
        name: "LeafletShp",
        props: {
            url: {
                required: true
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
            // 正常显示的颜色
            commonColor: {},
            // 当鼠标在矢量数据上方是的颜色
            overColor: {},
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
                map: {},
                // 被选中的矢量
                overTarget: null
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
                if (this.url instanceof Array) {
                    let $this = this;
                    this.url.forEach((_,ind) => fetch(_)
                        .then(_ => _.text())
                        .then(JSON.parse)
                        .then(__ => $this.addGeoJsonToMap(__,ind + 1)));
                } else {
                    if (this.url) {
                        fetch(this.url)
                            .then(_ => _.text())
                            .then(JSON.parse)
                            .then(this.addGeoJsonToMap)
                    }
                }
                if (this.controls && (this.controls instanceof Array) && this.controls.length) {
                    // { name: '' , event: fn }
                    this.controls.forEach(_ => {
                        initControl(this.map,_);
                    });
                }
            },
            addGeoJsonToMap(_,_id) {
                let $this = this;
                _id = _id || 'none';
                function onEachFeature(feature, layer) {
                    layer.on({
                        mouseover: function (e) {
                            if ($this.overTarget === e.target) {
                                return ;
                            }
                            if ($this.overTarget) {
                                $this.overTarget.setStyle({
                                    color: '#1890ff',
                                    weight: 3
                                });
                                $this.$emit('mouseout',e.target.feature.properties);
                            }
                            $this.overTarget = e.target;
                            e.target.setStyle({
                                color: '#00f6b2',
                                weight: 8
                            });
                            $this.$emit('mouseover',e.target.feature.properties);
                        },
                        // mouseout: function (e) {
                        //     // debugger;
                        //     if ($this.overTarget) {
                        //         $this.overTarget.setStyle({
                        //             color: '#1890ff',
                        //             weight: 3
                        //         });
                        //         $this.$emit('mouseout',e.target.feature.properties);
                        //     }
                        // },
                        click: function (e) {
                            $this.map.fitBounds(e.target.getBounds());
                            $this.$emit('click',e.target.feature.properties);
                        }
                    });
                    feature.properties._id = _id;
                }
                L.geoJSON(_, {
                    style: function () {
                        return {
                            color: '#1890ff'
                        };
                    },
                    onEachFeature: onEachFeature
                }).bindPopup(function (layer) {
                    return layer.feature.properties.description;
                }).addTo(this.map);
            }
        },
        mounted() {
            window.$leafletMap = this;
            window.L = L;
            setTimeout(this.renderMap,500);
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

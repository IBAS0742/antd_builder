(function () {
    var isRingBbox = function (ring, bbox) {
        if (ring.length !== 4) {
            return false;
        }

        var p, sumX = 0, sumY = 0;

        for (p = 0; p < 4; p++) {
            if ((ring[p].x !== bbox.min.x && ring[p].x !== bbox.max.x) ||
                (ring[p].y !== bbox.min.y && ring[p].y !== bbox.max.y)) {
                return false;
            }

            sumX += ring[p].x;
            sumY += ring[p].y;

            //bins[Number(ring[p].x === bbox.min.x) + 2 * Number(ring[p].y === bbox.min.y)] = 1;
        }

        //check that we have all 4 vertex of bbox in our geometry
        return sumX === 2*(bbox.min.x + bbox.max.x) && sumY === 2*(bbox.min.y + bbox.max.y);
    };
    var ExtendMethods = {
        _toMercGeometry: function(b, isGeoJSON) {
            var res = [];
            var c, r, p,
                mercComponent,
                mercRing,
                coords;

            if (!isGeoJSON) {
                if (!(b[0] instanceof Array)) {
                    b = [[b]];
                } else if (!(b[0][0] instanceof Array)) {
                    b = [b];
                }
            }

            for (c = 0; c < b.length; c++) {
                mercComponent = [];
                for (r = 0; r < b[c].length; r++) {
                    mercRing = [];
                    for (p = 0; p < b[c][r].length; p++) {
                        coords = isGeoJSON ? L.latLng(b[c][r][p][1], b[c][r][p][0]) : b[c][r][p];
                        mercRing.push(this._map.project(coords, 0));
                    }
                    mercComponent.push(mercRing);
                }
                res.push(mercComponent);
            }

            return res;
        },

        //lazy calculation of layer's boundary in map's projection. Bounding box is also calculated
        _getOriginalMercBoundary: function () {
            if (this._mercBoundary) {
                return this._mercBoundary;
            }

            var compomentBbox, c;

            if (L.Util.isArray(this.options.boundary)) { //Depricated: just array of coordinates
                this._mercBoundary = this._toMercGeometry(this.options.boundary);
            } else { //GeoJSON
                this._mercBoundary = [];
                var processGeoJSONObject = function(obj) {
                    if (obj.type === 'GeometryCollection') {
                        obj.geometries.forEach(processGeoJSONObject);
                    } else if (obj.type === 'Feature') {
                        processGeoJSONObject(obj.geometry);
                    } else if (obj.type === 'FeatureCollection') {
                        obj.features.forEach(processGeoJSONObject);
                    } else if (obj.type === 'Polygon') {
                        this._mercBoundary = this._mercBoundary.concat(this._toMercGeometry([obj.coordinates], true));
                    } else if (obj.type === 'MultiPolygon') {
                        this._mercBoundary = this._mercBoundary.concat(this._toMercGeometry(obj.coordinates, true));
                    }
                }.bind(this);
                processGeoJSONObject(this.options.boundary);
            }

            this._mercBbox = new L.Bounds();
            for (c = 0; c < this._mercBoundary.length; c++) {
                compomentBbox = new L.Bounds(this._mercBoundary[c][0]);
                this._mercBbox.extend(compomentBbox.min);
                this._mercBbox.extend(compomentBbox.max);
            }

            return this._mercBoundary;
        },

        _getClippedGeometry: function(geom, bounds) {
            var clippedGeom = [],
                clippedComponent,
                clippedExternalRing,
                clippedHoleRing,
                iC, iR;

            for (iC = 0; iC < geom.length; iC++) {
                clippedComponent = [];
                clippedExternalRing = L.PolyUtil.clipPolygon(geom[iC][0], bounds);
                if (clippedExternalRing.length === 0) {
                    continue;
                }

                clippedComponent.push(clippedExternalRing);

                for (iR = 1; iR < geom[iC].length; iR++) {
                    clippedHoleRing = L.PolyUtil.clipPolygon(geom[iC][iR], bounds);
                    if (clippedHoleRing.length > 0) {
                        clippedComponent.push(clippedHoleRing);
                    }
                }
                clippedGeom.push(clippedComponent);
            }

            if (clippedGeom.length === 0) { //we are outside of all multipolygon components
                return {isOut: true};
            }

            for (iC = 0; iC < clippedGeom.length; iC++) {
                if (isRingBbox(clippedGeom[iC][0], bounds)) {
                    //inside exterior rings and no holes
                    if (clippedGeom[iC].length === 1) {
                        return {isIn: true};
                    }
                } else { //intersects exterior ring
                    return {geometry: clippedGeom};
                }

                for (iR = 1; iR < clippedGeom[iC].length; iR++) {
                    //inside exterior ring, but have intersection with a hole
                    if (!isRingBbox(clippedGeom[iC][iR], bounds)) {
                        return {geometry: clippedGeom};
                    }
                }
            }

            //we are inside all holes in geometry
            return {isOut: true};
        },

        // Calculates intersection of original boundary geometry and tile boundary.
        // Uses quadtree as cache to speed-up intersection.
        // Return
        //   {isOut: true} if no intersection,
        //   {isIn: true} if tile is fully inside layer's boundary
        //   {geometry: <LatLng[][][]>} otherwise
        _getTileGeometry: function (x, y, z, skipIntersectionCheck) {
            if ( !this.options.boundary) {
                return {isIn: true};
            }

            var cacheID = x + ":" + y + ":" + z,
                zCoeff = Math.pow(2, z),
                parentState,
                cache = this._boundaryCache;

            if (cache[cacheID]) {
                return cache[cacheID];
            }

            var mercBoundary = this._getOriginalMercBoundary(),
                ts = this.options.tileSize,
                tileBbox = new L.Bounds(new L.Point(x * ts / zCoeff, y * ts / zCoeff), new L.Point((x + 1) * ts / zCoeff, (y + 1) * ts / zCoeff));

            //fast check intersection
            if (!skipIntersectionCheck && !tileBbox.intersects(this._mercBbox)) {
                return {isOut: true};
            }

            if (z === 0) {
                cache[cacheID] = {geometry: mercBoundary};
                return cache[cacheID];
            }

            parentState = this._getTileGeometry(Math.floor(x / 2), Math.floor(y / 2), z - 1, true);

            if (parentState.isOut || parentState.isIn) {
                return parentState;
            }

            cache[cacheID] = this._getClippedGeometry(parentState.geometry, tileBbox);
            return cache[cacheID];
        },

        _drawTileInternal: function (canvas, tilePoint, url, callback) {
            var zoom = this._getZoomForUrl(),
                state = this._getTileGeometry(tilePoint.x, tilePoint.y, zoom);

            if (state.isOut) {
                callback();
                return;
            }

            var ts = this.options.tileSize,
                tileX = ts * tilePoint.x,
                tileY = ts * tilePoint.y,
                zCoeff = Math.pow(2, zoom),
                ctx = canvas.getContext('2d'),
                imageObj = new Image(),
                _this = this;

            var setPattern = function () {
                var c, r, p,
                    pattern,
                    geom;

                if (!state.isIn) {
                    geom = state.geometry;
                    ctx.beginPath();

                    for (c = 0; c < geom.length; c++) {
                        for (r = 0; r < geom[c].length; r++) {
                            if (geom[c][r].length === 0) {
                                continue;
                            }

                            ctx.moveTo(geom[c][r][0].x * zCoeff - tileX, geom[c][r][0].y * zCoeff - tileY);
                            for (p = 1; p < geom[c][r].length; p++) {
                                ctx.lineTo(geom[c][r][p].x * zCoeff - tileX, geom[c][r][p].y * zCoeff - tileY);
                            }
                        }
                    }
                    ctx.clip();
                }

                pattern = ctx.createPattern(imageObj, "repeat");
                ctx.beginPath();
                ctx.rect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = pattern;
                ctx.fill();
                callback();
            };

            if (this.options.crossOrigin) {
                imageObj.crossOrigin = '';
            }

            imageObj.onload = function () {
                //TODO: implement correct image loading cancelation
                canvas.complete = true; //HACK: emulate HTMLImageElement property to make happy L.TileLayer
                setTimeout(setPattern, 0); //IE9 bug - black tiles appear randomly if call setPattern() without timeout
            }

            imageObj.src = url;
        },

        onAdd: function(map) {
            (L.TileLayer.Canvas || L.TileLayer).prototype.onAdd.call(this, map);

            if (this.options.trackAttribution) {
                map.on('moveend', this._updateAttribution, this);
                this._updateAttribution();
            }
        },

        onRemove: function(map) {
            (L.TileLayer.Canvas || L.TileLayer).prototype.onRemove.call(this, map);

            if (this.options.trackAttribution) {
                map.off('moveend', this._updateAttribution, this);
                if (!this._attributionRemoved) {
                    var attribution = L.TileLayer.BoundaryCanvasWMS.prototype.getAttribution.call(this);
                    map.attributionControl.removeAttribution(attribution);
                }
            }
        },

        _updateAttribution: function() {
            var geom = this._getOriginalMercBoundary(),
                mapBounds = this._map.getBounds(),
                mercBounds = L.bounds(this._map.project(mapBounds.getSouthWest(), 0), this._map.project(mapBounds.getNorthEast(), 0)),
                state = this._getClippedGeometry(geom, mercBounds);

            if (this._attributionRemoved !== !!state.isOut) {
                var attribution = L.TileLayer.BoundaryCanvasWMS.prototype.getAttribution.call(this);
                this._map.attributionControl[state.isOut ? 'removeAttribution' : 'addAttribution'](attribution);
                this._attributionRemoved = !!state.isOut;
            }
        },

        redrawAll: function(opts) {
            this.initialize(this._url,{
                ...this.options,
                ...(opts || {})
            });
            this.redraw();
        },
    };

    L.TileLayer.myWMS = L.TileLayer.extend({
        options: {
            // all rings of boundary should be without self-intersections or intersections with other rings
            // zero-winding fill algorithm is used in canvas, so holes should have opposite direction to exterior ring
            // boundary can be
            // LatLng[] - simple polygon
            // LatLng[][] - polygon with holes
            // LatLng[][][] - multipolygon
            boundary: null
        },
        includes: ExtendMethods,

        defaultWmsParams: {
            service: 'WMS',
            request: 'GetMap',
            version: '1.1.1',
            layers: '',
            styles: '',
            format: 'image/jpeg',
            transparent: false
        },

        initialize: function (url, options) { // (String, Object)

            this._url = url;

            var wmsParams = L.extend({}, this.defaultWmsParams),
                tileSize = options.tileSize || this.options.tileSize;

            if (options.detectRetina && L.Browser.retina) {
                wmsParams.width = wmsParams.height = tileSize * 2;
            } else {
                wmsParams.width = wmsParams.height = tileSize;
            }

            for (var i in options) {
                // all keys that are not TileLayer options go to WMS params
                //if (!this.options.hasOwnProperty(i) && i !== 'crs') {
                if (i !== 'boundary') {
                    wmsParams[i] = options[i];
                }
                //}
            }

            this.wmsParams = {
                ...this.wmsParams,
                ...wmsParams
            };

            L.setOptions(this, options);
            // copy from boundayCanvas
            this._boundaryCache = {}; //cache index "x:y:z"
            this._mercBoundary = null;
            this._mercBbox = null;

            if (this.options.trackAttribution) {
                this._attributionRemoved = true;
                this.getAttribution = null;
            }
        },

        onAdd: function (map) {

            this._crs = this.options.crs || map.options.crs;

            this._wmsVersion = parseFloat(this.wmsParams.version);

            var projectionKey = this._wmsVersion >= 1.3 ? 'crs' : 'srs';
            this.wmsParams[projectionKey] = this._crs.code;

            L.TileLayer.prototype.onAdd.call(this, map);
        },

        getTileUrl: function (tilePoint) { // (Point, Number) -> String

            var map = this._map,
                tileSize = this.options.tileSize,

                nwPoint = tilePoint.multiplyBy(tileSize),
                sePoint = nwPoint.add([tileSize, tileSize]),

                nw = this._crs.project(map.unproject(nwPoint, tilePoint.z)),
                se = this._crs.project(map.unproject(sePoint, tilePoint.z)),
                bbox = this._wmsVersion >= 1.3 && this._crs === L.CRS.EPSG4326 ?
                    [se.y, nw.x, nw.y, se.x].join(',') :
                    [nw.x, se.y, se.x, nw.y].join(','),

                url = L.Util.template(this._url, {s: this._getSubdomain(tilePoint)});

            return url + L.Util.getParamString(this.wmsParams, url, true) + '&BBOX=' + bbox;
        },

        setParams: function (params, noRedraw) {

            L.extend(this.wmsParams, params);

            if (!noRedraw) {
                this.redraw();
            }

            return this;
        },

        createTile: function(coords, done){
            var tile = document.createElement('canvas'),
                url = this.getTileUrl(coords);
            tile.width = tile.height = this.options.tileSize;
            this._drawTileInternal(tile, coords, url, L.bind(done, null, null, tile));

            return tile;
        }
    });
    L.tileLayer.mywms = function (url, options) {
        return new L.TileLayer.myWMS(url, options);
    };
})();
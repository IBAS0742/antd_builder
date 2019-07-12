import L from 'leaflet';

export class drawMultiAngle {
    constructor(map,drawOver,defaultClick) {
        this.map = map;
        this.drawOver = drawOver || (() => {});
        this.defaultClick = defaultClick || (() => {});
        this.points = [];
        this.lines = new L.polyline([]);
        this.tempLines = new L.polyline([],{dashArray:5});
        this.polygons = [];
        this.toStop.bind(this)();
    }

    toDraw() {
        this.map.off();
        setTimeout(() => {
            this.map.on('click',this.draw.bind(this));
            this.map.on('dblclick',this._drawOver.bind(this));
            this.map.on('mousemove',this.move.bind(this));
        },500);
    }

    toStop() {
        this.map.off();
        setTimeout((() => {
            this.map.on('click',this.defaultClick.bind(this));
        }).bind(this),100);
    }

    draw(e) {
        this.points.push([e.latlng.lat,e.latlng.lng]);
        this.lines.addLatLng(e.latlng);
        this.map.addLayer(this.tempLines);
        this.map.addLayer(this.lines);
        this.map.addLayer(L.circle(e.latlng,{color:'#ff0000',fillColor:'ff0000',fillOpacity:1}));
    }

    move(e) {
        if(this.points.length>0) {
            let ls = [this.points[this.points.length-1],[e.latlng.lat,e.latlng.lng],this.points[0]];
            this.tempLines.setLatLngs(ls)
            // map.addLayer(tempLines)
        }
    }

    _drawOver() {
        this.toStop.bind(this)();
        this.polygons.push(L.polygon(this.points));
        this.polygons[this.polygons.length - 1].addTo(this.map);
        this.drawOver(this);
        //map.removeLayer(tempLines)
        //tempLines.remove()
        this.lines.remove();
        this.tempLines.remove();
        this.lines=new L.polyline([]);
    }
}

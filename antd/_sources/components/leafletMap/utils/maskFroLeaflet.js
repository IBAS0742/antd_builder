import { drawMultiAngle } from "_sources/components/leafletMap/utils/drawMultiAngle";

export const makeMask = function (map,drawOver,defaultClick) {
    let dma = new drawMultiAngle(map,function (e) {
        let ps = Array.from(e.points);
        ps.pop();
        ps.push(e.points[0]);
        (drawOver || (() => {}))(ps);
    },defaultClick);
    return dma;
};
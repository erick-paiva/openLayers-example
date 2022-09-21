import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

const featureStyles = {
  Point: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: undefined,
      stroke: new Stroke({
        color: "red",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "black",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "black",
      width: 1,
    }),
    fill: new Fill({
      color: "black",
    }),
  }),
};

export default featureStyles;

import { memo, useState } from "react";
import { osm, vector } from "../Map/Source";
import { Layers, TileLayer, VectorLayer } from "../Map/Layers";
import Map, { Controls } from "../Map";
import { DrawLayer } from "../Map/Interactions";
import Draw from "ol/interaction/Draw";
import featureStyles from "../Map/Features/Styles";
import { Icon, Stroke, Style } from "ol/style";
import { Geometry } from "ol/geom";
import smooth from "chaikin-smooth";
import FullScreenControl from "../Map/Controls/FullScreenControl";

const DrawOnMap = () => {
  const [zoom] = useState(1);

  const makeSmooth = (path: number[][], numIterations: number): number[][] => {
    numIterations = Math.min(Math.max(numIterations, 1), 10);
    while (numIterations > 0) {
      path = smooth(path);
      numIterations--;
    }
    return path;
  };

  const vectorSource = vector();

  const draw = new Draw({
    source: vectorSource,
    type: "LineString",
    style: new Style({
      image: new Icon({
        anchor: [0, 515],
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        src: "https://cdn-icons-png.flaticon.com/512/1077/1077687.png",
        scale: 0.04,
      }),
      stroke: new Stroke({
        color: "rgba(206, 60, 60, 0.5)",
      }),
    }),
  });

  draw.on("drawend", (event) => {
    const feat = event.feature;
    const geometry = feat.getGeometry() as Geometry & {
      getCoordinates: () => number[][];
      setCoordinates: (smoothened: number[][]) => void;
    };
    const coords = geometry.getCoordinates();
    const smoothened = makeSmooth(coords, 5);
    geometry?.setCoordinates(smoothened);
  });

  return (
    <Map center={[-6673051.65120894, -338505.38711884007]} zoom={zoom}>
      <Layers>
        <TileLayer source={osm()} zIndex={0} />
        <DrawLayer source={vectorSource} customDrawLayer={draw} />
        <VectorLayer source={vectorSource} style={featureStyles.MultiPolygon} />
      </Layers>
      <Controls>
        <FullScreenControl />
      </Controls>
    </Map>
  );
};

export const DrawOnTheMap = memo(DrawOnMap);

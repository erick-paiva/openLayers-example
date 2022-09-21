import { memo, useContext, useEffect } from "react";
import OLVectorLayer from "ol/layer/Vector";
import { Geometry } from "ol/geom";
import VectorSource from "ol/source/Vector";
import MapContext from "../MapContext";
import { Style } from "ol/style";

type VectorLayerProps = {
  source: VectorSource<Geometry>;
  zIndex?: number;
  style?: Style;
};

const VectorLayer = ({ source, style, zIndex = 0 }: VectorLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let vectorLayer = new OLVectorLayer({
      source,
      style,
    });

    map?.addLayer(vectorLayer);
    vectorLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map?.removeLayer(vectorLayer);
      }
    };
  }, [map, source, style, zIndex]);

  return null;
};

export default memo(VectorLayer);

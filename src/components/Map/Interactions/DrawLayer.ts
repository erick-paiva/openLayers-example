import { memo, useContext, useEffect } from "react";
import MapContext from "../MapContext";
import Draw from "ol/interaction/Draw";

type TileLayerProps = {
  source: any;
  zIndex?: number;
  customDrawLayer?: Draw;
};

const DrawLayer = ({ source, customDrawLayer }: TileLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let drawLayer =
      customDrawLayer ||
      new Draw({
        source,
        type: "LineString",
      });


    map?.addInteraction(drawLayer);

    return () => {
      if (map) {
        map?.removeInteraction(drawLayer);
      }
    };
  }, [map, source, customDrawLayer]);

  return null;
};

export default memo(DrawLayer);

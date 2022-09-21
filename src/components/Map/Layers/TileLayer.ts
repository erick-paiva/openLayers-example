import { memo, useContext, useEffect } from "react";
import OLTileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import MapContext from "../MapContext";

type TileLayerProps = {
  source: OSM;
  zIndex?: number;
};

const TileLayer = ({ source, zIndex = 0 }: TileLayerProps) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let tileLayer = new OLTileLayer({
      preload: 4,
      source,
      zIndex,
    });

    map?.addLayer(tileLayer);
    tileLayer.setZIndex(zIndex);

    return () => {
      if (map) {
        map?.removeLayer(tileLayer);
      }
    };
  }, [map, source, zIndex]);

  return null;
};

export default memo(TileLayer);

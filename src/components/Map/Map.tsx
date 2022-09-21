import { ReactNode, useEffect, useRef, useState } from "react";
import "./Map.css";
import MapContext from "./MapContext";
import * as ol from "ol";
import { Box, Flex } from "@chakra-ui/react";
import { Coordinate } from "ol/coordinate";

type MapProps = {
  children: ReactNode;
  zoom: number;
  center: Coordinate;
  view?: ol.View;
  callBack?: (map: ol.Map) => void;
};

const Map = ({ children, zoom, center, view, callBack }: MapProps) => {
  const mapRef = useRef({} as HTMLDivElement);
  const [map, setMap] = useState<ol.Map>();

  useEffect(() => {
    let options = {
      view: view || new ol.View({ zoom, center }),
      layers: [],
      controls: [],
      overlays: [],
    };

    let mapObject = new ol.Map(options);
    mapObject.setTarget(mapRef?.current);
    setMap(mapObject);

    callBack && callBack(mapObject as ol.Map);

    return () => mapObject.setTarget(undefined);
  }, [callBack, center, view, zoom]);

  useEffect(() => {
    if (!map) return;

    map?.getView().setZoom(zoom);
  }, [map, zoom]);

  useEffect(() => {
    if (!map) return;

    map?.getView().setCenter(center);
  }, [center, map]);

  return (
    <MapContext.Provider value={{ map } as { map: ol.Map }}>
      <Flex mr="4rem" overflow="hidden" w="100%" h="100%">
        <Box ref={mapRef} w="100%" h="100%">
          {children}
        </Box>
      </Flex>
    </MapContext.Provider>
  );
};

export default Map;

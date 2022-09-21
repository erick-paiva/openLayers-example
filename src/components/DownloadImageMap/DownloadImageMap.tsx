import { memo, useRef, useState } from "react";
import { osm } from "../Map/Source";
import { Box, Button, Center } from "@chakra-ui/react";
import * as ol from "ol";
import { Size } from "ol/size";
import { Layers, TileLayer } from "../Map/Layers";
import Map, { Controls } from "../Map";
import FullScreenControl from "../Map/Controls/FullScreenControl";

const DownloadImage = () => {
  const [map, setMap] = useState({} as ol.Map);

  const linkRef = useRef<(HTMLAnchorElement & HTMLDivElement) | null>(null);

  const [zoom] = useState(1);

  const downloadImageMap = () => {
    map?.once("rendercomplete", () => {
      const mapCanvas = document.createElement("canvas");
      const size: Size = map.getSize() || [0, 0];
      mapCanvas.width = size[0];
      mapCanvas.height = size[1];
      const mapContext = mapCanvas.getContext("2d") as CanvasRenderingContext2D;
      Array.prototype.forEach.call(
        map.getViewport().querySelectorAll(".ol-layer canvas, canvas.ol-layer"),
        (canvas) => {
          if (canvas.width > 0) {
            const opacity =
              canvas.parentNode.style.opacity || canvas.style.opacity;

            mapContext.globalAlpha = opacity === "" ? 1 : Number(opacity);

            let matrix;

            const transform = canvas.style.transform;
            if (transform) {
              matrix = transform
                .match(/^matrix\(([^\(]*)\)$/)[1]
                .split(",")
                .map(Number);
            } else {
              matrix = [
                parseFloat(canvas.style.width) / canvas.width,
                0,
                0,
                parseFloat(canvas.style.height) / canvas.height,
                0,
                0,
              ];
            }
            CanvasRenderingContext2D.prototype.setTransform.apply(
              mapContext,
              matrix
            );
            const backgroundColor = canvas.parentNode.style.backgroundColor;
            if (backgroundColor) {
              mapContext.fillStyle = backgroundColor;
              mapContext.fillRect(0, 0, canvas.width, canvas.height);
            }
            mapContext.drawImage(canvas, 0, 0);
          }
        }
      );
      mapContext.globalAlpha = 1;
      mapContext.setTransform(1, 0, 0, 1, 0, 0);

      if (linkRef?.current) {
        linkRef.current.href = mapCanvas.toDataURL();
      }
      linkRef?.current?.click();
    });
    map?.renderSync();
  };

  return (
    <>
      <Map
        center={[-6673051.65120894, -338505.38711884007]}
        zoom={zoom}
        callBack={(map) => {
          setMap(map);
        }}
      >
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
      </Map>
      <Box as="a" ref={linkRef} download="map.png" />
      <Center>
        <Button
          onClick={() => {
            downloadImageMap();
          }}
          bg="green.400"
          _hover={{
            bg: "green.300",
          }}
          position="absolute"
          bottom="5%"
        >
          Download imagem mapa
        </Button>
      </Center>
    </>
  );
};

export const DownloadImageMap = memo(DownloadImage);

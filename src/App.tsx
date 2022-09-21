import { Box, ChakraProvider, theme } from "@chakra-ui/react";
import { DownloadImageMap } from "./components/DownloadImageMap/DownloadImageMap";
import { DrawOnTheMap } from "./components/DrawOnTheMap/DrawOnTheMap";
import { GeoLocationMap } from "./components/GeolocationMap/GeoLocationMap";

export const App = () => {
  const maps = {
    0: <GeoLocationMap />,
    1: <DownloadImageMap />,
    2: <DrawOnTheMap />,
  };

  return (
    <ChakraProvider theme={theme}>
      <Box h="100vh" w="100vw" bg="gray.100">
        {maps[0]}
      </Box>
    </ChakraProvider>
  );
};

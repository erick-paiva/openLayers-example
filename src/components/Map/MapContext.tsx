import { Map } from "ol";
import { createContext } from "react";
const MapContext = createContext({} as { map: Map });
export default MapContext;

import { Collection, Feature } from "ol";
import { Geometry } from "ol/geom";
import { Vector as VectorSource } from "ol/source";

type VectorProps = {
  features?: Feature<Geometry>[] | Collection<Feature<Geometry>>;
};

const vector = ({ features }: VectorProps = {}) => {
  if (!features) {
    return new VectorSource({});
  }
  return new VectorSource({
    features,
  });
};

export default vector;

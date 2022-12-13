import haversine from "haversine-distance";
import { Location } from "../types";

function getDistance({ source, destination }: { source: Location; destination: Location }) {
  const d = haversine(source, destination);
  return d;
}

export { getDistance };

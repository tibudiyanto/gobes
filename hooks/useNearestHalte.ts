import React from "react";
import { Halte, Location } from "../types";
import { getDistance } from "../utils/distance";

function useThreeNearestHalte({ allHalte, lat, lon }: { allHalte: Halte[]; lat: number; lon: number }) {
  const [threeNearestHalte, setThreeNearestHalte] = React.useState<{ halte: Halte; distance: number }[]>([]);

  React.useEffect(() => {
    if (allHalte.length === 0) {
      setThreeNearestHalte([]);
    }
    const allHalteDistance = getAllHalteDistanceFromCurrentPosition({ position: { lat, lon }, allHalte });

    const topThree = getThreeNearestHalte(allHalteDistance);

    setThreeNearestHalte(topThree);
  }, [lat, lon, allHalte]);

  return threeNearestHalte;
}

function getAllHalteDistanceFromCurrentPosition({ position, allHalte }: { position: Location; allHalte: Halte[] }) {
  const halteDistances = allHalte.map((halte) => {
    const distance = getDistance({ source: position, destination: { lat: halte.lat, lon: halte.lon } });
    return { halte, distance };
  });

  return halteDistances;
}

function getThreeNearestHalte(halteDistances: { halte: Halte; distance: number }[]) {
  const sortedHalteDistances = halteDistances.sort((a, b) => a.distance - b.distance);
  return sortedHalteDistances.slice(0, 3);
}

export { useThreeNearestHalte };

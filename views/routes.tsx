import { Box, Heading } from "@chakra-ui/react";
import { Bus, BusRoute, Location } from "../types";
import { getDistance } from "../utils/distance";

const Buses = ({ buses, halteLocation }: { buses: Bus[]; halteLocation: Location }) => {
  if (!buses.length) {
    return <Box>Tidak ada bus</Box>;
  }
  const busWithDistance = buses.map(({ info, location }) => {
    const distance = getDistance({ destination: halteLocation, source: location });
    return { info, location, distance };
  });

  busWithDistance.sort((a, b) => {
    return a.distance - b.distance;
  });

  const busesLocation = busWithDistance.map(({ info, location }) => {
    const distance = getDistance({ destination: halteLocation, source: location });
    return (
      <Box key={info}>
        {info} {(distance / 1000).toFixed(2)} km
      </Box>
    );
  });
  return <>{busesLocation}</>;
};

const RouteAndBuses = ({ route, buses, halteLocation }: { route: string; buses: Bus[]; halteLocation: Location }) => {
  return (
    <Box>
      <Heading>{route}</Heading>
      <Buses buses={buses} halteLocation={halteLocation} />
    </Box>
  );
};

const Routes = ({ routes, halteLocation }: { routes: BusRoute | undefined; halteLocation: Location }) => {
  if (!routes) return <Box>No Route</Box>;
  const routesAndBus = Object.entries(routes).map(([route, buses]) => {
    return <RouteAndBuses key={`rute-${route}`} route={route} buses={buses} halteLocation={halteLocation} />;
  });

  return <>{routesAndBus}</>;
};
export { Routes };

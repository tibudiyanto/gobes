import { Box, Heading } from "@chakra-ui/react";
import { Bus, BusRoute, Location } from "../types";
import haversine from "haversine-distance";

function getDistance({ source, destination }: { source: Location; destination: Location }) {
  const d = haversine(source, destination);
  return d;
}

const Buses = ({ buses, currLocation }: { buses: Bus[]; currLocation: Location }) => {
  if (!buses.length) {
    return <Box>Tidak ada bus</Box>;
  }

  const busesLocation = buses.map(({ info, location }) => {
    const distance = getDistance({ destination: currLocation, source: location });
    return (
      <Box key={info}>
        {info} {distance}
      </Box>
    );
  });
  return <>{busesLocation}</>;
};

const RouteAndBuses = ({ route, buses, currLocation }: { route: string; buses: Bus[]; currLocation: Location }) => {
  return (
    <Box>
      <Heading>{route}</Heading>
      <Buses buses={buses} currLocation={currLocation} />
    </Box>
  );
};

const Routes = ({ routes, currLocation }: { routes: BusRoute | undefined; currLocation: Location }) => {
  if (!routes) return <Box>No Route</Box>;
  const routesAndBus = Object.entries(routes).map(([route, buses]) => {
    return <RouteAndBuses route={route} buses={buses} currLocation={currLocation} />;
  });

  return <>{routesAndBus}</>;
};
export { Routes };

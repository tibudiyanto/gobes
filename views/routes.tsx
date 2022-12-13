import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
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
      <Flex
        px={2}
        w="100%"
        justifyContent={"space-between"}
        key={info}
        alignItems="center"
        direction="row"
        border="1px solid black"
      >
        <Heading fontSize={"4xl"}>{info}</Heading>
        <Flex>{(distance / 1000).toFixed(2)} km</Flex>
      </Flex>
    );
  });
  return <VStack width={"100%"}>{busesLocation}</VStack>;
};

const RouteAndBuses = ({ route, buses, halteLocation }: { route: string; buses: Bus[]; halteLocation: Location }) => {
  return (
    <VStack w="100%" alignItems={"start"}>
      <Heading>{route}</Heading>
      <Buses buses={buses} halteLocation={halteLocation} />
    </VStack>
  );
};

const Routes = ({ routes, halteLocation }: { routes: BusRoute | undefined; halteLocation: Location }) => {
  if (!routes) return <Box>No Route</Box>;
  const routesAndBus = Object.entries(routes).map(([route, buses]) => {
    return <RouteAndBuses key={`rute-${route}`} route={route} buses={buses} halteLocation={halteLocation} />;
  });

  return <VStack w="100%">{routesAndBus}</VStack>;
};
export { Routes };

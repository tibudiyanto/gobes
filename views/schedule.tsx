import { Box, Text, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Halte, Location } from "../types";
import { useThreeNearestHalte } from "../hooks/useNearestHalte";

const HalteButton = ({ halte, distance }: { halte: Halte; distance: number }) => {
  return (
    <Button key={`halte-${halte.uniqid}`}>
      <HStack>
        <Text>{halte.nama}</Text>
        <Text fontSize="sm">({distance.toFixed(2)}m)</Text>
      </HStack>
    </Button>
  );
};

const YourLocation = ({ location }: { location: Location }) => {
  return (
    <HStack spacing={3}>
      <Text>Lokasimu:</Text>

      <Text fontWeight={"bold"}>
        {location.lat}, {location.lon}
      </Text>
    </HStack>
  );
};

const NearestHalte = ({ nearestHalte }: { nearestHalte: { halte: Halte; distance: number }[] }) => {
  return (
    <HStack>
      {nearestHalte.map(({ halte, distance }) => {
        return <HalteButton halte={halte} distance={distance} />;
      })}
    </HStack>
  );
};

const Schedule = ({ allHalte, lat = -7.288393, lon = 112.677276 }: { allHalte: Halte[]; lat: number; lon: number }) => {
  const nearestHalte = useThreeNearestHalte({ allHalte, lat, lon });
  return (
    <VStack w="100%" alignItems="start">
      <YourLocation location={{ lat, lon }} />
      <NearestHalte nearestHalte={nearestHalte} />
    </VStack>
  );
};

export { Schedule };

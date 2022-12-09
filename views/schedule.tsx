import { Box, Text, Button, Flex, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Halte, Location } from "../types";
import { useThreeNearestHalte } from "../hooks/useNearestHalte";

const HalteButton = ({
  halte,
  distance,
  onClick,
  isSelected,
}: {
  halte: Halte;
  distance: number;
  onClick: CallableFunction;
  isSelected: boolean;
}) => {
  return (
    <Button
      key={`halte-${halte.uniqid}`}
      onClick={() => {
        onClick();
      }}
      isActive={isSelected}
      _active={{ background: "green.400" }}
    >
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

const NearestHalte = ({
  nearestHalte,
  selectedHalte,
  setSelectedHalte,
}: {
  nearestHalte: { halte: Halte; distance: number }[];
  selectedHalte: null | string;
  setSelectedHalte: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  return (
    <HStack>
      {nearestHalte.map(({ halte, distance }) => {
        return (
          <HalteButton
            key={`halte-${halte.uniqid}`}
            halte={halte}
            isSelected={halte.uniqid === selectedHalte}
            distance={distance}
            onClick={() => {
              setSelectedHalte(halte.uniqid);
            }}
          />
        );
      })}
    </HStack>
  );
};

const Schedule = ({ allHalte, location }: { allHalte: Halte[]; location: Location }) => {
  const [selectedHalte, setSelectedHalte] = React.useState<string | null>(null);
  const nearestHalte = useThreeNearestHalte({ allHalte, ...location });

  return (
    <VStack w="100%" alignItems="start">
      <YourLocation location={location} />
      <NearestHalte nearestHalte={nearestHalte} selectedHalte={selectedHalte} setSelectedHalte={setSelectedHalte} />
      {JSON.stringify(selectedHalte)}
    </VStack>
  );
};

export { Schedule };

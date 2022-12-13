import { Flex, Text, Button, HStack, VStack } from "@chakra-ui/react";
import React from "react";
import { Halte, Location } from "../types";
import { useThreeNearestHalte } from "../hooks/useNearestHalte";
import { useRoute } from "../hooks/useRoute";
import { Routes } from "./routes";

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
        <Text fontSize="sm">({(distance / 1000).toFixed(2)} km)</Text>
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
  selectedHalte: null | Halte;
  setSelectedHalte: React.Dispatch<React.SetStateAction<Halte | null>>;
}) => {
  return (
    <Flex w="100%" overflowX="scroll">
      <HStack width={"fit-content"}>
        {nearestHalte.map(({ halte, distance }) => {
          return (
            <HalteButton
              key={`halte-${halte.uniqid}`}
              halte={halte}
              isSelected={halte.uniqid === selectedHalte?.uniqid}
              distance={distance}
              onClick={() => {
                setSelectedHalte(halte);
              }}
            />
          );
        })}
      </HStack>
    </Flex>
  );
};

const Schedule = ({ allHalte, location }: { allHalte: Halte[]; location: Location }) => {
  const [selectedHalte, setSelectedHalte] = React.useState<Halte | null>(null);
  const nearestHalte = useThreeNearestHalte({ allHalte, ...location });
  const routes = useRoute({ busStop: selectedHalte?.uniqid });

  const halteLocation = selectedHalte ? { lat: selectedHalte.lat, lon: selectedHalte.lon } : location;

  React.useEffect(() => {
    if (!selectedHalte && nearestHalte.length) {
      setSelectedHalte(nearestHalte[0].halte);
    }
  }, [selectedHalte, nearestHalte]);

  return (
    <VStack w="100%" alignItems="start">
      {/* <YourLocation location={location} /> */}
      <NearestHalte nearestHalte={nearestHalte} selectedHalte={selectedHalte} setSelectedHalte={setSelectedHalte} />
      {routes.isFetching ? (
        <Text>Sek, nggoleki bus e...</Text>
      ) : (
        <Routes routes={routes.data?.data} halteLocation={halteLocation} />
      )}
    </VStack>
  );
};

export { Schedule };

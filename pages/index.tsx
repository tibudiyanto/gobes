import { Heading, Flex, Text, Button, ChakraProps, VStack, Link } from "@chakra-ui/react";
import { NextPageContext } from "next";
import Head from "next/head";
import { AppShell } from "../components/AppShell";
import { useGPS } from "../hooks/useGPS";
import { Halte } from "../types";
import { api } from "../utils/requests";
import { Schedule } from "../views/schedule";

const Header = () => {
  return <Heading fontSize="5xl">Suroboyo Bus</Heading>;
};

const NoGPS = ({ getLocation }: { getLocation: CallableFunction }) => {
  return (
    <VStack w="100%" alignItems="center" h="100%" direction="column" justifyContent={"center"}>
      <Text>Bagi GPS ben iso nggolek halte.</Text>
      <Button
        onClick={(e) => {
          e.preventDefault();
          getLocation();
        }}
      >
        Bagikan GPS
      </Button>
    </VStack>
  );
};

export default function Home({ allHalte }: { allHalte: Halte[] }) {
  const { location, getLocation } = useGPS();

  return (
    <AppShell>
      <Head>
        <title>Suroboyo Bus</title>
        <meta name="description" content="GOBES" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex mb={3}>
        <Header />
      </Flex>

      <Flex flexGrow={1} h="100%">
        {location !== null ? <Schedule allHalte={allHalte} location={location} /> : <NoGPS getLocation={getLocation} />}
      </Flex>
    </AppShell>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const res = await api.get("halte");
  const allHalte = await res.json();

  return {
    props: {
      allHalte,
    }, // will be passed to the page component as props
  };
}

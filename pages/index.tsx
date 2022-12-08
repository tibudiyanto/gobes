import { Heading, Flex, Text, Button, ChakraProps, VStack } from "@chakra-ui/react";
import { NextPageContext } from "next";
import Head from "next/head";
import { AppShell } from "../components/AppShell";
import { useGPS } from "../hooks/useGPS";
import { Halte } from "../types";
import { api } from "../utils/requests";
import { Schedule } from "../views/schedule";

// TODO:
// 1. Ask for GPS location permission
// 2. Fetch closest Halte
// 3. Fetch closest Halte's bus schedule

const Header = () => {
  return <Heading>GOBES: Bukan GOBIS</Heading>;
};

const Footer = (props: ChakraProps) => {
  return (
    <Flex py={3} {...props} justifyContent="center">
      Dibuat dengan penuh kebencian
    </Flex>
  );
};

const NoGPS = () => {
  return (
    <VStack w="100%" alignItems="center" h="100%" direction="column" justifyContent={"center"}>
      <Text>Share GPS untuk supaya sistem dapat mencari halte terdekat.</Text>
      <Text>Tenang gak tak simpen cuk.</Text>
      <Button>Bagikan GPS</Button>
    </VStack>
  );
};

export default function Home({ allHalte }: { allHalte: Halte[] }) {
  const location = useGPS();

  return (
    <AppShell>
      <Head>
        <title>GOBES</title>
        <meta name="description" content="GOBES" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex mb={3}>
        <Header />
      </Flex>

      <Flex flexGrow={1} h="100%">
        {location.lat ? <Schedule allHalte={allHalte} location={location} /> : <NoGPS />}
      </Flex>
      <Footer></Footer>
    </AppShell>
  );
}

export async function getStaticProps(context: NextPageContext) {
  const res = await api.get("halte");
  const allHalte = await res.json();

  return {
    props: {
      allHalte,
    }, // will be passed to the page component as props
  };
}

import { Flex, Text, ChakraProps } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const Footer = (props: ChakraProps) => {
  return (
    <Flex {...props} justifyContent="center" bgColor="green.200">
      <Text fontSize={"xs"}>v2022-12-13</Text>
    </Flex>
  );
};

const AppShell = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <Flex justifyContent={"center"} w="100%">
      <Flex minH={"100vh"} width={["100vw", "100vw", "60em"]} {...props} direction={"column"}>
        <Flex direction="column" paddingX={3} flexGrow={1}>
          {children}
        </Flex>
        <Footer></Footer>
      </Flex>
    </Flex>
  );
};

export { AppShell };

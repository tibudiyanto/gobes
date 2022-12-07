import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";

const AppShell = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <Flex justifyContent={"center"} w="100%">
      <Flex
        paddingX={["3"]}
        minH={"100vh"}
        width={["100vw", "100vw", "60em"]}
        {...props}
        border="solid red 1px"
        direction={"column"}
      >
        {children}
      </Flex>
    </Flex>
  );
};

export { AppShell };

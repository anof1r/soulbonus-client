import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

export default function Loading() {
  return (
    <Center w="100vw" h="100vh" bg="purple.800">
      <Spinner color="white" size='xl'/>
    </Center>
  );
}

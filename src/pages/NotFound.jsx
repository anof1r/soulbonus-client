import { Box, Button, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Box h="100vh" textAlign="center">
      <Image
        src="https://i.pinimg.com/564x/7e/6a/6e/7e6a6edd9edea50c1273a6eb81d05ae9.jpg"
        w="100vw"
        mb="4em"
      />
      <Box textAlign="center" w="90vw" m="auto">
        <Text
          as="b"
          color="purple.800"
          fontSize="2xl"
          display="inline-block"
          pb="20px"
        >
          Your page didnt respond
        </Text>
        <Text
          fontSize="l"
          color="purple.600"
          w="80vw"
          m="auto"
          textAlign="center"
        >
          This page doesn't exisr or maybe fall a sleep! We suggest you back to
          home
        </Text>
      </Box>
      <Button
        h='4em'
        size="lg"
        color="white"
        bg="purple.800"
        w="90vw"
        position="absolute"
        bottom="7vh"
        m='auto'
        left='0'
        right='0'
      >
        <Link className="linkIsideBtn" to="/">Go home</Link>
      </Button>
    </Box>
  );
}

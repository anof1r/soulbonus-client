import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Image, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import Statistica from "./../image/cat.svg";

export default function MainMenu({ setUrlName }) {
  const walletAddress = useSelector((state) => state.wallet.address);
  const { address, isConnected } = useAccount();
  const navigate = useNavigate();
  const toClient = () => setUrlName("/client");

  return (
    <Box
      h="100vh"
      dropShadow="16px 16px 20px blue"
      bgImage="https://images.unsplash.com/photo-1532456745301-b2c645d8b80d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
    >
      <Box pt="5vh" textAlign="center">
        <Box
          h="1.5em"
          w="5em"
          m="auto"
          bg="purple.800"
          borderRadius="10px"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Text color="#fff" fontSize=".7em" fontWeight="500">
            SoulBonus
          </Text>
        </Box>
      </Box>
      <Box
        zIndex="10"
        textAlign="center"
        position="absolute"
        bottom="5vh"
        right="0"
        left="0"
      >
        {/* <Image w="100vw" m="auto" src={Statistica}></Image> */}
        <Box m="auto" w="80vw" mb="10vh" textAlign="center">
          <Text color="white" fontSize="2em" fontWeight="900">
            Lorem ipsum
            <span style={{ color: "#7a04ec", fontSize: "2em" }}>.</span>
          </Text>
          <Box m="auto" mt="1em" textAlign="center" w="60vw">
            <Text color="white" fontSize=".7em" fontWeight="700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At,
              rerum, maxime sunt eos debitis
            </Text>
          </Box>
        </Box>
        <Button
          mt="3em"
          h="8.5vh"
          fontSize="1.1em"
          size="lg"
          color="white"
          bg="purple.800"
          w="80vw"
          m="auto"
          onClick={() => {
            toClient();
            let route = isConnected ? "/client" : "/connection";
            navigate(route);
          }}
        >
          Get started
          <span className="material-symbols-outlined">arrow_right_alt</span>
        </Button>
      </Box>
      <Box
        h="50%"
        position="absolute"
        bottom="0"
        right="0"
        left="0"
        bgGradient="linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.004830917874396157) 100%)"
      ></Box>
    </Box>
  );
}

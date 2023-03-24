import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAccount } from 'wagmi';

export default function ProfileClientByWallet({
  disconnect,
  address,
  connector,
}) {
  const {isConnected} = useAccount()
  const navigate = useNavigate()
  console.log(isConnected);
  return (
    <Box w="80vw" m="auto">
      <Box fontWeight="800" fontSize='1.5em' mb='.5em' color='purple.800'>
        {`${address.substring(0, 5)}...${address.substring(10, 20)}`}
      </Box >
      <Box mb='3em' color='purple.600'>Connected to {connector.name}</Box>
      <Button
        display="flex"
        m="auto"
        w="80vw"
        mb="5vw"
        h="10vh"
        color="white"
        bg="purple.800"
        onClick={disconnect}
      >
        Disconnect
      </Button>
      <Button
        display="flex"
        m="auto"
        w="80vw"
        mb="5vw"
        h="10vh"
        color="white"
        bg="purple.800"
        onClick={() => navigate('/client')}
      >
        Return
      </Button>
    </Box>
  );
}

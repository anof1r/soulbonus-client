import {
  Box,
  Button,
  Heading,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect } from "wagmi";
// import {
//   checkUserExistance,
//   putNewClient,
// } from "../API/request/requestHandler";
import ConnectionButton from "../components/client/ConnectionButton";
import ProfileClientByWallet from "../components/client/ProfileClientByWallet";

export default function Connection() {
  const [isUserExist, setIsUserExist] = useState(null);
  const [Flag, setFlag] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, isConnected, connector } = useAccount();

  const { disconnect } = useDisconnect();

  // const checkCompanyDescription = as

  useEffect(() => {
    // if (Flag) {
    //   if (address) {
    //     dispatch({
    //       type: "SET_ADDRESS",
    //       payload: { address: address, type: "metamask" },
    //     });
    //     dispatch({
    //       type: "SET_WALLET",
    //       payload: { walletAddress: address },
    //     });
    //     checkUserExistance(address, setIsUserExist);
    //   }
    // }
  }, [address]);

  useEffect(() => {
    // if (Flag) {
    //   console.log(isUserExist);
    //   if (isUserExist) {
    //     navigate('/client');
    //   } else {
    //     putNewClient(address);
    //     navigate('/client');
    //   }
    // }
  }, [isUserExist]);

  return (
    <Box h="100vh" bg="gray.100">
      <Heading
        textAlign="center"
        color="purple.500"
        fontSize="4xl"
        pt="2em"
        mb="2em"
      >
        Connection Wallet
      </Heading>
      {isConnected ? (
        <ProfileClientByWallet
          connector={connector}
          disconnect={disconnect}
          address={address}
        ></ProfileClientByWallet>
      ) : (
        <ConnectionButton
          setFlag={setFlag}
          connectors={connectors}
          connect={connect}
          isLoading={isLoading}
          pendingConnector={pendingConnector}
        ></ConnectionButton>
      )}
    </Box>

  );
}

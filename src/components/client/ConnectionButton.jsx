import { Button } from "@chakra-ui/react";
import React from "react";

export default function ConnectionButton({connectors,connect,pendingConnector,isLoading,setFlag}) {
  return (
    <div>
      {connectors.map((connector) => (
        <Button
          display="flex"
          m="auto"
          w="80vw"
          mb="5vw"
          h="10vh"
          color="white"
          bg="purple.800"
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => {
            setFlag(true)
            connect({ connector })
          }}
        >
          {connector.name}
          {!connector.ready && " (unsupported)"}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            " (connecting)"}
        </Button>
      ))}
    </div>
  );
}

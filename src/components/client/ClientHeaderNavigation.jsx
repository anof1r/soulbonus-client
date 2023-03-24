import React from "react";
import { useNavigate } from "react-router-dom";
import { Text, Box } from "@chakra-ui/react";
export default function ClientHeaderNavigation() {
  const navigate = useNavigate();

  return (
    <Box
      position="absolute"
      w="100vw"
      h="10vh"
      display="flex"
      alignItems="center"
    >
      <Text
        ml="10%"
        onClick={() => {
          window.location.pathname === "/client"
            ? navigate(`/connection`)
            : navigate(`/client`);
        }}
        zIndex="10"
        className="material-symbols-outlined"
        id="arrow_back_ios"
        color={window.location.pathname === "/client" ? `black` : `white`}
        fontSize="1.4em"
      >
        {window.location.pathname === "/client" ? `logout` : `arrow_back_ios`}
      </Text>
    </Box>
  );
}

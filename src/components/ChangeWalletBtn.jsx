import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";

export default function ChangeWalletBtn({ conditionUrl }) {
  const navigate = useNavigate()
  let testUrl = window.location.pathname
  const [url, setUrl] = useState(window.location.pathname)
  const routHandler = () => {
    if(window.location.pathname === '/orgnization' || window.location.pathname === '/orgnization/'){
      navigate("/")
    } else if(window.location.pathname === '/orgnization/setting' || window.location.pathname === '/orgnization/setting/'){
      navigate("/orgnization")
    } else {
      navigate("/orgnization/setting")
    }
  }
  return (
    <Box>

        <Box
        onClick={routHandler}
          borderRadius="10px"
          pl="2px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="2em"
          w="2em"
          bg={conditionUrl ? "purple.500" : "inherit"}
          color="black"
          zIndex='10'
        >
          {conditionUrl ? (
            <span className="material-symbols-outlined" id="arrow_back_ios">
              logout
            </span>
          ) : (
            <span
              className="material-symbols-outlined black"
              id="arrow_back_ios"
            >
              arrow_back_ios
            </span>
          )}
        </Box>
      {/* </Link> */}
    </Box>
  );
}

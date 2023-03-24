import React from "react";
import {
  Box,
  Text,
  Heading,
  Image,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChakraBox } from "../AnimatedChakra/ChakraBox";
import { useNavigate } from "react-router-dom";

export default function CompanyMenu({
  filtredOrganization,
  setCompany,
  setSearchOrgnization,
}) {
  const navigate = useNavigate();
  return (
    <Box w="80%" m="auto" pt="10vh">
      <InputGroup mb="5vh" mt="1em">
        <InputLeftElement
          h="10vw"
          pointerEvents="none"
          children={<SearchIcon h="4vw" color="gray.500" />}
        />
        <Input
          boxShadow="-20px 12px 20vw 1px rgba(0, 0, 255, .2)"
          color="purple.800"
          fontSize="4vw"
          _placeholder={{ fontSize: "4vw", fontWeight: "normal" }}
          h="10vw"
          onChange={(e) => setSearchOrgnization(e.target.value)}
          variant="filled"
          bg="white"
          borderRadius="10px"
          type="tel"
          placeholder="Search"
        />
      </InputGroup>
      {/* <Text fontSize='1.3em' color='purple.800' display='inline-block' mb='4vh'>Orgnizations</Text> */}
      <Box
        maxH="65vh"
        overflowY="scroll"
        style={{ scrollbarWidth: "none" }}
        boxShadow="-20px 12px 30vw 1px rgba(0, 0, 255, .07)"
        bg="white"
        borderRadius="30px"
      >
        {filtredOrganization?.map((orgnization, index) => {
          return (
            <ChakraBox
              w="90%"
              m="auto"
              h="6em"
              mb="1em"
              key={index}
              onClick={() => {
                navigate(`/client/${orgnization.contractAddress}`);
                setCompany(orgnization);
              }}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              overflow="hidden"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.2 + index * 0.2 }}
            >
              <Box w="70%" display="flex" alignItems="center">
                <Image
                  bg="purple.300"
                  borderRadius="50%"
                  objectFit="cover"
                  w="12vw"
                  h="12vw"
                  mr="1em"
                  src={orgnization.avatarImg}
                />

                <Stack>
                  <Box>
                    <Heading size="1.6em" color="purple.900">
                      {orgnization.orgName}
                    </Heading>
                  </Box>
                  <Box>
                    <Text fontSize="4vw" color="purple.800">
                      {orgnization.silverTokenAmount}
                      <span style={{ color: "#afb1af" }}>
                        {" "}
                        / {orgnization.needsilvertokens}
                      </span>
                    </Text>
                  </Box>
                </Stack>
              </Box>
              <span
                className="material-symbols-outlined black"
                style={{ paddingRight: "10px" }}
              >
                arrow_forward_ios
              </span>
            </ChakraBox>
          );
        })}
      </Box>
    </Box>
  );
}

import { Box, Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import React, { useState, lazy, useEffect } from "react";
import { useAccount } from "wagmi";

import { ChakraBox } from "../AnimatedChakra/ChakraBox";
import silverToken from "./../../image/silverToken.png";
import goldToken from "./../../image/goldToken.png";
import axios from "axios";
import {useReadNameCompany,useReadBasicToConvertCompany,useGetUserBalanceBasicApp, useGetUserBalanceSuper} from '../../hooks/readAndEventFunc';

const QRModal = lazy(() => import("./QRModal"));
const Loading = lazy(() => import("./../../pages/Loading"));

export default function CompanyPage({}) {
  const pinataLink = useSelector((state) => state.wallet.pinataLink);
  const contractAddress = useSelector((state) => state.wallet.contractAddress);
  const { address } = useAccount();
  console.log(address);
  const [isLoading, setIsLoading] = useState(false);
  const [company, setCompany] = useState();
  
  const {nameCompanyAppData, nameCompanyStatus} = useReadNameCompany()
  const {basicToConvertAppData, basicToConvertLoading} = useReadBasicToConvertCompany()
  const {userBalanceBasicAppData, userBalanceBasicAppIsLoading} = useGetUserBalanceBasicApp(address)
  const {userBalanceSuperAppData, userBalanceSuperAppIsLoading} = useGetUserBalanceSuper(address)


  console.log(userBalanceBasicAppData);


  useEffect(() => {
    if (nameCompanyStatus == 'success' && basicToConvertLoading == 'success' && userBalanceSuperAppIsLoading == 'success' && userBalanceBasicAppIsLoading == 'success') {
      axios.get(`https://ipfs.io/ipfs/${pinataLink}`)
        .then(data => {
          console.log(data);
          let body = data.data
          setCompany({
            orgName: nameCompanyAppData,
            avatarImg: body.logoImage,
            bonusImage:body.bonusImage,
            silverTokenAmount: Number(userBalanceBasicAppData._hex),
            needsilvertokens: Number(basicToConvertAppData._hex),
            bgColor: body.bgColor,
            goldTokenAmount: Number(userBalanceSuperAppData._hex),
            description: body.description,
            contractAddress: contractAddress
          })
          setIsLoading(true)
        })
    }
  }, [nameCompanyStatus, basicToConvertLoading, userBalanceBasicAppIsLoading, userBalanceSuperAppIsLoading]);













  // useEffect(() => {
  //   // const fetchData = async () => {
  //   //   axios
  //   //     // .get(`http://localhost:3002/organization_info?orgWalletAddress=${window.location.pathname.split('/')[2]}&clientWalletAddress=${address}`)
  //   //     .get(
  //   //       `http://localhost:3002/organization_info?orgWalletAddress=${
  //   //         window.location.pathname.split("/")[2]
  //   //       }&clientWalletAddress=0x9b5327c77bf992376d7783e3a9a99bcb527c28e7`
  //   //     )
  //   //     .then((res) => {
  //   //       console.log(...res.data);
  //   //       setCompany(...res.data);
  //   //       setIsLoading(true);
  //   //     });
  //   // };
  //   // fetchData();
  // }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  if (!isLoading) {
    return <Loading></Loading>;
  }
  return (
    <ChakraBox
      key={company.orgName}
      bgColor={company.bgColor}
      h="100vh"
      pt="10vh"
    >
      <Box w="80vw" m="auto">
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Image
            objectFit="cover"
            bg="white"
            h="20vw"
            w="20vw"
            borderRadius="50%"
            src={company.avatarImg}
            mr="1em"
          ></Image>
          <Box>
            <Text
              as="b"
              display="block"
              w="50vw"
              fontSize="6vw"
              color="white"
              transition="0.5s linear"
            >
              {company.orgName}
            </Text>
          </Box>
        </Box>
        <Box
          m="auto"
          mt="5vw"
          display="flex"
          justifyContent="space-between"
          alignItems="start"
        >
          <Box>
            <Text fontSize="3.7vw" color="white">
              Silver token count
            </Text>
            <Text fontSize="5vw" color="white">
              {company.silverTokenAmount} / {company.needsilvertokens}
            </Text>
          </Box>
          <Box
            display="inline-flex"
            justifyContent="center"
            alignItems="end"
            h="8vw"
          >
            {Array.from(
              Array(company.silverTokenAmount + company.goldTokenAmount),
              (e, i) => {
                return (
                  <ChakraBox
                    className="silver-tokens-counter"
                    overflow="hidden"
                    key={i}
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.1 + i * 0.15 }}
                  >
                    <Image
                      h="6vw"
                      className="silver-tokens-counter"
                      src={
                        i < company.silverTokenAmount ? silverToken : goldToken
                      }
                    />
                  </ChakraBox>
                );
              }
            )}
          </Box>
        </Box>

        <Button
          fontWeight="2vw"
          display="block"
          w="100%"
          h="6vh"
          m="auto"
          mt="5vw"
          mb="15vw"
          colorScheme={company.goldTokenAmount ? "yellow" : "gray"}
          color="white"
          isActive={company.goldTokenAmount ? false : true}
          onClick={onOpen}
        >
          {company.goldTokenAmount ? "Get bonus" : "You have no gold token"}
        </Button>

        <Image src={company.bonusImage} borderTopRadius="30px"></Image>
        <ChakraBox
          p="1em"
          borderBottomRadius="30px"
          w="80vw"
          m="auto"
          display="flex"
          bg="white"
        >
          <Text
            display="inline-block"
            fontSize="4vw"
            minH="3em"
            color="purple.800"
            fontWeight='800'
          >
            {company.description}
          </Text>
        </ChakraBox>
      </Box>
      <QRModal
        setCompany={setCompany}
        isOpen={isOpen}
        onClose={onClose}
        URL={address}
      ></QRModal>
    </ChakraBox>
  );
}

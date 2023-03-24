import React, { useEffect, useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import { QRCodeSVG } from "qrcode.react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import ClientHeaderNavigation from "../components/client/ClientHeaderNavigation";
import ClientRoutes from "../components/client/ClientRoutes";
import Loading from "./Loading";
import axios from "axios";
import { useReadNameCompany, useReadBasicToConvertCompany, useGetUserBalanceBasicApp, useGetUserBalanceSuper } from '../hooks/readAndEventFunc';
import { useAccount } from 'wagmi';

export default function Client({ }) {
  const { isConnected, address } = useAccount()
  const [orgnization, setOrgnization] = useState([]);
  const [searchOrgnization, setSearchOrgnization] = useState("");
  const [thisCompany, setThisCompany] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const pinataLink = useSelector((state) => state.wallet.pinataLink);
  const contractAddress = useSelector((state) => state.wallet.contractAddress);

  const { nameCompanyAppData, nameCompanyStatus } = useReadNameCompany()
  const { basicToConvertAppData, basicToConvertLoading } = useReadBasicToConvertCompany()
  const { userBalanceBasicAppData, userBalanceBasicAppIsLoading } = useGetUserBalanceBasicApp(address)
  const { userBalanceSuperAppData, userBalanceSuperAppIsLoading } = useGetUserBalanceSuper(address)

  useEffect(() => {
    console.log(nameCompanyStatus,basicToConvertLoading,userBalanceSuperAppIsLoading,userBalanceBasicAppIsLoading);
    setIsLoaded(false)
    if (nameCompanyStatus == 'success' && basicToConvertLoading == 'success' && userBalanceSuperAppIsLoading == 'success' && userBalanceBasicAppIsLoading == 'success') {
      console.log(pinataLink);
      axios.get(`https://ipfs.io/ipfs/${pinataLink}`)
        .then(data => {
          let body = data.data
          console.log(body);
          setOrgnization([...orgnization, {
            orgName: nameCompanyAppData,
            avatarImg: body.logoImage,
            silverTokenAmount: Number(userBalanceBasicAppData._hex),
            needsilvertokens: Number(basicToConvertAppData._hex),
            bgColor: body.bgColor,
            goldTokenAmount: Number(userBalanceSuperAppData._hex),
            description: body.description,
            contractAddress: contractAddress
          }])
        })
        .then(()=> setIsLoaded(true))
    }
  }, [nameCompanyStatus, basicToConvertLoading, userBalanceBasicAppIsLoading, userBalanceSuperAppIsLoading]);

  const filtredOrganization = useMemo(() =>
    orgnization.filter(
      (org) => {
        return org.orgName
          .toLowerCase()
          .includes(searchOrgnization.toLowerCase());
      },
      [searchOrgnization]
    )
  );

  useEffect(() => {
    if (!isConnected) {
      navigate("/connection");
    }
  }, []);

  if (!isLoaded) {
    return <Loading></Loading>;
  } else {
    return (
      <Box h="100vh" bg="gray.50">
        <ClientHeaderNavigation></ClientHeaderNavigation>
        <ClientRoutes
          setThisCompany={setThisCompany}
          thisCompany={thisCompany}
          setSearchOrgnization={setSearchOrgnization}
          filtredOrganization={filtredOrganization}
        ></ClientRoutes>

        <Box
          borderColor="purple.200"
          borderWidth="1px"
          boxShadow={
            window.location.pathname === "/client"
              ? "0px 0px 30vw rgba(68, 51, 122)"
              : "0px 0px 10vw 0px #fff"
          }
          onClick={onOpen}
          position="fixed"
          bottom="1em"
          right="1em"
          w="4em"
          h="4em"
          bg="white"
          borderRadius="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "2em", zIndex: "10", color: "#44337A" }}
          >
            qr_code_scanner
          </span>
        </Box>

        <Modal isCentered isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent w="80vw">
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <QRCodeSVG
                style={{ margin: "auto" }}
                size={"50vw"}
                value={`mint::${address}`}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="purple"
                bg="purple.800"
                w="100%"
                h="3em"
                onClick={onClose}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    );
  }
}

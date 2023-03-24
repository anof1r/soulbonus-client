import React from 'react';
import { QRCodeSVG } from "qrcode.react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from 'react';
import { useAccount } from 'wagmi';

export default function QRModal({ isOpen, onClose, URL }) {
  const { address } = useAccount
  return (
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w="80vw">
        <ModalHeader textAlign="center"></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <QRCodeSVG
            style={{ margin: "auto" }}
            size={'50vw'}
            value={`burn::${URL}`}
          />

        </ModalBody>

        <ModalFooter>
          <Button colorScheme="purple" bg='purple.800' w="100%" h="3em" onClick={onClose}>
            Done
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

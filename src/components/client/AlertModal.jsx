import React from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import QRModal from "../QRModal";

export default function AlertModal({isModalOpen,onModalClose}) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const openQrModal = () => {
        isModalOpen;
        onOpen;
    }
    console.log(isModalOpen, onModalClose);
  return (
    <div>
      <Modal isCentered isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent w="80vw">
          <ModalHeader>Notification</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            After burn this token, you will receive a QR code with a lifetime of
            15 minutes. Are you sure you want to do this right now?
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="purple" w="100%" h="3em" onClick={openQrModal}>
              Burn
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <QRModal isOpen={isOpen} onClose={onClose} URL='https://reactjs.org/'></QRModal>


    </div>
  );
}

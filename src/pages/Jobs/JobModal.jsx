import {
  Button,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";

function JobModal(props) {
  return (
    <Modal
      preserveScrollBarGap
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent height="90%" w={"100vw"} m={0}>
        <ModalHeader textAlign={"center"}>{props.JobTitle}</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default JobModal;

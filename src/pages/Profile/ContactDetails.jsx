import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getTokens } from "../../services/localStorage";
import StateContext from "../../context/StateContext";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../services/api";

function ContactDetails(props) {
  const toast = useToast();
  const { localUserID, accessToken } = getTokens();
  const {
    userProfileData,
    setUserProfileData,
    decodedID,
    initialUserData,
    authTokens,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const contactData = {
      user: decodedID,
      phNumber: data.get("phone_number"),
      contactEmail: data.get("contact_email"),
      contactTel: data.get("tel_no"),
      subscription: userProfileData.subscription,
    };
    try {
      const res = await axios.put(`profileSelf/${decodedID}`, contactData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setLoading(false);

      setAllowClose(true);

      setUserProfileData(res.data);
    } catch (error) {
      setAllowClose(false);
      setLoading(false);
      console.log(error);
      if (error.response?.data?.contactEmail) {
        toast({
          title: "Enter a valid email address",
          status: "error",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: "Server error. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  useEffect(() => {
    const handleClose = () => {
      if (allowClose) {
        setAllowClose(false);
        setLoading(false);
        props.onClose();
      }
    };
    handleClose();
  }, [allowClose]);
  return (
    <Modal
      preserveScrollBarGap
      isCentered
      isOpen={props.isOpen}
      onClose={() => {
        setLoading(false);
        props.onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent
        height="90%"
        w={["100vw", "100vw", "80vw"]}
        m={0}
        as="form"
        onSubmit={(e) => handleFormSubmit(e)}
        noValidate
      >
        <Stack mb={25}>
          <ModalHeader textAlign={"center"}>Update contact details</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"}>
            <FormControl id="biography">
              <FormLabel>Phone number</FormLabel>
              <Input
                type="number"
                name="phone_number"
                defaultValue={
                  userProfileData?.phNumber || initialUserData?.phNumber
                }
              />
            </FormControl>
            <FormControl id="contact-email">
              <FormLabel>Contact email</FormLabel>
              <Input
                type="email"
                name="contact_email"
                defaultValue={
                  userProfileData?.contactEmail || initialUserData?.contactEmail
                }
              />
            </FormControl>
            <FormControl id="tel-no">
              <FormLabel>Telephone no.</FormLabel>
              <Input
                type="number"
                name="tel_no"
                defaultValue={
                  userProfileData?.contactTel || initialUserData?.contactTel
                }
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClose={() => {
              setLoading(false);
              props.onClose();
            }}
          >
            Close
          </Button>
          <Button type="submit" isLoading={loading}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ContactDetails;

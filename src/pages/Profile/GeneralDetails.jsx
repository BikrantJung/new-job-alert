import React, { useState } from "react";
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
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import StateContext from "../../context/StateContext";
import NewAxios from "../../utils/newAxios";
import { getTokens } from "../../services/localStorage";
import axios from "axios";
import { useEffect } from "react";
import AuthContext from "../../context/AuthContext";

function GeneralDetails(props) {
  const toast = useToast();
  const api = NewAxios();
  const { localUserID, accessToken } = getTokens();
  const { userProfileData, setUserProfileData, isExpired } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("CLICKED");
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const generalData = {
      user: localUserID,
      location: data.get("current_city"),
      birthPlace: data.get("home_town"),
      DateOfBirth: data.get("date_of_birth") || null,
      subscription: userProfileData.subscription,
    };
    try {
      const res = await api.put(`profileSelf/${localUserID}`, generalData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      setAllowClose(true);

      setUserProfileData(res.data);
    } catch (error) {
      setAllowClose(false);
      console.log(error);
      setLoading(false);
      toast({
        title: "Server Error. Please try again later.",
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

  console.log(userProfileData);
  return (
    <Modal
      preserveScrollBarGap
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
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
          <ModalHeader textAlign={"center"}>Update general details</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"}>
            <FormControl id="biography">
              <FormLabel>Current city</FormLabel>
              <Input
                type="text"
                name="current_city"
                defaultValue={userProfileData.location}
              />
            </FormControl>
            <FormControl id="biography">
              <FormLabel>Home town</FormLabel>
              <Input
                type="text"
                name="home_town"
                defaultValue={userProfileData.birthPlace}
              />
            </FormControl>
            <FormControl id="biography">
              <FormLabel>Date of birth</FormLabel>
              <Input
                type="date"
                name="date_of_birth"
                defaultValue={userProfileData.DateOfBirth}
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
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

export default GeneralDetails;

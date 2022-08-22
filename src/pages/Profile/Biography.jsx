import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import StateContext from "../../context/StateContext";
import { getTokens } from "../../services/localStorage";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import NewAxios from "../../utils/newAxios";
function Biography(props) {
  const toast = useToast();
  const api = NewAxios();
  const { localUserID, accessToken } = getTokens();
  const { userProfileData, setUserProfileData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const biographyData = {
      user: localUserID,
      bio: data.get("biography"),
      subscription: userProfileData.subscription,
    };

    try {
      const res = await api.put(`profile/${localUserID}`, biographyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      setAllowClose(true);

      setUserProfileData(res.data);
    } catch (error) {
      setAllowClose(false);
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
          <ModalHeader textAlign={"center"}>Update biography</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"}>
            <FormControl id="biography">
              <FormLabel>Your biography</FormLabel>
              <Textarea
                type="text"
                name="biography"
                defaultValue={userProfileData.bio}
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

export default Biography;

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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import StateContext from "../../context/StateContext";
import { getTokens } from "../../services/localStorage";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../services/api";
function WorkAreaModal(props) {
  const toast = useToast();
  const { localUserID, accessToken } = getTokens();
  const {
    userProfileData,
    setUserProfileData,
    initialUserData,
    setInitialUserData,
    decodedID,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const professionData = {
      user: decodedID,
      profession: data.get("profession"),
      subscription: userProfileData.subscription,
    };

    try {
      const res = await axiosInstance.put(
        `profileSelf/${decodedID}`,
        professionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setAllowClose(true);
      console.log(res);
      setInitialUserData(res.data);
      setUserProfileData([]);
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
      onClose={() => {
        setLoading(false);
        props.onClose();
      }}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        height="90%"
        w={["100vw", "100vw", "80vw"]}
        m={0}
        as="form"
        onSubmit={(e) => handleFormSubmit(e)}
        noValidate
        autoComplete="off"
      >
        <Stack mb={25}>
          <ModalHeader textAlign={"center"}>Update your title </ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"}>
            <FormControl id="biography">
              <FormLabel fontSize={[12, 13, 14, 15, 16, 17, 18]} as={"p"}>
                Enter a single sentence description of your professional
                skills/experience (e.g. Expert Web Designer)
              </FormLabel>
              <Input
                type="text"
                name="profession"
                defaultValue={
                  initialUserData?.profession || userProfileData?.profession
                }
              />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            mr={3}
            onClick={() => {
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

export default WorkAreaModal;

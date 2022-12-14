import {
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
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
function WorkAreaModal(props) {
  const toast = useToast();
  const {
    userProfileData,
    setUserProfileData,
    initialUserData,
    setInitialUserData,
    userID,
    authTokens,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const professionData = {
      user: userID,
      profession: data.get("profession") ? data.get("profession") : null,
      // subscription: userProfileData.subscription,
    };

    try {
      const res = await axios.put(`profileSelf/${userID}`, professionData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setLoading(false);
      setAllowClose(true);
      setInitialUserData(res.data);
      setUserProfileData([]);
      setUserProfileData(res.data);
    } catch (error) {
      console.log(error);
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

import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Icon,
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

  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import AuthContext from "../../context/AuthContext";
import axios from "axios";

function SocialMediaDetails(props) {
  const toast = useToast();
  const {
    userProfileData,
    setUserProfileData,
    initialUserData,
    userID,
    authTokens,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const socialData = {
      user: userID,
      facebook: data.get("facebook_link"),
      whatsapp: data.get("whatsapp_num"),
      twitter: data.get("twitter_link"),
      instagram: data.get("instagram_link"),
      subscription: userProfileData.subscription,
    };
    try {
      const res = await axios.put(`profileSelf/${userID}`, socialData, {
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
      >
        <Stack mb={25}>
          <ModalHeader textAlign={"center"}>
            Update social media details
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack px={5} gap={3}>
            <Stack boxShadow="lg" p={3} direction="row" align="center">
              <Icon
                as={FaFacebook}
                fontSize={30}
                _hover={{ cursor: "pointer" }}
                color={useColorModeValue("blue.600", "blue.300")}
                flex={1}
              />

              <Text flex={2}>facebook.com/</Text>
              <Input
                flex={3}
                type="text"
                name="facebook_link"
                focusBorderColor="inherit"
                sx={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid ",
                  borderRadius: 0,
                  paddingLeft: 0,
                }}
                defaultValue={
                  initialUserData?.facebook || userProfileData?.facebook
                }
              />
            </Stack>
            <Stack boxShadow="lg" p={3} direction="row" align="center">
              <Icon
                as={IoLogoWhatsapp}
                fontSize={30}
                _hover={{ cursor: "pointer" }}
                color={useColorModeValue("green.500", "green.300")}
                flex={1}
              />

              <Text flex={2}>Whatsapp num:</Text>
              <Input
                flex={3}
                type="number"
                name="whatsapp_num"
                focusBorderColor="inherit"
                sx={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid ",
                  borderRadius: 0,
                  paddingLeft: 0,
                }}
                defaultValue={
                  initialUserData?.whatsapp || userProfileData?.whatsapp
                }
              />
            </Stack>

            <Stack boxShadow="lg" p={3} direction="row" align="center">
              <Icon
                flex={1}
                as={FaInstagram}
                fontSize={30}
                _hover={{ cursor: "pointer" }}
                color={useColorModeValue("red.500", "red.300")}
              />

              <Text flex={2}>instagram.com/</Text>
              <Input
                flex={3}
                type="text"
                name="instagram_link"
                focusBorderColor="inherit"
                sx={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid ",
                  borderRadius: 0,
                  paddingLeft: 0,
                }}
                defaultValue={
                  initialUserData?.instagram || userProfileData?.instagram
                }
              />
            </Stack>
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

export default SocialMediaDetails;

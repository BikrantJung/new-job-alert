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
  Textarea,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { getTokens } from "../../services/localStorage";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

import AuthContext from "../../context/AuthContext";
import NewAxios from "../../utils/newAxios";

function SocialMeidaDetails(props) {
  const toast = useToast();
  const api = NewAxios();
  const { localUserID, accessToken } = getTokens();
  const { userProfileData, setUserProfileData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  console.log("ALLOW", allowClose);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const socialData = {
      user: localUserID,
      facebook: data.get("facebook_link"),
      whatsapp: data.get("whatsapp_num"),
      twitter: data.get("twitter_link"),
      instagram: data.get("instagram_link"),
      subscription: userProfileData.subscription,
    };
    try {
      const res = await api.put(`profileSelf/${localUserID}`, socialData, {
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
  console.log(userProfileData);
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
              />

              <Text>facebook.com/</Text>
              <Input
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
                defaultValue={userProfileData.facebook}
              />
            </Stack>
            <Stack boxShadow="lg" p={3} direction="row" align="center">
              <Icon
                as={IoLogoWhatsapp}
                fontSize={30}
                _hover={{ cursor: "pointer" }}
                color={useColorModeValue("green.500", "green.300")}
              />

              <Text>Whatsapp num:</Text>
              <Input
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
                defaultValue={userProfileData.whatsapp}
              />
            </Stack>
            <Stack boxShadow="lg" p={3} direction="row" align="center">
              <Icon
                as={FaTwitter}
                fontSize={30}
                _hover={{ cursor: "pointer" }}
                color={useColorModeValue("blue.500", "blue.200")}
              />

              <Text>twitter.com/</Text>
              <Input
                type="text"
                name="twitter_link"
                focusBorderColor="inherit"
                sx={{
                  outline: "none",
                  border: "none",
                  borderBottom: "1px solid ",
                  borderRadius: 0,
                  paddingLeft: 0,
                }}
                defaultValue={userProfileData.twitter}
              />
            </Stack>
            <Stack boxShadow="lg" p={3} direction="row" align="center">
              <Icon
                as={FaInstagram}
                fontSize={30}
                _hover={{ cursor: "pointer" }}
                color={useColorModeValue("red.500", "red.300")}
              />

              <Text>instagram.com/</Text>
              <Input
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
                defaultValue={userProfileData.instagram}
              />
            </Stack>
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

export default SocialMeidaDetails;

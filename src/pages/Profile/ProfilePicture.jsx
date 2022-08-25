import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
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
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Avatar1 from "../../images/avatar1.png";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import StateContext from "../../context/StateContext";
import { getTokens } from "../../services/localStorage";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../services/api";

function ProfilePicture(props) {
  const toast = useToast();
  const { localUserID, accessToken } = getTokens();
  const {
    userProfileData,
    setUserProfileData,
    initialUserData,
    setInitialUserData,
    decodedID,
    urlID,
  } = useContext(AuthContext);
  const [localImage, setLocalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const handleChange = (e) => {
    setAllowUpdate(true);
    setLocalImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };
  console.log("LOCAL ", localImage?.name);

  async function handleFormSubmit(e) {
    e.preventDefault();
    setAllowUpdate(false);
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const imgData = {
      user: decodedID,
      avatar: data.get("image"),
      subscription: initialUserData.subscription,
    };

    try {
      const res = await axiosInstance.put(`profileSelf/${decodedID}`, imgData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setAllowClose(true);
      console.log("RES IS ", res);
      // setInitialUserData([]);
      setInitialUserData(res.data);
      console.log("Fucking Data", initialUserData);
      setLocalImage(null);
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
  }

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

  const removePhoto = async () => {
    const data = {
      user: decodedID,
      avatar: null,
    };
    try {
      const res = await axios.put(`profile/${decodedID}`, data, {
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
      setAllowUpdate(true);
      toast({
        title: "Server Error. Please try again later.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
          <ModalHeader textAlign={"center"}>Update profile picture</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"}>
            <Avatar
              src={
                localImage ||
                initialUserData?.avatar ||
                `http://192.168.1.71:8000${userProfileData?.avatar}`
              }
              size="xl"
            />
          </Stack>
          <Stack my={10}>
            <Input
              type="file"
              id="file-upload"
              accept="image/*"
              name="image"
              hidden
              onChange={(e) => handleChange(e)}
            />

            <Button
              as={"label"}
              leftIcon={<AddIcon />}
              w="100%"
              htmlFor="file-upload"
              cursor={"pointer"}
            >
              Upload photo
            </Button>

            <Button leftIcon={<DeleteIcon />} onClick={removePhoto}>
              Remove photo
            </Button>
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
          <Button type="submit" isLoading={loading} disabled={!allowUpdate}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProfilePicture;

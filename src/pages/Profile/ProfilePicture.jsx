import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const { localUserID, accessToken } = getTokens();
  const {
    userProfileData,
    setUserProfileData,
    initialUserData,
    setInitialUserData,
    decodedID,
    urlID,
    authTokens,
  } = useContext(AuthContext);
  const [localImage, setLocalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const handleChange = (e) => {
    setAllowUpdate(true);
    setLocalImage(URL.createObjectURL(e.target.files[0]));
  };

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
      const res = await axios.put(`profileSelf/${decodedID}`, imgData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setLoading(false);
      setAllowClose(true);

      setInitialUserData(res.data);
      setUserProfileData([]);
      setUserProfileData(res.data);
      setLocalImage(null);
    } catch (error) {
      setAllowUpdate(true);
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
    setLocalImage(null);
    const data = {
      user: decodedID,
      avatar: null,
    };
    try {
      const res = await axios.put(`profileSelf/${decodedID}`, data, {
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
                `${userProfileData?.avatar}`
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

            <Button
              leftIcon={<DeleteIcon />}
              onClick={onOpen}
              disabled={!(localImage || userProfileData?.avatar)}
            >
              Remove photo
            </Button>
          </Stack>
          <>
            <AlertDialog
              isOpen={isOpen}
              leastDestructiveRef={cancelRef}
              onClose={onClose}
            >
              <AlertDialogOverlay>
                <AlertDialogContent>
                  <AlertDialogHeader fontSize="lg" fontWeight="bold">
                    Remove Profile Photo
                  </AlertDialogHeader>

                  <AlertDialogBody>
                    Are you sure you want to remove profile photo
                  </AlertDialogBody>

                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                      Cancel
                    </Button>
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        removePhoto();
                        onClose();
                      }}
                      ml={3}
                      leftIcon={<DeleteIcon />}
                    >
                      Remove
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </>
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

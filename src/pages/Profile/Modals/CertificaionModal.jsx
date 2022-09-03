import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Divider,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import axios from "axios";
import AuthContext from "../../../context/AuthContext";

function CertificationModal(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { userProfileData, userID, authTokens, moreUserData, setMoreUserData } =
    useContext(AuthContext);
  const [localImage, setLocalImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [removed, setRemoved] = useState(false);
  const handleChange = (e) => {
    setAllowUpdate(true);
    setLocalImage(URL.createObjectURL(e.target.files[0]));
  };
  async function handleFormSubmit(e) {
    e.preventDefault();
    setAllowUpdate(false);
    setLoading(true);
    setRemoved(false);
    const data = new FormData(e.currentTarget);
    const certificationCV = {
      euser: userID,
      certification: removed ? null : data.get("certificate_image"),
    };

    try {
      const res = await axios.put(
        `profileEduDetails/${userID}`,
        certificationCV,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );
      setLoading(false);
      setAllowClose(true);
      setMoreUserData(res.data);
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
  console.log(moreUserData?.certification);

  const removePhoto = async () => {
    setLocalImage(null);
    setRemoved(true);
    const certificationData = {
      euser: userID,
      certification: null,
    };
    try {
      const res = await axios.put(
        `profileEduDetails/${userID}`,
        certificationData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );
      setLoading(false);
      setAllowClose(true);
      setMoreUserData(res.data);
    } catch (error) {
      console.log("FKUCKING ERROR");
      setAllowClose(false);
      setLoading(false);
      setAllowUpdate(true);
      toast({
        title: "Server Errors. Please try again later.",
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
      scrollBehavior={"outside"}
      size="xl"
    >
      <ModalOverlay />
      <ModalContent
        // height="90%"
        w={["100vw", "100vw", "80vw"]}
        m={0}
        as="form"
        onSubmit={(e) => handleFormSubmit(e)}
        noValidate
        style={{ marginTop: "0rem" }}
      >
        <Stack>
          <ModalHeader textAlign={"center"}>Update certification</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Heading fontSize="lg" p={3} boxShadow="md" my={2}>
            Certificate Image
          </Heading>
          <Stack align="center" justify={"center"}>
            <Box width="70%">
              <Image src={localImage || moreUserData?.certification} />
            </Box>
          </Stack>
          <Stack my={5} direction="row" align="center" justify={"center"}>
            <Input
              type="file"
              id="file-upload"
              accept="image/*"
              name="certificate_image"
              hidden
              onChange={(e) => handleChange(e)}
            />

            <Button
              as={"label"}
              leftIcon={<AddIcon />}
              htmlFor="file-upload"
              cursor={"pointer"}
            >
              Upload photo
            </Button>

            <Button
              leftIcon={<DeleteIcon />}
              onClick={onOpen}
              disabled={!(localImage || moreUserData?.certification)}
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

export default CertificationModal;

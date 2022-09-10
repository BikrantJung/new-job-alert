import { AddIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import AuthContext from "../../../context/AuthContext";

function CertificationModal(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { userID, authTokens, moreUserData, setMoreUserData } =
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
    console.log(data.certification);
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
      console.log(res);
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

  console.log(moreUserData);
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
          <ModalHeader textAlign={"center"}>Update Certification</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack my={4} align="center" justify="center">
            <Stack align="center">
              <Stack
                alignItems="center"
                justifyContent="center"
                backgroundColor={"rgb(237, 241, 247)"}
                height="18rem"
                width={"18rem"}
                border="2px dashed"
                borderColor="gray.400"
                backgroundImage={localImage || moreUserData?.certification}
                backgroundSize={"cover"}
                backgroundRepeat={"no-repeat"}
                backgroundPosition="center center"
              >
                <Input
                  type="file"
                  id="certification-upload"
                  accept="image/*"
                  name="certificate_image"
                  hidden
                  onChange={(e) => handleChange(e)}
                />

                <Button
                  as={"label"}
                  leftIcon={<AddIcon />}
                  htmlFor="certification-upload"
                  cursor={"pointer"}
                  colorScheme="red"
                  borderRadius={0}
                  mb={5}
                >
                  Upload image
                </Button>
              </Stack>
            </Stack>
            <Text fontSize="14">
              Your image will be uploaded on its original size
            </Text>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            leftIcon={<AiOutlineReload />}
            onClick={onOpen}
            disabled={!(localImage || moreUserData?.certification)}
            size="sm"
            colorScheme="red"
            marginRight={"auto"}
          >
            Reset Data
          </Button>
          <Button
            variant="ghost"
            mr={3}
            size="sm"
            onClick={() => {
              setLoading(false);
              props.onClose();
            }}
          >
            Close
          </Button>
          <Button
            size="sm"
            type="submit"
            isLoading={loading}
            disabled={!allowUpdate}
            colorScheme="twitter"
          >
            Update
          </Button>
        </ModalFooter>
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Reset certification data
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to reset certification data
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
                  leftIcon={<AiOutlineReload />}
                >
                  Reset
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </ModalContent>
    </Modal>
  );
}

export default CertificationModal;

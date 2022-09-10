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
  HStack,
  Icon,
  Input,
  Link,
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
import { AiOutlineFileText, AiOutlineReload } from "react-icons/ai";
import AuthContext from "../../../context/AuthContext";
function CVModal(props) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const { userProfileData, userID, authTokens, moreUserData, setMoreUserData } =
    useContext(AuthContext);
  const [localFile, setlocalFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [allowUpdate, setAllowUpdate] = useState(false);
  const [removed, setRemoved] = useState(false);
  const handleChange = (e) => {
    setAllowUpdate(true);
    setlocalFile(e.target.files[0].name);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    setAllowUpdate(false);
    setLoading(true);
    setRemoved(false);
    const data = new FormData(e.currentTarget);
    const CVData = {
      euser: userID,
      cvUpload: removed ? null : data.get("cv_image"),
    };

    const sizeInMB = 5;
    if (CVData.cvUpload.size > 1048576 * sizeInMB) {
      toast({
        title: "File size limit exceeded",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      setAllowUpdate(true);
      setAllowClose(false);
    } else {
      try {
        const res = await axios.put(`profileEduDetails/${userID}`, CVData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        });
        setLoading(false);
        setAllowClose(true);
        setMoreUserData(res.data);
        setlocalFile(null);
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
    setlocalFile(null);
    setRemoved(true);
    const CVData = {
      euser: userID,
      cvUpload: null,
    };
    try {
      const res = await axios.put(`profileEduDetails/${userID}`, CVData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens?.accessToken}`,
        },
      });
      setLoading(false);
      setAllowClose(true);
      setMoreUserData(res.data);
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
  console.log(moreUserData?.cvUpload);
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
          <ModalHeader textAlign={"center"}>Update CV</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack my={4} align="center" justify="center">
            <Stack align="center">
              <Stack
                alignItems="center"
                justifyContent="center"
                bg={"rgb(237, 241, 247)"}
                height="18rem"
                width={"18rem"}
                border="2px dashed"
                borderColor="gray.400"
              >
                <Input
                  type="file"
                  id="file-upload"
                  accept=".pdf, .doc, .docx,.txt"
                  name="cv_image"
                  hidden
                  onChange={(e) => handleChange(e)}
                />

                <Button
                  as={"label"}
                  leftIcon={<AddIcon />}
                  htmlFor="file-upload"
                  cursor={"pointer"}
                  colorScheme="red"
                  borderRadius={0}
                  mb={5}
                >
                  Upload file
                </Button>
                <Text fontWeight={"bold"}>Supported files</Text>
                <HStack gap={1}>
                  <Text textTransform="uppercase" fontSize="13">
                    .pdf
                  </Text>
                  <Text textTransform="uppercase" fontSize="13">
                    .docx
                  </Text>
                  <Text textTransform="uppercase" fontSize="13">
                    .doc
                  </Text>
                  <Text textTransform="uppercase" fontSize="13">
                    .txt
                  </Text>
                </HStack>
                <Text fontWeight={"bold"} fontSize={14}>
                  Upto 5MB
                </Text>
              </Stack>

              {localFile ? (
                <Stack
                  bg="rgb(253, 220, 209)"
                  w="100%"
                  p={3}
                  borderRadius="md"
                  direction="row"
                  align="center"
                >
                  <Icon as={AiOutlineFileText} color="red" />

                  <Text>{localFile}</Text>
                </Stack>
              ) : moreUserData?.cvUpload ? (
                <>
                  <Icon as={AiOutlineFileText} color="red" />
                  <Link href={moreUserData?.cvUpload} target="_blank">
                    {moreUserData?.cvUpload?.split("/").slice(-1)[0]}
                  </Link>
                </>
              ) : (
                <Text>No file found</Text>
              )}
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button
            leftIcon={<AiOutlineReload />}
            onClick={onOpen}
            disabled={!(localFile || moreUserData?.cvUpload)}
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
                Reset CV data
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to reset CV data
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

export default CVModal;

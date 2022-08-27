import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Kbd,
  List,
  ListIcon,
  ListItem,
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
  useToast,
} from "@chakra-ui/react";
import StateContext from "../../context/StateContext";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { getTokens } from "../../services/localStorage";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../services/api";
import { IoMdCheckmarkCircle } from "react-icons/io";

function ExperienceModal(props) {
  const toast = useToast();
  const {
    userProfileData,
    setUserProfileData,
    initialUserData,
    setInitialUserData,
    decodedID,
    authTokens,
  } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [experienceList, setExperienceList] = useState(
    [...userProfileData?.workExperience] || []
  );

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    if (inputValue) {
      setExperienceList((prevValue) => {
        return [...prevValue, inputValue];
      });
    }
    setInputValue("");
    console.log("final", experienceList);
    const experienceData = {
      user: decodedID,
      workExperience: experienceList,
      subscription: userProfileData.subscription,
    };

    try {
      const res = await axiosInstance.put(
        `profileSelf/${decodedID}`,
        experienceData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens?.accessToken}`,
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
      console.log(error);
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

  function addList(e) {
    if (inputValue) {
      setExperienceList((prevValue) => {
        return [...prevValue, inputValue];
      });
      setInputValue("");
    }
  }

  function deleteItem(id) {
    const updatedItems = experienceList.filter((elem, index) => {
      return index !== id;
    });
    setExperienceList(updatedItems);
  }
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
          <ModalHeader textAlign={"center"}>
            Update your work experience{" "}
          </ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"}>
            <FormControl id="biography">
              <FormLabel fontSize={[12, 13, 14, 15, 16, 17, 18]} as={"p"}>
                Type a sentence and press <Kbd mx={1}>+</Kbd> icon
              </FormLabel>
              <Stack direction="row">
                <Input
                  type="text"
                  name="experience"
                  placeholder="Type your experience here"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <IconButton
                  icon={<AddIcon />}
                  onClick={addList}
                  disabled={loading}
                />
              </Stack>
            </FormControl>
          </Stack>
          <Stack direction="row" mt={4}>
            <List spacing={3} w="100%">
              {experienceList.map((item, index) => {
                return (
                  <ListItem
                    display={"flex"}
                    alignItems="center"
                    gap={2}
                    w="100%"
                    key={index}
                  >
                    <ListIcon
                      as={IoMdCheckmarkCircle}
                      color="rgb(29, 161, 242)"
                    />
                    <Text fontSize={(10, 11, 12, 13, 14, 15)}>{item}</Text>
                    <IconButton
                      icon={<DeleteIcon />}
                      fontSize={14}
                      size="sm"
                      marginLeft={"auto"}
                      onClick={() => deleteItem(index)}
                      disabled={loading}
                    />
                  </ListItem>
                );
              })}
            </List>
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

export default ExperienceModal;

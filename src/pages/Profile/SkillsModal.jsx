import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  HStack,
  IconButton,
  Input,
  Kbd,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Tag,
  TagLabel,
  TagRightIcon,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../services/api";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
function SkillsModal(props) {
  const toast = useToast();

  const { userProfileData, setUserProfileData, decodedID, setInitialUserData } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);

  const [inputValue, setInputValue] = useState("");
  const [skillsList, setSkillsList] = useState(
    [...userProfileData.skills] || []
  );

  function addList(e) {
    if (inputValue) {
      setSkillsList((prevValue) => {
        return [...prevValue, inputValue];
      });
      setInputValue("");
    }
  }

  function deleteItem(id) {
    const updatedItems = skillsList.filter((elem, index) => {
      return index !== id;
    });
    setSkillsList(updatedItems);
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("SKILLS LIST", skillsList);
    const data = new FormData(e.currentTarget);
    const skillsData = {
      user: decodedID,
      skills: skillsList,
      subscription: userProfileData.subscription,
    };

    try {
      const res = await axiosInstance.put(
        `profileSelf/${decodedID}`,
        skillsData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setAllowClose(true);
      setInitialUserData(res.data);
      console.log("SKILLS", res);
      setUserProfileData(res.data);
    } catch (error) {
      setAllowClose(false);
      console.log(error);
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
          <ModalHeader textAlign={"center"}>Update your skills</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"}>
            <FormControl id="biography">
              <FormLabel fontSize={[12, 13, 14, 15, 16, 17, 18]} as={"p"}>
                Type a skill and press <Kbd mx={1}>+</Kbd> icon
              </FormLabel>
              <Stack direction="row">
                <Input
                  type="text"
                  name="skills"
                  placeholder="Type your skills here"
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

          <HStack mt={3}>
            {skillsList?.length &&
              skillsList?.map((item, index) => {
                return (
                  <Tag key={index}>
                    <TagLabel>{item}</TagLabel>
                    <TagRightIcon
                      as={CloseIcon}
                      fontSize={8}
                      _hover={{ cursor: "pointer" }}
                      onClick={() => deleteItem(index)}
                    />
                  </Tag>
                );
              })}
          </HStack>
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

export default SkillsModal;

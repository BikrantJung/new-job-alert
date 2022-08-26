import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { getTokens } from "../../services/localStorage";
import AuthContext from "../../context/AuthContext";
import axiosInstance from "../../services/api";
import { CloseIcon } from "@chakra-ui/icons";
import { IoChevronDown } from "react-icons/io5";
function SkillsModal(props) {
  const toast = useToast();
  const { localUserID, accessToken } = getTokens();
  const { userProfileData, setUserProfileData, decodedID } =
    useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);
  const [tagValues, setTagValues] = useState([]);

  const [tagsOptions, setTagsOptions] = useState([
    {
      id: 1,
      value: "Web",
    },
    {
      id: 2,
      value: "Graphics",
    },
    {
      id: 3,
      value: "Internet",
    },
  ]);
  const [skillsValue, setSkillsValue] = useState("");

  const handleInputChange = (e) => {
    // setSkillsValue(e.target.value);
  };
  //   console.log(skillsValue);

  // Remove job tags and add to array
  const removeTags = (id) => {
    const removedItem = tagValues.filter((obj) => {
      return obj.id === id;
    });
    setTagsOptions((prevOptions) => {
      return [...prevOptions, ...removedItem];
    });
    setTagValues(
      tagValues.filter((obj) => {
        return obj.id !== id;
      })
    );
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const skillsData = {
      user: decodedID,
      skills: "sdf,sakdf",
      subscription: userProfileData.subscription,
    };
    let skillsArray = [];

    for (let index = 0; index < skillsData.skills.length; index++) {
      const element = skillsData.skills[index];
      skillsArray.push(element);
    }
    console.log("OLD ARRAY", skillsData.skills);
    console.log("NEW ARRAY", skillsArray);

    try {
      const res = await axiosInstance.put(
        `profileSelf/${decodedID}`,
        {
          user: decodedID,
          skills: skillsArray,
          subscription: userProfileData.subscription,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      setAllowClose(true);
      //   setInitialUserData(res.data);
      setUserProfileData([]);
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
          <Stack gap={2}>
            <Stack align="center" justify={"center"}>
              <FormControl id="biography">
                <FormLabel fontSize={[12, 13, 14, 15, 16, 17, 18]} as={"p"}>
                  Enter your skills separated by commas(e.g. Video
                  Editing,Designing,Web,Graphics )
                </FormLabel>
                <Input
                  type="text"
                  name="skills"
                  onChange={(e) => handleInputChange(e)}
                />
              </FormControl>
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

export default SkillsModal;

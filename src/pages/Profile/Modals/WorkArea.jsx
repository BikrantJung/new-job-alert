import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useState } from "react";
import MultiSelect from "../../../components/Multi Select/MultiSelect";
import AuthContext from "../../../context/AuthContext";
import { getTokens } from "../../../services/localStorage";
function WorkArea(props) {
  const toast = useToast();
  const { localUserID, accessToken } = getTokens();
  const { userProfileData, setUserProfileData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [allowClose, setAllowClose] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const data = new FormData(e.currentTarget);
    const biographyData = {
      user: localUserID,
      bio: data.get("biography"),
      subscription: userProfileData.subscription,
    };

    try {
      const res = await axios.put(`profileSelf/${localUserID}`, biographyData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);

      setAllowClose(true);

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
  }

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
        onSubmit={(e) => handleSubmit(e)}
        noValidate
      >
        <Stack mb={25}>
          <ModalHeader textAlign={"center"}>Tell us who are you</ModalHeader>
          <ModalCloseButton />
          <Divider />
        </Stack>
        <ModalBody>
          <Stack align="center" justify={"center"} direction='row'>
            <FormControl id="biography">
              <FormLabel>Your field of work</FormLabel>
              <Textarea
                type="text"
                name="biography"
                defaultValue={userProfileData.bio}
              />
            </FormControl>
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

export default WorkArea;

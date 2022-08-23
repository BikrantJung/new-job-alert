import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useState } from "react";
import AuthContext from "../../context/AuthContext";
import StateContext from "../../context/StateContext";
import Avatar1 from "../../images/avatar1.png";
import Biography from "./Biography";
import ContactDetails from "./ContactDetails";
import GeneralDetails from "./GeneralDetails";
import ProfilePicture from "./ProfilePicture";
import SocialMeidaDetails from "./SocialMediaDetails";

function EditProfile(props) {
  const [selectedModal, setSelectedModal] = useState("");
  const { userProfileData, setUserProfileData } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (e) => {
    setSelectedModal(e.target.value);
  };
  return (
    <Modal
      preserveScrollBarGap
      isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent>
        <Stack>
          <ModalHeader textAlign={"center"}>Edit profile</ModalHeader>
          <ModalCloseButton />
        </Stack>
        <Divider />
        <ModalBody>
          <Stack gap={2}>
            {/* Edit profile picture */}
            <Box>
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                boxShadow="md"
                p={2}
                mb={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  Profile Picture
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="picture"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
              </Stack>
              <Stack align="center" justify={"center"}>
                <Avatar src={userProfileData.avatar} size="xl" />
              </Stack>
              {selectedModal === "picture" && (
                <ProfilePicture isOpen={isOpen} onClose={onClose} />
              )}
            </Box>
            <Box>
              {/* Edit Bio */}
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                boxShadow="md"
                p={2}
                mb={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  Bio
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="bio"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                {selectedModal === "bio" && (
                  <Biography isOpen={isOpen} onClose={onClose} />
                )}
              </Stack>
              <Center
                px={4}
                my={3}
                color={useColorModeValue("gray.800", "gray.400")}
              >
                {userProfileData.bio}
              </Center>
            </Box>
            {/* Edit general details */}
            <Box>
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                boxShadow="md"
                p={2}
                mb={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  General Details
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="general_details"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                {selectedModal === "general_details" && (
                  <GeneralDetails isOpen={isOpen} onClose={onClose} />
                )}
              </Stack>
              <TableContainer px={3}>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td style={{ padding: 0 }}>Current city</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {" "}
                        {userProfileData.location}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Home town</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.birthPlace}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Date of Birth</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.DateOfBirth}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            {/* Contact Details */}
            <Box>
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                boxShadow="md"
                p={2}
                mb={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  Contact Details
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="contact_details"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                {selectedModal === "contact_details" && (
                  <ContactDetails isOpen={isOpen} onClose={onClose} />
                )}
              </Stack>
              <TableContainer px={3}>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td style={{ padding: 0 }}>Phone number</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.phNumber}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Contact email</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.contactEmail}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Tel no.</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.contactTel}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            {/* Social Media Details */}
            <Box>
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                boxShadow="md"
                p={2}
                mb={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  Social Medias
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="social_media_details"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                {selectedModal === "social_media_details" && (
                  <SocialMeidaDetails isOpen={isOpen} onClose={onClose} />
                )}
              </Stack>
              <TableContainer px={3}>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td style={{ padding: 0 }}>Facebook</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        <Link
                          href={`https://www.facebook.com/${userProfileData.facebook}`}
                          color="blue.400"
                          target="_blank"
                        >
                          {userProfileData.facebook}
                        </Link>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Whatsapp</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.whatsapp}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Twitter</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.twitter && (
                          <Link
                            href={`https://www.twitter.com/${userProfileData.twitter}`}
                            color="blue.400"
                            target="_blank"
                          >
                            {userProfileData.twitter}
                          </Link>
                        )}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Instagram</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData.instagram && (
                          <Link
                            href={`https://www.instagram.com/${userProfileData.instagram}`}
                            color="blue.400"
                            target="_blank"
                          >
                            {userProfileData.instagram}
                          </Link>
                        )}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={props.onClose}>
            Close
          </Button>
          <Button onClick={props.onClose}>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditProfile;

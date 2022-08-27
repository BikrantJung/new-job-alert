import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Link,
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
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Tr,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import AuthContext from "../../context/AuthContext";
import Biography from "./Biography";
import ContactDetails from "./ContactDetails";
import ExperienceModal from "./ExperienceModal";
import GeneralDetails from "./GeneralDetails";
import ProfilePicture from "./ProfilePicture";
import SkillsModal from "./SkillsModal";
import SocialMeidaDetails from "./SocialMediaDetails";
import WorkAreaModal from "./WorkAreaModal";

function EditProfile(props) {
  const [selectedModal, setSelectedModal] = useState("");
  const { userProfileData, setUserProfileData, initialUserData, urlID } =
    useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (e) => {
    setSelectedModal(e.target.value);
  };
  return (
    <Modal
      preserveScrollBarGap
      // isCentered
      isOpen={props.isOpen}
      onClose={props.onClose}
      scrollBehavior="outside"
      size="2xl"
    >
      <ModalOverlay
        bg="blackAlpha.300"
        backdropFilter="blur(10px) hue-rotate(90deg)"
      />
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
                p={2}
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
              <Divider />
              <Stack align="center" justify={"center"} my={3}>
                <Avatar
                  src={initialUserData?.avatar || userProfileData?.avatar}
                  size="xl"
                />
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
                p={2}
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
              <Divider />
              <Center
                px={4}
                my={3}
                color={useColorModeValue("gray.800", "gray.400")}
                fontWeight={userProfileData?.bio ? 700 : "inherit"}
              >
                {userProfileData?.bio ? userProfileData?.bio : "No bio to show"}
              </Center>
            </Box>

            <Box>
              {/* Edit Your Work */}
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                p={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  Your profession/skills
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="work_area"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                {selectedModal === "work_area" && (
                  <WorkAreaModal isOpen={isOpen} onClose={onClose} />
                )}
              </Stack>
              <Divider />
              <Center
                px={4}
                my={3}
                color={useColorModeValue("gray.800", "gray.400")}
                fontWeight={userProfileData?.profession ? 700 : "inherit"}
              >
                {userProfileData?.profession
                  ? userProfileData?.profession
                  : "No profession to show"}
              </Center>
            </Box>
            <Box>
              {/* Edit Your Work */}
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                p={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  Other skills
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="skills"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                {selectedModal === "skills" && (
                  <SkillsModal isOpen={isOpen} onClose={onClose} />
                )}
              </Stack>
              <Divider />
              <Center
                px={4}
                my={3}
                color={useColorModeValue("gray.800", "gray.400")}
                fontWeight={700}
              >
                {userProfileData?.skills?.map((item, index) => {
                  return (
                    <Tag key={index} m={1}>
                      {item}
                    </Tag>
                  );
                })}
              </Center>
            </Box>
            <Box>
              {/* Edit Your Work */}
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                p={2}
                mb={2}
              >
                <Text
                  fontSize={[16, 17, 18, 19, 20]}
                  fontWeight={500}
                  color={useColorModeValue("blue", "cyan.400")}
                >
                  Work Experience
                </Text>
                <Button
                  variant="ghost"
                  colorScheme={"blue"}
                  value="experience"
                  onClick={(e) => {
                    handleClick(e);
                    onOpen();
                  }}
                >
                  Edit
                </Button>
                {selectedModal === "experience" && (
                  <ExperienceModal isOpen={isOpen} onClose={onClose} />
                )}
              </Stack>
              <Divider />
              {userProfileData?.workExperience?.length ? (
                <Stack my={3}>
                  <List>
                    {userProfileData?.workExperience?.map((item, index) => {
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
                          <Text fontSize={(10, 11, 12, 13, 14, 15)}>
                            {item}
                          </Text>
                        </ListItem>
                      );
                    })}
                  </List>
                </Stack>
              ) : (
                <Center my={3}>No work experience to show</Center>
              )}
            </Box>
            {/* Edit general details */}
            <Box>
              <Stack
                direction="row"
                align="center"
                justify={"space-between"}
                p={2}
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
              <Divider />
              <TableContainer px={3} my={3}>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td style={{ padding: 0 }}>Current city</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {" "}
                        {userProfileData?.location || initialUserData?.location}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Home town</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.birthPlace ||
                          initialUserData?.birthplace}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Date of Birth</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.DateOfBirth ||
                          initialUserData?.DateOfBirth}
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
                p={2}
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
              <Divider />
              <TableContainer px={3} my={3}>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td style={{ padding: 0 }}>Phone number</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.phNumber || initialUserData?.phNumber}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Contact email</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.contactEmail ||
                          initialUserData?.phNumber}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Tel no.</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.contactTel ||
                          initialUserData?.phNumber}
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
                p={2}
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
              <Divider />
              <TableContainer px={3} my={3}>
                <Table variant="simple">
                  <Tbody>
                    <Tr>
                      <Td style={{ padding: 0 }}>Facebook</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        <Link
                          href={`https://www.facebook.com/${
                            initialUserData?.facebook ||
                            userProfileData?.facebook
                          }`}
                          color="blue.400"
                          target="_blank"
                        >
                          {initialUserData?.facebook ||
                            userProfileData?.facebook}
                        </Link>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Whatsapp</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {initialUserData?.whatsapp || userProfileData?.whatsapp}
                      </Td>
                    </Tr>

                    <Tr>
                      <Td style={{ padding: 0 }}>Instagram</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.instagram && (
                          <Link
                            href={`https://www.instagram.com/${
                              initialUserData?.instagram ||
                              userProfileData?.instagram
                            }`}
                            color="blue.400"
                            target="_blank"
                          >
                            {initialUserData?.instagram ||
                              userProfileData?.instagram}
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

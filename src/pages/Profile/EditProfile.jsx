import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  IconButton,
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
import { useNavigate } from "react-router-dom";
function EditProfile(props) {
  const navigate = useNavigate();
  const [selectedModal, setSelectedModal] = useState("");
  const { userProfileData, initialUserData } = useContext(AuthContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (e) => {
    setSelectedModal(e.target.value);
  };
  console.log("PROFILE");

  return (
    <Stack
      flex={7}
      style={{ marginInlineStart: 0 }}
      w="100%"
      overflow="auto"
      height="100vh"
    >
      <Stack p={5}>
        <Stack direction={"row"} align="center">
          <IconButton icon={<ArrowBackIcon />} onClick={() => navigate(-1)} />
          <Heading textAlign={"center"} style={{ margin: "0 auto" }}>
            Edit profile
          </Heading>
        </Stack>
        <Divider />
        <Stack>
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
                fontWeight={userProfileData?.skills?.length ? 700 : "inherit"}
              >
                {userProfileData?.skills?.length
                  ? userProfileData?.skills?.map((item, index) => {
                      return (
                        <Tag key={index} m={1}>
                          {item}
                        </Tag>
                      );
                    })
                  : "Not available"}
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
                <Center my={3}>Not available</Center>
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
                        {userProfileData?.location
                          ? userProfileData?.location
                          : "Not available"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Home town</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.birthPlace
                          ? userProfileData?.birthPlace
                          : "Not available"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Date of Birth</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.DateOfBirth
                          ? userProfileData?.DateOfBirth
                          : "Not available"}
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
                        {userProfileData?.phNumber
                          ? userProfileData?.phNumber
                          : "Not available"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Contact email</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.contactEmail
                          ? userProfileData?.contactEmail
                          : "Not available"}
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Tel no.</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.contactTel
                          ? userProfileData?.contactTel
                          : "Not available"}
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
                      <Td>
                        <Link
                          href={`https://www.facebook.com/${
                            userProfileData?.facebook ||
                            userProfileData?.facebook
                          }`}
                          color={
                            userProfileData?.facebook ? "blue.400" : "gray.400"
                          }
                          target="_blank"
                          _hover={
                            userProfileData?.facebook
                              ? {
                                  textDecoration: "underline",
                                  cursor: "pointer",
                                }
                              : { textDecoration: "none", cursor: "auto" }
                          }
                        >
                          {userProfileData?.facebook
                            ? userProfileData?.facebook
                            : "Not available"}
                        </Link>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td style={{ padding: 0 }}>Whatsapp</Td>
                      <Td color={useColorModeValue("gray.800", "gray.400")}>
                        {userProfileData?.whatsapp
                          ? userProfileData?.whatsapp
                          : "Not available"}
                      </Td>
                    </Tr>

                    <Tr>
                      <Td style={{ padding: 0 }}>Instagram</Td>
                      <Td>
                        {userProfileData?.instagram && (
                          <Link
                            href={`https://www.instagram.com/${
                              userProfileData?.instagram ||
                              userProfileData?.instagram
                            }`}
                            color={
                              userProfileData?.instagram
                                ? "blue.400"
                                : "gray.900"
                            }
                            target="_blank"
                            _hover={
                              userProfileData?.instagram
                                ? {
                                    textDecoration: "underline",
                                    cursor: "pointer",
                                  }
                                : { textDecoration: "none", cursor: "auto" }
                            }
                          >
                            {userProfileData?.instagram
                              ? userProfileData?.instagram
                              : "Not available"}
                          </Link>
                        )}
                      </Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default React.memo(EditProfile);

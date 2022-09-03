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
import SocialMediaDetails from "./SocialMediaDetails";
import WorkAreaModal from "./WorkAreaModal";
import { useNavigate } from "react-router-dom";
import EducationModal from "./Modals/EducationModal";
import CertificationModal from "./Modals/CertificaionModal";
import { getTokens } from "../../services/localStorage";
import StateContext from "../../context/StateContext";
import { useEffect } from "react";
import axios from "axios";
import CVModal from "./Modals/CVModal";
function EditProfile(props) {
  const navigate = useNavigate();
  const [selectedModal, setSelectedModal] = useState("");
  const { userProfileData, initialUserData, moreUserData, setMoreUserData } =
    useContext(AuthContext);
  const { isValidUser } = useContext(StateContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = (e) => {
    setSelectedModal(e.target.value);
  };
  useEffect(() => {
    const getMoreUserData = async () => {
      if (userProfileData?.user) {
        try {
          const res = await axios.get(
            `profileEduDetails/${userProfileData?.user}`
          );
          setMoreUserData(res.data);
        } catch (error) {}
      }
    };
    getMoreUserData();
  }, []);

  console.log("PROFILE");

  return (
    <>
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
                  boxShadow="md"
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
                  boxShadow="md"
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
                  color={userProfileData?.bio ? "gray.800" : "gray.400"}
                  fontWeight={userProfileData?.bio ? 700 : "inherit"}
                >
                  {userProfileData?.bio
                    ? userProfileData?.bio
                    : "No bio to show"}
                </Center>
              </Box>

              <Box>
                {/* Edit Your Work */}
                <Stack
                  direction="row"
                  align="center"
                  justify={"space-between"}
                  p={2}
                  boxShadow="md"
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
                  color={userProfileData?.profession ? "gray.800" : "gray.400"}
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
                  boxShadow="md"
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
                  color={
                    userProfileData?.skills?.length ? "gray.800" : "gray.400"
                  }
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
                  boxShadow="md"
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
                  <Center my={3} color="gray.400">
                    Not available
                  </Center>
                )}
              </Box>
              {/* Edit general details */}
              <Box>
                <Stack
                  direction="row"
                  align="center"
                  justify={"space-between"}
                  p={2}
                  boxShadow="md"
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
                        <Td
                          color={
                            userProfileData?.location ? "gray.800" : "gray.400"
                          }
                        >
                          {userProfileData?.location
                            ? userProfileData?.location
                            : "Not available"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Home town</Td>
                        <Td
                          color={
                            userProfileData?.location ? "gray.800" : "gray.400"
                          }
                        >
                          {userProfileData?.birthPlace
                            ? userProfileData?.birthPlace
                            : "Not available"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Date of Birth</Td>
                        <Td
                          color={
                            userProfileData?.DateOfBirth
                              ? "gray.800"
                              : "gray.400"
                          }
                        >
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
                  boxShadow="md"
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
                        <Td
                          color={
                            userProfileData?.phNumber ? "gray.800" : "gray.400"
                          }
                        >
                          {userProfileData?.phNumber
                            ? userProfileData?.phNumber
                            : "Not available"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Contact email</Td>
                        <Td
                          color={
                            userProfileData?.contactEmail
                              ? "gray.800"
                              : "gray.400"
                          }
                        >
                          {userProfileData?.contactEmail
                            ? userProfileData?.contactEmail
                            : "Not available"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Tel no.</Td>
                        <Td
                          color={
                            userProfileData?.contactTel
                              ? "blue.400"
                              : "gray.400"
                          }
                        >
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
                  boxShadow="md"
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
                    <SocialMediaDetails isOpen={isOpen} onClose={onClose} />
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
                            href={`https://www.facebook.com/${userProfileData?.facebook}`}
                            color={
                              userProfileData?.facebook
                                ? "blue.400"
                                : "gray.400"
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
                        <Td
                          color={
                            userProfileData?.facebook ? "blue.400" : "gray.400"
                          }
                        >
                          {userProfileData?.whatsapp
                            ? userProfileData?.whatsapp
                            : "Not available"}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td style={{ padding: 0 }}>Instagram</Td>
                        <Td>
                          <Link
                            href={`https://www.instagram.com/${userProfileData?.instagram}`}
                            color={
                              userProfileData?.instagram
                                ? "blue.400"
                                : "gray.400"
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
                              ? "OK"
                              : "Not available"}
                          </Link>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Education Details */}
              <Box>
                <Stack
                  direction="row"
                  align="center"
                  justify={"space-between"}
                  p={2}
                  boxShadow="md"
                >
                  <Text
                    fontSize={[16, 17, 18, 19, 20]}
                    fontWeight={500}
                    color={useColorModeValue("blue", "cyan.400")}
                  >
                    Education
                  </Text>
                  <Button
                    variant="ghost"
                    colorScheme={"blue"}
                    value="education_details"
                    onClick={(e) => {
                      handleClick(e);
                      onOpen();
                    }}
                  >
                    Edit
                  </Button>
                  {selectedModal === "education_details" && (
                    <EducationModal isOpen={isOpen} onClose={onClose} />
                  )}
                </Stack>
                <Divider />
                <TableContainer px={3} my={3}>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td style={{ padding: 0 }}>School</Td>
                        <Td
                          color={moreUserData?.school ? "gray.800" : "gray.400"}
                        >
                          {moreUserData?.school
                            ? moreUserData?.school
                            : "Not available"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Year</Td>
                        <Td
                          color={
                            moreUserData?.fromYear ? "gray.800" : "gray.400"
                          }
                        >
                          {moreUserData?.currentEdu
                            ? `Still studying from ${moreUserData?.fromYear}`
                            : ` From ${moreUserData?.fromYear} to

                          ${moreUserData?.toYear}`}
                        </Td>
                      </Tr>

                      <Tr>
                        <Td style={{ padding: 0 }}>Degree</Td>
                        <Td
                          color={moreUserData?.degree ? "gray.800" : "gray.400"}
                        >
                          {moreUserData?.degree
                            ? moreUserData?.degree
                            : "Not available"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Area of study</Td>
                        <Td
                          color={
                            moreUserData?.areaOfStudy ? "gray.800" : "gray.400"
                          }
                        >
                          {moreUserData?.areaOfStudy
                            ? moreUserData?.areaOfStudy
                            : "Not available"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Description</Td>
                        <Td>.....</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Certification and CV */}
              <Box>
                <Stack
                  direction="row"
                  align="center"
                  justify={"space-between"}
                  p={2}
                  boxShadow="md"
                >
                  <Text
                    fontSize={[16, 17, 18, 19, 20]}
                    fontWeight={500}
                    color={useColorModeValue("blue", "cyan.400")}
                  >
                    Certification
                  </Text>
                  <Button
                    variant="ghost"
                    colorScheme={"blue"}
                    value="certification"
                    onClick={(e) => {
                      handleClick(e);
                      onOpen();
                    }}
                  >
                    Upload
                  </Button>
                  {selectedModal === "certification" && (
                    <CertificationModal isOpen={isOpen} onClose={onClose} />
                  )}
                </Stack>
              </Box>
              <Box>
                <Stack
                  direction="row"
                  align="center"
                  justify={"space-between"}
                  p={2}
                  boxShadow="md"
                >
                  <Text
                    fontSize={[16, 17, 18, 19, 20]}
                    fontWeight={500}
                    color={useColorModeValue("blue", "cyan.400")}
                  >
                    CV
                  </Text>
                  <Button
                    variant="ghost"
                    colorScheme={"blue"}
                    value="cv"
                    onClick={(e) => {
                      handleClick(e);
                      onOpen();
                    }}
                  >
                    Upload
                  </Button>
                  {selectedModal === "cv" && (
                    <CVModal isOpen={isOpen} onClose={onClose} />
                  )}
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default React.memo(EditProfile);

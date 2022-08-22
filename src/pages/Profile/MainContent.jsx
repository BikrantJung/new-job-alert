import React, { useContext, useEffect } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Divider,
  Grid,
  GridItem,
  Stack,
  Badge,
  Button,
  MenuIcon,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Tooltip,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Skeleton,
} from "@chakra-ui/react";
import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import Avatar1 from "../../images/avatar1.png";
import AuthContext from "../../context/AuthContext";
import { Link as ReactLink } from "react-router-dom";
import EditProfile from "./EditProfile";
import NewAxios from "../../utils/newAxios";
import { getTokens } from "../../services/localStorage";
function MainContent() {
  const { userProfileData, setUserProfileData } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { localUserID, accessToken } = getTokens();

  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      <Stack px={{ base: 0, sm: 2, md: 5, lg: 10 }}>
        <Stack direction="row" align="center" pb={3} boxShadow="md" p={5}>
          <Avatar
            size={{ base: "md", sm: "md", md: "lg", lg: "xl" }}
            src={userProfileData.avatar}
          />
          <Stack align={"flex-start"}>
            <Text
              fontSize={{ base: 16, sm: 17, md: 18, lg: 20, xl: 22 }}
              fontWeight={"500"}
              style={{ marginTop: 0 }}
            >
              {userProfileData.username}
              <Badge
                colorScheme="green"
                ml={1}
                fontSize={{ base: 8, sm: 9, md: 11, lg: 13, xl: 14 }}
              >
                free
              </Badge>
            </Text>
          </Stack>
          <Stack
            direction={["column", "column", "row"]}
            style={{ marginLeft: "auto", alignSelf: "flex-end" }}
            display={"flex"}
          >
            <Link
              as={ReactLink}
              to="/create-job-post"
              _hover={{ textDecoration: "none" }}
            >
              <Button
                size={["xs", "sm", "sm", "md"]}
                leftIcon={<AddIcon fontSize={14} />}
                bg={useColorModeValue("gray.300", "gray.700")}
                _hover={{
                  bg: useColorModeValue("gray.200", "gray.600"),
                }}
              >
                Post a job
              </Button>
            </Link>
            <Button
              size={["xs", "sm", "sm", "md"]}
              leftIcon={<EditIcon />}
              bg={useColorModeValue("gray.300", "gray.700")}
              _hover={{
                bg: useColorModeValue("gray.200", "gray.600"),
              }}
              onClick={onOpen}
            >
              Edit profile
            </Button>
          </Stack>

          {/* Edit profile Overlay */}
          <EditProfile isOpen={isOpen} onClose={onClose} />
          {/*  */}
          <Stack
            flex={1}
            direction="row"
            align="center"
            justify={"flex-end"}
            gap={2}
            p={3}
            display={["flex", "flex", "none"]}
            sx={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            boxShadow={"md"}
            borderRadius={"md"}
          >
            <Tooltip
              label="Facebook"
              hasArrow
              display={["none", "none", "block"]}
            >
              <span>
                <Icon
                  as={FaFacebook}
                  fontSize={30}
                  _hover={{ cursor: "pointer" }}
                  color={useColorModeValue("blue.600", "blue.300")}
                />
              </span>
            </Tooltip>
            <Tooltip
              label="Whatsapp"
              hasArrow
              display={["none", "none", "block"]}
            >
              <span>
                <Icon
                  as={IoLogoWhatsapp}
                  fontSize={30}
                  _hover={{ cursor: "pointer" }}
                  color={useColorModeValue("green.500", "green.300")}
                />
              </span>
            </Tooltip>
            <Tooltip
              label="Twitter"
              hasArrow
              display={["none", "none", "block"]}
            >
              <span>
                <Icon
                  as={AiFillTwitterCircle}
                  fontSize={30}
                  _hover={{ cursor: "pointer" }}
                  color={useColorModeValue("blue.500", "blue.200")}
                />
              </span>
            </Tooltip>
            <Tooltip
              label="Instagram"
              hasArrow
              display={["none", "none", "block"]}
            >
              <span>
                <Icon
                  as={AiFillInstagram}
                  fontSize={30}
                  _hover={{ cursor: "pointer" }}
                  color={useColorModeValue("red.500", "red.300")}
                />
              </span>
            </Tooltip>
          </Stack>
        </Stack>

        <Stack
          p={2}
          my={2}
          direction="row"
          align={["center", "center", "stretch"]}
          justify="center"
          overflow={"hidden"}
        >
          <Stack
            direction="column"
            flex={1}
            align="flex-start"
            justify={"center"}
            py={4}
            display={["none", "none", "flex"]}
          >
            <Tooltip label="Facebook" hasArrow>
              <span>
                <Link
                  href={`https://www.facebook.com/${userProfileData.facebook}`}
                  color="blue.400"
                  target="_blank"
                >
                  <Icon
                    as={FaFacebook}
                    fontSize={30}
                    _hover={{ cursor: "pointer" }}
                    color={useColorModeValue("blue.600", "blue.300")}
                  />
                </Link>
              </span>
            </Tooltip>
            <Tooltip label={userProfileData.whatsapp} hasArrow>
              <span>
                <Icon
                  as={IoLogoWhatsapp}
                  fontSize={30}
                  _hover={{ cursor: "pointer" }}
                  color={useColorModeValue("green.500", "green.300")}
                />
              </span>
            </Tooltip>
            <Tooltip label="Twitter" hasArrow>
              <span>
                <Link
                  href={`https://www.twitter.com/${userProfileData.twitter}`}
                  color="blue.400"
                  target="_blank"
                >
                  <Icon
                    as={AiFillTwitterCircle}
                    fontSize={30}
                    _hover={{ cursor: "pointer" }}
                    color={useColorModeValue("blue.500", "blue.200")}
                  />
                </Link>
              </span>
            </Tooltip>
            <Tooltip label="Instagram" hasArrow>
              <span>
                <Link
                  href={`https://www.instagram.com/${userProfileData.instagram}`}
                  color="blue.400"
                  target="_blank"
                >
                  <Icon
                    as={AiFillInstagram}
                    fontSize={30}
                    _hover={{ cursor: "pointer" }}
                    color={useColorModeValue("red.500", "red.300")}
                  />
                </Link>
              </span>
            </Tooltip>
          </Stack>
          <Stack flex={3}>
            <Tabs align="center" variant="enclosed">
              <TabList>
                <Tab
                  _selected={{ bg: useColorModeValue("gray.300", "gray.600") }}
                  bg={useColorModeValue("gray.200", "gray.500")}
                  mx={2}
                >
                  General Details
                </Tab>
                <Tab
                  _selected={{ bg: useColorModeValue("gray.300", "gray.600") }}
                  bg={useColorModeValue("gray.200", "gray.500")}
                  mx={2}
                >
                  Contact Details
                </Tab>
              </TabList>
              <TabPanels boxShadow={"md"}>
                <TabPanel px={[2, 4, 6, 8, 10]}>
                  <TableContainer>
                    <Table variant="simple">
                      <Tbody>
                        <Tr>
                          <Td style={{ padding: 0 }}>Username</Td>
                          <Td>{userProfileData.username}</Td>
                        </Tr>
                        <Tr>
                          <Td style={{ padding: 0 }}>Current city</Td>
                          <Td>{userProfileData.location}</Td>
                        </Tr>
                        <Tr>
                          <Td style={{ padding: 0 }}>Home town</Td>
                          <Td>{userProfileData.birthPlace}</Td>
                        </Tr>
                        <Tr>
                          <Td style={{ padding: 0 }}>Date of Birth</Td>
                          <Td>{userProfileData.DateOfBirth}</Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </TabPanel>
                <TabPanel px={[2, 4, 6, 8, 10]}>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td style={{ padding: 0 }}>Phone number</Td>
                        <Td>{userProfileData.phNumber}</Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Contact email</Td>
                        <Td>{userProfileData.contactEmail}</Td>
                      </Tr>
                      <Tr>
                        <Td style={{ padding: 0 }}>Contact tel no.</Td>
                        <Td>{userProfileData.contactTel}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MainContent;

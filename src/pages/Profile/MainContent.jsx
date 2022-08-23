import React, { useContext, useState } from "react";
import {
  Avatar,
  Icon,
  useColorModeValue,
  Text,
  useDisclosure,
  Stack,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Tooltip,
  Button,
  Heading,
  IconButton,
  Tag,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";

import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp, IoMdCheckmarkCircle } from "react-icons/io";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import Avatar1 from "../../images/avatar1.png";
import AuthContext from "../../context/AuthContext";
import { Link as ReactLink } from "react-router-dom";
import EditProfile from "./EditProfile";
import NewAxios from "../../utils/newAxios";
import { getTokens } from "../../services/localStorage";
import RegisterAlert from "../../components/RegisterAlert";
import { Outlet } from "react-router-dom";
import DefaultContent from "./Content/DefaultContent";

function MainContent() {
  const { userProfileData, setUserProfileData } = useContext(AuthContext);
  const { userData } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { localUserID, accessToken } = getTokens();
  const [selectedMenu, setSelectedMenu] = useState("");
  const handeleSelectOption = (e) => {
    setSelectedMenu(e.target.value);
  };

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      align="start"
      justify={{ base: "center", md: "start" }}
      style={{ marginTop: 0 }}
      height="100%"
    >
      {/*  Left avatar section */}
      <Stack
        height={{ base: "auto", md: "100%" }}
        width={{ base: "100%", md: "auto" }}
        // height='20%'
        direction={{ base: "row", md: "column" }}
        px={{ base: 2, md: 5 }}
        boxShadow="md"
        bgColor={useColorModeValue("gray.200", "gray.700")}
        pt={{ base: 2, md: 4 }}
        flex={1}
        align="center"
        justify={{ base: "space-between", md: "flex-start" }}
      >
        <Stack
          direction={["column"]}
          align="center"
          py={1}
          justify={["center"]}
          px={{ base: 2, md: 5 }}
        >
          <Avatar
            size={{ base: "sm", sm: "lg", xl: "xl" }}
            src={userProfileData.avatar}
          />

          <Text
            fontSize={{ base: 16, sm: 17, md: 18, lg: 20, xl: 22 }}
            fontWeight={"bold"}
            style={{ marginTop: 0 }}
          >
            {userProfileData.username}
          </Text>
        </Stack>
        {/* Edit and Post Job */}
        <Button
          mt={{ base: 0, md: 3 }}
          colorScheme="twitter"
          size={{ base: "sm", md: "md" }}
        >
          Post a job
        </Button>

        {/* Social Media box Mobile */}
        <Stack
          flex={1}
          direction={{ base: "row", md: "column" }}
          align="center"
          gap={2}
          p={3}
          pt={{ base: 0, md: 9 }}
          display={{ base: "none", md: "flex" }}
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
          <Tooltip label="Twitter" hasArrow display={["none", "none", "block"]}>
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

      {/* Right profile panel */}
      <Outlet />
    </Stack>
  );
}

function General() {
  return (
    <Stack
      height="70vh"
      overflow="auto"
      p={3}
      boxShadow={"md"}
      style={{ marginLeft: "0" }}
    >
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Frontend Developer | Graphics Designer
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "auto" }} />
        </Stack>
        <Text fontSize={{ base: 13, md: 15 }}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Text>
      </Stack>
      <Divider borderTop="1px solid gray" />
      <Stack p={3} gap={1}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Skills
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "auto" }} />
        </Stack>
        <Stack direction="row">
          <Tag colorScheme={"twitter"}>Webs</Tag>
          <Tag colorScheme={"twitter"}>Graphics</Tag>
          <Tag colorScheme={"twitter"}>Editing</Tag>
        </Stack>
      </Stack>
      <Divider borderTop="1px solid gray" />
      <Stack p={3} gap={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Work Experience
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "auto" }} />
        </Stack>
        <Stack direction="row">
          <List spacing={3}>
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </ListItem>
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Assumenda, quia temporibus eveniet a libero incidunt suscipit
            </ListItem>
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
            {/* You can also use custom icons from react-icons */}
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default MainContent;

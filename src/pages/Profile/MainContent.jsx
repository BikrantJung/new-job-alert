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
  Skeleton,
  Box,
  SkeletonCircle,
} from "@chakra-ui/react";

import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp, IoMdCheckmarkCircle } from "react-icons/io";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";
import Avatar1 from "../../images/avatar1.png";
import AuthContext from "../../context/AuthContext";
import { Link as ReactLink } from "react-router-dom";
import EditProfile from "./EditProfile";
import { getTokens } from "../../services/localStorage";
import RegisterAlert from "../../components/RegisterAlert";
import { Outlet } from "react-router-dom";
import DefaultContent from "./Content/DefaultContent";

function MainContent() {
  const { userProfileData, initialUserData, urlID, encodedID } =
    useContext(AuthContext);
  const { localUserID } = getTokens();
  const { userData } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMenu, setSelectedMenu] = useState("");
  const handeleSelectOption = (e) => {
    setSelectedMenu(e.target.value);
  };

  const checkID =
    window.btoa(
      window.btoa(window.btoa(window.btoa(window.btoa(userProfileData?.user))))
    ) ||
    window.btoa(
      window.btoa(window.btoa(window.btoa(window.btoa(initialUserData?.user))))
    );

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      align="start"
      justify={{ base: "center", md: "start" }}
      style={{ marginTop: 0 }}
      height="100%"
      // align='center'
    >
      {/* {userProfileData?.username || initialUserData?.username ? : */}

      {/* { userProfileData?.username || initialUserData?.username } */}
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
        {userProfileData?.username || initialUserData?.username ? (
          <Stack
            direction={["column"]}
            align="center"
            py={1}
            justify={["center"]}
            px={{ base: 2, md: 5 }}
          >
            <Avatar
              size={{ base: "sm", sm: "lg", xl: "xl" }}
              src={
                urlID === initialUserData?.username
                  ? initialUserData?.avatar
                  : userProfileData?.avatar
              }
            />

            <Text
              fontSize={{ base: 16, sm: 17, md: 18, lg: 20, xl: 22 }}
              fontWeight={"bold"}
              style={{ marginTop: 0 }}
            >
              {urlID === initialUserData.username
                ? initialUserData?.username
                : userProfileData?.username}
            </Text>
          </Stack>
        ) : (
          <Stack
            direction={["column"]}
            align="center"
            py={1}
            justify={["center"]}
            px={{ base: 2, md: 5 }}
          >
            <SkeletonCircle size="20" />
            <Skeleton height="20px" width="100%" />
          </Stack>
        )}

        {/* Edit and Post Job */}
        {localUserID === checkID && (
          <Button
            mt={{ base: 0, md: 3 }}
            colorScheme="twitter"
            size={{ base: "sm", md: "md" }}
            variant={"ghost"}
            onClick={onOpen}
          >
            Edit Profile
          </Button>
        )}

        <EditProfile onOpen={onOpen} onClose={onClose} isOpen={isOpen} />

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

export default MainContent;

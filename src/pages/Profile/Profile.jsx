import React from "react";
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
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiSettings,
  FiMenu,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";

import { Link as ReactLink, Outlet, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ToggleMode from "../../components/ToggleMode";
import { AiOutlineUser } from "react-icons/ai";
import handleLogout from "../../utils/logoutUser";
import NewAxios from "../../utils/newAxios";
import { getTokens } from "../../services/localStorage";
import MainContent from "./MainContent";

export default function Profile({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    userProfileData,
    setUserProfileData,
    isExpired,
    allowData,
    setAllowData,
  } = useContext(AuthContext);
  const { localUserID, accessToken } = getTokens();
  const api = NewAxios();
  const { id } = useParams();
  console.log("ID", id);
  useEffect(() => {
    async function getUserProfileData() {
      try {
        const res = await api.get(`profile/Ramu`);
        console.log("User's data", res);
        console.log("HELLO HAHA");
        setUserProfileData([]);
        setUserProfileData(res.data);
        setAllowData(false);
      } catch (error) {
        console.log(error);
      }
    }

    getUserProfileData();
  }, [accessToken, isExpired]);
  console.log(userProfileData);
  return (
    <Stack
      minH="100vh"
      bg={useColorModeValue("gray.100", "gray.900")}
      direction="row"
    >
      <SidebarContent
        onClose={() => onClose}
        height="100vh"
        flex={1}
        display={{ base: "none", lg: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="xs"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Stack flex={4} style={{ marginInlineStart: "0" }}>
        <MobileNav onOpen={onOpen} />

        <MainContent />
      </Stack>
      {/* Main Content */}
    </Stack>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  // const[isActive,setIsActive]
  const LinkItems = [
    { name: "General Details", icon: FiHome, link: "" },
    { name: "Education", icon: FiTrendingUp, link: "education" },
    { name: "Favourites", icon: FiCompass, link: "favourites" },
    { name: "Payment History", icon: FiSettings, link: "payment-history" },
  ];
  return (
    <Box
      transition="200ms ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", lg: "auto" }}
      h="100%"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Link as={ReactLink} to="/">
          <Text fontSize="2xl" fontWeight="bold">
            Job Alert
          </Text>
        </Link>
        <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link
          as={ReactLink}
          to={`/profile/${link.link}`}
          key={link.name}
          _hover={{ textDecoration: "none" }}
        >
          <NavItem key={link.name} icon={link.icon} onClick={onClose}>
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "rgb(29, 161, 242)",
        color: "white",
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: "white",
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      // ml={{ base: 0, md: 60 }}
      // px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      px={4}
      {...rest}
      boxShadow={"base"}
    >
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", lg: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }} gap={3}>
        <ToggleMode />
        <Flex alignItems={"center"}>
          <ProfileMenu py={2} />
        </Flex>
      </HStack>
    </Flex>
  );
};
export const ProfileMenu = (props, { ...rest }) => {
  const { userProfileData, setUserProfileData } = useContext(AuthContext);
  const { localUserID } = getTokens();

  return (
    <Menu ml={3}>
      <MenuButton
        py={props.py}
        transition="all 0.3s"
        _focus={{ boxShadow: "none" }}
      >
        <HStack>
          <Avatar size={"sm"} src={userProfileData.avatar} />
          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            ml="2"
          >
            <Text fontSize="sm">{userProfileData.username}</Text>

            {/* <Text fontSize="xs" color="gray.600">
              {props.isAdmin ? "Admin" : ""}
            </Text> */}
          </VStack>
          <Box display={{ base: "none", md: "flex" }}>
            <FiChevronDown />
          </Box>
        </HStack>
      </MenuButton>
      <MenuList
        bg={useColorModeValue("white", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Link
          as={ReactLink}
          // to={`/profile/${userProfileData.username}`}
          to={
            userProfileData.username
              ? `/profile/${userProfileData.username}`
              : "/profile/error"
          }
          _hover={{ textDecoration: "none" }}
        >
          <MenuItem icon={<AiOutlineUser fontSize={18} />}>Profile</MenuItem>
        </Link>
        <Link as={ReactLink} to="/settings" _hover={{ textDecoration: "none" }}>
          <MenuItem icon={<FiSettings fontSize={18} />}>Settings</MenuItem>
        </Link>

        <MenuDivider />
        <MenuItem icon={<FiLogOut fontSize={18} />} onClick={handleLogout}>
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

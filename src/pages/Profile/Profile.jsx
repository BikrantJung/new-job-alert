import React, { ReactNode } from "react";
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
  Skeleton,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiLogOut,
} from "react-icons/fi";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link as ReactLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ToggleMode from "../../components/ToggleMode";
import {
  AiOutlineUser,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import handleLogout from "../../utils/logoutUser";
import Avatar1 from "../../images/avatar1.png";
import StateContext from "../../context/StateContext";
import NewAxios from "../../utils/newAxios";
import { getTokens } from "../../services/localStorage";
const LinkItems = [
  { name: "Profile", icon: FiHome, link: "" },
  { name: "Posts", icon: FiTrendingUp, link: "posts" },
  { name: "Favourites", icon: FiCompass, link: "favourites" },
  { name: "Payment History", icon: FiSettings, link: "payment-history" },
];

export default function Profile({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userProfileData, setUserProfileData, isExpired } =
    useContext(AuthContext);
  const { localUserID, accessToken } = getTokens();
  const api = NewAxios();

  useEffect(() => {
    async function getUserProfileData() {
      if (isExpired === false) {
        try {
          const res = await api.get(`profile/${localUserID}`);
          console.log(res);
          setUserProfileData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    }

    getUserProfileData();
  }, [accessToken, isExpired, localUserID]);
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Outlet />
      {/* Main Content */}
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontWeight="bold">
          Job Alert
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
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
        bg: "cyan.400",
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
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
      boxShadow={"base"}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <ToggleMode />
        <Flex alignItems={"center"}>
          <ProfileMenu py={2} />
        </Flex>
      </HStack>
    </Flex>
  );
};
export const ProfileMenu = (props) => {
  const { userProfileData, setUserProfileData } = useContext(AuthContext);
  return (
    <Menu>
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
        <Link as={ReactLink} to="/profile" _hover={{ textDecoration: "none" }}>
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

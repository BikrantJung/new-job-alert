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

import {
  Link as ReactLink,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import ToggleMode from "../../components/ToggleMode";
import { AiOutlineUser } from "react-icons/ai";
import handleLogout from "../../utils/logoutUser";
import { getTokens } from "../../services/localStorage";
import MainContent from "./MainContent";
import axios from "axios";
import axiosInstance from "../../services/api";

export default function Profile({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUserProfileData, setAllowData, setUrlID } =
    useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    setUrlID(id);
  }, []);

  useEffect(() => {
    setAllowData(false);
    async function getUserProfileData() {

      try {
        const res = await axios.get(`profile/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: null,
          },
        });

        setUserProfileData([]);
        setUserProfileData(res.data);
      } catch (error) {}
    }

    getUserProfileData();
  }, []);

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
        {/* <MobileNav onOpen={onOpen} /> */}

        <MainContent />
      </Stack>
      {/* Main Content */}
    </Stack>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { userProfileData } = useContext(AuthContext);
  // const[isActive,setIsActive]
  const LinkItems = [
    { name: "General Details", icon: FiHome, link: userProfileData?.username },
    {
      name: "Education",
      icon: FiTrendingUp,
      link: `${userProfileData?.username}/education `,
    },
    {
      name: "Favourites",
      icon: FiCompass,
      link: `${userProfileData?.username}/favourites `,
    },
    {
      name: "Payment History",
      icon: FiSettings,
      link: `${userProfileData?.username}/education `,
    },
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
export const ProfileMenu = (props) => {
  const { userProfileData, initialUserData } = useContext(AuthContext);
  return (
    <Menu ml={3}>
      <MenuButton
        py={props.py}
        transition="all 0.3s"
        _focus={{ boxShadow: "none" }}
      >
        <HStack>
          <Avatar
            size={"sm"}
            src={initialUserData?.avatar || userProfileData?.username}
          />
          <VStack
            display={{ base: "none", md: "flex" }}
            alignItems="flex-start"
            spacing="1px"
            ml="2"
          >
            <Text fontSize="sm">
              {initialUserData?.username || userProfileData?.username}
            </Text>

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
          to={`/profile/${
            initialUserData?.username || userProfileData?.username
          }`}
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

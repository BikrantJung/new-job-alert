import React from "react";
import {
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
import { FiSettings, FiChevronDown, FiLogOut } from "react-icons/fi";

import { Link as ReactLink, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { AiOutlineUser } from "react-icons/ai";
import handleLogout from "../../utils/logoutUser";
import MainContent from "./MainContent";
import axios from "axios";
import { TiBusinessCard } from "react-icons/ti";
import { BsBook } from "react-icons/bs";
import { BiBuildings } from "react-icons/bi";
import StateContext from "../../context/StateContext";
export default function Profile(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { setUserProfileData, setAllowData, setUrlID, setInitialUserData } =
    useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    setUrlID(id);
  }, [id]);

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

        console.log(res.data);
      } catch (error) {
        setUserProfileData([]);
        setInitialUserData([]);
        console.log(error);
      }
    }

    getUserProfileData();
  }, [id]);

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
    {
      name: "General Details",
      icon: AiOutlineUser,
      link: userProfileData?.username,
    },
    {
      name: "Education",
      icon: BsBook,
      link: `${userProfileData?.username}/education `,
    },
    {
      name: "Company Details",
      icon: TiBusinessCard,
      link: `${userProfileData?.username}/company-details `,
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

export const ProfileMenu = (props) => {
  const { userProfileData, initialUserData } = useContext(AuthContext);
  const { hasCompany, setHasCompany } = useContext(StateContext);
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
        <Link
          as={ReactLink}
          to="/create-company"
          _hover={{ textDecoration: "none" }}
        >
          <MenuItem icon={<BiBuildings fontSize={18} />}>
            {hasCompany ? "My company" : "Create Company"}
          </MenuItem>
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

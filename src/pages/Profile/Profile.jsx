import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiChevronDown, FiLogOut, FiMenu, FiSettings } from "react-icons/fi";

import axios from "axios";
import { useContext, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { BiBuildings } from "react-icons/bi";
import { BsBook } from "react-icons/bs";
import { TbCertificate } from "react-icons/tb";
import { TiBusinessCard } from "react-icons/ti";
import { Link as ReactLink, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import ServerErrorSVG from "../../components/ServerErrorSVG";
import AuthContext from "../../context/AuthContext";
import StateContext from "../../context/StateContext";
import handleLogout from "../../utils/logoutUser";
import MainContent from "./MainContent";
import CompanyLogo from "../../images/company_logo.png";

export default function Profile(props) {
  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);
  const {
    setUserProfileData,
    setAllowData,
    setUrlID,
    setInitialUserData,
    setMoreUserData,
    userProfileData,
  } = useContext(AuthContext);
  const { id } = useParams();
  useEffect(() => {
    setUrlID(id);
  }, [id]);

  useEffect(() => {
    setAllowData(false);
    async function getUserProfileData() {
      setShowContent(false);
      try {
        const res = await axios.get(`profile/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: null,
          },
        });

        setUserProfileData([]);
        setUserProfileData(res.data);
        setShowContent(true);
        setError(false);
        console.log(res.data);
      } catch (error) {
        setShowContent(true);
        setError(true);
        setUserProfileData([]);
        setInitialUserData([]);
      }
    }

    getUserProfileData();
  }, [id]);

  useEffect(() => {
    const getMoreUserData = async () => {
      if (userProfileData?.user) {
        console.log("HI HI HI");
        try {
          const res = await axios.get(
            `profileEduDetailsView/${userProfileData?.user}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: null,
              },
            }
          );
          setMoreUserData(res.data);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      }
    };
    getMoreUserData();
  }, [userProfileData.user]);

  return (
    <>
      {!showContent ? (
        <Loader />
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        <Stack
          minH="100vh"
          bg={colorMode === "light" ? "gray.100" : "gray.900"}
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
            <MobileNav onOpen={onOpen} display={{ base: "flex", lg: "none" }} />

            {/* Main Content */}
            <MainContent />
          </Stack>
        </Stack>
      )}
    </>
  );
}
const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, lg: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", lg: "flex-end" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Link as={ReactLink} to="/" w={{ base: "20vw", sm: "10vw", lg: "6vw" }}>
        <Image src={CompanyLogo} w={{ base: "100%" }} />
      </Link>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Flex alignItems={"center"}>
          <ProfileMenu py={2} />
        </Flex>
      </HStack>
    </Flex>
  );
};
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
      name: "Education & Work",
      icon: BsBook,
      link: `${userProfileData?.username}/education `,
    },
    {
      name: "Certification & CV",
      icon: TbCertificate,
      link: `${userProfileData?.username}/certification `,
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
        <Link as={ReactLink} to="/" w={{ base: "20vw", sm: "10vw", lg: "6vw" }}>
          <Image src={CompanyLogo} w={{ base: "100%" }} />
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
  const { userCompany, hasCompany } = useContext(StateContext);

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
          <MenuItem
            icon={<AiOutlineUser fontSize={{ base: 14, md: 18 }} />}
            fontSize={{ base: 14, md: 18 }}
          >
            Profile
          </MenuItem>
        </Link>
        <Link
          as={ReactLink}
          to={hasCompany ? `/company/${userCompany}` : "/create-company"}
          _hover={{ textDecoration: "none" }}
        >
          <MenuItem
            icon={<BiBuildings fontSize={{ base: 14, md: 18 }} />}
            fontSize={{ base: 14, md: 18 }}
          >
            {hasCompany ? "My company" : "Create Company"}
          </MenuItem>
        </Link>
        <Link as={ReactLink} to="/settings" _hover={{ textDecoration: "none" }}>
          <MenuItem
            icon={<FiSettings fontSize={{ base: 14, md: 18 }} />}
            fontSize={{ base: 14, md: 18 }}
          >
            Settings
          </MenuItem>
        </Link>

        <MenuDivider />
        <MenuItem
          icon={<FiLogOut fontSize={{ base: 14, md: 18 }} />}
          onClick={handleLogout}
          fontSize={{ base: 14, md: 18 }}
        >
          Log Out
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

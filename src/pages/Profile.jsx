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
  Divider,
  Grid,
  GridItem,
  Stack,
  Badge,
  Button,
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
} from "react-icons/fi";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { Link as ReactLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const LinkItems = [
  { name: "Profile", icon: FiHome, link: "" },
  { name: "Posts", icon: FiTrendingUp, link: "posts" },
  { name: "Favourites", icon: FiCompass, link: "favourites" },
  { name: "Payment History", icon: FiSettings, link: "payment-history" },
];

export default function Profile({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
export const Posts = () => {
  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      THIS IS POST
    </Box>
  );
};
export const MainContent = () => {
  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      <Stack px={{ base: 0, sm: 2, md: 5, lg: 10 }}>
        <Stack direction="row" align="center">
          <Avatar
            size={{ base: "md", sm: "md", md: "lg", lg: "xl" }}
            src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
          />
          <Stack align={"flex-start"}>
            <Text
              fontSize={{ base: 16, sm: 17, md: 18, lg: 20, xl: 22 }}
              fontWeight={"500"}
              style={{ marginTop: 0 }}
            >
              xebec
              <Badge
                colorScheme="green"
                ml={1}
                fontSize={{ base: 8, sm: 9, md: 11, lg: 13, xl: 14 }}
              >
                free
              </Badge>
            </Text>
            <Text
              style={{ marginTop: 0 }}
              fontSize={{ base: 14, sm: 15, md: 16, lg: 17, xl: 18 }}
            >
              user@email.com
            </Text>
          </Stack>
          <Stack
            direction="row"
            style={{ marginLeft: "auto", alignSelf: "flex-end" }}
            display={["none", "none", "flex"]}
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
            <Button
              size={["xs", "sm", "sm", "md"]}
              leftIcon={<EditIcon />}
              bg={useColorModeValue("gray.300", "gray.700")}
              _hover={{
                bg: useColorModeValue("gray.200", "gray.600"),
              }}
            >
              Edit profile
            </Button>
          </Stack>
        </Stack>
        <Divider bgColor="red" />
        <Text bgColor={["pink", "red", "blue", "green", "gray"]}>Hello</Text>
      </Stack>
    </Box>
  );
};

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
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link
          as={ReactLink}
          to={`/profile/${link.link}`}
          _hover={{ textDecoration: "none" }}
        >
          <NavItem key={link.name} icon={link.icon}>
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
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Justina Clark</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
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
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

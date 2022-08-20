import { useContext } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ToggleMode from "../ToggleMode";
import { AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import AuthContext from "../../context/AuthContext";
import { clearTokens } from "../../services/localStorage";
const Links = [
  {
    link: "/jobs",
    text: "Jobs",
  },
  {
    link: "/pricing",
    text: "Pricing",
  },
  {
    link: "/create-job-post",
    text: "Start Hiring",
  },
  {
    link: "/contact-us",
    text: "Contact us",
  },
];

const NavLink = (props) => (
  <Link
    as={ReactLink}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={props.link}
  >
    {props.children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { tokens } = useContext(AuthContext);
  const [authTokens, setAuthTokens] = tokens;
  const navigate = useNavigate();
  const handleLogout = () => {
    setTimeout(() => {
      clearTokens();
    }, 500);
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        sx={{ position: "sticky", top: 0, zIndex: 1000 }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Jobs Nepal</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.link} link={link.link}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"} gap="5">
            <ToggleMode />
            {authTokens.accessToken ? (
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar size={"sm"} src={""} />
                </MenuButton>
                <MenuList>
                  <Link
                    as={ReactLink}
                    to="/profile"
                    _hover={{ textDecoration: "none" }}
                  >
                    <MenuItem icon={<AiOutlineUser size={16} />}>
                      Profile
                    </MenuItem>
                  </Link>
                  <MenuItem icon={<FiSettings size={16} />}>Settings</MenuItem>
                  <MenuDivider />
                  <MenuItem
                    icon={<IoIosLogOut size={16} />}
                    onClick={handleLogout}
                  >
                    Log out
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link
                as={ReactLink}
                to="/login"
                _hover={{ textDecoration: "none" }}
              >
                <Button>Login</Button>
              </Link>
            )}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

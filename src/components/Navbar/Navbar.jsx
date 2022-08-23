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
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import ToggleMode from "../ToggleMode";
import { AiOutlineUser } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import AuthContext from "../../context/AuthContext";
import { clearTokens } from "../../services/localStorage";
import handleLogout from "../../utils/logoutUser";
import { ProfileMenu } from "../../pages/Profile/Profile";
import RegisterButton from "../RegisterButton";

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
    text: "Post a job",
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
  const { authTokens, userProfileData } = useContext(AuthContext);

  const navigate = useNavigate();


  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        sx={{ position: "sticky", top: 0, zIndex: 1500 }}
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
            <Box>
              <Link as={ReactLink} to="/">
                Jobs Nepal
              </Link>
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} link={link.link}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"} gap={[5]}>
            <ToggleMode />
            {authTokens.accessToken ? (
              !userProfileData.username ? (
                <ProfileMenu py={1} ml={3} />
              ) : (
                <Flex width={["auto", "auto", "100px"]} align="center" gap={1}>
                  <SkeletonCircle size={["9", "9", "10"]} />
                  <Skeleton
                    height="10px"
                    flex={1}
                    display={["none", "none", "block"]}
                  />
                </Flex>
              )
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
              {Links.map((link, index) => (
                <NavLink key={index} link={link.link}>
                  {link.text}
                </NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}

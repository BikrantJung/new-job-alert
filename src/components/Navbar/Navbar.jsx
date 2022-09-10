import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Image,
  Link,
  Skeleton,
  SkeletonCircle,
  Stack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link as ReactLink } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { ProfileMenu } from "../../pages/Profile/Profile";
import ToggleMode from "../ToggleMode";
import CompanyLogo from "../../images/company_logo.png";
const Links = [
  {
    link: "/jobs",
    text: "Jobs",
  },
  {
    link: "/blog",
    text: "Blog",
  },
  {
    link: "/contact-us",
    text: "Contact us",
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
    link: "/faq",
    text: "FAQs",
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
    fontSize={16}
  >
    {props.children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { authTokens, userProfileData, initialUserData } =
    useContext(AuthContext);

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        sx={{ position: "sticky", top: 0, zIndex: 1500 }}
      >
        <Flex alignItems={"center"} justifyContent={"space-between"} gap={4}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack alignItems={"center"} w="100%">
            <Link
              as={ReactLink}
              to="/"
              w={{ base: "20vw", sm: "10vw", md: "6vw" }}
            >
              <Image src={CompanyLogo} w={{ base: "100%" }} />
            </Link>

            <HStack
              as={"nav"}
              spacing={10}
              display={{ base: "none", md: "flex" }}
              style={{ marginLeft: "auto", marginRight: "auto" }}
            >
              {Links.map((link, index) => (
                <NavLink key={index} link={link.link}>
                  {link.text}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={"center"} gap={4}>
            <ToggleMode />
            {authTokens?.accessToken && initialUserData?.username ? (
              <ProfileMenu py={1} ml={3} />
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

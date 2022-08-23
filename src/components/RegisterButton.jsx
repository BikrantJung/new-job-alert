import {
  Avatar,
  Button,
  HStack,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactLink } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
function RegisterButton() {
  return (
    <Menu>
      <MenuButton transition="all 0.3s" _focus={{ boxShadow: "none" }}>
        <Button variant={"ghost"}>Register</Button>
      </MenuButton>
      <MenuList
        bg={useColorModeValue("white", "gray.900")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Link
          as={ReactLink}
          // to={`/profile/${userProfileData.username}`}
          to={`/company-register`}
          _hover={{ textDecoration: "none" }}
        >
          <MenuItem icon={<FiLogIn fontSize={18} />}>
            Company Register
          </MenuItem>
        </Link>
        <Link as={ReactLink} to="/settings" _hover={{ textDecoration: "none" }}>
          <MenuItem icon={<FiLogIn fontSize={18} />}>User Register</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
}

export default RegisterButton;

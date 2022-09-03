import React, { useContext, useState } from "react";
import {
  Avatar,
  Icon,
  useColorModeValue,
  Text,
  useDisclosure,
  Stack,
  Tooltip,
  Button,
  Skeleton,
  SkeletonCircle,
  Link,
} from "@chakra-ui/react";

import { FaFacebook } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";
import EditProfile from "./EditProfile";
import { getTokens } from "../../services/localStorage";
import { Link as ReactLink, Outlet } from "react-router-dom";

function MainContent() {
  const { userProfileData, initialUserData, urlID, userID } =
    useContext(AuthContext);

  const checkID = userProfileData?.user || initialUserData?.user;

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      align="start"
      justify={{ base: "center", md: "start" }}
      style={{ marginTop: 0 }}
      height="100%"
      // align='center'
    >
      {/*  Left avatar section */}
      <Stack
        height={{ base: "auto", md: "100%" }}
        width={{ base: "100%", md: "auto" }}
        // height='20%'
        direction={{ base: "row", md: "column" }}
        px={{ base: 2, md: 5 }}
        boxShadow="md"
        bgColor={useColorModeValue("gray.200", "gray.700")}
        pt={{ base: 2, md: 4 }}
        flex={1}
        align="center"
        justify={{ base: "space-between", md: "flex-start" }}
      >
        {userProfileData?.username || initialUserData?.username ? (
          <Stack
            direction={["column"]}
            align="center"
            py={1}
            justify={["center"]}
            px={{ base: 2, md: 5 }}
          >
            <Avatar
              size={{ base: "sm", sm: "lg", xl: "xl" }}
              src={
                urlID === initialUserData?.username
                  ? initialUserData?.avatar
                  : userProfileData?.avatar
              }
            />

            <Text
              fontSize={{ base: 16, sm: 17, md: 18, lg: 20, xl: 22 }}
              fontWeight={"bold"}
              style={{ marginTop: 0 }}
            >
              {urlID === initialUserData.username
                ? initialUserData?.username
                : userProfileData?.username}
            </Text>
          </Stack>
        ) : (
          <Stack
            direction={["column"]}
            align="center"
            py={1}
            justify={["center"]}
            px={{ base: 2, md: 5 }}
          >
            <SkeletonCircle size="20" />
            <Skeleton height="20px" width="100%" />
          </Stack>
        )}

        {/* Edit Profile*/}
        {userID === checkID && (
          <Link
            as={ReactLink}
            to="edit-profile"
            textDecoration="none"
            _hover={{ textDecoration: "none" }}
          >
            <Button
              mt={{ base: 0, md: 3 }}
              colorScheme="twitter"
              size={{ base: "sm", md: "md" }}
              variant={"ghost"}
            >
              Edit Profile
            </Button>
          </Link>
        )}

        {/* Social Media box Mobile */}

        <Stack
          flex={1}
          direction={{ base: "row", md: "column" }}
          align="center"
          gap={2}
          p={3}
          pt={{ base: 0, md: 9 }}
          display={{ base: "none", md: "flex" }}
        >
          <Tooltip
            label={
              userProfileData?.facebook
                ? userProfileData?.facebook
                : "No link found"
            }
            hasArrow
            display={["none", "none", "block"]}
          >
            <span>
              <Link
                href={`https://www.facebook.com/${userProfileData?.facebook}`}
                color="blue.400"
                target="_blank"
              >
                <Icon
                  as={FaFacebook}
                  fontSize={30}
                  _hover={{ cursor: "pointer" }}
                  color={useColorModeValue("blue.600", "blue.300")}
                />
              </Link>
            </span>
          </Tooltip>
          <Tooltip
            label={
              userProfileData?.whatsapp
                ? userProfileData?.whatsapp
                : "No number found"
            }
            hasArrow
            display={["none", "none", "block"]}
          >
            <span>
              <Icon
                as={IoLogoWhatsapp}
                fontSize={30}
                _hover={{ cursor: "pointer" }}
                color={useColorModeValue("green.500", "green.300")}
              />
            </span>
          </Tooltip>

          <Tooltip
            label={
              userProfileData?.instagram
                ? userProfileData?.instagram
                : "No link found"
            }
            hasArrow
            display={["none", "none", "block"]}
          >
            <span>
              <Link
                href={`https://www.instagram.com/${userProfileData?.instagram}`}
                color="blue.400"
                target="_blank"
              >
                <Icon
                  as={AiFillInstagram}
                  fontSize={30}
                  _hover={{ cursor: "pointer" }}
                  color={useColorModeValue("red.500", "red.300")}
                />
              </Link>
            </span>
          </Tooltip>
        </Stack>
      </Stack>

      {/* Right profile panel */}
      <Outlet />
    </Stack>
  );
}

export default React.memo(MainContent);

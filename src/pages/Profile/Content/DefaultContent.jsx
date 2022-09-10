import {
  Divider,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";

// import WorkArea from "../Modals/WorkArea";
import AuthContext from "../../../context/AuthContext";

function DefaultContent() {
  const { userProfileData, initialUserData } = useContext(AuthContext);
  return (
    <Stack flex={7} style={{ marginInlineStart: 0 }} w="100%">
      <Stack height="100%">
        <Tabs size="md" variant="enclosed" isFitted isLazy>
          <TabList gap={10}>
            <Tab borderRadius="0" fontWeight={"bold"}>
              General
            </Tab>
            <Tab borderRadius="0" fontWeight={"bold"}>
              Contact
            </Tab>
            <Tab borderRadius="0" fontWeight={"bold"}>
              About
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <General />
            </TabPanel>
            <TabPanel>
              <Contact />
            </TabPanel>
            <TabPanel>
              <About />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
}
function General() {
  const { initialUserData, urlID, userProfileData, userID } =
    useContext(AuthContext);

  return (
    <Stack overflow="auto" style={{ marginLeft: "0" }}>
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            {initialUserData?.username
              ? initialUserData?.profession
                ? initialUserData?.profession
                : "Add your profession"
              : parseInt(userID) === userProfileData?.user
              ? userProfileData?.profession
                ? userProfileData?.profession
                : "Add your profession"
              : "No profession to show"}
          </Heading>
        </Stack>

        <Text fontSize={{ base: 13, md: 15 }}>
          {urlID === initialUserData?.username
            ? initialUserData?.bio
              ? initialUserData?.bio
              : "Bio not available"
            : userProfileData?.bio
            ? userProfileData?.bio
            : "Bio not available"}
        </Text>
      </Stack>

      <Divider borderTop="1px solid gray" />
      <Stack p={3} gap={1}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Skills
          </Heading>
        </Stack>

        <Stack direction="row" width="100%">
          {userProfileData?.skills ? (
            userProfileData?.skills?.map((item, index) => {
              return (
                <Tag key={index} colorScheme="twitter">
                  {item}
                </Tag>
              );
            })
          ) : (
            <Text>No skills to show</Text>
          )}
        </Stack>
      </Stack>
      <Divider borderTop="1px solid gray" />
      <Stack p={3} gap={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Work Experience
          </Heading>
        </Stack>

        <Stack my={2}>
          {userProfileData?.workExperience ? (
            <List gap={1}>
              {userProfileData?.workExperience?.map((item, index) => {
                return (
                  <ListItem
                    display={"flex"}
                    alignItems="center"
                    gap={1}
                    w="100%"
                    key={index}
                  >
                    <ListIcon
                      as={IoMdCheckmarkCircle}
                      color="rgb(29, 161, 242)"
                    />
                    <Text fontSize={(10, 11, 12, 13, 14, 15)}>{item}</Text>
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Text>No work experience to show</Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
}

function Contact() {
  const { userProfileData } = useContext(AuthContext);
  return (
    <Stack overflow="auto" p={3} boxShadow={"md"} style={{ marginLeft: "0" }}>
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%" mb={2}>
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Contact Information
          </Heading>
        </Stack>

        <Stack direction="row" w="100%">
          <Stack flex={1}>
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Email
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Phone
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Telephone
            </Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
          <Stack flex={1}>
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.contactEmail
                ? userProfileData?.contactEmail
                : "Not available"}
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.phNumber
                ? userProfileData?.phNumber
                : "Not available"}
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.contactTel
                ? userProfileData?.contactTel
                : "Not available"}
            </Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
        </Stack>
      </Stack>
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%" mb={2}>
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Social Media
          </Heading>
        </Stack>
        <Stack direction="row" w="100%">
          <Stack flex={1}>
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Facebook
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Instagram
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Whatsapp
            </Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
          <Stack flex={1}>
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.facebook ? (
                <Link
                  href={`https://www.facebook.com/${userProfileData?.facebook}`}
                  color="blue.400"
                  target="_blank"
                >
                  {userProfileData?.facebook}
                </Link>
              ) : (
                "Not available"
              )}
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.instagram ? (
                <Link
                  href={`https://www.instagram.com/${userProfileData?.instagram}`}
                  color="blue.400"
                  target="_blank"
                >
                  {userProfileData?.instagram}
                </Link>
              ) : (
                "Not available"
              )}
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.whatsapp
                ? userProfileData?.whatsapp
                : "Not available"}
            </Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

function About() {
  const { userProfileData } = useContext(AuthContext);

  return (
    <Stack overflow="auto" p={3} boxShadow={"md"} style={{ marginLeft: "0" }}>
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%" mb={2}>
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            About
          </Heading>
        </Stack>

        <Stack direction="row" w="100%">
          <Stack flex={1}>
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Birthplace
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Current City
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontWeight={"bold"} fontSize={{ base: 13, md: 16 }}>
              Born in
            </Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
          <Stack flex={1}>
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.birthPlace
                ? userProfileData?.birthPlace
                : "Not available"}
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.location
                ? userProfileData?.location
                : "Not available"}
            </Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>
              {userProfileData?.DateOfBirth
                ? userProfileData?.DateOfBirth
                : "Not available"}
            </Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default DefaultContent;

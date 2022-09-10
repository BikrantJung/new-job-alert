import {
  Center,
  Divider,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import AuthContext from "../../../context/AuthContext";

function UserEducation() {
  return (
    <Stack flex={7} style={{ marginInlineStart: 0 }} w="100%">
      <Stack height="100%">
        <Tabs size="md" variant="enclosed" isFitted isLazy>
          <TabList gap={10}>
            <Tab borderRadius="0" fontWeight={"bold"}>
              Education Details
            </Tab>
            <Tab borderRadius="0" fontWeight={"bold"}>
              Work History
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <EducationDetails />
            </TabPanel>
            <TabPanel>
              <WorkHistory />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
}

function EducationDetails() {
  const { moreUserData } = useContext(AuthContext);
  return (
    <Stack overflow="auto" style={{ marginLeft: "0" }}>
      <Stack gap={2}>
        <Stack boxShadow="md" direction="column" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} p={3}>
            Graduation
          </Heading>
        </Stack>

        <Stack gap={1} p={3} pb={0}>
          <Heading fontSize="lg">School</Heading>
          <Text style={{ margin: 0 }}>
            {moreUserData?.currentEdu
              ? `Studying at ${moreUserData?.school} from ${moreUserData?.fromYear}`
              : `Studied at ${moreUserData?.school} from ${moreUserData?.fromYear} to ${moreUserData?.toYear}`}
          </Text>
        </Stack>
        <Divider
          borderBottomColor={useColorModeValue("gray.600", "gray.300")}
        />
        <Stack gap={1} p={3} pb={0}>
          <Heading fontSize="lg">Degree</Heading>
          <Text style={{ margin: 0 }}> {moreUserData?.degree} </Text>
        </Stack>
        <Divider
          borderBottomColor={useColorModeValue("gray.600", "gray.300")}
        />
        <Stack gap={1} p={3} pb={0}>
          <Heading fontSize="lg">Area of study</Heading>
          <Text style={{ margin: 0 }}> {moreUserData?.areaOfStudy}</Text>
        </Stack>
        <Divider
          borderBottomColor={useColorModeValue("gray.600", "gray.300")}
        />
        <Stack gap={1} p={3} pb={0}>
          <Heading fontSize="lg">Description</Heading>
          <Text
            style={{ margin: 0 }}
            maxW={"80%"}
            fontSize={14}
            textAlign="justify"
            pb={3}
          >
            {moreUserData?.eduDescription}
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

function WorkHistory() {
  const { userProfileData } = useContext(AuthContext);
  return (
    <Stack
      overflow="auto"
      // p={3}
      style={{ marginLeft: "0" }}
      // border="1px solid"
    >
      <Stack gap={2}>
        <Stack boxShadow="md" direction="column" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} p={3}>
            Employment History
          </Heading>
        </Stack>
        {userProfileData?.workExperience?.length ? (
          <Stack my={3}>
            <List>
              {userProfileData?.workExperience?.map((item, index) => {
                return (
                  <ListItem
                    display={"flex"}
                    alignItems="center"
                    gap={2}
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
          </Stack>
        ) : (
          <Center my={3} color="gray.400">
            Not available
          </Center>
        )}
      </Stack>
    </Stack>
  );
}

export default UserEducation;

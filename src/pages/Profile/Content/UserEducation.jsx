import {
  Divider,
  Heading,
  Link,
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
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { IoMdCheckmarkCircle, IoMdSettings } from "react-icons/io";
import { IoRefreshCircle } from "react-icons/io5";

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
  return (
    <Stack
      overflow="auto"
      // p={3}
      // height="100vh"
      // boxShadow={"md"}
      style={{ marginLeft: "0" }}
      // border="1px solid"
    >
      <Stack gap={2}>
        <Stack boxShadow="md" direction="column" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} p={3}>
            Graduation
          </Heading>
        </Stack>
        {/* {selectedModal === "work_area" && (
          <WorkArea onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
        )} */}
        {/* <Divider
          borderBottomColor={useColorModeValue("gray.600", "gray.300")}
        /> */}
        <Stack gap={1} p={3} pb={0}>
          <Heading fontSize="lg">School</Heading>
          <Text style={{ margin: 0 }}>
            Northeast University from 1994 to 2004
          </Text>
        </Stack>
        <Divider
          borderBottomColor={useColorModeValue("gray.600", "gray.300")}
        />
        <Stack gap={1} p={3} pb={0}>
          <Heading fontSize="lg">Degree</Heading>
          <Text style={{ margin: 0 }}>Msc.</Text>
        </Stack>
        <Divider
          borderBottomColor={useColorModeValue("gray.600", "gray.300")}
        />
        <Stack gap={1} p={3} pb={0}>
          <Heading fontSize="lg">Area of study</Heading>
          <Text style={{ margin: 0 }}>Computer Science</Text>
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
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </Stack>
      </Stack>
    </Stack>
  );
}

function WorkHistory() {
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
        <List spacing={3} pt={3}>
          <ListItem>
            <ListIcon as={IoRefreshCircle} color="green.500" />
            Worked at{" "}
            <Link href="#" color={"blue"}>
              Google
            </Link>{" "}
            from year 1990 to 2004 as a senior engineer.
          </ListItem>
        </List>
      </Stack>
    </Stack>
  );
}

export default UserEducation;

import React, { useContext, useState } from "react";
import {
  Avatar,
  Icon,
  useColorModeValue,
  Text,
  useDisclosure,
  Stack,
  Tab,
  TabList,
  Tabs,
  TabPanels,
  TabPanel,
  Tooltip,
  Button,
  Heading,
  IconButton,
  Tag,
  Divider,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { IoLogoWhatsapp, IoMdCheckmarkCircle } from "react-icons/io";
import { EditIcon, AddIcon } from "@chakra-ui/icons";

function DefaultContent() {
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
              Three
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
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
}
function General() {
  return (
    <Stack
      height="70vh"
      overflow="auto"
      p={3}
      boxShadow={"md"}
      style={{ marginLeft: "0" }}
    >
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Add your work area 
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "none" }} />
        </Stack>

        <Text fontSize={{ base: 13, md: 15 }}>Add bio</Text>
      </Stack>
      <Divider borderTop="1px solid gray" />
      <Stack p={3} gap={1}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Skills
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "auto" }} />
        </Stack>
        <Stack direction="row">
          <Tag colorScheme={"twitter"}>Webs</Tag>
          <Tag colorScheme={"twitter"}>Graphics</Tag>
          <Tag colorScheme={"twitter"}>Editing</Tag>
        </Stack>
      </Stack>
      <Divider borderTop="1px solid gray" />
      <Stack p={3} gap={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Work Experience
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "auto" }} />
        </Stack>
        <Stack direction="row">
          <List spacing={3}>
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Lorem ipsum dolor sit amet, consectetur adipisicing elit
            </ListItem>
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Assumenda, quia temporibus eveniet a libero incidunt suscipit
            </ListItem>
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
            {/* You can also use custom icons from react-icons */}
            <ListItem>
              <ListIcon as={IoMdCheckmarkCircle} color="rgb(29, 161, 242)" />
              Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Contact() {
  return (
    <Stack
      height="70vh"
      overflow="auto"
      p={3}
      boxShadow={"md"}
      style={{ marginLeft: "0" }}
    >
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Contact Information
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "auto" }} />
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
              Location
            </Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
          <Stack flex={1}>
            <Text fontSize={{ base: 13, md: 16 }}>user@email.com</Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>9848015700</Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>Matidevi Kathmand</Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
        </Stack>
      </Stack>
      <Stack p={3}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Social Media
          </Heading>
          <IconButton icon={<EditIcon />} style={{ marginLeft: "auto" }} />
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
            <Text fontSize={{ base: 13, md: 16 }}>user@email.com</Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>9848015700</Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>Matidevi Kathmandu</Text>
            <Divider borderTop="1px solid gray" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default DefaultContent;

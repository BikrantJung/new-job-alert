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
  Skeleton,
} from "@chakra-ui/react";
import { IoLogoWhatsapp, IoMdCheckmarkCircle } from "react-icons/io";
import { EditIcon, AddIcon } from "@chakra-ui/icons";
import EditIconBtn from "../../../components/EditIconBtn";
import WorkArea from "../Modals/WorkArea";
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
              About {userProfileData?.username || initialUserData?.username}
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState("");
  const { initialUserData, urlID, userProfileData, decodedID } =
    useContext(AuthContext);

  return (
    <Stack
      // height="70vh"
      overflow="auto"
      p={3}
      boxShadow={"md"}
      style={{ marginLeft: "0" }}
    >
      {userProfileData?.username || initialUserData?.username ? (
        <Stack p={3}>
          <Stack direction="row" align="center" width="100%">
            <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
              {initialUserData?.username
                ? initialUserData?.profession
                  ? initialUserData?.profession
                  : "Add your profession"
                : parseInt(decodedID) === userProfileData?.user
                ? userProfileData?.profession
                  ? userProfileData?.profession
                  : "Add your profession"
                : "No profession to show"}
            </Heading>
          </Stack>
          {selectedModal === "work_area" && (
            <WorkArea onOpen={onOpen} onClose={onClose} isOpen={isOpen} />
          )}
          <Text fontSize={{ base: 13, md: 15 }}>
            {urlID === initialUserData?.username
              ? initialUserData?.bio
              : userProfileData?.bio}
          </Text>
        </Stack>
      ) : (
        <Stack p={3}>
          <Skeleton width="50%" height="30px" />
          <Skeleton width="30%" height="10px" />
        </Stack>
      )}
      <Divider borderTop="1px solid gray" />
      <Stack p={3} gap={1}>
        <Stack direction="row" align="center" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }}>
            Skills
          </Heading>
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
            <Text fontSize={{ base: 13, md: 16 }}>user@email.com</Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>9848015700</Text>
            <Divider borderTop="1px solid gray" />
            <Text fontSize={{ base: 13, md: 16 }}>03125487</Text>
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

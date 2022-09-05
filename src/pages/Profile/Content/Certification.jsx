import {
  Box,
  Divider,
  Heading,
  Icon,
  Image,
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
import React from "react";
import { useContext } from "react";
import { IoRefreshCircle } from "react-icons/io5";
import AuthContext from "../../../context/AuthContext";
import { AiOutlineFileText } from "react-icons/ai";
function Certification() {
  return (
    <Stack flex={7} style={{ marginInlineStart: 0 }} w="100%">
      <Stack height="100%">
        <Tabs size="md" variant="enclosed" isFitted isLazy>
          <TabList gap={10}>
            <Tab borderRadius="0" fontWeight={"bold"}>
              Certification
            </Tab>
            <Tab borderRadius="0" fontWeight={"bold"}>
              CV
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Certificate />
            </TabPanel>
            <TabPanel>
              <CV />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </Stack>
  );
}

function Certificate() {
  const { moreUserData } = useContext(AuthContext);
  return (
    <Stack
      overflow="auto"
      height="80vh"
      // boxShadow={"md"}
      style={{ marginLeft: "0" }}
      // border="1px solid"
    >
      <Stack gap={2}>
        <Stack boxShadow="md" direction="column" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} p={3}>
            Certification
          </Heading>
        </Stack>

        <Stack gap={1} p={3} pb={0}>
          <List spacing={3}>
            <ListItem>
              <Box w="50%" mt={2}>
                <Image src={moreUserData?.certification} />
              </Box>
            </ListItem>
            <Divider
              borderBottomColor={useColorModeValue("gray.600", "gray.300")}
            />
          </List>
        </Stack>
      </Stack>
    </Stack>
  );
}

function CV() {
  const { moreUserData } = useContext(AuthContext);
  console.log(moreUserData);
  return (
    <Stack overflow="auto" style={{ marginLeft: "0" }}>
      <Stack gap={2}>
        <Stack boxShadow="md" direction="column" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} p={3}>
            CV
          </Heading>
        </Stack>

        {moreUserData?.cvUpload ? (
          <Stack gap={1} p={3} pb={0}>
            <Stack
              bg="teal.200"
              w="80%"
              p={3}
              borderRadius="md"
              direction="row"
              align="center"
            >
              <Icon as={AiOutlineFileText} color="black" />
              <Link href={moreUserData?.cvUpload} target="_blank">
                {moreUserData?.cvUpload?.split("/").slice(-1)[0]}
              </Link>
            </Stack>
          </Stack>
        ) : (
          ""
        )}
      </Stack>
    </Stack>
  );
}
export default Certification;

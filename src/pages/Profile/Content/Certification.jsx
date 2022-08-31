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
import { IoRefreshCircle } from "react-icons/io5";

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
              <Stack direction="row" align="center">
                <Icon as={IoRefreshCircle} color="green.500" />
                <Text>
                  Certified by{" "}
                  <Link href="#" color={"blue"}>
                    Google
                  </Link>{" "}
                  at year ____
                </Text>
              </Stack>

              <Box w="50%" mt={2}>
                <Image src="https://i.pinimg.com/736x/8f/ae/c3/8faec3a389cd628f24293abef4d3a26b.jpg" />
              </Box>
            </ListItem>
            <Divider
              borderBottomColor={useColorModeValue("gray.600", "gray.300")}
            />
            <ListItem>
              <Stack direction="row" align="center">
                <Icon as={IoRefreshCircle} color="green.500" />
                <Text>
                  Certified by{" "}
                  <Link href="#" color={"blue"}>
                    Google
                  </Link>{" "}
                  at year ____
                </Text>
              </Stack>

              <Box w="50%" mt={2}>
                <Image src="https://i.pinimg.com/736x/8f/ae/c3/8faec3a389cd628f24293abef4d3a26b.jpg" />
              </Box>
            </ListItem>
          </List>
        </Stack>
      </Stack>
    </Stack>
  );
}

function CV() {
  return (
    <Stack overflow="auto" style={{ marginLeft: "0" }}>
      <Stack gap={2}>
        <Stack boxShadow="md" direction="column" width="100%">
          <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} p={3}>
            CV
          </Heading>
        </Stack>

        <Stack gap={1} p={3} pb={0}>
          <Box w="50%" mt={2}>
            <Image src="https://i.pinimg.com/736x/8f/ae/c3/8faec3a389cd628f24293abef4d3a26b.jpg" />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}
export default Certification;

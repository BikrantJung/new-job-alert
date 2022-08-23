import {
  Box,
  Text,
  Stack,
  List,
  Button,
  useColorModeValue,
  Icon,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { AiOutlineDollar, AiOutlineTag } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
export default function RecentJobCard() {
  return (
    <Box
      maxW={"330px"}
      w={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"xl"}
      overflow={"hidden"}
    >
      <Stack
        textAlign={"center"}
        p={6}
        color={useColorModeValue("gray.800", "white")}
        align={"center"}
      >
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Stack>
            <Text fontSize="3xl">Frontend Developer</Text>
            <Text fontWeight={"bold"}>Invato Inc.</Text>
          </Stack>
        </Stack>
      </Stack>

      <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
        <List spacing={3}>
          <Stack direction="row" align={"center"}>
            <Icon as={GoLocation} color="blue.400" fontSize={20} />
            <Text>Maitidevi, Kathmandu</Text>
          </Stack>
          <Stack direction="row" align={"center"}>
            <Icon as={AiOutlineDollar} color="blue.400" fontSize={20} />
            <Text>289 - 399</Text>
          </Stack>
          <Stack direction="row" align={"center"}>
            <Icon as={MdWorkOutline} color="blue.400" fontSize={20} />
            <Text>Full Time</Text>
          </Stack>
          <Stack direction="row" align={"center"}>
            <Icon as={AiOutlineTag} color="blue.400" fontSize={20} />
            <Tag>
              <TagLabel>React Js</TagLabel>
            </Tag>
            <Tag>
              <TagLabel>Node Js</TagLabel>
            </Tag>
            <Tag>
              <TagLabel>Chakra UI</TagLabel>
            </Tag>
          </Stack>
        </List>

        <Button
          mt={10}
          w={"full"}
          bg={"blue.400"}
          color={"white"}
          rounded={"xl"}
          _hover={{
            bg: "blue.500",
          }}
          _focus={{
            bg: "blue.500",
          }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
}

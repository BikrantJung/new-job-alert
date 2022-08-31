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
export default function RecentJobCard(props) {
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
            <Text fontSize="3xl">{props.jobTitle}</Text>
            <Text fontWeight={"bold"}>{props.companyName}</Text>
          </Stack>
        </Stack>
      </Stack>

      <Box bg={useColorModeValue("gray.50", "gray.900")} px={6} py={10}>
        <List spacing={3}>
          <Stack direction="row" align={"center"}>
            <Icon as={GoLocation} color="blue.400" fontSize={20} />
            <Text>{props.location}</Text>
          </Stack>
          <Stack direction="row" align={"center"}>
            <Icon as={AiOutlineDollar} color="blue.400" fontSize={20} />
            <Text>
              ${props.minSalary} - ${props.maxSalary}
            </Text>
          </Stack>
          <Stack direction="row" align={"center"}>
            <Icon as={MdWorkOutline} color="blue.400" fontSize={20} />
            <Text>{props.jobType}</Text>
          </Stack>
          {props.jobTags?.length && (
            <Stack direction="row" align={"center"}>
              <Icon as={AiOutlineTag} color="blue.400" fontSize={20} />

              {props.jobTags?.map((item, i) => {
                return (
                  <Tag key={i}>
                    <TagLabel>{item.toUpperCase()}</TagLabel>
                  </Tag>
                );
              })}
            </Stack>
          )}
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
          View Details
        </Button>
      </Box>
    </Box>
  );
}

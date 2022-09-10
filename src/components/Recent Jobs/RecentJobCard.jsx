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
  Link,
  Image,
} from "@chakra-ui/react";
import { GoLocation } from "react-icons/go";
import { AiOutlineDollar, AiOutlineTag } from "react-icons/ai";
import { MdWorkOutline } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";
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
        <Stack align={"center"} justify={"center"}>
          <Stack>
            <Text fontSize="3xl">{props.jobTitle}</Text>
            <Text fontWeight={"bold"}>{props.companyName}</Text>
          </Stack>
          <Image src={props.companyLogo} width="50%" borderRadius="md" />
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
              {props.maxSalary
                ? ` $ ${props.minSalary} - $ ${props.maxSalary} `
                : `$ ${props.minSalary}`}
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
        <Link
          as={ReactLink}
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
          to={`/company/${props.companyName}/${props.jobTitle}/${props.jobID}`}
        >
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
        </Link>
      </Box>
    </Box>
  );
}

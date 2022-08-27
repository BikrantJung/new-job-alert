import {
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Icon,
  Image,
  Link,
  Skeleton,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useDisclosure,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import JobImage from "../../images/job-image.jpg";
import { GoLocation } from "react-icons/go";
import { AiOutlineDollar, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link as ReactLink } from "react-router-dom";
import JobModal from "./JobModal";
function JobCard(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedModal, setSelectedModal] = useState("");
  const handleClick = (e) => {
    setSelectedModal(e.target.value);
  };
  const handleProfileClick = (name) => {
  };
  return (
    <Stack
      direction={["column-reverse", "column-reverse", "row"]}
      width={["80%", "60%", "70%"]}
      boxShadow={"md"}
    >
      <JobModal
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        JobTitle={props.JobTitle}
      />
      <Stack
        flex={1}
        p={[2, 3]}
        align="flex-start"
        position="relative"
        style={{ paddingBottom: 0 }}
      >
        <CustomText fontSize={[18, 19, 20, 21, 22]} fontWeight="bold">
          {props.JobTitle}
        </CustomText>
        {/* <Link
          as={ReactLink}
          to={`/profile/${props.UserName}`}
          id={props.userID}
        >
          <Stack direction={"row"} align="center">
            <Icon as={AiOutlineUser} color="red" fontSize={20} />
            <CustomText
              fontSize={[11, 11, 13, 14, 15]}
              color={useColorModeValue("green")}
              as="em"
              onClick={() => handleProfileClick(props.user)}
            >
              @{props.UserName}
            </CustomText>
          </Stack>
        </Link> */}

        <Stack direction={"row"} align="center">
          <Icon as={GoLocation} color="green.400" fontSize={20} />
          <CustomText fontSize={[13, 14, 15, 16, 17]}>
            {props.JobLocation}
          </CustomText>
        </Stack>
        <Stack direction="row" align={"center"}>
          <Icon as={AiOutlineDollar} color="green.400" fontSize={20} />
          <CustomText>
            ${props.SalaryMin} - ${props.SalaryMax}
          </CustomText>
        </Stack>
        <Stack direction="row" align={"center"}>
          <Icon as={AiOutlineMail} color="green.400" fontSize={20} />
          <CustomText>{props.JobEmail}</CustomText>
        </Stack>

        <CustomText
          textAlign="center"
          fontWeight="bold"
          fontSize={[10, 11, 12, 13, 14]}
          color={useColorModeValue("cyan.900", "cyan.200")}
          as={"em"}
          style={{ margin: "1rem" }}
        >
          {props.JobDescription}
        </CustomText>

        <Button
          style={{ marginTop: "auto", marginBottom: "1rem" }}
          colorScheme="green"
        >
          Apply now
        </Button>

        <Stack
          direction="row"
          align="center"
          bg={useColorModeValue("gray.100", "gray.700")}
          width="100%"
          style={{ marginTop: "auto" }}
        >
          <Button variant="ghost">Job tags</Button>
          <Stack direction={"row"} align="center">
            {props.JobTags.map((item) => {
              return (
                <Badge key={item} colorScheme="facebook">
                  {" "}
                  {item}{" "}
                </Badge>
              );
            })}
          </Stack>
        </Stack>
      </Stack>
      <Stack flex={1}>
        <Image
          src={props.JobCategoryImage || props.JobImage}
          height="100%"
          w="100%"
          p={1}
        />
      </Stack>
    </Stack>
  );
}

const CustomText = ({ children, ...rest }) => {
  return (
    <Text style={{ marginTop: "0" }} {...rest}>
      {children}
    </Text>
  );
};

export default JobCard;

import {
  Box,
  Button,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineDollar, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { Link as ReactLink } from "react-router-dom";
function JobCard(props) {
  const [moreShown, setMoreShown] = useState(false);
  const { colorMode } = useColorMode();
  var month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // let expDate = props.jobExpiration.split("T")[0].split("-");
  // console.log(parseInt(expDate[1]));
  const handleProfileClick = (name) => {};
  return (
    <Stack
      direction={["column-reverse", "column-reverse", "row"]}
      width={["95%", "80%", "70%"]}
      boxShadow={"md"}
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      align={{ base: "center", md: "flex-start" }}
    >
      <Stack
        flex={3}
        p={[2, 3]}
        align={"flex-start"}
        position="relative"
        style={{ paddingBottom: 0 }}
      >
        <CustomText fontSize={[18, 19, 20, 21, 22]} fontWeight="bold">
          {props.jobTitle}
        </CustomText>

        <Stack direction={"row"} align="center">
          <Icon as={AiOutlineUser} color="red" fontSize={20} />
          <Link as={ReactLink} to={`/company/${props.companyName}/`}>
            <CustomText
              fontSize={[11, 11, 13, 14, 15]}
              color={useColorModeValue("green")}
            >
              @{props.companyName}
            </CustomText>
          </Link>
        </Stack>

        <Stack direction={"row"} align="center">
          <Icon as={GoLocation} color="green.400" fontSize={20} />
          <CustomText fontSize={[13, 14, 15, 16, 17]}>
            {props.jobLocation}
          </CustomText>
        </Stack>
        <Stack direction="row" align={"center"}>
          <Icon as={AiOutlineDollar} color="green.400" fontSize={20} />
          <CustomText>
            {props.jobSalaryType === "Fixed"
              ? `Fixed $${props.salaryMin}`
              : `From $${props.salaryMin} to $${props.salaryMax} `}
          </CustomText>
        </Stack>
        <Stack direction="row" align={"center"}>
          <Icon as={AiOutlineMail} color="green.400" fontSize={20} />
          <CustomText>{props.jobEmail}</CustomText>
        </Stack>

        <CustomText
          textAlign="center"
          noOfLines={3}
          color={useColorModeValue("cyan.900", "cyan.200")}
          as={"div"}
          style={{ margin: "1rem" }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: props.jobDescription,
            }}
          />
        </CustomText>

        {/* More Details */}
        <Stack
          display={moreShown ? "flex" : "none"}
          w="100%"
          style={{ marginBottom: "1rem" }}
        >
          <Heading
            fontSize="lg"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            p={2}
            color={colorMode === "light" ? "gray.700" : "gray.300"}
          >
            Basic details
          </Heading>
          <Stack
            direction="row"
            w="100%"
            p={2}
            // align="center"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          >
            <Stack flex={1} gap={2}>
              <Text fontSize={{ base: 13, md: 16 }}>Job category</Text>

              <Text fontSize={{ base: 13, md: 16 }}>Job position</Text>

              <Text fontSize={{ base: 13, md: 16 }}>Job type</Text>
              <Text fontSize={{ base: 13, md: 16 }}>No. of vacancies</Text>
              <Text fontSize={{ base: 13, md: 16 }}>Job location</Text>
              <Text fontSize={{ base: 13, md: 16 }}>Job salary</Text>
              <Text fontSize={{ base: 13, md: 16 }}>Job deadline</Text>
            </Stack>
            <Stack flex={1} gap={2}>
              {/* Job Catgegory */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>Unavailable</Text>
              </Stack>

              {/* Job position */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>
                  {props.jobPosition ? props.jobPosition : "Unavailable"}
                </Text>
              </Stack>

              {/* Job Type */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>{props.jobType ? props.jobType : "Unavailable"}</Text>
              </Stack>

              {/* No of vacancies */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>
                  {props.jobVacancies ? props.jobVacancies : "Unavailable"}
                </Text>
              </Stack>
              {/* Job Location */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>
                  {props.jobLocation ? props.jobLocation : "Unavailable"}
                </Text>
              </Stack>

              {/* Salary  */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>
                  {props.jobSalaryType === "Fixed"
                    ? `Fixed $${props.jobMinSalary}`
                    : `From $${props.jobMinSalary} to $${props.jobMaxSalary} `}
                </Text>
              </Stack>
              {/* Company Deadline  */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                {/* <Text>{`${expDate[0]} ${month[parseInt(expDate[1]) - 1]} ${
                  expDate[2]
                }`}</Text> */}
              </Stack>
            </Stack>
          </Stack>

          {/* Second Details */}
          <Heading
            fontSize="lg"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            p={2}
            color={colorMode === "light" ? "gray.700" : "gray.300"}
          >
            Education & Specification
          </Heading>
        </Stack>

        <Button
          style={{ marginTop: "auto", marginBottom: "1rem" }}
          colorScheme="twitter"
          size={{ base: "xs", sm: "sm" }}
          onClick={() => setMoreShown(!moreShown)}
          marginTop={moreShown ? "1rem" : "none"}
        >
          View {moreShown ? "Less" : "Details"}
        </Button>
      </Stack>
      <Stack
        flex={1}
        align="center"
        justify="center"
        h={"100%"}
        w="100%"
        style={{ marginTop: "3rem" }}
      >
        <Box
          height="20vh"
          width="20vh"
          overflow={"hidden"}
          backgroundImage={`url('${props.companyLogo}')`}
          backgroundPosition="center center"
          backgroundSize="cover"
          backgroundRepeat={"no-repeat"}
          borderRadius="md"
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.600")}
        >
          {/* <Image w="100%" src={props.companyLogo} /> */}
        </Box>
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

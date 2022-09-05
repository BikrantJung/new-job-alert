import {
  Button,
  Heading,
  HStack,
  Icon,
  Stack,
  Tag,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";

function CompanyJobDetails(props) {
  const { jobTitle, jobID } = useParams();
  const { colorMode } = useColorMode();
  const [jobDetails, setJobDetails] = useState([]);
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
  useEffect(() => {
    const getJobDetail = async () => {
      try {
        const res = await axios.get(`/job/${jobTitle}/${jobID}`);
        console.log(res);
        setJobDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getJobDetail();
  }, [jobTitle, jobID]);

  let expDate = jobDetails?.expires_in
    ? jobDetails?.expires_in.split("T")[0].split("-")
    : null;

  // console.log(jobDetails?.expires_in.split('T')[0].split("-"))
  // console.log(jobDetails.companyJobs);
  return (
    <>
      <Stack flex={7} w="100%">
        <Heading
          fontSize="lg"
          border="1px solid"
          borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          p={3}
          color={colorMode === "light" ? "gray.700" : "gray.300"}
        >
          {jobTitle}
        </Heading>
        <Stack w="100%">
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
              <Text fontSize={{ base: 13, md: 16 }}>Job region</Text>
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
                <Text>
                  {jobDetails?.JobCategory
                    ? jobDetails?.JobCategory
                    : "Unavailable"}
                </Text>
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
                  {jobDetails.JobPosition
                    ? jobDetails.JobPosition
                    : "Unavailable"}
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
                <Text>
                  {jobDetails.JobType ? jobDetails.JobType : "Unavailable"}
                </Text>
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
                  {jobDetails.NoOfVacancy
                    ? jobDetails.NoOfVacancy
                    : "Unavailable"}
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
                  {jobDetails.Location ? jobDetails.Location : "Unavailable"}
                </Text>
              </Stack>

              {/* Job Region */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>
                  {jobDetails.JobRegion ? jobDetails.JobRegion : "Unavailable"}
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
                  {jobDetails.SalaryType === "Fixed"
                    ? `Fixed $${jobDetails.SalaryMin}`
                    : `From $${jobDetails.SalaryMin} to $${jobDetails.SalaryMax} `}
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
                {expDate?.length ? (
                  <Text>{`${expDate[0]} ${month[parseInt(expDate[1]) - 1]} ${
                    expDate[2]
                  }`}</Text>
                ) : (
                  "Not found"
                )}
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

          <Stack
            direction="row"
            w="100%"
            p={2}
            // align="center"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          >
            <Stack flex={1} gap={2}>
              <Text fontSize={{ base: 13, md: 16 }}>Education Level</Text>
              <Text fontSize={{ base: 13, md: 16 }}>Required Skills</Text>
            </Stack>
            <Stack flex={1} gap={2}>
              {/* Education Level */}
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <Text>
                  {jobDetails.EduRequirement
                    ? jobDetails?.EduLevel
                    : "Any education level"}
                </Text>
              </Stack>
              <Stack
                align="center"
                direction="row"
                gap={3}
                fontSize={{ base: 13, md: 16 }}
              >
                <Text>:</Text>
                <HStack align="center">
                  {jobDetails?.RequiredSkills?.length
                    ? jobDetails?.RequiredSkills.map((item, i) => {
                        return (
                          <Tag fontSize={14} key={i}>
                            {item}
                          </Tag>
                        );
                      })
                    : "No skills specified"}
                </HStack>
              </Stack>
            </Stack>
          </Stack>

          <Heading
            fontSize="lg"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            p={2}
            color={colorMode === "light" ? "gray.700" : "gray.300"}
          >
            Work Experience
          </Heading>

          <Stack
            w="100%"
            p={2}
            // align="center"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          >
            {jobDetails?.JobExperience?.length
              ? jobDetails?.JobExperience.map((item, i) => {
                  return (
                    <HStack align="center" key={i}>
                      <Icon as={IoMdCheckmarkCircle} color="blue.400" />{" "}
                      <Text>{item}</Text>
                    </HStack>
                  );
                })
              : "No experience specified"}
          </Stack>
          <Heading
            fontSize="lg"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            p={2}
            color={colorMode === "light" ? "gray.700" : "gray.300"}
          >
            Job Description
          </Heading>

          <Stack
            w="100%"
            p={2}
            // align="center"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
          >
            <Text fontSize={[12, 13, 14, 15, 16, 17]} as={"div"}>
              <div
                dangerouslySetInnerHTML={{
                  __html: jobDetails?.JobDescription,
                }}
              />
            </Text>
          </Stack>
          <Stack p={2}>
            <Button
              alignSelf="flex-end"
              size={{ base: "xs", sm: "sm" }}
              colorScheme="twitter"
            >
              Apply now
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}

export default CompanyJobDetails;

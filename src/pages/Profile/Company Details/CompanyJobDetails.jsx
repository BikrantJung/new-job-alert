import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Icon,
  IconButton,
  Input,
  Stack,
  Tag,
  Text,
  Textarea,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { IoIosAttach } from "react-icons/io";
import { useContext } from "react";
import AuthContext from "../../../context/AuthContext";
function CompanyJobDetails(props) {
  const toast = useToast();
  const { jobTitle, jobID } = useParams();
  const { colorMode } = useColorMode();
  const [jobDetails, setJobDetails] = useState([]);
  const [localFile, setLocalFile] = useState([]);
  const [fileSize, setFileSize] = useState(null);
  const [loading, setLoading] = useState(false);

  const { initialUserData, authTokens } = useContext(AuthContext);
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

  const handleChange = (e) => {
    setLocalFile(e.target.files[0].name);
    setFileSize(Math.floor(e.target.files[0].size / 1024));
  };

  const applyForJob = async (e) => {
    setLoading(true);
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const applyData = {
      cuser: props.companyData?.company,
      username: initialUserData?.username,
      email: data.get("email"),
      phNumber: data.get("phone_number") ? data.get("phone") : null,
      description: data.get("cover_letter"),
      file: localFile?.length ? data.get("file_attachment") : null,
      jobTitle: jobTitle,
      userId: initialUserData?.user,
      jobId: jobID,
    };
    console.log(applyData?.file);
    try {
      const res = await axios.post(
        `applicant/${props.companyData?.company}/`,
        applyData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authTokens?.accessToken}`,
          },
        }
      );
      setLoading(false);
      window.location.reload(false);
    } catch (error) {
      setLoading(false);
      toast({
        title: "Already applied for this job",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.log(error);
    }
  };
  console.log(initialUserData);
  return (
    <>
      <Stack flex={7} width={{ base: "100%", md: "auto" }}>
        <Stack bgColor={colorMode === "light" ? "white" : "gray.800"} p={4}>
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
                    {jobDetails.JobRegion
                      ? jobDetails.JobRegion
                      : "Unavailable"}
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
          </Stack>
        </Stack>
        <Stack
          flex={7}
          w="100%"
          bgColor={colorMode === "light" ? "white" : "gray.800"}
          p={4}
          as={"form"}
          noValidate
          onSubmit={applyForJob}
        >
          <Heading
            fontSize="lg"
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            p={2}
            color={colorMode === "light" ? "gray.700" : "gray.300"}
          >
            Apply for job
          </Heading>
          <Text>
            If you wish to apply for this job, fill up the form and apply
          </Text>
          <Text>Respected company will receive your job application</Text>
          <Stack
            border="1px solid"
            borderColor={colorMode === "light" ? "gray.300" : "gray.600"}
            p={2}
          >
            <FormControl
              id="email"
              isRequired
              display="flex"
              alignItems="center"
              w={"50%"}
            >
              <FormLabel flex={1}>Email address</FormLabel>
              <Input flex={2} type="email" name="email" />
            </FormControl>
            <FormControl
              id="phone_number"
              display="flex"
              alignItems="center"
              w={"50%"}
            >
              <FormLabel flex={1}>Phone Number</FormLabel>
              <Input flex={2} type="number" name="phone_number" />
            </FormControl>
            <FormControl id="cover_letter" alignItems="center" isRequired>
              <FormLabel flex={1}>Letter</FormLabel>
              <Textarea border="2px solid red" flex={2} name="cover_letter" />
            </FormControl>
            <FormControl id="cover_letter" alignItems="center">
              <FormLabel flex={1}>Attachment ( CV, Project File... )</FormLabel>
              {localFile?.length ? (
                <Stack my={3} direction="row" align="center" gap={3}>
                  <Icon as={IoIosAttach} />
                  <Text>{localFile}</Text>
                  <Text> {fileSize} KB </Text>
                  <IconButton
                    size="sm"
                    borderRadius={"full"}
                    colorScheme="red"
                    icon={<DeleteIcon />}
                    onClick={() => setLocalFile(null)}
                  />
                </Stack>
              ) : (
                ""
              )}

              <Stack
                border="2px dashed"
                borderColor="gray.400"
                // height="5rem"
                py={4}
                width="100%"
                align="center"
                justify="center"
              >
                <Input
                  type="file"
                  id="file-upload"
                  accept=".pdf, .doc, .docx,.txt, image/*"
                  name="file_attachment"
                  hidden
                  onChange={(e) => handleChange(e)}
                />

                <Button
                  as={"label"}
                  leftIcon={<AddIcon />}
                  htmlFor="file-upload"
                  cursor={"pointer"}
                  colorScheme="red"
                  borderRadius={0}
                  mb={5}
                >
                  Upload file
                </Button>
              </Stack>
            </FormControl>
          </Stack>
          <Stack p={2}>
            <Button
              alignSelf="flex-end"
              size={{ base: "xs", sm: "sm" }}
              colorScheme="twitter"
              type={"submit"}
              isLoading={loading}
              isDisabled={loading}
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

import { SearchIcon } from "@chakra-ui/icons";
import {
  Heading,
  IconButton,
  Input,
  Stack,
  useColorMode,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link as ReactLink, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import Navbar from "../../components/Navbar/Navbar";
import ServerErrorSVG from "../../components/ServerErrorSVG";
import StateContext from "../../context/StateContext";
import JobCard from "./JobCard";

function Jobs() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { jobData, setJobData } = useContext(StateContext);
  const [jobSearchValue, setJobSearchValue] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const name = null;
  useEffect(() => {
    async function getJobs() {
      setShowContent(false);
      if (!(name && jobData.length)) {
        console.log("HELLO");
        try {
          const res = await axios({
            url: "jobs/",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: null,
            },
          });

          setJobData(res.data.results);
          setShowContent(true);
          console.log(res);
          setError(false);
        } catch (error) {
          setShowContent(true);
          setError(true);
        }
      }
    }
    getJobs();
  }, [name]);
  useEffect(() => {
    const fetchJobs = async () => {
      if (name) {
        try {
          const res = await axios.get(`jobFilter/?search=${name}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: null,
            },
          });
        } catch (error) {}
      }
    };
    fetchJobs();
  }, [name]);

  return (
    <div>
      {!showContent ? (
        <Loader />
      ) : error ? (
        <ServerErrorSVG />
      ) : (
        <>
          <Navbar />
          <Stack padding={3}>
            <Stack
              direction={["column", "column", "row"]}
              align="center"
              width={["80%", "60%", "70%"]}
              margin="0 auto"
              justify={"space-between"}
              my={5}
            >
              <Heading>Available Jobs</Heading>
              <Stack direction="row" align="center">
                <Input
                  placeholder="Search jobs..."
                  background={colorMode === "light" ? "gray.100" : "gray.900"}
                  color={colorMode === "light" ? "gray.900" : "gray.930"}
                  sx={{
                    "&::placeholder": {
                      color: colorMode === "light" ? "gray.900" : "gray.400",
                    },
                  }}
                  onChange={(e) => setJobSearchValue(e.target.value)}
                  value={jobSearchValue}
                />
                <IconButton
                  as={ReactLink}
                  to={jobSearchValue ? `/jobs/?search=${jobSearchValue}` : ""}
                  icon={<SearchIcon />}
                  onClick={() => setJobSearchValue("")}
                />
              </Stack>
            </Stack>
            <Stack align="center" justify={"center"}>
              {jobData?.length &&
                jobData?.map((item) => {
                  return (
                    <JobCard
                      key={item.id}
                      jobID={item.id}
                      companyName={item.companyUser}
                      jobTitle={item.JobTitle}
                      jobLocation={item.Location}
                      jobImage={item.JobImage}
                      salaryMin={item.SalaryMin}
                      salaryMax={item.SalaryMax}
                      jobEmail={item.JobEmail}
                      jobType={item.JobType}
                      jobDescription={item.JobDescription}
                      jobSalaryType={item.SalaryType}
                      jobEduLevel={item.EduLevel}
                      jobExperience={item.JobExperience}
                      jobPosition={item?.JobPosition}
                      jobExpiration={item?.expires_in}
                      jobVacancies={item?.NoOfVacancy}
                      companyLogo={item?.companyLogo}
                    />
                  );
                })}
            </Stack>
          </Stack>
        </>
      )}
    </div>
  );
}

export default Jobs;

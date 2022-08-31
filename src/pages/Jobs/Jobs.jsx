import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Heading,
  IconButton,
  Input,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import JobCard from "./JobCard";
import { Link as ReactLink, useLocation } from "react-router-dom";
import StateContext from "../../context/StateContext";
import ServerErrorSVG from "../../components/ServerErrorSVG";
import { PacmanLoader } from "react-spinners";

function Jobs() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { jobData, setJobData } = useContext(StateContext);
  const [jobSearchValue, setJobSearchValue] = useState("");
  const [showContent, setShowContent] = useState(false);
  const [error, setError] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("search");
  console.log(name);
  console.log(!name);
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
            },
          });
          console.log(res.data);
          setJobData(res.data.results);
          setShowContent(true);
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
    const fetchUsers = async () => {
      if (name) {
        try {
          const res = await axios.get(`jobFilter/?search=${name}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: null,
            },
          });

          console.log(res);
          setJobData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    };
    fetchUsers();
  }, [name]);
  return (
    <div>
      <Navbar />
      {!showContent ? (
        <Stack align="center" justify="center" height="85vh" wight="100vw">
          <PacmanLoader color="rgb(54, 215, 183)" />
        </Stack>
      ) : error ? (
        <ServerErrorSVG />
      ) : (
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
                    companyName={item.companyUser}
                    key={item.id}
                    JobTitle={item.JobTitle}
                    JobLocation={item.Location}
                    JobCategoryImage={item.JobCategoryImage}
                    JobImage={item.JobImage}
                    SalaryMin={item.SalaryMin}
                    SalaryMax={item.SalaryMax}
                    JobEmail={item.JobEmail}
                    JobType={item.JobType}
                    JobTags={item.JobTags}
                    JobDescription={item.JobDescription}
                    UserName={item.username}
                    userID={item.user}
                  />
                );
              })}
          </Stack>
        </Stack>
      )}
    </div>
  );
}

export default Jobs;

import React, { useContext, useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Heading,
  IconButton,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import JobCard from "./JobCard";
import { Link as ReactLink, useLocation } from "react-router-dom";
import StateContext from "../../context/StateContext";
function Jobs() {
  const { jobData, setJobData } = useContext(StateContext);
  const [jobSearchValue, setJobSearchValue] = useState("");
  const query = new URLSearchParams(useLocation().search);
  const name = query.get("search");

  useEffect(() => {
    async function getJobs() {
      if (!name && !jobData.length) {
        try {
          const res = await axios({
            url: "jobs/",
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(res.data);
          setJobData(res.data);
        } catch (error) {}
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
              background={useColorModeValue("gray.100", "gray.900")}
              color={useColorModeValue("gray.900", "gray.300")}
              sx={{
                "&::placeholder": {
                  color: useColorModeValue("gray.900", "gray.400"),
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
          {jobData.map((item) => {
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
    </div>
  );
}

export default Jobs;

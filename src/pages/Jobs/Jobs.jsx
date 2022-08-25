import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  Box,
  Heading,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";
import JobCard from "./JobCard";

function Jobs() {
  const [jobData, setJobData] = useState([]);

  useEffect(() => {
    async function getJobs() {
      try {
        const res = await axios({
          url: "jobs/",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        setJobData(res.data);
      } catch (error) {}
    }
    getJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <Stack padding={3}>
        <Heading textAlign={"center"} mb={4}>
          Available Jobs
        </Heading>
        <Stack align="center" justify={"center"}>
          {jobData.map((item) => {
            return (
              <JobCard
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

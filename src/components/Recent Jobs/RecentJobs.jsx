import React from "react";
import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import RecentJobCard from "./RecentJobCard";
import { useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import StateContext from "../../context/StateContext";
function RecentJobs() {
  const { recentJobs, setRecentJobs } = useContext(StateContext);
  useEffect(() => {
    const getRecentJobs = async () => {
      if (!recentJobs.length) {
        try {
          const res = await axios.get("jobs/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: null,
            },
          });
          console.log(res);
          setRecentJobs(res.data?.results?.slice(0, 3));
        } catch (error) {
          console.log(error);
        }
      }
    };
    getRecentJobs();
  }, []);
  return (
    <>
      <Center py={5}>
        <Heading
          sx={{
            my: 3,
            pb: 2,
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              width: "3%",
              left: "50%",
              bottom: "0",
              height: "2px",
              opacity: 1,
              backgroundColor: "green.400",
            },
            "&::after": {
              content: '""',
              position: "absolute",
              width: "8%",
              left: "55%",
              bottom: "0",
              height: "2px",
              opacity: 1,
              backgroundColor: "green.400",
            },
          }}
        >
          RECENT JOBS
        </Heading>
      </Center>
      <Stack
        direction="row"
        gap={5}
        align="center"
        justify="center"
        py={6}
        flexWrap="wrap"
      >
        {recentJobs.map((item) => {
          return (
            <RecentJobCard
              jobTitle={item.JobTitle}
              key={item.id}
              companyName={item.companyUser}
              location={item.Location}
              minSalary={item.SalaryMin}
              maxSalary={item.SalaryMax}
              jobType={item.JobType}
              jobTags={item.JobTags}
            />
          );
        })}
      </Stack>
    </>
  );
}

export default RecentJobs;

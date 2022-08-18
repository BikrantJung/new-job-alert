import React from "react";
import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import JobCard from "./JobCard";
function RecentJobs() {
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
        <JobCard />
        <JobCard />
        <JobCard />
      </Stack>
    </>
  );
}

export default RecentJobs;

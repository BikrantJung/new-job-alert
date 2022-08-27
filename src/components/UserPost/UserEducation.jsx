import { Box, Heading, Stack } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useEffect } from "react";

function UserEducation() {
  useEffect(() => {
    async function getJobs() {
      try {
        const res = await axios.get("jobs/");

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getJobs();
  }, []);

  return (
    <Stack height="100%" flex={7} style={{ marginInlineStart: 0 }}>
      <Stack height="90%" boxShadow={"md"} p={4}>
        <Heading fontSize={{ base: "lg", md: "xl", lg: "2xl" }} textAlign='center'>
          Education
        </Heading>
      </Stack>
    </Stack>
  );
}

export default UserEducation;

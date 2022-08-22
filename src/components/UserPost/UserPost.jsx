import { Box } from "@chakra-ui/react";
import React from "react";
import { useEffect } from "react";
import NewAxios from "../../utils/newAxios";

function UserPost() {
  const api = NewAxios();
  useEffect(() => {
    async function getJobs() {
      console.log("I RAN");
      try {
        const res = await api.get("jobs/");

        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getJobs();
  }, []);

  return (
    <Box ml={{ base: 0, md: 60 }} p="4">
      THIS IS POST
    </Box>
  );
}

export default UserPost;

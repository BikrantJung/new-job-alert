import React from "react";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";

function Jobs() {
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
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
    getJobs();
  }, []);
  return (
    <div>
      <Navbar/>
      Jobs
    </div>
  );
}

export default Jobs;

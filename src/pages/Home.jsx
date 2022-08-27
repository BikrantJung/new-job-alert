import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Categories from "../components/Popular Category/Categories";
import RecentJobs from "../components/Recent Jobs/RecentJobs";
import SignUpComp from "../components/Sign up/SignUpComp";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../services/api";
import { getTokens } from "../services/localStorage";
function Home() {
  const {
    setLoading,
    initialUserData,
    setInitialUserData,
    decodedID,
    authTokens,
  } = useContext(AuthContext);
  const { accessToken } = getTokens();
  useEffect(() => {
    async function getUserProfileData() {
      if (decodedID && !initialUserData) {
        try {
          const res = await axios.get(`profileSelf/${decodedID}`, {
            headers: {
              Authorization: `Bearer ${authTokens?.accessToken}`,
            },
          });
          setInitialUserData(res.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getUserProfileData();
    setLoading(false);
  }, [accessToken, decodedID]);

  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <RecentJobs />
      {/* <SignUpComp/> */}
      <Footer />
    </div>
  );
}

export default Home;

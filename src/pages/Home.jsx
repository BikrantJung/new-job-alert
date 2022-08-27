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
    allowData,
    userProfileData,
    setUserProfileData,
    setLoading,
    initialUserData,
    setInitialUserData,
    decodedID,
  } = useContext(AuthContext);
  const { localUserID, accessToken } = getTokens();
  useEffect(() => {
    async function getUserProfileData() {
      console.log("HOME")
      if (decodedID) {

        try {
          const res = await axiosInstance.get(`profileSelf/${decodedID}`);
          setInitialUserData(res.data);
          console.log("Initial User Data", res);
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

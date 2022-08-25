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
import { getTokens } from "../services/localStorage";
function Home() {
  const {
    allowData,
    userProfileData,
    setUserProfileData,
    setLoading,
    initialUserData,
    setInitialUserData,
  } = useContext(AuthContext);
  const { localUserID, accessToken } = getTokens();
  console.log("HOME");
 

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

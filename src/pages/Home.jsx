import axios from "axios";
import React, { lazy, Suspense, useContext, useEffect } from "react";
import { useState } from "react";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import SignUpComp from "../components/Sign up/SignUpComp";
import AuthContext from "../context/AuthContext";
import axiosInstance from "../services/api";
import { getTokens } from "../services/localStorage";
const Categories = lazy(() =>
  import("../components/Popular Category/Categories")
);
const RecentJobs = lazy(() => import("../components/Recent Jobs/RecentJobs"));
const Footer = lazy(() => import("../components/Footer/Footer"));
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
      <Suspense fallback={<div>Loading</div>}>
        <Hero />
        <Categories />
        <RecentJobs />
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;

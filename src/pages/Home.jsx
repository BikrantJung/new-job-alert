import React from "react";
import Footer from "../components/Footer/Footer";
import Hero from "../components/Hero/Hero";
import Navbar from "../components/Navbar/Navbar";
import Categories from "../components/Popular Category/Categories";
import RecentJobs from "../components/Recent Jobs/RecentJobs";

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <RecentJobs />
      <Footer />
    </div>
  );
}

export default Home;

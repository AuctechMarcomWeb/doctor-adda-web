import React, { useEffect } from "react";
import DoctorAddaLanding from "../components/DoctorAddaLanding";
import DoctorAddaHero from "../components/DoctorAddaHero";
import DoctorCategoryCards from "../components/DoctorCategoryCards";

const Home = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      
    }, []);
  return (
    <>
<DoctorAddaHero/>
<DoctorCategoryCards/>
      <DoctorAddaLanding />
    </>
  );
};

export default Home;

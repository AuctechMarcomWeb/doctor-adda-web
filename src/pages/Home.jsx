import React, { useEffect } from "react";
import DoctorAddaLanding from "../components/DoctorAddaLanding";
import DoctorAddaHero from "../components/DoctorAddaHero";
import DoctorCategoryCards from "../components/DoctorCategoryCards";
import ScrollingNotice from "../components/ScrollingNotice/ScrollingNotice";
import ServicesSection from "../components/ServicesSection";
import FeaturedHospitals from "../components/FeaturedHospitals";

const Home = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      
    }, []);
  return (
    <>
<DoctorAddaHero/>
<ScrollingNotice />
<ServicesSection />
<DoctorCategoryCards/>
<FeaturedHospitals />
      <DoctorAddaLanding />
      
      
    </>
  );
};

export default Home;

import React, { useEffect } from "react";
import DoctorAddaLanding from "../components/DoctorAddaLanding";
import DoctorAddaHero from "../components/DoctorAddaHero";
import DoctorCategoryCards from "../components/DoctorCategoryCards";
import ScrollingNotice from "../components/ScrollingNotice/ScrollingNotice";
import ServicesSection from "../components/ServicesSection";
import FeaturedHospitals from "../components/FeaturedHospitals";
import DownloadAppSection from "../components/DownloadAppSection";
import FeaturedHospitals2 from "../components/FeaturedHospitals2";


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

{/* <FeaturedHospitals /> */}
<FeaturedHospitals2/>

      <DoctorAddaLanding />
      <DownloadAppSection/>
      
      
    </>
  );
};

export default Home;

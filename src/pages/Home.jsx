import React, { useEffect } from "react";
import DoctorAddaLanding from "../components/DoctorAddaLanding";
import DoctorAddaHero from "../components/DoctorAddaHero";
import DoctorCategoryCards from "../components/DoctorCategoryCards";
import ScrollingNotice from "../components/ScrollingNotice/ScrollingNotice";
import ServicesSection from "../components/ServicesSection";
import FeaturedHospitals from "../components/FeaturedHospitals";
import DownloadAppSection from "../components/DownloadAppSection";
import FeaturedHospitals2 from "../components/FeaturedHospitals2";
import HealthScansSection from "../components/HealthScansSection";
import ServicesSection2 from "../components/ServicesSection2";
import HeroSection from "../components/HeroSection";
import MedicalHeroSection from "../components/MedicalHeroSection";
import BannerSection from "../components/BannerSection";
import TestimonialsSection from "../components/TestimonialsSection";
import HealthBlogSection from "../components/HealthBlogSection";
import AboutUsSection from "../components/AboutUsSection";
import MedicalImagingBanner from "../components/MedicalImagingBanner";
import WhyChooseUs from "../components/WhyChooseUs";
import Carousel from "../components/Carousel";

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      {/* <MedicalHeroSection/> */}

      <BannerSection />

      {/* <ScrollingNotice /> */}

      {/* <ServicesSection /> */}
      <ServicesSection2 />
      {/* <HeroSection/> */}
      <MedicalImagingBanner />
      <DoctorCategoryCards />
      {/* <DoctorAddaHero/> */}

      

      {/* <FeaturedHospitals /> */}
      <FeaturedHospitals2 />
      {/* <HealthScansSection/> */}
      <DoctorAddaLanding />
      <WhyChooseUs />
      <Carousel />
      <AboutUsSection />
      {/* <TestimonialsSection/> */}
      
      <HealthBlogSection />
      <DownloadAppSection />
    </>
  );
};

export default Home;

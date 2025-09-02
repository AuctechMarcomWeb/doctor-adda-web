import React, { useEffect, useState, useFocusEffect, useCallback } from "react";
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
import HomePageImagePopup from "../components/HomePageImagePopup";
import { getRequest } from "../Helpers";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../redux/slices/userSlice";
import { useUpdate } from "../context/updateContext";
import HealthcareRegistrationModal from "../components/PreLaunchForms/HealthcareRegistrationModal";

const Home = () => {
  const dispatch = useDispatch();
  const { update } = useUpdate();
  const { userProfileData } = useSelector((state) => state.user);
  const userId = userProfileData;
  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        try {
          const res = await getRequest(`auth/getUserById/${userId}`);
          console.log("User API response:", res.data.data);

          dispatch(updateUserProfile(res?.data));
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [userId, dispatch, update]);

  const [data, setData] = useState([]);
  console.log("dfgfdg======>", data);

  useEffect(() => {
    getRequest(`banner?isPagination=false`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const [open,setOpen] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>

    {
      open ? 
      <HealthcareRegistrationModal setOpen={setOpen} /> :""
    }
      {/* <MedicalHeroSection/> */}

      {/* <HomePageImagePopup data={data} /> */}

      <BannerSection />

      {/* <ScrollingNotice /> */}

      {/* <ServicesSection /> */}
      <ServicesSection2 />
      {/* <HeroSection/> */}
      <MedicalImagingBanner data={data} />
      <DoctorCategoryCards />
      {/* <DoctorAddaHero/> */}

      {/* <FeaturedHospitals /> */}
      <FeaturedHospitals2 />
      {/* <HealthScansSection/> */}
      <DoctorAddaLanding />
      <WhyChooseUs />
      {/* <Carousel /> */}
      <AboutUsSection />
      {/* <TestimonialsSection/> */}

      <HealthBlogSection />
      <DownloadAppSection />
    </>
  );
};

export default Home;

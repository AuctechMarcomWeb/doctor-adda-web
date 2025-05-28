import React, { useEffect } from "react";
import DoctorAddaLanding from "../components/DoctorAddaLanding";

const Home = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      
    }, []);
  return (
    <>

      <DoctorAddaLanding />
    </>
  );
};

export default Home;

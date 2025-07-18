import React, { useState } from "react";
import LoginStep from "../components/LoginStep";
import OtpStep from "../components/OtpStep";
import UserDetails from "./UserDetails";

const LoginSignupFlow = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  return (
    <div className="mx-auto shadow-md rounded-lg bg-white py-8 px-4 pt-40">
      {step === 1 ? (
        <LoginStep setStep={setStep} setMobile={setMobile} />
      ) : step === 2 ? (
        <OtpStep mobile={mobile} setStep={setStep} />
      ) : (
        <UserDetails mobile={mobile} />
      )}
    </div>
  );
};

export default LoginSignupFlow;




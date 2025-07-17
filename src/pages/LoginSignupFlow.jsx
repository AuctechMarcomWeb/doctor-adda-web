import React, { useState } from "react";
import LoginStep from "../components/LoginStep";
import OtpStep from "../components/OtpStep";

const LoginSignupFlow = () => {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  return (
    <div className=" mx-auto mt-10 shadow-md rounded-lg bg-white p-6">
      {step === 1 ? (
        <LoginStep setStep={setStep} setMobile={setMobile} />
      ) : (
        <OtpStep mobile={mobile} />
      )}
    </div>
  );
};

export default LoginSignupFlow;

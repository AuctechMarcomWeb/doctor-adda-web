import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUpStep from "../components/SignUpStep";
import LoginStep from "../components/LoginStep";
import OtpStep from "../components/OtpStep";
import UserDetails from "./UserDetails";

const LoginSignupFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState('signup'); // 'signup' or 'login'
  
  const [mobile, setMobile] = useState("");

  return (
    <div className="mx-auto shadow-md rounded-lg bg-white py-8 px-4 pt-40">
      {step === 1 ? (
        mode === 'signup' ? (
          <SignUpStep setStep={setStep} setMobile={setMobile} setMode={setMode} />
        ) : (
          <LoginStep setStep={setStep} setMobile={setMobile} setMode={setMode} />
        )
      ) : step === 2 ? (
        <OtpStep 
          mobile={mobile} 
          setStep={setStep} 
          isFromSignup={mode === 'signup'}
          onLoginSuccess={() => {
            // Redirect login users to home page after successful login
            navigate('/');
          }}
        />
      ) : (
        <UserDetails mobile={mobile} />
      )}
    </div>
  );
};

export default LoginSignupFlow;




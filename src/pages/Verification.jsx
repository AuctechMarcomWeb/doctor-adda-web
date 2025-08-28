import React from "react";
import { useNavigate } from "react-router-dom";

const Verification = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/"); 
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Hello</h1>
      <button
        onClick={goHome}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home
      </button>
    </div>
  );
};

export default Verification;

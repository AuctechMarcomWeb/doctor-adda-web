import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Pages
import Home from "./pages/Home";
import TermsAndConditions from "./pages/TermsAndConditions";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Contact from "./pages/Contact";
import LoginSignupFlow from "./pages/LoginSignupFlow";
import UserDetails from "./pages/UserDetails";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  return (
    <Router>
      <Routes>
        {/* Login/Signup Flow - Fullscreen without Navbar/Footer */}
        <Route
            path="/login"
            element={
              <>
                <Navbar />
                <LoginSignupFlow setStep={setStep} setMobile={setMobile} />
                <Footer />
              </>
            }
          />

        {/* All other routes wrapped with Navbar + Footer */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/user-details" element={<UserDetails />} />
                <Route path="/bloodbank" element={<UserDetails />} />
                <Route path="/ambulance" element={<UserDetails />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

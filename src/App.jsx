/* eslint-disable no-unused-vars */
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
import AmbulancePage from "./pages/AmbulancePage";
import PharmacyPage from "./pages/PharmacyPage";
import DiagnosticPage from "./pages/DiagnosticPage";
import DoctorPage from "./pages/DoctorPage";
import HospitalPage from "./pages/HospitalPage";
import AmbulanceDetailPage from "./pages/AmbulanceDetailPage";
import PharmacyDetailPage from "./pages/PharmacyDetailPage";
import DiagnosticDetailPage from "./pages/DiagnosticDetailPage";
import HospitalDetailPage from "./pages/HospitalDetailPage";
import DoctorList from "./pages/DoctorList";
import DoctorDetailPage from "./pages/DoctorDetailPage";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // const dispatch = useDispatch()
  // dispatch(login())
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
                <Route path="/bloodbank" element={<AmbulancePage />} />
                <Route path="/ambulance" element={<AmbulancePage />} />
                <Route path="/ambulance/:id" element={<AmbulanceDetailPage />} />
                
                <Route path="/pharmacy" element={<PharmacyPage />} />
                <Route path="/pharmacy/:id" element={<PharmacyDetailPage />} />
                 <Route path="/diagnostic" element={<DiagnosticPage />} />
                 <Route path="/diagnostic/:id" element={<DiagnosticDetailPage />} />
                 <Route path="/doctor" element={<DoctorPage />} />
                 <Route path="/doctorlist" element={<DoctorList />} />
                 <Route path="/doctordetail/:id" element={<DoctorDetailPage />} />
                 <Route path="/hospital" element={<HospitalPage />} />
                 <Route path="/hospital/:id" element={<HospitalDetailPage />} />
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

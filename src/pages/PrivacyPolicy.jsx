import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowRight,
  Star,
  Users,
  Clock,
  Shield,
  Heart,
  Stethoscope,
  Calendar,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  FileText,
  AlertCircle,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting,
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[id]");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Doctor Adda
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <a
                  href="#home"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Services
                </a>
                <a
                  href="#contact"
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Contact
                </a>
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all">
                  Book Appointment
                </button>
              </div>

              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a
                  href="#home"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Home
                </a>
                <a
                  href="#services"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Services
                </a>
                <a
                  href="#doctors"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Doctors
                </a>
                <a
                  href="#about"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  About
                </a>
                <a
                  href="#contact"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600"
                >
                  Contact
                </a>
                <button className="w-full mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full">
                  Book Appointment
                </button>
              </div>
            </div>
          )}
        </nav>

        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex mt-7 items-center mb-8">
                <Shield className="h-8 w-8 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">
                  Privacy Policy
                </h1>
              </div>

              <div className="prose prose-lg max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    1. Introduction
                  </h2>
                  <p className="text-gray-700 mb-4">
                    Welcome to Doctor Adda ("we," "our," or "us"). We are
                    committed to protecting your privacy and ensuring the
                    security of your personal health information. This Privacy
                    Policy explains how we collect, use, disclose, and safeguard
                    your information when you use our healthcare consultation
                    platform and mobile application.
                  </p>
                  <p className="text-gray-700">
                    By using Doctor Adda, you consent to the data practices
                    described in this policy. This policy complies with
                    applicable healthcare privacy laws, including HIPAA (Health
                    Insurance Portability and Accountability Act) where
                    applicable.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. Information We Collect
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    2.1 Personal Information
                  </h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>
                      Name, email address, phone number, and date of birth
                    </li>
                    <li>Profile photos and identification documents</li>
                    <li>Payment and billing information</li>
                    <li>Emergency contact information</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    2.2 Health Information
                  </h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Medical history, symptoms, and health concerns</li>
                    <li>Consultation records and chat transcripts</li>
                    <li>Prescription and treatment information</li>
                    <li>Health-related photos or documents you share</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    2.3 Technical Information
                  </h3>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Device information and mobile identifiers</li>
                    <li>IP address and location data</li>
                    <li>App usage patterns and interaction data</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. How We Use Your Information
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>
                      Provide healthcare consultation services and facilitate
                      doctor-patient communication
                    </li>
                    <li>Process payments and manage your account</li>
                    <li>
                      Send appointment reminders and health-related
                      notifications
                    </li>
                    <li>Improve our services and develop new features</li>
                    <li>
                      Comply with legal obligations and regulatory requirements
                    </li>
                    <li>Prevent fraud and ensure platform security</li>
                    <li>Provide customer support and respond to inquiries</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Information Sharing and Disclosure
                  </h2>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    4.1 Healthcare Providers
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We share your health information with licensed healthcare
                    providers on our platform to facilitate consultations and
                    provide medical care.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    4.2 Service Providers
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We may share information with trusted third-party service
                    providers who assist us in operating our platform,
                    processing payments, and providing customer support.
                  </p>

                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    4.3 Legal Requirements
                  </h3>
                  <p className="text-gray-700 mb-4">
                    We may disclose information when required by law, court
                    order, or to protect the rights, property, or safety of
                    Doctor Adda, our users, or others.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Data Security
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We implement industry-standard security measures to protect
                    your information, including:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>End-to-end encryption for sensitive health data</li>
                    <li>Secure data transmission using SSL/TLS protocols</li>
                    <li>
                      Regular security audits and vulnerability assessments
                    </li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on privacy and security practices</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Your Rights and Choices
                  </h2>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>
                      <strong>Access:</strong> Request access to your personal
                      information
                    </li>
                    <li>
                      <strong>Correction:</strong> Update or correct inaccurate
                      information
                    </li>
                    <li>
                      <strong>Deletion:</strong> Request deletion of your
                      personal data (subject to legal requirements)
                    </li>
                    <li>
                      <strong>Data Portability:</strong> Request a copy of your
                      data in a portable format
                    </li>
                    <li>
                      <strong>Opt-out:</strong> Unsubscribe from marketing
                      communications
                    </li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    7. Data Retention
                  </h2>
                  <p className="text-gray-700">
                    We retain your information for as long as necessary to
                    provide our services and comply with legal obligations.
                    Health information may be retained for longer periods as
                    required by medical record retention laws and regulations.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    8. Children's Privacy
                  </h2>
                  <p className="text-gray-700">
                    Our services are not intended for children under 13. We do
                    not knowingly collect personal information from children
                    under 13. If you are a parent or guardian and believe your
                    child has provided us with personal information, please
                    contact us.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    9. Contact Information
                  </h2>
                  <p className="text-gray-700 mb-4">
                    If you have any questions about this Privacy Policy or our
                    privacy practices, please contact us:
                  </p>
                  <div className="bg-gray-100 p-4 rounded">
                    <p>
                      <strong>Email:</strong> privacy@doctoradda.com
                    </p>
                    <p>
                      <strong>Phone:</strong> +1 (555) 123-4567
                    </p>
                    <p>
                      <strong>Address:</strong> 123 Healthcare Street, Medical
                      City, MC 12345
                    </p>
                  </div>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    10. Changes to This Policy
                  </h2>
                  <p className="text-gray-700">
                    We may update this Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page and updating the "Effective Date" at the top of
                    this policy.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>

    

    
      </div>
    </>
  );
};

export default PrivacyPolicy;

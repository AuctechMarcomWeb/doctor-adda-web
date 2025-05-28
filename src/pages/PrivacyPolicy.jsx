import React, { useState, useEffect } from "react";
import { Shield } from "lucide-react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
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
                    1. What Information We Collect
                  </h2>
                   <p className="text-gray-700 mb-4">
                   We may collect the following personal details:
                  </p>
                  
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Full Name</li>
                    <li>Phone Number</li>
                    <li>Gender</li>
                    <li>Email Address</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    2. How We Use Your Information
                  </h2>
                   <p className="text-gray-700 mb-4">
                   Your Data Helps us:
                  </p>

                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>Provide and enhance our services</li>
                    <li>Respond to appointment requests and queries</li>
                    <li>Send confirmations and relivent updates</li>
                    <li>Share health-related tips (with your consent)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    3. Protection Measures
                  </h2>
                  <p className="text-gray-700 mb-4">
                    We apply encryption, access controls, and secure server infrastructure to protect your data from unauthorized access and misuse.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    4. Sharing of Information
                  </h2>

                  <p className="text-gray-700 mb-4">
                    We do not share your personal data unless:
                  </p>
                  <ul className="list-disc pl-6 mb-4 text-gray-700">
                    <li>You give us explicit consent</li>
                    <li>We are legally obligated to do so</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    5. Your Rights
                  </h2>
                  <p className="text-gray-700 mb-4">
                   You have the right to:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700">
                    <li>Access your personal data</li>
                    <li>Update your details</li>
                    <li>Request deletion of your data</li>
                  </ul>
                </section>
                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    6. Updates to This Policy
                  </h2>
                  <p className="text-gray-700 mb-4">
                   We may update this Privacy Policy periodically. Any changes will be reflected here with the latest effective date.
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

import React from "react";
import LocationSearchInput from "../../LocationSearchInput";

const AmbulanceRegistrationForm = ({ renderInput }) => {
  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Ambulance Service Registration
      </h3>
      {renderInput("Service Name", "text", "name", "Enter service name")}
      {renderInput("Email", "email", "email", "Enter email address")}
      {renderInput("Phone", "tel", "phone", "Enter phone number")}
      {renderInput("Address", "textarea", "address", "Enter full address")}
      {renderInput("License Number", "text", "licenseNumber", "Enter license no.")}
      {renderInput("Number of Vehicles", "number", "vehicleCount", "Enter count")}
    </>
  );
};

export default AmbulanceRegistrationForm;

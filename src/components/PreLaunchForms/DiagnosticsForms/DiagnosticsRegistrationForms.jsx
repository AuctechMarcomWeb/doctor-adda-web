/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Plus,
  Upload,
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
} from "lucide-react";
const DiagnosticsRegistrationForms = ({
  renderInput,
  formData,
  setFormData,
}) => {
 const [packages, setPackages] = useState([
     { name: "", price: "", details: "" },
   ]);
   const [services, setservices] = useState([{ name: "" }]);
const handleServicesChange = (index, field, value) => {
    const updated = [...services];
    updated[index][field] = value;
    setservices(updated);
  };

  const addServices = () => {
    setservices([...services, { name: "" }]);
  };

  const removeServices = (index) => {
    if (services.length > 1) {
      setservices(services.filter((_, i) => i !== index));
    }
  };

  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
  };

  const addPackage = () => {
    setPackages([...packages, { name: "", price: "", details: "" }]);
  };

  const removePackage = (index) => {
    if (packages.length > 1) {
      setPackages(packages.filter((_, i) => i !== index));
    }
  };
    const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Diagnostics Registration
      </h3>

      {/* Diagnostic Center Name */}
      {renderInput(
        "Diagnostic Center Name",
        "text",
        "name",
        "Enter diagnostic center name"
      )}

      {/* Email */}
      {renderInput("Email", "email", "email", "Enter email address")}

      {/* Phone */}
      {renderInput("Phone Number", "tel", "phone", "Phone Number")}

      {/* Address */}
      {renderInput("Address", "textarea", "address", "Enter full address")}

      {/* Description */}
      {renderInput(
        "Description",
        "textarea",
        "description",
        "Enter description"
      )}
      {/* Services Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  Services
                </h3>
                <button
                  type="button"
                  onClick={addServices}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Services
                </button>
              </div>

              <div className="space-y-3">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-4 bg-gray-50 rounded-xl"
                  >
                    <input
                      type="text"
                      placeholder="Service name (e.g., ICU, X-Ray)"
                      value={service?.name}
                      onChange={(e) =>
                        handleServicesChange(index, "name", e.target.value)
                      }
                      className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />

                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeServices(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

       {/* Packages Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Packages
                </h3>
                <button
                  type="button"
                  onClick={addPackage}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Package
                </button>
              </div>

              <div className="space-y-3">
                {packages.map((pkg, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    {/* Name */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="Package name"
                        value={pkg?.name}
                        onChange={(e) =>
                          handlePackageChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="number"
                        placeholder="Price"
                        value={pkg?.price}
                        onChange={(e) =>
                          handlePackageChange(index, "price", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Details + Remove */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Details
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Details"
                          value={pkg?.details}
                          onChange={(e) =>
                            handlePackageChange(
                              index,
                              "details",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {packages.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePackage(index)}
                            className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

 {/* Store Timings*/}
            <div className="space-y-2 group">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Clinic Availability
              </label>

              <div className="grid grid-cols-2 gap-6">
                {/* Start Time */}
                <input
                  type="time"
                  value={formData?.startTime}
                  onChange={(e) =>
                    handleInputChange("startTime", e.target.value)
                  }
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500"
                  placeholder="Select Time"
                />
                {/* End Time */}
                <input
                  type="time"
                  value={formData?.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500"
                  placeholder="Select Time"
                />
              </div>
            </div>

    </>
  );
};

export default DiagnosticsRegistrationForms;

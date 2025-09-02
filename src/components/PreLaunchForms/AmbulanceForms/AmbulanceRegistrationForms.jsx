import React, { useState } from "react";
import LocationSearchInput from "../../LocationSearchInput";

const AmbulanceRegistrationForm = ({ renderInput, formData, setFormData }) => {
   const [drivers, setDrivers] = useState([
      { name: "", phone: "", licenseNumber: "" },
    ]);
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDriverChange = (index, field, value) => {
    const updated = [...drivers];
    updated[index][field] = value;
    setDrivers(updated);
  };

  const addDriver = () => {
    setDrivers([...drivers, { name: "", phone: "", licenseNumber: "" }]);
  };

  const removeDriver = (index) => {
    if (drivers.length > 1) {
      setDrivers(drivers.filter((_, i) => i !== index));
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Ambulance Service Registration
      </h3>
      {/* Service name*/}
      {renderInput("Service Name", "text", "name", "Enter service name")}
      {/* Email */}
      {renderInput("Email", "email", "email", "Enter email address")}
      {/* Phone */}
      {renderInput("Phone", "tel", "phone", "Enter phone number")}
      {/* Address */}
      {renderInput("Address", "textarea", "address", "Enter full address")}
    
      {/* Description */}
      {renderInput(
        "Description",
        "textarea",
        "description",
        "Enter description"
      )}
      {/*Operating Hours*/}
      <div className="space-y-2 group">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          Operating Hours
        </label>
        <input
          type="text"
          value={formData?.operatingHours}
          onChange={(e) => handleInputChange("operatingHours", e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500"
          placeholder="Operating Hours of ambulance service"
        />
      </div>
{/* Ambulance Type */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-gray-700">
          Ambulance Type
        </label>
        <select
          value={formData?.ambulanceType}
          onChange={(e) => handleInputChange("ambulanceType", e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Options</option>
          <option value="Emergency Ambulance">Emergency Ambulance</option>
          <option value="Non-Emergency Ambulance">
            Non-Emergency Ambulance
          </option>
          <option value="ICU Ambulance">ICU Ambulance</option>
        </select>
      </div>
{/* Number of Ambulance */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-gray-700">
          Number of Ambulance
        </label>
        <select
          value={formData?.ambulanceNumber}
          onChange={(e) => handleInputChange("ambulanceNumber", e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Options</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4+">4</option>
        </select>
      </div>
      {/* Driver Information */}
  <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-700">
                  Driver Information
                </h3>
                <button
                  type="button"
                  onClick={addDriver}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  Add Driver
                </button>
              </div>
              <div className="space-y-3">
                {drivers.map((driver, index) => (
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
                        placeholder="Driver name"
                        value={driver?.name}
                        onChange={(e) =>
                          handleDriverChange(index, "name", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        Phone
                      </label>
                      <input
                        type="text"
                        placeholder="Phone number"
                        value={driver.phone}
                        onChange={(e) =>
                          handleDriverChange(index, "phone", e.target.value)
                        }
                        className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                     
                    </div>

                    {/* License Number */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">
                        License Number
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="License number"
                          value={driver.licenseNumber}
                          onChange={(e) =>
                            handleDriverChange(
                              index,
                              "licenseNumber",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        {drivers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeDriver(index)}
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
    </>
  );
};

export default AmbulanceRegistrationForm;

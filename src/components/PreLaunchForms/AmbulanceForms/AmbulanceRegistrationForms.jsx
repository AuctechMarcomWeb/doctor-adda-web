import React, { useState } from "react";
import LocationSearchInput from "../../LocationSearchInput";

const AmbulanceRegistrationForm = ({
  renderInput,
  formData,
  setFormData,
  errors = {},
}) => {
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
    setFormData((prev) => ({ ...prev, drivers: updated })); // sync to formData
  };

  const addDriver = () => {
    const updated = [...drivers, { name: "", phone: "", licenseNumber: "" }];
    setDrivers(updated);
    setFormData((prev) => ({ ...prev, drivers: updated }));
  };

  const removeDriver = (index) => {
    if (drivers.length > 1) {
      const updated = drivers.filter((_, i) => i !== index);
      setDrivers(updated);
      setFormData((prev) => ({ ...prev, drivers: updated }));
    }
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Ambulance Service Registration
      </h3>

      {/* Service Name */}
      {renderInput("Service Name", "text", "name", "Enter service name")}

      {/* Email */}
      {renderInput("Email", "email", "email", "Enter email address")}

      {/* Phone */}
      {renderInput("Phone", "tel", "phone", "Enter phone number")}

      {/* Address with lat/lng */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-gray-700">Address</label>
        <LocationSearchInput
          value={formData?.address}
          onSelect={(place) => setFormData((prev) => ({ ...prev, ...place }))}
        />
        {errors.address && (
          <p className="text-red-500 text-sm">{errors.address}</p>
        )}
      </div>

      {/* Description */}
      {renderInput(
        "Description",
        "textarea",
        "description",
        "Enter description"
      )}

      {/* Operating Hours */}
      <div className="space-y-2 group">
        <label className="text-sm font-medium text-gray-700">
          Operating Hours
        </label>
        <input
          type="text"
          value={formData?.operatingHours}
          onChange={(e) => handleInputChange("operatingHours", e.target.value)}
          className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-gray-500"
          placeholder="Operating Hours of ambulance service"
        />
        {errors.operatingHours && (
          <p className="text-red-500 text-sm">{errors.operatingHours}</p>
        )}
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
        {errors.ambulanceType && (
          <p className="text-red-500 text-sm">{errors.ambulanceType}</p>
        )}
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
          <option value="4+">4+</option>
        </select>
        {errors.ambulanceNumber && (
          <p className="text-red-500 text-sm">{errors.ambulanceNumber}</p>
        )}
      </div>

      {/* Availability Status */}
      {renderInput(
        "Availability Status",
        "text",
        "availabilityStatus",
        "Available/Unavailable"
      )}
      {/* {errors.availabilityStatus && (
        <p className="text-red-500 text-sm">{errors.availabilityStatus}</p>
      )} */}

      {/* Capacity */}
      {renderInput(
        "Capacity",
        "number",
        "capacity",
        "Number of patients ambulance can carry"
      )}
      {/* {errors.capacity && (
        <p className="text-red-500 text-sm">{errors.capacity}</p>
      )} */}
      {/* Emergency Contact */}
      {renderInput(
        "Emergency Contact",
        "tel",
        "emergencyContact",
        "Enter emergency contact"
      )}
      {/* {errors.emergencyContact && (
        <p className="text-red-500 text-sm">{errors.emergencyContact}</p>
      )} */}

      {/* Price */}
      {renderInput("Price", "number", "price", "Enter service charge")}
      {/* {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>} */}

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
                {errors[`drivers.${index}.name`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`drivers.${index}.name`]}
                  </p>
                )}
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
                {errors[`drivers.${index}.phone`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`drivers.${index}.phone`]}
                  </p>
                )}
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
                      handleDriverChange(index, "licenseNumber", e.target.value)
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
                {errors[`drivers.${index}.licenseNumber`] && (
                  <p className="text-red-500 text-sm">
                    {errors[`drivers.${index}.licenseNumber`]}
                  </p>
                )}
              </div>
            </div>
          ))}
          {errors.drivers && (
            <p className="text-red-500 text-sm">{errors.drivers}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AmbulanceRegistrationForm;

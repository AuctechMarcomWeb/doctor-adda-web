import React, { useEffect, useState } from "react";
import { Building2, Mail, Phone, MapPin, User, FileText ,Plus} from "lucide-react";
import { Select } from "antd";
import LocationSearchInput from "../../LocationSearchInput";
import { getRequest } from "../../../Helpers"; // ✅ same helper as in HospitalRegistration.jsx

const HospitalRegistrationForm = ({ renderInput, formData, setFormData }) => {
  const [categories, setCategories] = useState([]);
  const [healthCards, setHealthCards] = useState([]);

  // Fetch categories & health cards
  useEffect(() => {
    getRequest(`category?isPagination=false`)
      .then((res) => setCategories(res?.data?.data || []))
      .catch((err) => console.error("Error fetching categories:", err));

    getRequest(`healthCard?isPagination=false`)
      .then((res) => setHealthCards(res?.data?.data || []))
      .catch((err) => console.error("Error fetching health cards:", err));
  }, []);

  const categoryOptions = categories.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const healthCardOptions = healthCards.map((item) => ({
    label: item.name,
    value: item._id,
  }));

  const selectCategory = (selectedValues) => {
    setFormData((prev) => ({
      ...prev,
      categories: selectedValues,
    }));
  };

  const selectHealthCard = (selectedValues) => {
    setFormData((prev) => ({
      ...prev,
      healthCard: selectedValues,
    }));
  };

    const handleFacilityChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFacilities = [...formData.facilities];

    if (name.includes("Name")) {
      updatedFacilities[index].name = value;
    } else if (name.includes("Description")) {
      updatedFacilities[index].discription = value;
    }

    setFormData((prev) => ({
      ...prev,
      facilities: updatedFacilities,
    }));
  };

  const addFacility = () => {
  setFormData((prev) => ({
    ...prev,
    facilities: [
      ...(prev.facilities || []), 
      { name: "", discription: "" },
    ],
  }));
};


  const removeFacility = (index) => {
    const updatedFacilities = formData.facilities.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      facilities: updatedFacilities,
    }));
  };

  return (
    <>
      <h3 className="text-xl font-semibold text-[#005b8e] mb-4">
        Hospital Registration
      </h3>

      {/* Hospital Name */}
      {renderInput("Hospital Name", "text", "name", "Enter hospital name")}

      {/* Email */}
      {renderInput("Official Email", "email", "email", "Enter email address")}

      {/* Phone */}
      {renderInput("Contact Number", "tel", "phone", "Enter contact number")}
      {renderInput("Address", "textarea", "address", "Enter full address")}
      {/* Address
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <MapPin className="w-4 h-4 text-red-600" />
          Hospital Address
        </label>
        <LocationSearchInput
          value={formData.address}
          onSelect={(place) => setFormData({ ...formData, ...place })}
        />
      </div> */}

      {/* Description */}
      {renderInput(
        "Description",
        "textarea",
        "description",
        "Enter description"
      )}

      {/* Categories */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Category</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select categories"
          onChange={selectCategory}
          options={categoryOptions}
          size="large"
          value={formData?.categories}
        />
      </div>

      {/* Health Card */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Health Card</label>
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Select health cards"
          onChange={selectHealthCard}
          options={healthCardOptions}
          size="large"
          value={formData?.healthCard}
        />
      </div>

      {/* Owner Name */}
      {renderInput("Owner Name", "text", "ownerName", "Enter owner name")}

      {/* GST Number */}
      {renderInput("GST Number", "number", "gstNumber", "Enter GST number")}

      {/* Verification Phone */}
      {renderInput(
        "Verification Phone",
        "tel",
        "phoneNumber",
        "Enter verification phone"
      )}

       {/* Facilities Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Facilities & Services
                </h3>
                <button
                  type="button"
                  onClick={addFacility}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Facility
                </button>
              </div>

              <div className="space-y-3">
                {formData?.facilities?.map((facility, index) => (
                  <div
                    key={index}
                    className="grid md:grid-cols-2 gap-4 p-4 mb-3 bg-gray-50 rounded-xl border"
                  >
                    {/* Facility Name */}
                    <div className="flex flex-col">
                      <label className="text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name={`facilityName_${index}`}
                        value={facility?.name}
                        onChange={(e) => handleFacilityChange(e, index)}
                        placeholder="Facility name (e.g., ICU, X-Ray)"
                        className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>

                    {/* Facility Description + Remove Button */}
                    <div className="flex gap-2">
                      <div className="flex flex-col flex-1">
                        <label className="text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <input
                          type="text"
                          name={`facilityDescription_${index}`}
                          value={facility?.discription}
                          onChange={(e) => handleFacilityChange(e, index)}
                          placeholder="Enter description"
                          className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>

                      {/* Remove Button */}
                      {formData?.facilities?.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFacility(index)}
                          className="h-10 w-10 self-end flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>


    </>
  );
};

export default HospitalRegistrationForm;

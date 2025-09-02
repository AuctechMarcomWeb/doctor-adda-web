import React, { useEffect, useState } from "react";
import { Building2, Mail, Phone, MapPin, User, FileText } from "lucide-react";
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
    </>
  );
};

export default HospitalRegistrationForm;

import React, { useState } from "react";
import { postRequest } from "../../../Helpers";

const DocumentsUpload = ({ formData, setFormData, documentOptions }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file, index) => {
    setUploading(true);
    try {
      let uploadedUrl = null;

      const formDataData = new FormData();
      formDataData.append("file", file);

      const response = await postRequest({
        url: `upload/uploadImage`, // ✅ same endpoint for both images & PDFs
        cred: formDataData,
      });

      uploadedUrl = response?.data?.data?.imageUrl;

      setFormData((prev) => {
        const updatedDocs = [...(prev.documents || [])];
        updatedDocs[index] = { ...updatedDocs[index], image: uploadedUrl };
        return { ...prev, documents: updatedDocs };
      });
    } catch (err) {
      console.error("File upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleAddDocument = () => {
    setFormData((prev) => ({
      ...prev,
      documents: [
        ...(prev.documents || []),
        { name: "", number: "", image: "" },
      ],
    }));
  };

  const handleRemoveDocument = (index) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with button */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">
          Upload Documents
        </h3>
        <button
          type="button"
          onClick={handleAddDocument}
          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
        >
          + Add Document
        </button>
      </div>

      {/* Document List */}
      <div className="grid gap-4">
        {(formData.documents || []).map((doc, index) => (
          <div
            key={index}
            className="relative border rounded-xl p-4 bg-white shadow-sm hover:shadow-md transition flex flex-col gap-3"
          >
            {/* Remove entire document */}
            <button
              type="button"
              onClick={() => handleRemoveDocument(index)}
              className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow-md hover:bg-red-700 hover:scale-110 transition-transform"
              title="Remove Document"
            >
              ✕
            </button>

            {/* Document Name Dropdown */}
            <select
              value={doc.name}
              onChange={(e) => {
                const updatedDocs = [...formData.documents];
                updatedDocs[index].name = e.target.value;
                setFormData((prev) => ({ ...prev, documents: updatedDocs }));
              }}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Document</option>
              {documentOptions.map((opt, i) => (
                <option key={i} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Document Number */}
            <input
              type="text"
              placeholder="Enter Document Number"
              value={doc.number}
              onChange={(e) => {
                const updatedDocs = [...formData.documents];
                updatedDocs[index].number = e.target.value;
                setFormData((prev) => ({ ...prev, documents: updatedDocs }));
              }}
              className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-500"
            />

            {/* File Upload */}
            <label className="w-full flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-4 cursor-pointer hover:bg-gray-50">
              <span className="text-sm text-gray-500">
                {doc.image ? "Change File" : "Click to Upload Image/PDF"}
              </span>
              <input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) handleFileUpload(file, index);
                }}
                className="hidden"
              />
            </label>

            {/* Preview Section */}
            {doc.image && (
              <div className="mt-3 flex items-center gap-3">
                {doc.image.endsWith(".pdf") ? (
                  <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md">
                    <span className="text-red-600 font-medium">📄 PDF</span>
                    <a
                      href={doc.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm"
                    >
                      View PDF
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        const updatedDocs = [...formData.documents];
                        updatedDocs[index] = {
                          ...updatedDocs[index],
                          image: "",
                          number: "",
                          name: "",
                        };
                        setFormData((prev) => ({
                          ...prev,
                          documents: updatedDocs,
                        }));
                      }}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <img
                      src={doc.image}
                      alt="Document"
                      className="w-24 h-24 object-cover border rounded-md shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedDocs = [...formData.documents];
                        updatedDocs[index] = {
                          ...updatedDocs[index],
                          image: "",
                          number: "",
                          name: "",
                        };
                        setFormData((prev) => ({
                          ...prev,
                          documents: updatedDocs,
                        }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-700"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {uploading && (
        <p className="text-sm text-gray-500 animate-pulse">
          Uploading document...
        </p>
      )}
    </div>
  );
};

export default DocumentsUpload;

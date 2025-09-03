import React, { useState } from "react";
import { postRequest } from "../../../Helpers";

const DocumentsUpload = ({ formData, setFormData, documentOptions }) => {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (file, index) => {
    setUploading(true);
    try {
      let uploadedUrl = null;

      if (file.type === "application/pdf") {
        // Upload PDF
        const formDataData = new FormData();
        formDataData.append("file", file);
        const response = await postRequest({
          url: `upload/uploadImage`, // ✅ same endpoint works for pdf
          cred: formDataData,
        });
        uploadedUrl = response?.data?.data?.imageUrl;
      } else {
        // Upload image (reuse your existing upload)
        const formDataData = new FormData();
        formDataData.append("file", file);
        const response = await postRequest({
          url: `upload/uploadImage`,
          cred: formDataData,
        });
        uploadedUrl = response?.data?.data?.imageUrl;
      }

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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Upload Documents
        </label>
        <button
          type="button"
          onClick={handleAddDocument}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700"
        >
          + Add Document
        </button>
      </div>

      {(formData.documents || []).map((doc, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 flex flex-col gap-3 relative"
        >
          {/* Remove button */}
          <button
            type="button"
            onClick={() => handleRemoveDocument(index)}
            className="absolute top-2 right-2 text-red-600 font-bold"
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
            className="w-full border rounded-md p-2"
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
            className="w-full border rounded-md p-2"
          />

          {/* File Upload */}
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) handleFileUpload(file, index);
            }}
            className="w-full border rounded-md p-2"
          />

          {doc.image && (
            <div className="mt-2">
              {doc.image.endsWith(".pdf") ? (
                <a
                  href={doc.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Uploaded PDF
                </a>
              ) : (
                <img
                  src={doc.image}
                  alt="Document"
                  className="w-24 h-24 object-cover border rounded"
                />
              )}
            </div>
          )}
        </div>
      ))}

      {uploading && (
        <p className="text-sm text-gray-500">Uploading document...</p>
      )}
    </div>
  );
};

export default DocumentsUpload;

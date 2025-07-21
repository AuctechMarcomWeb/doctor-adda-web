import React, { useState } from "react";
import {
  MapPin,
  PhoneCall,
  BadgeCheck,
  Star,
  Upload,
  PlusCircle,
} from "lucide-react";

const PharmacyDetailPage = () => {
  const [activeTab, setActiveTab] = useState("about");
  const [prescription, setPrescription] = useState(null);
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Amit Chauhan",
      comment: "Great service, got my medicine within 30 minutes.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    {
      name: "Priya Sinha",
      comment: "Genuine products and fast delivery.",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/22.jpg",
    },
  ]);

  const handleFileChange = (e) => {
    setPrescription(e.target.files[0]);
  };

  const handleAddReview = () => {
    const name = prompt("Enter your name:");
    const comment = prompt("Enter your review:");
    const rating = parseInt(prompt("Enter rating (1-5):"));
    if (name && comment && rating) {
      setReviews([
        ...reviews,
        {
          name,
          comment,
          rating,
          image: "https://randomuser.me/api/portraits/lego/1.jpg",
        },
      ]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 pt-40 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-white rounded-xl shadow overflow-hidden">
          <img
            src="https://i.pinimg.com/1200x/72/59/6e/72596e499f868bdfce8220559315fcf5.jpg"
            alt="Pharmacy"
            className="w-full object-cover h-full"
          />
        </div>

        <div className="w-full md:w-1/2 space-y-4">
          {/* Basic Info */}
          <div className="bg-white rounded-xl shadow-md p-5">
            <h1 className="text-2xl font-bold text-[#00679f] mb-2">
              HealthPlus Pharmacy
            </h1>
            <p className="text-gray-600 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-red-500" /> Gomti Nagar, Lucknow
            </p>
          </div>

          {/* Description & Info */}
          <div className="bg-white rounded-xl shadow-md p-5 space-y-4 text-sm text-gray-700">
            <div>
              <h2 className="font-semibold text-gray-900 border-b pb-1 mb-2">Description</h2>
              <p>
                MedPlus Pharmacy is committed to providing high-quality medicines, wellness products, and health services through its extensive network of stores and prompt delivery system.
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 border-b pb-1 mb-2">Services Offered</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Prescription & OTC Medicines</li>
                <li>Home Delivery</li>
                <li>Online Consultation</li>
                <li>Health Supplements</li>
                <li>Personal Care Products</li>
              </ul>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 border-b pb-1 mb-2">Address</h2>
              <p>Shop No. 12, 1090 Chauraha, Gomti Nagar ,Lucknow</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 border-b pb-1 mb-2">Phone</h2>
              <p>+91 98765 43210</p>
            </div>

            <div>
              <h2 className="font-semibold text-gray-900 border-b pb-1 mb-2">Store Timing</h2>
              <p>Open 24 Hours (Monday to Sunday)</p>
            </div>
          </div>

          {/* Call Button */}
          {/* <div className="bg-white rounded-xl shadow-md p-4">
            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-200 text-sm font-medium flex justify-center items-center gap-2">
              <PhoneCall className="w-4 h-4" /> Call Now
            </button>
          </div> */}
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="border-b border-gray-200 mb-4">
          <nav className="flex gap-8">
            <button
              className={`pb-2 font-medium ${
                activeTab === "about"
                  ? "border-b-2 border-[#00679f] text-[#00679f]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("about")}
            >
              About
            </button>
            <button
              className={`pb-2 font-medium ${
                activeTab === "review"
                  ? "border-b-2 border-[#00679f] text-[#00679f]"
                  : "text-gray-600"
              }`}
              onClick={() => setActiveTab("review")}
            >
              Reviews
            </button>
          </nav>
        </div>

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="space-y-6 text-sm text-gray-700">
            {/* Prescription Upload */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-medium">Upload Prescription</label>
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50">
                  <input
                    type="file"
                    className="hidden"
                    id="prescription"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="prescription" className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-6 h-6 text-gray-500" />
                    <span className="text-sm mt-2 text-gray-600">Click to Upload</span>
                  </label>
                  {prescription && (
                    <p className="mt-2 text-xs text-green-600">
                      Uploaded: {prescription.name}
                    </p>
                  )}
                </div>
              </div>

              {/* Input Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block mb-1 font-medium">Description</label>
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter medicine description"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Duration of Supply</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 5 days"
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <button className="w-full bg-[#00679f] text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 text-sm font-semibold">
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Review Tab */}
        {activeTab === "review" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
              <button
                onClick={handleAddReview}
                className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
              >
                <PlusCircle className="w-4 h-4" /> Add Review
              </button>
            </div>

            {reviews.map((review, index) => (
              <div
                key={index}
                className="border rounded-xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4"
              >
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <div className="flex text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? "fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyDetailPage;

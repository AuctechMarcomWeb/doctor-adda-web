import React, { useState } from "react";
import { useSelector } from "react-redux";
import { postRequest } from "../Helpers";
import { FaStar } from "react-icons/fa";

const DiagonsticsReviewPopup = ({
  open,
  setUpdateStatus,
  onClose,
  id,
  onReviewAdded,
}) => {
  const { userProfileData, LoggedIn } = useSelector((state) => state.user);

  const [rating, setRating] = useState(1);
  const [hoverRating, setHoverRating] = useState(null);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  console.log("Modal Open:", open);
  console.log("Diagnostics ID passed:", id);
  console.log("Initial Rating:", rating, "Initial Comment:", comment);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!userProfileData.authToken) {
        setError("You must be logged in to submit a review.");
        setLoading(false);
        return;
    }

    try {
        const res = await postRequest({
            url: `diagnostics/${id}/review`,
            cred: { rating, comment },
        });

        console.log("API Response:", res);
        setUpdateStatus((prev) => !prev);
        setSuccess(true);
        setError("");
        onReviewAdded && onReviewAdded(); // refresh reviews
    } catch (err) {
        console.error("API Error:", err);
        setError("Failed to submit review. Please try again.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
          onClick={() => {
            console.log("Modal closed by user");
            onClose();
          }}
          disabled={loading}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Add Your Review</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={28}
                  className={`cursor-pointer ${
                    (hoverRating || rating) >= star
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300"
                  }`}
                  onMouseEnter={() => {
                    setHoverRating(star);
                    console.log("Hover Rating:", star);
                  }}
                  onMouseLeave={() => {
                    setHoverRating(null);
                    console.log("Hover Rating cleared");
                  }}
                  onClick={() => {
                    setRating(star);
                    console.log("Clicked Rating:", star);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
                console.log("Comment changed:", e.target.value);
              }}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
              rows={4}
              placeholder="Write your review..."
              required
              disabled={loading}
            />
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && (
            <div className="text-green-600 text-sm">Review submitted!</div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DiagonsticsReviewPopup;

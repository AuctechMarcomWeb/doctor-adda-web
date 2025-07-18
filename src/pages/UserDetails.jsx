import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  {
    image: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGRvY3RvcnxlbnwwfHwwfHx8MA%3D%3D",
    heading: "Profile Setup",
    subtext: "Tell us a bit about yourself",
  },
  {
    image: "https://media.istockphoto.com/id/868644242/photo/close-up-of-stethoscope-and-doctor.webp?a=1&b=1&s=612x612&w=0&k=20&c=R7-U9IxWlMHKapHd0J9rM-bb9f3_xAVj5MEplpFpawo=",
    heading: "Better Matches",
    subtext: "Get personalized recommendations",
  },
];

const UserDetails = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Data Submitted:", userData);
    // You can store this in context, Redux, or localStorage
    // Then navigate to the next page or dashboard
    navigate("/dashboard"); // Update this path as needed
  };

  const { image, heading, subtext } = slides[currentSlide];

  return (
    <div className="flex  items-center justify-center pt-40 py-8">
      <div className="flex w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Slider */}
        <div className="w-1/2 relative  text-white flex flex-col justify-center items-center p-8" style={{
    background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)" ,
  }}>
          <img src={image} alt={heading} className="w-100 h-100 object-contain mb-6 rounded" />
          <h3 className="text-2xl font-bold">{heading}</h3>
          <p className="mt-2 text-center text-white/90 text-sm">{subtext}</p>
          <div className="absolute bottom-6 flex space-x-2">
            {slides.map((_, index) => (
              <span
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Form */}
        <div className="w-1/2 p-10 bg-white">
          <h2 className="text-xl font-bold mb-6 text-gray-800 text-center">Complete Your Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={userData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

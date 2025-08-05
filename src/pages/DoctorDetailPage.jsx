import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  BadgeCheck,
  Calendar,
  Stethoscope,
  GraduationCap,
  Phone,
  MessageCircle,
  Building2,
  IndianRupee,
  CalendarDays,
  Award,
  Shield,
  Users,
  CheckCircle,
  Video,
  PlusCircle,
  Crown,
  Activity,
  Clock,
  Globe,
  Heart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "../Helpers";

const GradientCard = ({
  children,
  className = "",
  gradient = "from-blue-500/5 to-purple-500/5",
  rotation = "rotate-1",
}) => (
  <div className="relative">
    <div
      className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-3xl transform ${rotation}`}
    ></div>
    <div
      className={`relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-100/50 ${className}`}
    >
      {children}
    </div>
  </div>
);

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  gradient = "from-blue-500 to-indigo-600",
}) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`p-4 bg-gradient-to-r ${gradient} rounded-2xl shadow-lg`}>
      <Icon className="w-5 h-5 text-white" />
    </div>
    <div>
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="text-lg text-blue-600 font-medium">{subtitle}</p>
      )}
    </div>
  </div>
);

const StarRating = ({ rating = 0 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <Star
              key={i}
              className="w-4 h-4 text-yellow-400"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          );
        } else {
          return <Star key={i} className="w-4 h-4 text-gray-300" />;
        }
      })}
      <span className="ml-2 text-sm font-medium text-gray-700">
        {rating?.toFixed(1)}
      </span>
    </div>
  );
};

const ActionButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl transform hover:scale-105",
    secondary:
      "bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg",
    tertiary:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg",
    danger:
      "bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-xl transform hover:scale-105",
  };

  return (
    <button
      className={`py-3 px-6 rounded-xl font-bold transition-all duration-500 flex items-center justify-center gap-2 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};   

const DoctorDetailPage = () => {
  const [doctor, setDoctor] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    name: "",
    comment: "",
    rating: 5,
  });
  const [selectedDate, setSelectedDate] = useState(null);


  const [clinicData,setClinicData]= useState(null)

  console.log("clinicData",clinicData);
  

  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getRequest(`doctor/${id}`)
      .then((res) => {
        setDoctor(res?.data?.data);
        setClinicData(res?.data?.data?.clinics[0])
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [id]);

  const handleReviewSubmit = () => {
    console.log("Submitted Review:", reviewData);
    setShowReviewForm(false);
    setReviewData({ name: "", comment: "", rating: 5 });
  };

  const formatDateLabel = (isoDate) => {
    const options = { month: "short", day: "numeric" };
    return new Date(isoDate).toLocaleDateString("en-US", options);
  };

  const areDatesEqual = (date1, date2) =>
    new Date(date1).toDateString() === new Date(date2).toDateString();

  const selectedClinic = doctor?.clinics?.[selectedClinicIndex] || {};
  const availability = selectedClinic.availability || [];



const availableDates = useMemo(() => {
  return availability
    .filter((item) => item.isAvailable)
    .map((item) => ({
      date: item.date,
      label: formatDateLabel(item.date),
      slots: item.slots.filter((slot) => !slot.isBooked),
    }));
}, [availability]);

const selectedDateSlots = useMemo(() => {
  return (
    availableDates.find((d) => areDatesEqual(d.date, selectedDate))?.slots || []
  );
}, [availableDates, selectedDate]);


  useEffect(() => {
  if (availableDates.length > 0) {
    setSelectedDate(availableDates[0].date);
  }
}, [selectedClinicIndex]);


  const HIGHLIGHTS = [
    { icon: Shield, text: "100% Trusted", color: "text-green-600" },
    { icon: Clock, text: "24/7 Available", color: "text-blue-600" },
    {
      icon: Zap,
      text: `${doctor?.experience || "N/A"} Years Experience`,
      color: "text-purple-600",
    },
    { icon: CheckCircle, text: "Licensed Doctor", color: "text-orange-500" },
  ];

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-10 px-4 pt-32 sm:pt-36">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Doctor Image & Highlights */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src={doctor?.profilepic}
                alt={doctor?.fullName}
                className="w-full h-72 sm:h-80 object-cover transition-transform duration-700"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {HIGHLIGHTS.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center bg-white py-4 rounded-xl shadow border text-center"
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-2">
                    <item.icon className={item.color} />
                  </div>
                  <p className="text-sm font-medium text-gray-700">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Doctor Info Card */}
          <div className="bg-white shadow-2xl rounded-3xl p-6 border border-gray-200 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {doctor?.fullName}
              </h2>
              <CheckCircle className="text-blue-500" />
            </div>
            <p className="text-sm text-gray-600">{doctor?.category?.name}</p>
            <StarRating rating={doctor?.averageRating} />
            <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold inline-block">
              Experience: {doctor?.experience} Years
            </div>
            <div className="text-sm text-gray-700 space-y-1 max-w-full break-words">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {doctor?.phone}
              </p>
              {doctor?.clinics?.map((clinic, index) => (
                <p key={index} className="flex items-center gap-2 text-sm">
                  <MapPin className="w-5 h-5" />
                  {clinic.clinicAddress}
                </p>
              ))}
            </div>

            <div className="space-y-3 pt-2">
              <ActionButton className="w-full " style={{ background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
                <Phone className="w-4 h-4" />
                Call Now
              </ActionButton>
              <ActionButton variant="secondary" className="w-full">
                <MessageCircle className="w-4 h-4" />
                Book Clinic Visit
              </ActionButton>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-10 sm:py-16">

        


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-16">


             {/* Appointment Booking */}
            <GradientCard className="p-6 sm:p-8">
              {/* Clinic Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {doctor?.clinics?.map((clinic, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setClinicData(clinic)
                      setSelectedClinicIndex(index);
                      setSelectedDate(null);
                      setSelectedSlot(null);
                    }}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${
                      index === selectedClinicIndex
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    {clinic.clinicName}
                    
                  
                  </button>
                ))}
              </div>

                    {selectedClinic.clinicAddress}

              {/* Fee */}
              <div className="text-center p-4 bg-green-50 text-green-700 rounded-xl">
          
                <IndianRupee className="w-8 h-8 mx-auto mb-1" />
                <p className="text-3xl text-black font-bold">
                  
                  {selectedClinic.consultationFee}
                </p>
                <p className="text">Consultation Fee</p>
              </div>

               
                
                    
            
         

              {/* Date Selector */}
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">Select Date</h4>
                <div className="flex flex-wrap gap-2">
                  {clinicData?.availability?.map((d, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        console.log("d",d);
                        
                        setSelectedDate(d);
                        setSelectedSlot(null);
                      }}
                      className={`px-3 py-2 text-sm rounded-lg font-medium ${
                        areDatesEqual(selectedDate, d?.date)
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {d?.date}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div className="mt-6">
                <h4 className="font-bold text-sm mb-2">Available Slots</h4>
                <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
                  {selectedDateSlots.length > 0 ? (
                    selectedDateSlots.map((slot, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedSlot(slot.startTime)}
                        className={`px-2 py-2 text-sm rounded-lg font-medium ${
                          selectedSlot === slot.startTime
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                        }`}
                      >
                        {slot.startTime}- {slot.endTime}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm col-span-2">
                      No slots available
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3 pt-4">
              <ActionButton className="w-full " style={{ background: "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)"}}>
                <Phone className="w-4 h-4" />
                Book Appointment
              </ActionButton>
              </div>
            </GradientCard>




            
            {/* Reviews */}
            <GradientCard
              gradient="from-purple-500/5 to-pink-500/5"
              rotation="-rotate-1"
              className="p-6 sm:p-10"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
                <SectionHeader
                  icon={MessageCircle}
                  title="Patient Reviews"
                  subtitle="What patients say"
                  gradient="from-purple-500 to-pink-500"
                />
                <ActionButton
                  variant="tertiary"
                  onClick={() => setShowReviewForm(true)}
                >
                  <PlusCircle className="w-5 h-5" />
                  Write Review
                </ActionButton>
              </div>

              <div className="grid gap-6 max-h-[500px] overflow-y-auto pr-2">
                {doctor?.reviews?.map((review, index) => (
                  <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <StarRating rating={review?.rating} />
                        {review?.createdAt && (
                          <span className="text-sm text-gray-400">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-800 font-medium mb-2">
                      “{review?.comment}”
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-700 uppercase">
                        {review?.user?.name?.[0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {review?.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          Verified Patient
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              {showReviewForm && (
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                  <h3 className="font-bold mb-4 text-xl">
                    Share Your Experience
                  </h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewData.name}
                      onChange={(e) =>
                        setReviewData({ ...reviewData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    />
                    <textarea
                      placeholder="Your Review"
                      rows="4"
                      value={reviewData.comment}
                      onChange={(e) =>
                        setReviewData({
                          ...reviewData,
                          comment: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                    />
                    <div className="flex gap-3">
                      <ActionButton
                        variant="tertiary"
                        onClick={handleReviewSubmit}
                      >
                        Submit
                      </ActionButton>
                      <button
                        onClick={() => setShowReviewForm(false)}
                        className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </GradientCard>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
           

           {/* About */}
            <GradientCard className=" p-6 sm:p-10">
              <SectionHeader
                icon={Stethoscope}
                title={`About ${doctor?.fullName}`}
                subtitle={doctor?.category?.name}
              />
              <p className="p-4 text-gray-700 leading-relaxed">{doctor?.about}</p>
            </GradientCard>

            {/* Education */}
            <GradientCard
              gradient="from-green-500/5 to-emerald-500/5"
              rotation="-rotate-1"
              className="p-6 sm:p-8"
            >
              <SectionHeader
                icon={GraduationCap}
                title="Education"
                gradient="from-green-500 to-emerald-500"
              />
              <div className=" p-4 space-y-6 text-sm">{doctor?.education}</div>
            </GradientCard>


            {/* Clinic Info */}
            <GradientCard className="p-6 sm:p-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl"><Building2 className="w-5 h-5 text-white" /></div>
                  Clinic Details
                </h3>
              </div>
              <div className="space-y-4">
                {doctor?.clinics?.map((clinic, index) => (
                  <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
                    <h4 className="font-bold mb-1">{clinic.clinicName}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {clinic.clinicAddress}
                    </p>
                  </div>
                ))}
                <div className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    {doctor?.phone}
                  </p>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    {doctor?.email}
                  </p>
                </div>
              </div>
            </GradientCard>
          </aside>
        </div>
      </main>
    </div>
    
  );
};

export default DoctorDetailPage;

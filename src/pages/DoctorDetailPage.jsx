import React, { useState, useEffect, useMemo } from "react";
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
import { useLocation, useParams } from "react-router-dom";
import { getRequest } from "../Helpers";
import { AppointmentDateFormat } from "../Utils";
import AppointmentFlow from "../components/AppointmentFlow";
import DiagonsticsReviewPopup from "./DiagonsticsReviewPopup";


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
 
   const [showReviewPopup, setShowReviewPopup] = useState(false);
   const [showAppointmentPopup, setShowAppointmentPopup] = useState(false);  
  const [doctor, setDoctor] = useState(null);
  const [clinicData, setClinicData] = useState(null);
  const [selectedClinicIndex, setSelectedClinicIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDateData, setSelectedDateData] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const phoneNumber = "102";
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const [showFallback, setShowFallback] = useState(false);
  
    const tryTelLink = () => {
      const telUrl = `tel:${phoneNumber}`;
      const timeout = setTimeout(() => {
        // If nothing happened → show fallback popup
        setShowFallback(true);
      }, 1500);
  
      window.location.href = telUrl;
  
      // If the page is hidden (meaning app opened), cancel timeout
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) clearTimeout(timeout);
      });
    };
  
    const handleClick = () => {
      if (isMobile) {
        window.location.href = `tel:${phoneNumber}`;
      } else {
        tryTelLink();
      }
    };

  const [reviewData, setReviewData] = useState({
    name: "",
    comment: "",
    rating: 5,
  });

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const modeFilter = queryParams.get("modeFilter");

  console.log("modeFilter", modeFilter);

  console.log("selectedDate", selectedDate);
  console.log("selectedDateData", selectedDateData);

  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    getRequest(`doctor/${id}`)
      .then((res) => {
        const doc = res?.data?.data;
        setDoctor(doc);
        setClinicData(doc?.clinics?.[0]);
        setSelectedDate(doc?.clinics?.[0]?.availability[0]?.date);
        setSelectedDateData(doc?.clinics?.[0]?.availability[0]);
        
         const firstClinic = doc?.clinics?.[0];
      const firstAvailability = firstClinic?.availability?.[0];

      setClinicData(firstClinic);
      setSelectedDate(firstAvailability?.date);
      setSelectedDateData(firstAvailability);

      //  Set default slot
      const availableSlot = firstAvailability?.slots?.find(slot => !slot.isBooked);
      setSelectedSlot(availableSlot || null);
        
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, [id]);

  const areDatesEqual = (date1, date2) =>
    new Date(date1).toDateString() === new Date(date2).toDateString();

  const selectedClinic = clinicData || {};

  const handleReviewSubmit = () => {
    console.log("Submitted Review:", reviewData);
    setShowReviewForm(false);
    setReviewData({ name: "", comment: "", rating: 5 });
  };

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

  const bookAppointment = (e) => {
    e.preventDefault();

    const finalData = {
      clinicName: clinicData?.clinicName,
      date: selectedDate,
      doctor: id,
      fee: clinicData?.consultationFee,
      isSelf: false,
      otherPatientDetails: {
        name: "",
        age: "",
        gender: "",
        type: "",
      },
      patient: "685cf37fc439c4973e98f8d6",
      serviceType: modeFilter,
      slots: selectedSlot,
    };
    setShowAppointmentPopup(true)

    console.log("doctor", doctor);
    console.log("clinicData", clinicData);

    console.log("finalData", finalData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="py-10 px-4 pt-32 sm:pt-36">
        <div className="w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Doctor Image & Highlights */}
          <div className="lg:col-span-2">
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
              <img
                src={doctor?.profilepic}
                alt={doctor?.fullName}
                className="w-full h-72 sm:h-80 object-contain transition-transform duration-700"
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

              <p className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4" />
                {selectedClinic.clinicAddress}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <ActionButton  onClick={handleClick}
                className="w-full cursor-pointer "
                style={{
                  background:
                    "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
                }}
              >
                <Phone className="w-4 h-4" />
                Call Now
              </ActionButton>
              <  a href={`https://maps.google.com/?q=${
                doctor?.doctor?.coordinates[1]
              },${doctor?.location?.coordinates[0]} (${encodeURIComponent(
                doctor?.address || ""
              )})`}
              target="_blank">
                <ActionButton variant="secondary" className="w-full cursor-pointer">
                <MapPin className="w-4 h-4" />
                Get Location
              </ActionButton>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className=" mx-auto px-4 py-10 sm:py-16 w-[70%]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {/* Left Column */}
              <div className="lg:col-span-4 space-y-16">
                {/* Appointment Booking */}
                <GradientCard className="p-6 sm:p-8">
                  {/* Clinic Tabs */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {doctor?.clinics?.map((clinic, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setClinicData(clinic);
                          setSelectedClinicIndex(index);
                          setSelectedDate(clinic?.availability[0]?.date);
                          setSelectedDateData(clinic?.availability[0]);
                          
                          setSelectedSlot(clinic?.availability[0]?.slots[0])
                        }}
                        className={`px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
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
                  <div className="mt-6 ">
                    <h4 className="text-sm font-semibold mb-2">Select Date</h4>
                    <div className="flex flex-wrap gap-2 " >
                      {clinicData?.availability?.map((d, i) => {
                        return (
                          <button
                            key={i}
                            onClick={() => {
                              setSelectedDate(d?.date);

                              console.log("d",d);
                              


                              setSelectedSlot(d?.slots[0])
                              setSelectedDateData(d);
                            }}
                            className={`px-3 py-2 text-sm rounded-lg font-medium cursor-pointer ${
                              areDatesEqual(selectedDate, d?.date)
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                            }`}
                          >
                            {AppointmentDateFormat(d?.date)}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mt-6">
                    <h4 className="font-bold text-sm mb-2">Available Slots</h4>
                    <div className="grid grid-cols-2 gap-2 max-h-52 overflow-y-auto">
                      {selectedDateData?.slots?.length > 0 ? (
                        selectedDateData?.slots
                          .filter((slot) => !slot.isBooked)
                          .map((slot, i) => (
                            <button
                              key={i}
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-2 py-2 text-sm rounded-lg font-medium cursor-pointer ${
                                selectedSlot === slot
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                              }`}
                            >
                              {slot.startTime} - {slot.endTime}
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
                    <ActionButton
                      onClick={bookAppointment}
                 
                      className="w-full cursor-pointer "
                      style={{
                        background:
                          "linear-gradient(135deg, rgb(0, 123, 189) 0%, rgb(0, 90, 140) 100%)",
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      Book Clinic Visit
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
                    {/* Right side: Share button */}
                    <div className="text-right">
                      <button
                        onClick={() => setShowReviewPopup(true)}
                        className="cursor-pointer group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-8 py-4 rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        <PlusCircle className="w-5 h-5 group-hover:animate-spin" />
                        Share Your Experience
                      </button>
                    </div>
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
                                {new Date(
                                  review.createdAt
                                ).toLocaleDateString()}
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

                  
                </GradientCard>
              </div>
            </div>
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
              <p className="p-4 text-gray-700 leading-relaxed text-justify">
                {doctor?.about}
              </p>
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
                  <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  Clinic Details
                </h3>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-gray-50 to-indigo-50 rounded-xl">
              
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {selectedClinic.clinicAddress}
                  </p>
                </div>

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
      <DiagonsticsReviewPopup
        open={showReviewPopup}
        onClose={() => setShowReviewPopup(false)}
        id={doctor?._id}
        onReviewAdded={(review) => setReviews([...reviews, review])}
      />
      <AppointmentFlow
        open={showAppointmentPopup}
        onClose={() => setShowAppointmentPopup(false)}
        id={doctor?._id}
        
      />
    </div>
  );
};

export default DoctorDetailPage;
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Stethoscope, Heart, Brain, Eye, Activity, User } from 'lucide-react';

const DoctorCategoryCards = () => {
  const categories = [
    {
      id: 1,
      name: "General Physician",
      icon: Heart,
      image: "https://media.istockphoto.com/id/611600820/photo/3d-doctor-with-a-blank-clipboard.jpg?s=612x612&w=0&k=20&c=4Z9FBejivYjk9tncAkxP2-b71LFNJHCMF25Jp-6O1TI=",
      description: "Up to 60% Off",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 2,
      name: "Skin & Hairs",
      icon: User,
      image: "https://media.istockphoto.com/id/1960062748/photo/3d-illustration-of-european-businesswoman-ellen-try-to-hear-you-overhear-listening-intently.jpg?s=612x612&w=0&k=20&c=1tnrbGLTY1WALilx-sP0aGqb7-2sHkPB_ICMovA-QHs=",
      description: "Up to 40% Off",
      color: "from-purple-500 to-indigo-600"
    },
    {
      id: 3,
      name: "Dental Care",
      icon: Heart,
      image: "https://media.istockphoto.com/id/1474592756/photo/3d-rendered-cartoon-doctor-character.jpg?s=612x612&w=0&k=20&c=0bqlob1WqwbQHrRxEcMfY_9eldp5y8vzOnlZK5J5Oso=",
      description: "Up to 60% Off",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 4,
      name: "Child Specialist",
      icon: Stethoscope,
      image: "https://media.istockphoto.com/id/1500178516/photo/3d-cartoon-boy-character-hand-hold-open-book-with-magnifying-glass-icon-isolated-on-pink.webp?a=1&b=1&s=612x612&w=0&k=20&c=pWsO_PiZaJU9TxbXorMkVw7EhmAastkKtr4DFAiaPrw=",
      description: "Up to 55% Off",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 5,
      name: "Ear,Nose,Throat",
      icon: Eye,
      image: "https://media.istockphoto.com/id/1369420471/photo/3d-illustration-of-articulated-wooden-mannequin-with-the-respiratory-system.jpg?s=612x612&w=0&k=20&c=jaUpDIYmLmd1JaFasDDLRl59UaqdH32IIDnMVa9aCnw=",
      description: "Up to 45% Off",
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 6,
      name: "Veterinary",
      icon: Activity,
      image: "https://media.istockphoto.com/id/1456318979/photo/the-dogs-nails-are-being-trimmed-the-dog-covered-his-eyes-in-pleasure-pet-grooming.jpg?s=612x612&w=0&k=20&c=yIOoJAu8vfpKy6fCH1QzKjDdqejGe0W8RaHfIxvWy0s=",
      description: "Up to 60% Off",
      color: "from-blue-500 to-cyan-600"
    },
    {
      id: 7,
      name: "Cardiologist (Heart)",
      icon: Heart,
      image: "https://media.istockphoto.com/id/2167124908/photo/3d-render-medical-heart-rate-icon-doctor-or-cardiologist-cartoon-hand-holding-heart-with.jpg?s=612x612&w=0&k=20&c=N-LPGrghH7M8-Buj8Y2WyXXNk_x_YFubdy_C26kB2L8=",
      description: "Up to 40% Off",
      color: "from-red-500 to-pink-600"
    },
    {
      id: 8,
      name: "Neurologist (Brain)",
      icon: Brain,
      image: "https://media.istockphoto.com/id/522799655/photo/young-doctor-with-brain-anatomy.webp?a=1&b=1&s=612x612&w=0&k=20&c=i9ToQGmps7RWFAsE4LP83dGNYCFBTFhdGL3Gj98Skn8=",
      description: "Up to 50% Off",
      color: "from-yellow-500 to-orange-600"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Doctors & <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Specialists</span>
          </h2>
          <p className="text-gray-600  mx-auto">
            Choose from our comprehensive range of medical specialties and connect with expert doctors
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            pagination={{
              el: '.swiper-pagination-custom',
              clickable: true,
            }}
            autoplay={{ delay: 4000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <SwiperSlide key={category.id}>
                  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-0 group-hover:opacity-80 transition-opacity duration-300`} />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 transform group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center text-white">
                          <IconComponent className="w-12 h-12 mx-auto mb-2" />
                          <p className="text-sm font-medium">Click to View Doctors</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className=" mb-2 text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                      <button className="w-full bg-[#00669e] text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                        View More
                      </button>
                    </div>
                    
                  </div>
                  
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Custom Navigation Buttons (Center Aligned) */}
          <div className="absolute inset-y-0 -left-5 flex items-center z-10">
            <div className="swiper-button-prev-custom bg-white text-blue-600 border border-blue-500 rounded-full p-1.5 shadow hover:bg-blue-100 transition duration-300 cursor-pointer">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </div>
          </div>
          <div className="absolute inset-y-0 -right-5 flex items-center z-10">
            <div className="swiper-button-next-custom bg-white text-blue-600 border border-blue-500 rounded-full p-1.5 shadow hover:bg-blue-100 transition duration-300 cursor-pointer">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom mt-4 text-center" />
      </div>
      <div className='flex items-center justify-center'>
        <button className="w-40 bg-[#00669e] text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all       duration-300 shadow-md hover:shadow-lg">
            View All
      </button>
      </div>
      
    </div>
  );
};

export default DoctorCategoryCards;

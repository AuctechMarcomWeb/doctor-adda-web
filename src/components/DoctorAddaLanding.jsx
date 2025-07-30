import React from "react";



const DoctorAddaLanding = () => {

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Stats Section */}
      <section className="py-20 bg-[#006aa4] ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "1000+", label: "Expert Doctors" },
              { number: "50,000+", label: "Happy Patients" },
              { number: "25+", label: "Specializations" },
              { number: "99.9%", label: "Ontime" },
            ].map((stat, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-transform"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DoctorAddaLanding;
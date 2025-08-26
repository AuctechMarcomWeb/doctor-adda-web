import React from "react"
import { useState } from "react"
import DashboardService from "./DashboardService"
import DashboardWallet from "./DashboardWallet"
import img from '../assets/doctor.jpg'
import { Home, Briefcase, Wallet } from "lucide-react"
import { useNavigate } from "react-router-dom"


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("home");
  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-gray-50">

      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center lg:pl-80">

        <div className="flex items-center">
          <button className="mr-4 cursor-pointer lg:hidden" onClick={() => setIsSidebarOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button
            onClick={() => {
              setActiveView("home");
            }}
            className="text-xl cursor-pointer font-bold text-gray-800"> Dashboard 
          </button>
        </div>

        <div className="flex items-center">
          <div className="relative mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </div>
          {/* <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            N
          </div> */}
        </div>

      </div>

      {/* Sidebar Overlay (mobile only) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0  z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:shadow-none lg:border-r lg:z-30`}
      >
        <div className="p-5 border-b cursor-pointer">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-2xl mr-3">
              🧪
            </div>

            <div 
             onClick={() => { setIsSidebarOpen(false); navigate('/pharmacy-profile'); }} className="flex-1 ">
              <p className="font-semibold text-gray-800 truncate">Nayatik pharmacy</p>
              <button
                className="text-sm text-teal-700 hover:underline"
                onClick={() => { setIsSidebarOpen(false); navigate('/pharmacy-profile'); }}
              >
                Edit Profile
              </button>
            </div>

            <button
              className="ml-2 text-gray-500 hover:text-gray-700 lg:hidden"
              aria-label="Close sidebar"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

          </div>
        </div>

<nav className="p-5 space-y-4">
  {/* Home */}
  <button
    onClick={() => {
      setActiveView("home");
      setIsSidebarOpen(false);
    }}
    className="w-full flex items-center cursor-pointer text-left px-3 py-3 rounded-lg hover:bg-gray-100"
  >
    <span className="mr-3 text-teal-700">
      <Home className="h-6 w-6" strokeWidth={2.2} />
    </span>
    <span className="font-medium text-gray-800">Home</span>
  </button>

  {/* Services */}
  <button
    className="w-full flex items-center cursor-pointer text-left px-3 py-3 rounded-lg hover:bg-gray-100"
    onClick={() => {
      setActiveView("services");
      setIsSidebarOpen(false);
    }}
  >
    <span className="mr-3 text-teal-700">
      <Briefcase className="h-6 w-6" strokeWidth={2.2} />
    </span>
    <span className="font-medium text-gray-800">Services</span>
  </button>

  {/* Wallet */}
  <button
    className="w-full cursor-pointer flex items-center text-left px-3 py-3 rounded-lg hover:bg-gray-100"
    onClick={() => {
      setActiveView("wallet");
      setIsSidebarOpen(false);
    }}
  >
    <span className="mr-3 text-teal-700">
      <Wallet className="h-6 w-6" strokeWidth={2.2} />
    </span>
    <span className="font-medium text-gray-800">Your Wallet</span>
  </button>
</nav>

      </div>

      <div className="p-4 lg:pl-80">
        {activeView === "services" ? (
          <DashboardService />
        ) : activeView === "wallet" ? (
          <DashboardWallet />
        ) : (
          <>

            {/* Greeting Section */}
            <div className="relative mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 rounded-3xl ring-1 ring-white/10 shadow-xl p-6 md:p-8 text-white mb-8 transition-all duration-300 hover:shadow-2xl">
  {/* Doctor Illustration (Right Center) */}
  <div className="absolute top-1/2 right-6 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg border-2 border-white/40 overflow-hidden transition-transform duration-300 hover:scale-105">
    <img src={img} className="w-full h-full object-cover rounded-full" />
  </div>

  {/* Left Content */}
  <div className="pr-36"> {/* padding-right so text doesn't overlap image */}
    <p className="text-yellow-300 font-semibold text-sm tracking-wide">Good Morning</p>
    <h1 className="text-2xl md:text-3xl font-bold mt-1">Nayatik pharmacy store</h1>
    <p className="text-sm md:text-base opacity-90 mt-1">
      Wishing you a healthy and productive day ahead
    </p>

    {/* Points Section */}
    <div className="flex mt-6">
      <div className="flex items-center bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-md text-blue-800 transition-shadow duration-300 hover:shadow-lg">
        <span className="text-yellow-500 text-lg mr-2">💰</span>
        <span className="text-sm font-semibold">15565 Points</span>
      </div>
    </div>

  </div>

</div>


            {/* Avg Rating Card */}
            <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 bg-white/80 backdrop-blur border border-gray-100 rounded-2xl shadow p-5 md:p-6 mb-8 transition-shadow duration-300 hover:shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-2xl">
                    ⭐
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">Avg Rating</p>
                    <div className="flex items-center mt-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <span className="font-extrabold text-gray-800 text-2xl">2.5 / 5</span>
              </div>
            </div>

            {/* Order Statistics */}
            <div className="mx-4 sm:mx-6 md:mx-10 lg:mx-16 xl:mx-24 mb-8">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 mb-4">
                Order Statistics
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {/* Total Orders */}
                <div className="group bg-white/90 backdrop-blur border border-gray-100 rounded-2xl shadow p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl text-2xl mr-3">
                    🛒
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Orders</p>
                    <p className="text-xl font-bold text-gray-900">12</p>
                  </div>
                </div>

                {/* Total Customers */}
                <div className="group bg-white/90 backdrop-blur border border-gray-100 rounded-2xl shadow p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200 rounded-xl text-2xl mr-3">
                    👥
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Total Customers</p>
                    <p className="text-xl font-bold text-gray-900">12</p>
                  </div>
                </div>

                {/* Accepted Orders */}
                <div className="group bg-white/90 backdrop-blur border border-gray-100 rounded-2xl shadow p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl text-2xl mr-3">
                    ✅
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Accepted Orders</p>
                    <p className="text-xl font-bold text-gray-900">2</p>
                  </div>
                </div>

                {/* Pending Orders */}
                <div className="group bg-white/90 backdrop-blur border border-gray-100 rounded-2xl shadow p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-xl text-2xl mr-3">
                    ⏳
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Pending Orders</p>
                    <p className="text-xl font-bold text-gray-900">2</p>
                  </div>
                </div>

                {/* In Transit */}
                <div className="group bg-white/90 backdrop-blur border border-gray-100 rounded-2xl shadow p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl text-2xl mr-3">
                    🚚
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">In Transit</p>
                    <p className="text-xl font-bold text-gray-900">1</p>
                  </div>
                </div>

                {/* Delivered */}
                <div className="group bg-white/90 backdrop-blur border border-gray-100 rounded-2xl shadow p-5 flex items-center transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl text-2xl mr-3">
                    📦
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">Delivered</p>
                    <p className="text-xl font-bold text-gray-900">5</p>
                  </div>
                </div>
              </div>
            </div>

          </>
        )}
      </div>

    </div>

  )
}

export default Dashboard;

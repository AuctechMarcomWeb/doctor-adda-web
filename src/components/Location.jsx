import React, { useState, useEffect } from 'react';

const Location = ({ onLocationGranted, onLocationDenied, isVisible = true }) => {
  const [permissionStatus, setPermissionStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(null);
  console.log("location",location);
  console.log("permissionStatus",permissionStatus);

  const requestLocationPermission = async () => {

    setIsLoading(true);
    
    try {
      // Check if geolocation is supported
      if (!navigator.geolocation) {
        setPermissionStatus('unsupported');
        setIsLoading(false);
        return;
      }

      // Request location permission
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });
      });

      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      setPermissionStatus('granted');
      onLocationGranted?.({ latitude, longitude });
      
    } catch (error) {
      console.error('Location permission error:', error);
      setPermissionStatus('denied');
      onLocationDenied?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAllowLocation = () => {
    requestLocationPermission();
  };

  const handleDenyLocation = () => {
    setPermissionStatus('denied');
    onLocationDenied?.('User denied location permission');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 animate-in slide-in-from-bottom-4">
        {/* Header with location icon */}
        <div className="relative p-6 pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg 
                  className="w-8 h-8 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
              </div>
              {/* Animated pulse effect */}
              <div className="absolute inset-0 w-16 h-16 bg-blue-400 rounded-full animate-ping opacity-20"></div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Enable Location Access
          </h2>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            We need your location to provide you with the best healthcare services nearby, including doctors, hospitals, and pharmacies in your area.
          </p>
        </div>

        {/* Status messages */}
        {permissionStatus === 'granted' && (
          <div className="px-6 pb-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-800 font-medium">Location access granted!</span>
              </div>
              {location && (
                <p className="text-green-700 text-sm mt-1">
                  Coordinates: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        )}

        {permissionStatus === 'denied' && (
          <div className="px-6 pb-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-red-800 font-medium">Location access denied</span>
              </div>
              <p className="text-red-700 text-sm mt-1">
                You can still use the app, but some features may be limited.
              </p>
            </div>
          </div>
        )}

        {permissionStatus === 'unsupported' && (
          <div className="px-6 pb-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-yellow-800 font-medium">Location not supported</span>
              </div>
              <p className="text-yellow-700 text-sm mt-1">
                Your browser doesn't support location services.
              </p>
            </div>
          </div>
        )}

        {/* Action buttons */}
        {permissionStatus === 'pending' && (
          <div className="px-6 pb-6">
            <div className="space-y-3">
              <button
                onClick={handleAllowLocation}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Getting location...
                  </div>
                ) : (
                  'Allow Location Access'
                )}
              </button>
              
              <button
                onClick={handleDenyLocation}
                className="w-full py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 active:scale-95"
              >
                Maybe Later
              </button>
            </div>
            
            <p className="text-xs text-gray-500 text-center mt-4 leading-relaxed">
              Your location data is used only to find nearby healthcare services and is never shared with third parties.
            </p>
          </div>
        )}

        {/* Success/Denied state buttons */}
        {(permissionStatus === 'granted' || permissionStatus === 'denied') && (
          <div className="px-6 pb-6">
            <button
              onClick={() => {
                if (permissionStatus === 'granted') {
                  // Close modal or continue with app
                  console.log('Location granted, continuing...');
                } else {
                  // Try again or close
                  setPermissionStatus('pending');
                }
              }}
              className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg"
            >
              {permissionStatus === 'granted' ? 'Continue' : 'Try Again'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Location;

import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-base-100">
      
      {/* Spinner */}
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-300 rounded-full"></div>
        <div className="w-20 h-20 border-4 border-t-[#00D390] border-r-[#00D390] rounded-full animate-spin absolute top-0 left-0 shadow-lg"></div>
      </div>

      {/* Text */}
      <p className="text-gray-600 text-base font-medium tracking-wide animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default LoadingSpinner;

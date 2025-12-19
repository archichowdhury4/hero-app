import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#00D390] rounded-full animate-spin"></div>
      <p className="text-gray-500 text-sm">Loading, please wait...</p>
    </div>
  );
};


export default LoadingSpinner;
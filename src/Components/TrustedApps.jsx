import React from 'react';
import hero from "../../public/assets/hero.png";

const TrustedApps = () => {
  return (
    <div className="w-full">

      
      <div className="flex justify-center -mt-10">
        <img
          src={hero}
          alt="Hero"
          className="w-[250px] sm:w-[300px] lg:w-[600px] mx-auto"
        />
      </div>

      
      <div className="bg-primary w-full py-10">
        <h1 className="font-bold text-3xl md:text-4xl text-center text-white">
          Trusted by Millions, Built for You
        </h1>

        <div className="flex flex-wrap justify-center gap-10 md:gap-20 mt-8">

        
          <div className="text-center">
            <p className="text-xs text-white">Total Downloads</p>
            <h1 className="font-bold text-4xl text-white">29.6M</h1>
            <p className="text-xs text-white">21% more than last month</p>
          </div>

         
          <div className="text-center">
            <p className="text-xs text-white">Total Reviews</p>
            <h1 className="font-bold text-4xl text-white">906K</h1>
            <p className="text-xs text-white">46% more than last month</p>
          </div>

          
          <div className="text-center">
            <p className="text-xs text-white">Active Apps</p>
            <h1 className="font-bold text-4xl text-white">132+</h1>
            <p className="text-xs text-white">31 more will Launch</p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default TrustedApps;

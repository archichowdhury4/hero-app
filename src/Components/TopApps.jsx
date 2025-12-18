import { useEffect, useState } from "react";
import { FaDownload, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const TopApps = () => {
  const [topApps, setTopApps] = useState([]);

  useEffect(() => {
    fetch("/app.json")
      .then(res => res.json())
      .then(data => {
        setTopApps(data.slice(0, 8)); 
      });
  }, []);

  return (
    <div className="mb-10 px-5 md:px-20">  
      <h2 className="text-xl font-bold mb-4">Top Apps</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 ">
        {topApps.map(app => (
          
          <Link 
            key={app.id}
            to={`/apps/${app.id}`}
            state={{ app }}      
            className="shadow-xl p-3 rounded cursor-pointer hover:shadow-md transition block"
          >
            <img
              src={app.image}
              className="w-full h-32 object-cover rounded"
              alt={app.title}
            />

            <h3 className="mt-2 font-semibold">{app.title}</h3>

            <div className="flex justify-between items-center text-sm mt-1">
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <FaDownload size={14} /> {app.downloads}M
              </div>

              <div className="flex items-center gap-1 text-orange-500 font-semibold">
                <FaStar size={14} /> {app.ratingAvg}
              </div>
            </div>
          </Link>

        ))}
      </div>

      <div className="text-center mt-4">
        <Link
          to="/apps"
          className="inline-block bg-primary text-white font-semibold px-6 py-2 rounded-xl
                     shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default TopApps;

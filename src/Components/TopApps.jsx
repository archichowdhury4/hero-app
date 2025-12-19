import { useEffect, useState } from "react";
import { FaDownload, FaStar } from "react-icons/fa";
import { Link } from "react-router";

const TopApps = () => {
  const [topApps, setTopApps] = useState([]);

  useEffect(() => {
    fetch("/app.json")
      .then((res) => res.json())
      .then((data) => {
        setTopApps(data.slice(0, 8)); 
      })
      .catch((err) => console.error("Error fetching apps:", err));
  }, []);

  return (
    <div className="mb-10 px-5 md:px-20 mt-10">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">Trending Apps</h2>
        <p className="text-gray-500 md:text-lg">
          Explore the most popular apps on the market, developed by us
        </p>
      </div>

      {/* Apps Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {topApps.map((app) => (
          <Link
            key={app.id}
            to={`/apps/${app.id}`}
            state={{ app }}
            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <img
              src={app.image}
              alt={app.title}
              className="w-full h-36 md:h-40 object-cover"
            />
            <div className="p-3">
              <h3 className="text-lg font-semibold mb-2">{app.title}</h3>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-1 text-green-600 font-semibold">
                  <FaDownload size={14} /> {app.downloads}M
                </span>
                <span className="flex items-center gap-1 text-orange-500 font-semibold">
                  <FaStar size={14} /> {app.ratingAvg}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Show All Button */}
      <div className="text-center mt-8">
        <Link
          to="/apps"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-2xl
                     shadow-md hover:shadow-lg transition-all duration-300"
        >
          Show All Apps
        </Link>
      </div>
    </div>
  );
};

export default TopApps;

import React, { useState, useEffect } from "react";
import { FaStar, FaDownload, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import LoadingSpinner from "../Components/loadingSpinner";
import  DocumentTitle from "../Components/DocumentTitle"

const Apps = () => {
   DocumentTitle('Apps | MyHeroApp');
  const [appsData, setAppsData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/app.json")
      .then((res) => res.json())
      .then((data) => {
        setAppsData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching apps:", err);
        setLoading(false);
      });
  }, []);

  const filteredApps = appsData.filter((app) =>
    app.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="p-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="text-3xl font-bold">Our Apps</h1>
        <p className="text-gray-500">Discover the best apps for your needs</p>
      </div>

      {/* Search and Total Apps */}
      <div className="flex justify-between items-center mb-5">
        <span className="font-bold">({filteredApps.length}) Total Apps</span>

        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

          <input
            type="text"
            placeholder="Search apps..."
            className="border px-3 py-1 rounded pl-9"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSearchLoading(true);
              setTimeout(() => setSearchLoading(false), 300); 
            }}
          />
        </div>
      </div>

      {/* App Grid */}
      <div className="relative">
        {searchLoading && (
          <div className="flex items-center justify-center py-5">
            <LoadingSpinner />
          </div>
        )}

        {filteredApps.length === 0 ? (
          <p className="text-center text-2xl text-gray-500 py-24">
            No App Found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredApps.map((app) => (
              <div
                key={app.id}
                className="shadow-xl rounded p-3 bg-white hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/apps/${app.id}`, { state: { app } })}
              >
                <img
                  src={app.image}
                  alt={app.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />

                <h2 className="font-semibold text-lg mb-2">{app.title}</h2>

                {/* Stats Section */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-green-600 font-semibold">
                    <FaDownload size={14} /> {app.downloads}M
                  </div>

                  <div className="flex items-center gap-1 text-orange-500 font-semibold">
                    <FaStar size={14} /> {app.ratingAvg}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Apps;

import React, { useEffect, useState } from "react";
import { FaDownload, FaStar } from "react-icons/fa";
import Swal from "sweetalert2";
import DocumentTitle from "../Components/DocumentTitle";

const InstallationPage = () => {
     DocumentTitle('InstallationPage | MyHeroApp');
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("high");

  
  const loadInstalledApps = async () => {
    try {
      const res = await fetch("/app.json");
      const allApps = await res.json();

      const installedIds =
        JSON.parse(localStorage.getItem("installedApps")) || [];

      const installedApps = allApps.filter((app) =>
        installedIds.includes(String(app.id))
      );

      setApps(installedApps);
    } catch (err) {
      console.error("Error:", err);
      setApps([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    loadInstalledApps();

    const interval = setInterval(() => {
      loadInstalledApps();
    }, 1000); 

    return () => clearInterval(interval);
  }, []);

  
  const sortedApps = [...apps].sort((a, b) => {
    const sizeA = Number(a.size) || 0;
    const sizeB = Number(b.size) || 0;

    return sortOrder === "high" ? sizeB - sizeA : sizeA - sizeB;
  });

  
  const uninstall = (id) => {
    const installedIds =
      JSON.parse(localStorage.getItem("installedApps")) || [];

    const updated = installedIds.filter((x) => x !== String(id));
    localStorage.setItem("installedApps", JSON.stringify(updated));

    setApps((prev) => prev.filter((a) => a.id !== id));

    Swal.fire({
      icon: "success",
      title: "Uninstalled",
      text: "App removed successfully!",
      timer: 1200,
      showConfirmButton: false,
    });
  };

  if (loading)
    return (
      <div className="h-screen flex justify-center items-center text-xl">
        Loading...
      </div>
    );

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-1">
        Your Installed Apps
      </h2>
      <p className="text-center text-gray-500 mb-5">
        Explore your installed applications
      </p>

      <div className="flex justify-between mb-4">
        <p className="font-semibold">{apps.length} Apps Found</p>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value="high">Sort: High</option>
          <option value="low">Sort: Low</option>
        </select>
      </div>

      {sortedApps.length === 0 ? (
        <div className="p-4 bg-yellow-50 border rounded">
          No installed apps found.
        </div>
      ) : (
        sortedApps.map((app) => (
          <div
            key={app.id}
            className="flex items-center justify-between p-4 bg-white shadow rounded mb-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={app.image}
                alt={app.title}
                className="w-16 h-16 rounded object-cover bg-gray-200"
              />

              <div>
                <h3 className="font-semibold">{app.title}</h3>

                <div className="flex items-center gap-3 text-sm mt-1 text-gray-600">
                  <span className="flex items-center gap-1 text-green-600">
                    <FaDownload /> {app.downloads}
                  </span>
                  <span className="flex items-center gap-1 text-orange-500">
                    <FaStar /> {app.ratingAvg ?? app.rating}
                  </span>
                  <span>{app.size}MB</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => uninstall(app.id)}
              className="bg-[#00D390] text-white px-4 py-1 rounded"
            >
              Uninstall
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default InstallationPage;

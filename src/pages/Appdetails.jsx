import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import Swal from "sweetalert2";
import download from "../assets/icon-downloads.png";
import star from "../assets/icon-ratings.png";
import review from "../assets/icon-review.png";
import LoadingSpinner from "../Components/loadingSpinner";

export default function AppDetails() {
  const { id } = useParams();
  const location = useLocation();

  const [app, setApp] = useState(location.state?.app || null);
  const [loading, setLoading] = useState(!app);
  const [installed, setInstalled] = useState(false);
  const [notFound, setNotFound] = useState(false);

  
  useEffect(() => {
    const installedApps =
      JSON.parse(localStorage.getItem("installedApps")) || [];
    setInstalled(installedApps.includes(id));
  }, [id]);


  useEffect(() => {
    if (!app) {
      setLoading(true);
      fetch("/app.json")
        .then((res) => res.json())
        .then((data) => {
          const found = data.find(
            (item) => String(item.id) === String(id)
          );

          if (!found) {
            setNotFound(true);
            setLoading(false);
            return;
          }

          setApp(found);
          setLoading(false);
        })
        .catch(() => {
          setNotFound(true);
          setLoading(false);
        });
    }
  }, [app, id]);

  // 🔹 Install handler
  const handleInstall = () => {
    const installedApps =
      JSON.parse(localStorage.getItem("installedApps")) || [];

    if (installedApps.includes(id)) {
      Swal.fire({
        icon: "info",
        title: "Already Installed",
        text: `${app.title} is already installed!`,
      });
      return;
    }

    installedApps.push(id);
    localStorage.setItem(
      "installedApps",
      JSON.stringify(installedApps)
    );

    setInstalled(true);

    Swal.fire({
      icon: "success",
      title: "Installed Successfully!",
      text: `${app.title} has been installed.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  
  if (loading) {
    return <LoadingSpinner />;
  }

  
  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-red-500 mb-3">
          App Not Found
        </h1>

        <p className="text-gray-600 mb-6 max-w-md">
          The app you are trying to view does not exist or may have been removed.
          Please go back and explore other apps.
        </p>

        <button
          onClick={() => window.history.back()}
          className="bg-[#00D390] text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }


  return (
    <div className="w-full p-4 md:p-8 min-h-screen text-gray-800">
      {/* App Details Card */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow mb-6">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-10">
          <div className="w-40 h-60 md:w-56 md:h-56 rounded-3xl overflow-hidden">
            <img
              src={app.image}
              alt={app.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full space-y-2 text-center lg:text-left">
            <h1 className="text-xl md:text-3xl font-bold">
              {app.title}
            </h1>

            <p className="text-sm text-gray-500">
              Developed by{" "}
              <span className="font-semibold">
                {app.companyName}
              </span>
            </p>

            <hr className="border-gray-300 my-4" />

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-5">
              <div className="text-center">
                <img src={download} className="w-10 mx-auto" />
                <p className="font-bold text-2xl">
                  {app.downloads}M
                </p>
                <p className="text-gray-500 text-sm">
                  Downloads
                </p>
              </div>

              <div className="text-center">
                <img src={star} className="w-10 mx-auto" />
                <p className="font-bold text-2xl">
                  {app.ratingAvg}
                </p>
                <p className="text-gray-500 text-sm">
                  Average Rating
                </p>
              </div>

              <div className="text-center">
                <img src={review} className="w-10 mx-auto" />
                <p className="font-bold text-2xl">
                  {app.reviews.toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                  Total Reviews
                </p>
              </div>
            </div>

            {/* Install Button */}
            {installed ? (
              <button
                disabled
                className="mt-5 bg-gray-400 cursor-not-allowed text-white px-6 py-2 rounded-lg w-full sm:w-auto"
              >
                Installed
              </button>
            ) : (
              <button
                onClick={handleInstall}
                className="mt-5 bg-[#00D390] text-white px-6 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto"
              >
                Install Now ({app.size} MB)
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Ratings */}
      <div className="bg-white p-4 md:p-6 shadow mb-6">
        <h2 className="text-lg md:text-xl font-bold mb-4">
          Ratings
        </h2>

        {["5 star", "4 star", "3 star", "2 star", "1 star"].map(
          (label, i) => {
            const ratingObj = app.ratings.find(
              (r) => r.name === label
            );
            const percentage = ratingObj
              ? Math.round(
                  (ratingObj.count / app.reviews) * 100
                )
              : 0;

            return (
              <div key={i} className="mb-3">
                <p className="text-sm mb-1">{label}</p>
                <div className="w-full bg-gray-200 h-5">
                  <div
                    className="bg-orange-400 h-5"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* Description */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow">
        <h2 className="text-lg md:text-xl font-bold mb-3">
          Description
        </h2>
        <p className="text-gray-700">
          {app.description}
        </p>
      </div>
    </div>
  );
}

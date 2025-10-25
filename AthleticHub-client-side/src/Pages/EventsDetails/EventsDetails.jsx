import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUsers,
  FaTicketAlt,
  FaShare,
  FaHeart,
} from "react-icons/fa";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const EventsDetails = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const {
    _id,
    eventName,
    eventType,
    eventDate,
    location,
    description,
    imageUrl,
  } = data;

  const [isBooking, setIsBooking] = useState(false);
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://athletichub-chi.vercel.app/mybooking?email=${user.email}`)
      .then((res) => res.json())
      .then((bookings) => {
        const found = bookings.find((b) => b.eventId === _id);
        if (found) setAlreadyBooked(true);
      });
  }, [user, _id]);

  const handleMyBooking = async () => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login to book this event",
        confirmButtonColor: "#3B82F6",
      });
      return;
    }

    setIsBooking(true);
    const booking = {
      eventId: _id,
      eventName,
      eventDate,
      location,
      imageUrl,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      description,
      eventType,
    };

    try {
      const res = await fetch("https://athletichub-chi.vercel.app/mybooking", {
        // const res = await fetch("http://localhost:3000/mybooking", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (result.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Booking Confirmed!",
          text: `You have successfully booked ${eventName}`,
          showConfirmButton: false,
          timer: 2000,
          background: "#f0fdf4",
          iconColor: "#10b981",
        });
        setAlreadyBooked(true);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Please try again later",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsBooking(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventName,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Link Copied!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const dateInfo = formatDate(eventDate);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Event Details
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-900 mx-auto rounded-full"></div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative group">
              <img
                src={imageUrl}
                alt={eventName}
                className="w-full h-full object-cover aspect-square lg:aspect-auto lg:min-h-[600px] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={handleShare}
                  className="p-3 rounded-full bg-white/90 backdrop-blur-sm text-blue-600 hover:bg-white transition-all duration-300 cursor-pointer"
                >
                  <FaShare />
                </button>
              </div>

              {/* Event Type Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {eventType}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8 lg:p-12 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Event Title */}
                <div>
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white leading-tight">
                    {eventName}
                  </h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mt-3 rounded-full"></div>
                </div>

                {/* Event Info Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="p-3 bg-blue-100 dark:bg-blue-800 rounded-lg">
                      <FaCalendarAlt className="text-blue-600 dark:text-blue-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Date & Time
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {dateInfo.full}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        {dateInfo.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <div className="p-3 bg-red-100 dark:bg-red-800 rounded-lg">
                      <FaMapMarkerAlt className="text-red-600 dark:text-red-400 text-xl" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Location
                      </p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <FaUsers className="text-green-500" />
                    About This Event
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                    {description}
                  </p>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <FaTicketAlt className="text-purple-500 text-2xl mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ticket Type
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      General Admission
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <FaUsers className="text-green-500 text-2xl mx-auto mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Availability
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Limited Seats
                    </p>
                  </div>
                </div>
              </div>

              {/* Booking Section */}
              <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Ready to Join?
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Secure your spot now
                    </p>
                  </div>

                  <button
                    onClick={handleMyBooking}
                    disabled={isBooking || alreadyBooked}
                    className={`relative px-8 py-4 rounded-md font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer ${
                      alreadyBooked
                        ? "bg-gray-400 text-white cursor-not-allowed dark:shadow-green-900"
                        : isBooking
                        ? "bg-blue-400 text-white cursor-not-allowed"
                        : "bg-BtnPrimary2 text-white hover:bg-BtnPrimary2 "
                    }`}
                  >
                    {alreadyBooked ? (
                      <span className="flex items-center gap-2">
                        ✓ Already Booked
                      </span>
                    ) : isBooking ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <FaTicketAlt />
                        Book Now
                      </span>
                    )}
                  </button>
                </div>

                {!user && (
                  <p className="text-center text-orange-600 dark:text-orange-400 mt-3 text-sm">
                    * Please login to book this event
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;

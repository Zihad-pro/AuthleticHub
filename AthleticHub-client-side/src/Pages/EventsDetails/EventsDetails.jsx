import React, { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router";
import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
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
    setIsBooking(true);
    const booking = {
      eventId: _id,
      eventName,
      eventDate,
      location,
      imageUrl,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
    };

    const res = await fetch("https://athletichub-chi.vercel.app/mybooking", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    const result = await res.json();
    if (result.insertedId) {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Booking Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setAlreadyBooked(true);
    }
    setIsBooking(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 pb-22 pt-6">
      <h5 className="md:text-5xl text-2xl font-extrabold pb-10">
        Book Your Event Now!
      </h5>

      <div className="grid md:grid-cols-2 gap-8 bg-gray-50 shadow-2xl rounded-xl overflow-hidden">
        {/* Image */}
        <img
          src={imageUrl}
          alt={eventName}
          className="w-full h-full object-cover max-h-[450px] md:max-h-[600px]"
        />

        {/* Details */}
        <div className="p-6 space-y-4">
          <h2 className="text-2xl md:text-4xl font-semibold mt-5">
            {eventName}
          </h2>
          <p className="badge badge-secondary text-white px-4 py-2 text-sm">
            {eventType}
          </p>

          <p className="flex items-center text-gray-600 text-sm gap-2 mt-2">
            <FaCalendarAlt className="text-blue-500" />
            <span>
              {new Date(eventDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>

          <p className="flex items-center text-gray-600 text-sm gap-2">
            <FaMapMarkerAlt className="text-red-500" />
            <span>{location}</span>
          </p>

          <div className="divider" />
          <p className="text-gray-700 leading-relaxed">{description}</p>
          <div className="divider" />

          <button
            onClick={handleMyBooking}
            disabled={isBooking || alreadyBooked}
            className={`btn bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white px-5 mt-4 w-fit ${
              (isBooking || alreadyBooked) && "disabled:text-red-500"
            }`}
          >
            {alreadyBooked
              ? "Already Booked"
              : isBooking
              ? "Booking..."
              : "Book Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;

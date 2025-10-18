

import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  FaSadTear,
  FaTh,
  FaList,
  FaCalendarAlt,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  useEffect(() => {
    if (user?.email) {
      fetch(`https://athletichub-chi.vercel.app/mybooking?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to load bookings", err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleCancel = async (id, eventName) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      html: `<p>Are you sure you want to cancel your booking for <strong>"${eventName}"</strong>?</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Cancel Booking",
      cancelButtonText: "Keep Booking",
      focusCancel: true,
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://athletichub-chi.vercel.app/mybooking/${id}`,
          { method: "DELETE" }
        );
        const data = await res.json();

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Booking Canceled!",
            text: "Your booking has been successfully canceled.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          setBookings((prev) => prev.filter((booking) => booking._id !== id));
        }
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire({
          title: "Error",
          text: "Failed to cancel booking. Please try again.",
          icon: "error",
        });
      }
    }
  };

  if (loading) return <Loading />;

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = bookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );
  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const getPageNumbers = () =>
    Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 flex justify-center items-center gap-2">
            <FaCalendarAlt /> My Bookings
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage your event bookings and track your athletic journey.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-end mb-6">
          <div className="flex gap-2 bg-white dark:bg-gray-800 rounded-xl p-1.5 shadow-sm border border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                viewMode === "table"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaList className="text-sm" /> Table
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                viewMode === "card"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <FaTh className="text-sm" /> Cards
            </button>
          </div>
        </div>

        {/* Bookings */}
        {bookings.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="flex justify-center mb-4">
              <FaSadTear className="text-4xl text-yellow-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Bookings Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
              You haven't booked any events yet. Explore our events and start
              your journey!
            </p>
          </div>
        ) : viewMode === "table" ? (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600 ">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentBookings.map((event) => (
                    <tr
                      key={event._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={event.imageUrl}
                          alt={event.eventName}
                          className="h-16 w-24 object-cover rounded-xl shadow-sm"
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                        {event.eventName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <button
                          onClick={() =>
                            handleCancel(event._id, event.eventName)
                          }
                          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm cursor-pointer"
                        >
                          <FaTimes className="text-sm" /> Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // Card View
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {currentBookings.map((event) => (
              <div
                key={event._id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={event.imageUrl}
                  alt={event.eventName}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {event.eventName}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
                      Booked
                    </span>
                    <button
                      onClick={() => handleCancel(event._id, event.eventName)}
                      className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-sm"
                    >
                      <FaTimes className="text-sm" /> Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fixed Pagination */}
        {totalPages > 1 && (
          <div className=" pt-10 left-0 right-0 flex justify-center items-center space-x-2 z-50">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 dark:border-gray-600 hover:border-blue-300"
              }`}
            >
              <FaArrowLeft /> Previous
            </button>

            {getPageNumbers().map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === number
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 dark:border-gray-600 hover:border-blue-300 cursor-pointer"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 dark:border-gray-600 hover:border-blue-300"
              }`}
            >
              Next <FaArrowRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;







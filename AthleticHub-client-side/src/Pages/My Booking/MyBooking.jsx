import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { FaSadTear, FaTh, FaList } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading";

const MyBooking = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'

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

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://athletichub-chi.vercel.app/mybooking/${id}`,
          {
            method: "DELETE",
          }
        );

        const data = await res.json();

        if (data.deletedCount > 0) {
          Swal.fire({
            title: "Canceled!",
            text: "Your booking has been canceled.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });

          setBookings((prev) => prev.filter((booking) => booking._id !== id));
        }
      } catch (err) {
        console.error("Delete failed", err);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to cancel booking.",
        });
      }
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-15 min-h-170">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-center">My Bookings Events</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("table")}
            className={`p-2 rounded ${
              viewMode === "table" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            title="Table View"
          >
            <FaList />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-2 rounded ${
              viewMode === "card" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            title="Card View"
          >
            <FaTh />
          </button>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 text-gray-500">
          <FaSadTear className="text-6xl mb-4 text-gray-400" />
          <p className="text-lg">You haven't booked any events yet.</p>
        </div>
      ) : viewMode === "table" ? (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-xl shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Event Name</th>
                <th className="p-3 text-center">Cancel</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={event.imageUrl}
                      alt={event.eventName}
                      className="w-20 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium">{event.eventName}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleCancel(event._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <RxCross2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Card View
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((event) => (
            <div
              key={event._id}
              className="border rounded-xl shadow p-4 flex flex-col gap-3"
            >
              <img
                src={event.imageUrl}
                alt={event.eventName}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold">{event.eventName}</h3>
              <button
                onClick={() => handleCancel(event._id)}
                className="btn btn-error btn-sm text-white self-end"
              >
                <RxCross2 size={18} />
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooking;



import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Loading from "../../Components/Loading";

const ManageEvents = () => {
  const { user, loading } = useContext(AuthContext);
  const [manageEvents, setManageEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 5;

  useEffect(() => {
    if (!loading && user?.email) {
      fetch(`https://athletichub-chi.vercel.app/events?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.filter(
            (event) => event.creatorEmail === user.email
          );
          setManageEvents(filteredData);
          setIsLoadingEvents(false);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
          setIsLoadingEvents(false);
        });
    }
  }, [user, loading]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://athletichub-chi.vercel.app/events/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.deletedCount > 0) {
              setManageEvents((prev) =>
                prev.filter((event) => event._id !== id)
              );
              Swal.fire("Deleted!", "Your event has been deleted.", "success");
            } else {
              Swal.fire("Failed", "Could not delete the event.", "error");
            }
          })
          .catch((error) => {
            console.error("Delete error:", error);
            Swal.fire("Error!", "Failed to delete event.", "error");
          });
      }
    });
  };

  const handleUpdate = (id) => {
    navigate(`/updatemange/${id}`);
  };

  if (loading || isLoadingEvents) return <Loading />;

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = manageEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(manageEvents.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const getPageNumbers = () =>
    Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-15 min-h-200">
      <h2 className="text-3xl font-bold mb-6 text-center">My Created Events</h2>

      {manageEvents.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No events found for your account.
        </p>
      ) : (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-600 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Event Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {currentEvents.map((event) => (
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
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {event.eventType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right flex justify-end gap-2">
                        <button
                          onClick={() => handleUpdate(event._id)}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm cursor-pointer"
                        >
                          <FiEdit2 className="text-sm" /> Update
                        </button>
                        <button
                          onClick={() =>
                            handleDelete(event._id, event.eventName)
                          }
                          className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-sm cursor-pointer"
                        >
                          <FiTrash2 className="text-sm" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300"
                }`}
              >
                <FaArrowLeft /> Prev
              </button>

              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === number
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 cursor-pointer"
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
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-300"
                }`}
              >
                Next <FaArrowRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageEvents;

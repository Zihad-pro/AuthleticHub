import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Loading from "../../Components/Loading";

const ManageEvents = () => {
  const { user, loading } = useContext(AuthContext);
  const [manageEvents, setManageEvents] = useState([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const navigate = useNavigate();

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
            console.log("Delete response:", data); 
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

  if (loading || isLoadingEvents) {
    return (
     <Loading></Loading>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-15 min-h-[30rem]">
      <h2 className="text-3xl font-bold mb-6 text-center">My Created Events</h2>

      {manageEvents.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No events found for your account.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border rounded-xl shadow">
            <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Event Name</th>
                <th className="p-3">Type</th>
                
            
                <th className="p-3 text-center">Update</th>
                <th className="p-3 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {manageEvents.map((event) => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={event.imageUrl}
                      alt={event.eventName}
                      className="w-20 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium">{event.eventName}</td>
                  <td className="p-3">{event.eventType}</td>
                 
                
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleUpdate(event._id)}
                      className="btn btn-sm btn-primary"
                      title="Update Event"
                    >
                      <FiEdit2 size={18} />
                    </button>
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-sm btn-error"
                      title="Delete Event"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;

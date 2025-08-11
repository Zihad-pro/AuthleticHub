import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Loading from "../../Components/Loading";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://athletichub-chi.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        const sortedEvents = data
          .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate))
          .slice(0, 6);
        setEvents(sortedEvents);
        setLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-5xl font-bold mb-8">Featured Events</h2>

      {loading ? (
      <Loading></Loading>
      ) : events.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="card bg-base-100 shadow-xl hover:scale-105 transition duration-300 rounded-lg overflow-hidden"
            >
              <figure>
                <img
                  src={event.imageUrl}
                  alt={event.eventName}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title text-gray-900">{event.eventName}</h3>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  <span>
                    {new Date(event.eventDate).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </p>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>{event.location}</span>
                </p>
                <div className="card-actions justify-start mt-4">
                  <Link to={`/events/${event._id}`}>
                    <button className="btn btn-sm bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link to="/events">
          <button className="btn bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white px-8">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedEvents;

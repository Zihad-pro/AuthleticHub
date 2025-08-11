import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import Loading from "../../Components/Loading";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false); // Track if search is active

  useEffect(() => {
    fetch("https://athletichub-chi.vercel.app/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
        setLoading(false);
      })
      .catch(() => {
        setEvents([]);
        setFilteredEvents([]);
        setLoading(false);
      });
  }, []);

  // Update search term only, don't filter yet
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter on button click
  const handleSearchClick = () => {
    const term = searchTerm.toLowerCase().trim();

    if (term === "") {
      // If search term is empty, reset filter and deactivate search mode
      setFilteredEvents(events);
      setIsSearching(false);
      return;
    }

    const filtered = events.filter((event) => {
      return (
        event.eventName.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
      );
    });

    setFilteredEvents(filtered);
    setIsSearching(true);
  };

  // Decide which list to show:
  // if searching -> filteredEvents (filtered)
  // if not searching -> all events (events)
  const eventsToShow = isSearching ? filteredEvents : events;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl md:text-5xl font-bold mb-6">All Events Here</h2>

      {/* Search Input and Button */}
      <div className="flex gap-2 mb-8 max-w-md">
        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearchClick}
          className="btn bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white px-6"
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : eventsToShow.length === 0 ? (
        <p className="text-center text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsToShow.map((event) => (
            <div
              key={event._id}
              className="card bg-base-100 shadow-xl hover:scale-105 transition duration-300 rounded-lg overflow-hidden"
            >
              <figure>
                <img
                  src={event.imageUrl}
                  alt={event.eventName}
                  className="w-full h-48 md:h-70 object-cover"
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
                    <button className="btn text-white bg-BtnPrimary2 hover:bg-BtnPrimary1 btn-sm">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Link to="/events">
        <div className="text-center mt-8">
          <button className="btn bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white px-8">
            See All
          </button>
        </div>
      </Link>
    </div>
  );
};

export default Events;

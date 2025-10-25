
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router";
// import {
//   FaMapMarkerAlt,
//   FaCalendarAlt,
//   FaSearch,
//   FaArrowLeft,
//   FaArrowRight,
// } from "react-icons/fa";
// import Loading from "../../Components/Loading";

// const Events = () => {
//   const [events, setEvents] = useState([]);
//   const [filteredEvents, setFilteredEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isSearching, setIsSearching] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [eventsPerPage] = useState(9);

//   useEffect(() => {
//     fetch("https://athletichub-chi.vercel.app/events")
//       .then((res) => res.json())
//       .then((data) => {
//         setEvents(data);
//         setFilteredEvents(data);
//         setLoading(false);
//       })
//       .catch(() => {
//         setEvents([]);
//         setFilteredEvents([]);
//         setLoading(false);
//       });
//   }, []);

//   const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleSearchClick();
//   };

//   const handleSearchClick = () => {
//     const term = searchTerm.toLowerCase().trim();
//     if (term === "") {
//       setFilteredEvents(events);
//       setIsSearching(false);
//       setCurrentPage(1);
//       return;
//     }
//     const filtered = events.filter(
//       (event) =>
//         event.eventName.toLowerCase().includes(term) ||
//         event.location.toLowerCase().includes(term)
//     );
//     setFilteredEvents(filtered);
//     setIsSearching(true);
//     setCurrentPage(1);
//   };

//   const handleClearSearch = () => {
//     setSearchTerm("");
//     setFilteredEvents(events);
//     setIsSearching(false);
//     setCurrentPage(1);
//   };

//   const eventsToShow = isSearching ? filteredEvents : events;
//   const indexOfLastEvent = currentPage * eventsPerPage;
//   const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
//   const currentEvents = eventsToShow.slice(indexOfFirstEvent, indexOfLastEvent);
//   const totalPages = Math.ceil(eventsToShow.length / eventsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);
//   const nextPage = () =>
//     currentPage < totalPages && setCurrentPage(currentPage + 1);
//   const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

//   const getPageNumbers = () => {
//     const pageNumbers = [];
//     const maxVisiblePages = 5;
//     let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
//     let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
//     if (endPage - startPage + 1 < maxVisiblePages) {
//       startPage = Math.max(1, endPage - maxVisiblePages + 1);
//     }
//     for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
//     return pageNumbers;
//   };

//   return (
//     <div className="min-h-screen  py-12 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-BtnPrimary2 bg-clip-text text-transparent">
//             Discover Events
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
//             Find and join amazing sports events near you. From local tournaments
//             to professional championships.
//           </p>
//         </div>

//         {/* Search */}
//         <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-12 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
//           <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//             <div className="flex-1 w-full md:w-auto">
//               <div className="relative">
//                 <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400" />
//                 <input
//                   type="text"
//                   placeholder="Search events by name or location..."
//                   value={searchTerm}
//                   onChange={handleSearchInputChange}
//                   onKeyPress={handleKeyPress}
//                   className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={handleClearSearch}
//                     className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
//                   >
//                     ✕
//                   </button>
//                 )}
//               </div>
//             </div>
//             <button
//               onClick={handleSearchClick}
//               className="w-full md:w-auto bg-BtnPrimary2 cursor-pointer hover:bg-BtnPrimary1 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
//             >
//               Search Events
//             </button>
//           </div>

//           {isSearching && (
//             <div className="mt-4 flex items-center justify-between text-gray-600 dark:text-gray-300">
//               <p>
//                 Found{" "}
//                 <span className="font-semibold text-blue-600">
//                   {filteredEvents.length}
//                 </span>{" "}
//                 events matching your search
//               </p>
//               <button
//                 onClick={handleClearSearch}
//                 className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
//               >
//                 Clear search
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Events Grid */}
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <Loading />
//           </div>
//         ) : currentEvents.length === 0 ? (
//           <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
//             <div className="max-w-md mx-auto">
//               <div className="text-6xl mb-4">🔍</div>
//               <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
//                 No events found
//               </h3>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 {isSearching
//                   ? "Try adjusting your search terms or browse all events."
//                   : "There are currently no events available. Check back later!"}
//               </p>
//               {isSearching && (
//                 <button
//                   onClick={handleClearSearch}
//                   className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
//                 >
//                   View All Events
//                 </button>
//               )}
//             </div>
//           </div>
//         ) : (
//           <>
//             {/* Events Count */}
//             <div className="flex justify-between items-center mb-6 text-gray-600 dark:text-gray-300">
//               <p>
//                 Showing{" "}
//                 <span className="font-semibold">
//                   {indexOfFirstEvent + 1}-
//                   {Math.min(indexOfLastEvent, eventsToShow.length)}
//                 </span>{" "}
//                 of{" "}
//                 <span className="font-semibold text-blue-600">
//                   {eventsToShow.length}
//                 </span>{" "}
//                 events
//               </p>
//             </div>

//             {/* Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
//               {currentEvents.map((event) => (
//                 <div
//                   key={event._id}
//                   className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 transform hover:-translate-y-2"
//                 >
//                   <figure className="relative overflow-hidden">
//                     <img
//                       src={event.imageUrl}
//                       alt={event.eventName}
//                       className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
//                       loading="lazy"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   </figure>

//                   <div className="p-6">
//                     <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 text-gray-900 dark:text-gray-100 transition-colors">
//                       {event.eventName}
//                     </h3>

//                     <div className="space-y-3 mb-4">
//                       <p className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
//                         <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
//                         <span className="text-sm">
//                           {new Date(event.eventDate).toLocaleDateString(
//                             undefined,
//                             {
//                               weekday: "long",
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                             }
//                           )}
//                         </span>
//                       </p>
//                       <p className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
//                         <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
//                         <span className="text-sm">{event.location}</span>
//                       </p>
//                     </div>

//                     <div className="-top-0 card-actions justify-start pt-4 border-t border-gray-100 dark:border-gray-700">
//                       <Link to={`/events/${event._id}`} className="w-full">
//                         <button className="w-full bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white font-semibold py-3 px-6 rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ">
//                           View Details
//                         </button>
//                       </Link>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center space-x-2 mb-12">
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === 1}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                     currentPage === 1
//                       ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
//                       : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 dark:border-gray-600 hover:border-blue-300"
//                   }`}
//                 >
//                   <FaArrowLeft className="text-sm" /> Previous
//                 </button>

//                 <div className="flex items-center space-x-1">
//                   {getPageNumbers().map((number) => (
//                     <button
//                       key={number}
//                       onClick={() => paginate(number)}
//                       className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
//                         currentPage === number
//                           ? "btn bg-BtnPrimary2 text-white hover:bg-BtnPrimary1 shadow-lg"
//                           : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 dark:border-gray-600 hover:border-blue-300 cursor-pointer"
//                       }`}
//                     >
//                       {number}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages}
//                   className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
//                     currentPage === totalPages
//                       ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
//                       : "bg-BtnPrimary2 text-white hover:bg-BtnPrimary1 border border-gray-300 dark:border-gray-600 hover:border-blue-300"
//                   }`}
//                 >
//                   Next <FaArrowRight className="text-sm" />
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Events;


import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSearch,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import Loading from "../../Components/Loading";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(9);

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

  const handleSearchInputChange = (e) => setSearchTerm(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearchClick();
  };

  const handleSearchClick = () => {
    const term = searchTerm.toLowerCase().trim();
    if (term === "") {
      setFilteredEvents(events);
      setIsSearching(false);
      setCurrentPage(1);
      return;
    }
    const filtered = events.filter(
      (event) =>
        event.eventName.toLowerCase().includes(term) ||
        event.location.toLowerCase().includes(term)
    );
    setFilteredEvents(filtered);
    setIsSearching(true);
    setCurrentPage(1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setFilteredEvents(events);
    setIsSearching(false);
    setCurrentPage(1);
  };

  const eventsToShow = isSearching ? filteredEvents : events;
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventsToShow.slice(indexOfFirstEvent, indexOfLastEvent);
  const totalPages = Math.ceil(eventsToShow.length / eventsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) pageNumbers.push(i);
    return pageNumbers;
  };

  return (
    <div className="min-h-screen py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-BtnPrimary2 bg-clip-text text-transparent">
            Discover Events
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find and join amazing sports events near you. From local tournaments
            to professional championships.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 mb-12 border border-gray-200 dark:border-gray-700 transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events by name or location..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={handleSearchClick}
              className="w-full md:w-auto bg-BtnPrimary2 cursor-pointer hover:bg-BtnPrimary1 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Search Events
            </button>
          </div>

          {isSearching && (
            <div className="mt-4 flex items-center justify-between text-gray-600 dark:text-gray-300">
              <p>
                Found{" "}
                <span className="font-semibold text-blue-600">
                  {filteredEvents.length}
                </span>{" "}
                events matching your search
              </p>
              <button
                onClick={handleClearSearch}
                className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Clear search
              </button>
            </div>
          )}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loading />
          </div>
        ) : currentEvents.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <div className="max-w-md mx-auto">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                No events found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {isSearching
                  ? "Try adjusting your search terms or browse all events."
                  : "There are currently no events available. Check back later!"}
              </p>
              {isSearching && (
                <button
                  onClick={handleClearSearch}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  View All Events
                </button>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Events Count */}
            <div className="flex justify-between items-center mb-6 text-gray-600 dark:text-gray-300">
              <p>
                Showing{" "}
                <span className="font-semibold">
                  {indexOfFirstEvent + 1}-
                  {Math.min(indexOfLastEvent, eventsToShow.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-blue-600">
                  {eventsToShow.length}
                </span>{" "}
                events
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentEvents.map((event) => (
                <div
                  key={event._id}
                  className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-300 transform hover:-translate-y-2 flex flex-col h-full"
                >
                  <figure className="relative overflow-hidden flex-shrink-0">
                    <img
                      src={event.imageUrl}
                      alt={event.eventName}
                      className="w-full h-48 md:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </figure>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 text-gray-900 dark:text-gray-100 transition-colors">
                      {event.eventName}
                    </h3>

                    <div className="space-y-3 mb-4 flex-grow">
                      <p className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <FaCalendarAlt className="text-blue-500 flex-shrink-0" />
                        <span className="text-sm">
                          {new Date(event.eventDate).toLocaleDateString(
                            undefined,
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </p>
                      <p className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                        <FaMapMarkerAlt className="text-red-500 flex-shrink-0" />
                        <span className="text-sm">{event.location}</span>
                      </p>
                    </div>

                    <div className="card-actions justify-start pt-4 border-t border-gray-100 dark:border-gray-700 mt-auto">
                      <Link to={`/events/${event._id}`} className="w-full">
                        <button className="w-full bg-BtnPrimary2 hover:bg-BtnPrimary1 text-white font-semibold py-3 px-6 rounded-md cursor-pointer transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mb-12">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                      : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 dark:border-gray-600 hover:border-blue-300"
                  }`}
                >
                  <FaArrowLeft className="text-sm" /> Previous
                </button>

                <div className="flex items-center space-x-1">
                  {getPageNumbers().map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                        currentPage === number
                          ? "btn bg-BtnPrimary2 text-white hover:bg-BtnPrimary1 shadow-lg"
                          : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-blue-50 hover:text-blue-600 border border-gray-300 dark:border-gray-600 hover:border-blue-300 cursor-pointer"
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400"
                      : "bg-BtnPrimary2 text-white hover:bg-BtnPrimary1 border border-gray-300 dark:border-gray-600 hover:border-blue-300"
                  }`}
                >
                  Next <FaArrowRight className="text-sm" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Events;
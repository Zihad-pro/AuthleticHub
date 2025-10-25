// import React, { useContext, useState } from "react";
// import { AuthContext } from "../../Contexts/AuthContext";
// import Swal from "sweetalert2";

// const CreateEvents = () => {
//   const { user } = useContext(AuthContext);

//   const [form, setForm] = useState({
//     eventName: "",
//     eventType: "",
//     eventDate: "",
//     location: "",
//     description: "",
//     imageUrl: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const eventData = {
//       ...form,
//       creatorName: user.displayName,
//       creatorEmail: user.email,
//       createdAt: new Date().toISOString(),
//     };

//     fetch("https://athletichub-chi.vercel.app/events", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(eventData),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         Swal.fire({
//           position: "top",
//           icon: "success",
//           title: "Event Created Successfully!",
//           text: "Your event has been submitted for review.",
//           showConfirmButton: false,
//           timer: 2000,
//           background: "#f0fdf4",
//           iconColor: "#10b981",
//         });
//         setForm({
//           eventName: "",
//           eventType: "",
//           eventDate: "",
//           location: "",
//           description: "",
//           imageUrl: "",
//         });
//       })
//       .catch(() => {
//         Swal.fire({
//           position: "top",
//           icon: "error",
//           title: "Submission Failed!",
//           text: "Please check your connection and try again.",
//           showConfirmButton: false,
//           timer: 2000,
//           background: "#fef2f2",
//           iconColor: "#ef4444",
//         });
//       })
//       .finally(() => {
//         setIsSubmitting(false);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="w-20 h-20 rounded-full bg-BtnPrimary2 p-1 shadow-lg">
//               <img
//                 src="/logo.png"
//                 className="w-full h-full rounded-full object-cover border-4 border-white"
//                 alt="AthleticHub Logo"
//               />
//             </div>
//           </div>
//           <h1 className="text-3xl md:text-4xl font-bold ">
//             Create New Event
//           </h1>
//           <p className="mt-2 text-gray-600 dark:text-gray-400">
//             Fill in the details below to create your amazing sports event
//           </p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Event Name */}
//             <div>
//               <label
//                 htmlFor="eventName"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//               >
//                 Event Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 name="eventName"
//                 id="eventName"
//                 placeholder="e.g., Summer Basketball Tournament 2024"
//                 className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 value={form.eventName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>

//             {/* Event Type */}
//             <div>
//               <label
//                 htmlFor="eventType"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//               >
//                 Event Type <span className="text-red-500">*</span>
//               </label>
//               <select
//                 id="eventType"
//                 name="eventType"
//                 className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
//                 value={form.eventType}
//                 onChange={handleChange}
//                 required
//               >
//                 <option value="" className="text-gray-500">
//                   Select Event Type
//                 </option>
//                 <option value="Athletics">🏃 Athletics</option>
//                 <option value="Swimming">🏊 Swimming</option>
//                 <option value="Sprinting">⚡ Sprinting</option>
//                 <option value="Long Jump">🦘 Long Jump</option>
//                 <option value="High Jump">🦘 High Jump</option>
//                 <option value="Hurdle Race">🏃 Hurdle Race</option>
//                 <option value="Cycling">🚴 Cycling</option>
//                 <option value="Diving">🤿 Diving</option>
//                 <option value="Badminton">🏸 Badminton</option>
//                 <option value="Gymnastic">🤸 Gymnastic</option>
//                 <option value="Tennis">🎾 Tennis</option>
//                 <option value="Football">⚽ Football</option>
//                 <option value="Cricket">🏏 Cricket</option>
//                 <option value="Table tennis">🏓 Table Tennis</option>
//                 <option value="Volleyball">🏐 Volleyball</option>
//                 <option value="Taekwondo">🥋 Taekwondo</option>
//                 <option value="Fencing">🤺 Fencing</option>
//                 <option value="Sport Climbing">🧗 Sport Climbing</option>
//                 <option value="Surfing">🏄 Surfing</option>
//                 <option value="Canoe">🛶 Canoe</option>
//                 <option value="Archery">🏹 Archery</option>
//               </select>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {/* Event Date */}
//               <div>
//                 <label
//                   htmlFor="eventDate"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//                 >
//                   Event Date <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="date"
//                   id="eventDate"
//                   name="eventDate"
//                   className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   value={form.eventDate}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>

//               {/* Location */}
//               <div>
//                 <label
//                   htmlFor="location"
//                   className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//                 >
//                   Location <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   id="location"
//                   name="location"
//                   placeholder="e.g., National Stadium, City"
//                   className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                   value={form.location}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             {/* Description */}
//             <div>
//               <label
//                 htmlFor="description"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//               >
//                 Event Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 id="description"
//                 name="description"
//                 placeholder="Describe your event, including rules, requirements, and any special instructions..."
//                 className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
//                 value={form.description}
//                 onChange={handleChange}
//                 required
//                 rows={5}
//               />
//             </div>

//             {/* Image URL */}
//             <div>
//               <label
//                 htmlFor="imageUrl"
//                 className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
//               >
//                 Event Image URL
//               </label>
//               <input
//                 type="url"
//                 id="imageUrl"
//                 name="imageUrl"
//                 placeholder="https://example.com/event-image.jpg"
//                 className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                 value={form.imageUrl}
//                 onChange={handleChange}
//               />
//               <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//                 Provide a high-quality image URL for your event (optional)
//               </p>
//             </div>

//             {/* Creator Info Section */}
//             <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
//               <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
//                 Creator Information
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Creator Name
//                   </label>
//                   <div className="w-full rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-3 py-2 text-gray-900 dark:text-gray-200 cursor-not-allowed">
//                     {user.displayName}
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
//                     Creator Email
//                   </label>
//                   <div className="w-full rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-3 py-2 text-gray-900 dark:text-gray-200 cursor-not-allowed">
//                     {user.email}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full bg-BtnPrimary2 hover:bg-BtnPrimary1 cursor-pointer text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <div className="flex items-center justify-center gap-2">
//                   <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                   <span>Creating Event...</span>
//                 </div>
//               ) : (
//                 <div className="flex items-center justify-center gap-2">
//                   <svg
//                     className="w-5 h-5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 6v6m0 0v6m0-6h6m-6 0H6"
//                     />
//                   </svg>
//                   <span>Create Event</span>
//                 </div>
//               )}
//             </button>

//             {/* Form Note */}
//             <div className="text-center">
//               <p className="text-xs text-gray-500 dark:text-gray-400">
//                 Fields marked with <span className="text-red-500">*</span> are
//                 required
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateEvents;

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import Swal from "sweetalert2";

const CreateEvents = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    eventName: "",
    eventType: "",
    eventDate: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Event type options with categories
  const eventCategories = {
    "Track & Field": [
      { value: "Athletics", label: "🏃 Athletics" },
      { value: "Sprinting", label: "⚡ Sprinting" },
      { value: "Long Jump", label: "🦘 Long Jump" },
      { value: "High Jump", label: "🦘 High Jump" },
      { value: "Hurdle Race", label: "🏃 Hurdle Race" },
    ],
    "Water Sports": [
      { value: "Swimming", label: "🏊 Swimming" },
      { value: "Diving", label: "🤿 Diving" },
      { value: "Surfing", label: "🏄 Surfing" },
      { value: "Canoe", label: "🛶 Canoe" },
    ],
    "Team Sports": [
      { value: "Football", label: "⚽ Football" },
      { value: "Cricket", label: "🏏 Cricket" },
      { value: "Volleyball", label: "🏐 Volleyball" },
      { value: "Basketball", label: "🏀 Basketball" },
    ],
    "Racquet Sports": [
      { value: "Badminton", label: "🏸 Badminton" },
      { value: "Tennis", label: "🎾 Tennis" },
      { value: "Table Tennis", label: "🏓 Table Tennis" },
    ],
    "Other Sports": [
      { value: "Gymnastic", label: "🤸 Gymnastic" },
      { value: "Cycling", label: "🚴 Cycling" },
      { value: "Taekwondo", label: "🥋 Taekwondo" },
      { value: "Fencing", label: "🤺 Fencing" },
      { value: "Sport Climbing", label: "🧗 Sport Climbing" },
      { value: "Archery", label: "🏹 Archery" },
    ],
  };

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "eventName":
        if (!value.trim()) return "Event name is required";
        if (value.length < 5) return "Event name must be at least 5 characters";
        if (value.length > 100) return "Event name is too long";
        return "";
      case "eventType":
        return !value ? "Please select an event type" : "";
      case "eventDate":
        if (!value) return "Event date is required";
        if (new Date(value) < new Date().setHours(0, 0, 0, 0)) {
          return "Event date cannot be in the past";
        }
        return "";
      case "location":
        return !value.trim() ? "Location is required" : "";
      case "description":
        if (!value.trim()) return "Description is required";
        if (value.length < 20)
          return "Description must be at least 20 characters";
        if (value.length > 1000) return "Description is too long";
        return "";
      case "imageUrl":
        if (value && !/^https?:\/\/.+\..+/.test(value)) {
          return "Please enter a valid URL";
        }
        return "";
      default:
        return "";
    }
  };

  // Auto-fetch location on mount
  useEffect(() => {
    fetchLocation();
  }, []);

  // Function to get location
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      Swal.fire({
        icon: "warning",
        title: "Location Not Supported",
        text: "Your browser doesn't support location detection. Please enter location manually.",
        background: "#fff3cd",
        iconColor: "#856404",
      });
      return;
    }

    setIsFetchingLocation(true);

    Swal.fire({
      title: "Detecting Location",
      text: "Please allow location access...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await response.json();

          Swal.close();

          if (data.address) {
            const locationParts = [
              data.address.venue,
              data.address.road,
              data.address.neighbourhood,
              data.address.suburb,
              data.address.city || data.address.town || data.address.village,
              data.address.state,
              data.address.country,
            ].filter(Boolean);

            const locationString = locationParts.slice(0, 3).join(", ");
            setForm((prev) => ({ ...prev, location: locationString }));

            Swal.fire({
              icon: "success",
              title: "Location Found!",
              text: "Your location has been automatically filled.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Geocoding error:", error);
          Swal.fire({
            icon: "error",
            title: "Location Error",
            text: "Could not determine your location. Please enter manually.",
          });
        } finally {
          setIsFetchingLocation(false);
        }
      },
      (error) => {
        Swal.close();
        console.error("Geolocation error:", error);
        let errorMessage = "Please enter location manually.";

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access was denied. Please enable location permissions or enter manually.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage =
              "Location information unavailable. Please enter manually.";
            break;
          case error.TIMEOUT:
            errorMessage =
              "Location request timed out. Please try again or enter manually.";
            break;
        }

        Swal.fire({
          icon: "warning",
          title: "Location Detection Failed",
          text: errorMessage,
        });
        setIsFetchingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate field on change if it's been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    const newTouched = {};

    Object.keys(form).forEach((key) => {
      newTouched[key] = true;
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      Swal.fire({
        icon: "warning",
        title: "Please fix the errors",
        text: "Some fields require your attention.",
        background: "#fff3cd",
        iconColor: "#856404",
      });
      return;
    }

    setIsSubmitting(true);

    const eventData = {
      ...form,
      creatorName: user.displayName,
      creatorEmail: user.email,
      creatorPhoto: user.photoURL || "",
      createdAt: new Date().toISOString(),
      status: "pending",
      participants: 0,
      likes: 0,
    };

    fetch("https://athletichub-chi.vercel.app/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Event Created Successfully!",
          text: "Your event has been submitted for review and will be visible after approval.",
          showConfirmButton: true,
          confirmButtonColor: "#10b981",
          background: "#f0fdf4",
          iconColor: "#10b981",
        });

        // Reset form
        setForm({
          eventName: "",
          eventType: "",
          eventDate: "",
          location: "",
          description: "",
          imageUrl: "",
        });
        setErrors({});
        setTouched({});
      })
      .catch((error) => {
        console.error("Submission error:", error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Submission Failed!",
          text: "Please check your connection and try again.",
          showConfirmButton: true,
          confirmButtonColor: "#ef4444",
          background: "#fef2f2",
          iconColor: "#ef4444",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-r from-BtnPrimary2 to-blue-600 p-2 shadow-2xl">
                <img
                  src="/logo.png"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                  alt="AthleticHub Logo"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
            Create New Event
          </h1>
          <p className="mt-3 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Share your passion for sports by creating an unforgettable event
            experience
          </p>
        </div>

        

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-BtnPrimary2 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Event Information
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
            {/* Event Name */}
            <div className="space-y-3">
              <label
                htmlFor="eventName"
                className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Event Name
                <span className="text-red-500 ml-1">*</span>
                {errors.eventName && (
                  <span className="ml-2 text-xs text-red-500 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.eventName}
                  </span>
                )}
              </label>
              <input
                type="text"
                name="eventName"
                id="eventName"
                placeholder="e.g., Summer Basketball Tournament 2024"
                className={`w-full rounded-xl border px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.eventName
                    ? "border-red-300 bg-red-50 dark:bg-red-900/20 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-blue-500"
                }`}
                value={form.eventName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
            </div>

            {/* Event Type */}
            <div className="space-y-3">
              <label
                htmlFor="eventType"
                className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Event Type
                <span className="text-red-500 ml-1">*</span>
                {errors.eventType && (
                  <span className="ml-2 text-xs text-red-500 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.eventType}
                  </span>
                )}
              </label>
              <select
                id="eventType"
                name="eventType"
                className={`w-full rounded-xl border px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer ${
                  errors.eventType
                    ? "border-red-300 bg-red-50 dark:bg-red-900/20 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-blue-500"
                }`}
                value={form.eventType}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              >
                <option value="" className="text-gray-500">
                  Select a sport category
                </option>
                {Object.entries(eventCategories).map(([category, sports]) => (
                  <optgroup
                    key={category}
                    label={category}
                    className="font-semibold"
                  >
                    {sports.map((sport) => (
                      <option key={sport.value} value={sport.value}>
                        {sport.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Date */}
              <div className="space-y-3">
                <label
                  htmlFor="eventDate"
                  className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Event Date
                  <span className="text-red-500 ml-1">*</span>
                  {errors.eventDate && (
                    <span className="ml-2 text-xs text-red-500 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.eventDate}
                    </span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    min={getMinDate()}
                    className={`w-full rounded-xl border px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:border-transparent transition-all duration-200 ${
                      errors.eventDate
                        ? "border-red-300 bg-red-50 dark:bg-red-900/20 focus:ring-red-500"
                        : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-blue-500"
                    }`}
                    value={form.eventDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label
                  htmlFor="location"
                  className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
                >
                  Location
                  <span className="text-red-500 ml-1">*</span>
                  {errors.location && (
                    <span className="ml-2 text-xs text-red-500 flex items-center gap-1">
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.location}
                    </span>
                  )}
                </label>
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder={
                        isFetchingLocation
                          ? "Detecting your location..."
                          : "e.g., National Stadium, City"
                      }
                      className={`w-full rounded-xl border px-4 py-3 pr-12 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                        errors.location
                          ? "border-red-300 bg-red-50 dark:bg-red-900/20 focus:ring-red-500"
                          : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-blue-500"
                      }`}
                      value={form.location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      required
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={fetchLocation}
                    disabled={isFetchingLocation}
                    className="px-5 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:scale-100 flex items-center gap-2 whitespace-nowrap"
                  >
                    {isFetchingLocation ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="hidden sm:inline">Detecting</span>
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="hidden sm:inline">My Location</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-3">
              <label
                htmlFor="description"
                className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Event Description
                <span className="text-red-500 ml-1">*</span>
                {errors.description && (
                  <span className="ml-2 text-xs text-red-500 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.description}
                  </span>
                )}
              </label>
              <div className="relative">
                <textarea
                  id="description"
                  name="description"
                  placeholder="Describe your event in detail. Include rules, requirements, schedule, prizes, and any special instructions for participants..."
                  className={`w-full rounded-xl border px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.description
                      ? "border-red-300 bg-red-50 dark:bg-red-900/20 focus:ring-red-500"
                      : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-blue-500"
                  }`}
                  value={form.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  rows={6}
                />
                <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                  {form.description.length}/1000
                </div>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-3">
              <label
                htmlFor="imageUrl"
                className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-300"
              >
                Event Image URL
                {errors.imageUrl && (
                  <span className="ml-2 text-xs text-red-500 flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.imageUrl}
                  </span>
                )}
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/event-image.jpg"
                className={`w-full rounded-xl border px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:border-transparent transition-all duration-200 ${
                  errors.imageUrl
                    ? "border-red-300 bg-red-50 dark:bg-red-900/20 focus:ring-red-500"
                    : "border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-blue-500"
                }`}
                value={form.imageUrl}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Provide a high-quality image URL to make your event stand out
                (optional)
              </p>
            </div>

            {/* Creator Info Section */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-BtnPrimary2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                Creator Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Creator Name
                  </label>
                  <div className="w-full rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-4 py-3 text-gray-900 dark:text-gray-200 font-medium flex items-center gap-3">
                    {user.photoURL && (
                      <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-6 h-6 rounded-full"
                      />
                    )}
                    {user.displayName}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    Creator Email
                  </label>
                  <div className="w-full rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-4 py-3 text-gray-900 dark:text-gray-200 font-medium flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-BtnPrimary2 to-blue-600 hover:from-BtnPrimary1 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-70  cursor-pointer disabled:cursor-not-allowed group"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg">Creating Your Event...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6 group-hover:scale-110 transition-transform duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span className="text-lg">Create Event</span>
                  </div>
                )}
              </button>
            </div>

            {/* Form Note */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Fields marked with{" "}
                <span className="text-red-500 font-semibold">*</span> are
                required
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEvents;
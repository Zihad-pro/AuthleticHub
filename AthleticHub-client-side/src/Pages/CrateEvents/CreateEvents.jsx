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

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const eventData = {
//       ...form,
//       creatorName: user.displayName,
//       creatorEmail: user.email,
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
//           title: "Event submitted successfully!",
//           showConfirmButton: false,
//           timer: 1500,
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
//           title: "Something went wrong! Try again.",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       });
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white rounded-lg py-15 my-10">
//       <h2 className="flex justify-center mb-10">
//         <img src="/logo.png" className="w-15 rounded-full" alt="logo" />
//       </h2>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Event Name */}
//         <div>
//           <label
//             htmlFor="eventName"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Event Name
//           </label>
//           <input
//             type="text"
//             name="eventName"
//             id="eventName"
//             placeholder="Event Name"
//             className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
//             value={form.eventName}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Event Type */}
//         <div>
//           <label
//             htmlFor="eventType"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Event Type
//           </label>
//           <select
//             id="eventType"
//             name="eventType"
//             className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
//             value={form.eventType}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Event Type</option>
//             <option>Athletics</option>
//             <option>Swimming</option>
//             <option>Sprinting</option>
//             <option>Long Jump</option>
//             <option>High Jump</option>
//             <option>Hurdle Race</option>
//             <option>Cycling</option>
//             <option>Diving</option>
//             <option>Badminton</option>
//             <option>Gymnastic</option>
//             <option>Tennis</option>
//             <option>Football</option>
//             <option>Cricket</option>
//             <option>Table tennis</option>
//             <option>Volleyball</option>
//             <option>Taekwondo</option>
//             <option>Fencing</option>
//             <option>Sport Climbing</option>
//             <option>Surfing</option>
//             <option>Canoe</option>
//             <option>Archery</option>
//           </select>
//         </div>

//         {/* Event Date */}
//         <div>
//           <label
//             htmlFor="eventDate"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Event Date
//           </label>
//           <input
//             type="date"
//             id="eventDate"
//             name="eventDate"
//             className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
//             value={form.eventDate}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Location */}
//         <div>
//           <label
//             htmlFor="location"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Location
//           </label>
//           <input
//             type="text"
//             id="location"
//             name="location"
//             placeholder="Location"
//             className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
//             value={form.location}
//             onChange={handleChange}
//             required
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Event Description
//           </label>
//           <textarea
//             id="description"
//             name="description"
//             placeholder="Event Description"
//             className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
//             value={form.description}
//             onChange={handleChange}
//             required
//             rows={4}
//           />
//         </div>

//         {/* Image URL */}
//         <div>
//           <label
//             htmlFor="imageUrl"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Image URL
//           </label>
//           <input
//             type="url"
//             id="imageUrl"
//             name="imageUrl"
//             placeholder="Image URL"
//             className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
//             value={form.imageUrl}
//             onChange={handleChange}
//           />
//         </div>

//         {/* Creator Name (readonly) */}
//         <div>
//           <label
//             htmlFor="creatorName"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Creator Name
//           </label>
//           <input
//             type="text"
//             id="creatorName"
//             value={user.displayName}
//             readOnly
//             className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 cursor-not-allowed text-gray-300"
//           />
//         </div>

//         {/* Creator Email (readonly) */}
//         <div>
//           <label
//             htmlFor="creatorEmail"
//             className="block text-sm font-medium text-gray-900"
//           >
//             Creator Email
//           </label>
//           <input
//             type="email"
//             id="creatorEmail"
//             value={user.email}
//             readOnly
//             className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 cursor-not-allowed text-gray-300"
//           />
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full rounded-md bg-BtnPrimary2 py-3 text-white hover:bg-BtnPrimary1"
//         >
//           Submit Event
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateEvents;
import React, { useContext, useState } from "react";
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const eventData = {
      ...form,
      creatorName: user.displayName,
      creatorEmail: user.email,
      createdAt: new Date().toISOString(),
    };

    fetch("https://athletichub-chi.vercel.app/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Event Created Successfully!",
          text: "Your event has been submitted for review.",
          showConfirmButton: false,
          timer: 2000,
          background: "#f0fdf4",
          iconColor: "#10b981",
        });
        setForm({
          eventName: "",
          eventType: "",
          eventDate: "",
          location: "",
          description: "",
          imageUrl: "",
        });
      })
      .catch(() => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Submission Failed!",
          text: "Please check your connection and try again.",
          showConfirmButton: false,
          timer: 2000,
          background: "#fef2f2",
          iconColor: "#ef4444",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 rounded-full bg-BtnPrimary2 p-1 shadow-lg">
              <img
                src="/logo.png"
                className="w-full h-full rounded-full object-cover border-4 border-white"
                alt="AthleticHub Logo"
              />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold ">
            Create New Event
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Fill in the details below to create your amazing sports event
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Event Name */}
            <div>
              <label
                htmlFor="eventName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Event Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="eventName"
                id="eventName"
                placeholder="e.g., Summer Basketball Tournament 2024"
                className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={form.eventName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Event Type */}
            <div>
              <label
                htmlFor="eventType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Event Type <span className="text-red-500">*</span>
              </label>
              <select
                id="eventType"
                name="eventType"
                className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
                value={form.eventType}
                onChange={handleChange}
                required
              >
                <option value="" className="text-gray-500">
                  Select Event Type
                </option>
                <option value="Athletics">🏃 Athletics</option>
                <option value="Swimming">🏊 Swimming</option>
                <option value="Sprinting">⚡ Sprinting</option>
                <option value="Long Jump">🦘 Long Jump</option>
                <option value="High Jump">🦘 High Jump</option>
                <option value="Hurdle Race">🏃 Hurdle Race</option>
                <option value="Cycling">🚴 Cycling</option>
                <option value="Diving">🤿 Diving</option>
                <option value="Badminton">🏸 Badminton</option>
                <option value="Gymnastic">🤸 Gymnastic</option>
                <option value="Tennis">🎾 Tennis</option>
                <option value="Football">⚽ Football</option>
                <option value="Cricket">🏏 Cricket</option>
                <option value="Table tennis">🏓 Table Tennis</option>
                <option value="Volleyball">🏐 Volleyball</option>
                <option value="Taekwondo">🥋 Taekwondo</option>
                <option value="Fencing">🤺 Fencing</option>
                <option value="Sport Climbing">🧗 Sport Climbing</option>
                <option value="Surfing">🏄 Surfing</option>
                <option value="Canoe">🛶 Canoe</option>
                <option value="Archery">🏹 Archery</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Event Date */}
              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="eventDate"
                  name="eventDate"
                  className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.eventDate}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="e.g., National Stadium, City"
                  className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Event Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your event, including rules, requirements, and any special instructions..."
                className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                value={form.description}
                onChange={handleChange}
                required
                rows={5}
              />
            </div>

            {/* Image URL */}
            <div>
              <label
                htmlFor="imageUrl"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Event Image URL
              </label>
              <input
                type="url"
                id="imageUrl"
                name="imageUrl"
                placeholder="https://example.com/event-image.jpg"
                className="w-full rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 px-4 py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={form.imageUrl}
                onChange={handleChange}
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Provide a high-quality image URL for your event (optional)
              </p>
            </div>

            {/* Creator Info Section */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Creator Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Creator Name
                  </label>
                  <div className="w-full rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-3 py-2 text-gray-900 dark:text-gray-200 cursor-not-allowed">
                    {user.displayName}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Creator Email
                  </label>
                  <div className="w-full rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 px-3 py-2 text-gray-900 dark:text-gray-200 cursor-not-allowed">
                    {user.email}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-BtnPrimary2 hover:bg-BtnPrimary1 cursor-pointer text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating Event...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
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
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Create Event</span>
                </div>
              )}
            </button>

            {/* Form Note */}
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Fields marked with <span className="text-red-500">*</span> are
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

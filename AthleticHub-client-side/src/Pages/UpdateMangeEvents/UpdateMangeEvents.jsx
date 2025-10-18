
import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdateMangeEvents = () => {
  const eventData = useLoaderData();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    eventName: eventData.eventName || "",
    eventType: eventData.eventType || "",
    eventDate: eventData.eventDate || "",
    location: eventData.location || "",
    description: eventData.description || "",
    imageUrl: eventData.imageUrl || "",
    creatorName: eventData.creatorName || "",
    creatorEmail: eventData.creatorEmail || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://athletichub-chi.vercel.app/events/${eventData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Event updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/manageevents");
      })
      .catch((error) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: error.message || "Something went wrong!",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-10 px-4">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 sm:p-12 transition-all">
        <div className="text-center mb-8">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-16 h-16 mx-auto rounded-full mb-4"
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Update Event
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Edit the details of your event and save changes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Name
            </label>
            <input
              type="text"
              name="eventName"
              placeholder="Event Name"
              className="mt-2 block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500/30 transition"
              value={form.eventName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Type
            </label>
            <select
              name="eventType"
              className="mt-2 block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500/30 transition"
              value={form.eventType}
              onChange={handleChange}
              required
            >
              <option value="">Select Event Type</option>
              <option>Athletics</option>
              <option>Swimming</option>
              <option>Sprinting</option>
              <option>Long Jump</option>
              <option>High Jump</option>
              <option>Hurdle Race</option>
              <option>Cycling</option>
              <option>Diving</option>
              <option>Badminton</option>
              <option>Gymnastic</option>
              <option>Tennis</option>
              <option>Football</option>
              <option>Cricket</option>
              <option>Table tennis</option>
              <option>Volleyball</option>
              <option>Taekwondo</option>
              <option>Fencing</option>
              <option>Sport Climbing</option>
              <option>Surfing</option>
              <option>Canoe</option>
              <option>Archery</option>
            </select>
          </div>

          {/* Event Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Event Date
            </label>
            <input
              type="date"
              name="eventDate"
              className="mt-2 block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500/30 transition"
              value={form.eventDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Location
            </label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              className="mt-2 block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500/30 transition"
              value={form.location}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Event Description"
              className="mt-2 block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500/30 transition"
              value={form.description}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              name="imageUrl"
              placeholder="Image URL"
              className="mt-2 block w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 py-2 px-4 focus:border-blue-500 focus:ring focus:ring-blue-200 dark:focus:ring-blue-500/30 transition"
              value={form.imageUrl}
              onChange={handleChange}
            />
          </div>

          {/* Creator Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Creator Name
              </label>
              <input
                type="text"
                value={form.creatorName}
                readOnly
                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 py-2 px-4 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Creator Email
              </label>
              <input
                type="email"
                value={form.creatorEmail}
                readOnly
                className="mt-2 block w-full rounded-xl border border-gray-300 bg-gray-100 dark:bg-gray-700 dark:border-gray-600 py-2 px-4 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMangeEvents;

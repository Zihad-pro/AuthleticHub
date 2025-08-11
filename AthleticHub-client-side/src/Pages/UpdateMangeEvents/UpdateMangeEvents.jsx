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
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg py-15">
      <h2 className="flex justify-center mb-10">
        <img src="/logo.png" className="w-15 rounded-full" alt="Logo" />
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Event Name */}
        <div>
          <label
            htmlFor="eventName"
            className="block text-sm font-medium text-gray-900"
          >
            Event Name
          </label>
          <input
            type="text"
            name="eventName"
            id="eventName"
            placeholder="Event Name"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
            value={form.eventName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Event Type */}
        <div>
          <label
            htmlFor="eventType"
            className="block text-sm font-medium text-gray-900"
          >
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
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
          <label
            htmlFor="eventDate"
            className="block text-sm font-medium text-gray-900"
          >
            Event Date
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
            value={form.eventDate}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-900"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Location"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
            value={form.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-900"
          >
            Event Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Event Description"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
            value={form.description}
            onChange={handleChange}
            required
            rows={4}
          />
        </div>

        {/* Image URL */}
        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-900"
          >
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 focus:border-BtnPrimary2 focus:ring-BtnPrimary2"
            value={form.imageUrl}
            onChange={handleChange}
          />
        </div>

        {/* Creator Name (readonly) */}
        <div>
          <label
            htmlFor="creatorName"
            className="block text-sm font-medium text-gray-900"
          >
            Creator Name
          </label>
          <input
            type="text"
            id="creatorName"
            value={form.creatorName}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 cursor-not-allowed"
          />
        </div>

        {/* Creator Email (readonly) */}
        <div>
          <label
            htmlFor="creatorEmail"
            className="block text-sm font-medium text-gray-900"
          >
            Creator Email
          </label>
          <input
            type="email"
            id="creatorEmail"
            value={form.creatorEmail}
            readOnly
            className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 py-2 px-3 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-md bg-BtnPrimary2 py-3 text-white hover:bg-BtnPrimary1 cursor-pointer"
        >
          Update Event
        </button>
      </form>
    </div>
  );
};

export default UpdateMangeEvents;

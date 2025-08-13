import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const awards = [
  {
    id: 1,
    category: "Cricket",
    date: "April 24, 2024",
    title: "Bangladesh U19 vs UAE U19 | SBNCS, Mirpur",
    image: "https://i.ibb.co/jPPNt3D6/Screenshot-2025-06-16-144700.png",
  },
  {
    id: 2,
    category: "Gymnistics",
    date: "March 22, 2025",
    title: "Top gymnister  Honored for Excellence",
    image: "https://i.ibb.co/TqKFGSZR/Screenshot-2025-06-16-143651.png",
  },
  {
    id: 3,
    category: "Basketball",
    date: "February 18, 2022",
    title: "Highest record goal in basketball",
    image: "https://i.ibb.co/gLSJbfgs/Screenshot-2025-06-16-143759.png",
  },
  {
    id: 4,
    category: "Archery & shooter",
    date: "January 9, 2023",
    title:
      "SA Games: Bangladesh clinch record 19 gold medals; all 10 in archery",
    image: "https://i.ibb.co/zWqVg4hw/Screenshot-2025-06-16-144012.png",
  },
];

const Award = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-4 py-16  ">
      <h2 className="text-4xl font-bold text-center mb-6">
        🏆 Award Ceremony Gallery
      </h2>
      <p className="text-center text-gray-500 mb-12">
        Snapshots of excellence, recognition, and proud moments.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {awards.map((award) => (
          <div
            key={award.id}
            className="relative overflow-hidden rounded-xl shadow-md group hover:shadow-lg transition-all duration-300"
          >
            <img
              src={award.image}
              alt={award.title}
              className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
            />

            <div className="absolute top-0 left-0 bg-BtnPrimary2 text-white px-3 py-1 text-xs font-semibold rounded-br-xl">
              {award.category}
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white px-4 py-3">
              <h3 className="text-md font-bold hover:underline">
                {award.title}
              </h3>
              <div className="flex items-center text-sm mt-1">
                <FaCalendarAlt className="mr-2" />
                <span>{award.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Award;

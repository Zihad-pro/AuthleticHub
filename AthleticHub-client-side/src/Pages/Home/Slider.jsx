import React, { useEffect, useState } from "react";

const slides = ["/slider1.png", "/slider2.png", "/slider3.png", "/slider4.png"];

const Slider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full px-4  py-16 ">
      {/* Section Title */}
      <h2 className=" text-3xl md:text-5xl font-bold  mb-10">
        Upcoming Feature Events
      </h2>

      {/* Image Carousel */}
      <div className="relative w-full  mx-auto h-100 lg:h-190 md:h-130 overflow-hidden rounded-3xl shadow-xl">
        {slides.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Slide ${i + 1}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out rounded-3xl ${
              i === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          />
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`h-3 w-3 rounded-full transition-all ${
              i === index ? "bg-blue-600 scale-110" : "bg-gray-400"
            }`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;

import React from "react";
import CountUp from "react-countup";
import { FaTrophy, FaUsers } from "react-icons/fa";
import { IoCheckmarkDone } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
const Success = () => {
  const stats = [
    {
      icon: <FaUsers />,
      label: "Active Members",
      value: 1200000,
      suffix: "+",
    },
    {
      icon: <IoCheckmarkDone />,
      label: "Completed People ",
      value: 85000,
      suffix: "+",
    },
    {
      icon: <IoAddCircleOutline />,
      label: "This year Enroll people",
      value: 5000,
      suffix: "+",
    },
    {
      icon: <FaTrophy />,
      label: "Achievements Earned",
      value: 7500,
      suffix: "+",
    },
  ];

  return (
    <section className="bg-gray-100 pb-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Our Impact
        </h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-12">
          AthleticHub success measured in numbers — one member, workout, and
          achievement at a time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#1DA678]/20 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 group"
            >
              <div className="text-[#1DA678] text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                <CountUp
                  start={100}
                  end={stat.value}
                  duration={10}
                  separator=","
                  suffix={stat.suffix}
                />
              </div>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Success;

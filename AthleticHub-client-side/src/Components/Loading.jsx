import React from "react";

const Loading = () => {
  return (
    <div>
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg text-blue-500"></span>
        <p className="mt-4 text-gray-500">Loading events...</p>
      </div>
    </div>
  );
};

export default Loading;

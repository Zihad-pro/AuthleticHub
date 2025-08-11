import { FaRunning, FaHeartbeat, FaUsers, FaBrain } from "react-icons/fa";

const benefits = [
  {
    icon: <FaRunning className="text-3xl text-blue-500" />,
    title: "Improves Fitness",
    desc: "Engaging in sports enhances cardiovascular health, stamina, and flexibility.",
  },
  {
    icon: <FaHeartbeat className="text-3xl text-rose-500" />,
    title: "Boosts Heart Health",
    desc: "Regular physical activity strengthens your heart and reduces risk of disease.",
  },
  {
    icon: <FaUsers className="text-3xl text-green-500" />,
    title: "Builds Teamwork",
    desc: "Sports teach collaboration, leadership, and communication skills.",
  },
  {
    icon: <FaBrain className="text-3xl text-purple-500" />,
    title: "Enhances Mental Health",
    desc: "Playing sports reduces stress, anxiety, and boosts mood naturally.",
  },
];

const SportsBenefits = () => {
  return (
    <section className="bg-gray-100 py-16 px-4 ">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Benefits of Playing Sports
        </h2>
        <p className="text-gray-600 mb-12">
          Discover how sports can improve your physical, mental, and social
          well-being.
        </p>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SportsBenefits;

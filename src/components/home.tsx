import { Link } from "react-router-dom";
import { Thermometer, Droplets } from "lucide-react";

function Home() {
  // Mock data for chambers
  const chambers = [
    { id: "1", name: "Chamber 1", temp: 25.5, humidity: 65 },
    { id: "2", name: "Chamber 2", temp: 27.0, humidity: 60 },
    { id: "3", name: "Chamber 3", temp: 26.2, humidity: 62 },
  ];

  return (
    <div className="w-screen h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Tobacco Drying Chamber Control
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chambers.map((chamber) => (
            <Link
              key={chamber.id}
              to={`/chamber/${chamber.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
            >
              <h2 className="text-xl font-semibold mb-4">{chamber.name}</h2>

              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Thermometer className="h-5 w-5 text-red-500 mr-2" />
                  <span>{chamber.temp}°C</span>
                </div>
                <div className="flex items-center">
                  <Droplets className="h-5 w-5 text-blue-500 mr-2" />
                  <span>{chamber.humidity}%</span>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-500 flex justify-end">
                <span>View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

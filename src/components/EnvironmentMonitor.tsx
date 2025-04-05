import React from "react";
import { Card } from "./ui/card";
import { Thermometer, Droplet } from "lucide-react";

interface SensorData {
  id: string;
  temperature: number;
  humidity: number;
}

interface EnvironmentMonitorProps {
  sensorData?: SensorData[];
  chamberName?: string;
}

const EnvironmentMonitor = ({
  sensorData = [
    { id: "sensor1", temperature: 25, humidity: 60 },
    { id: "sensor2", temperature: 26, humidity: 58 },
  ],
  chamberName = "Chamber",
}: EnvironmentMonitorProps) => {
  // Function to determine temperature color
  const getTempColor = (temp: number) => {
    if (temp < 20) return "text-blue-500";
    if (temp > 30) return "text-red-500";
    return "text-orange-500";
  };

  // Function to determine humidity color
  const getHumidityColor = (humidity: number) => {
    if (humidity < 40) return "text-yellow-500";
    if (humidity > 70) return "text-blue-500";
    return "text-cyan-500";
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">{chamberName} Environment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sensorData.map((sensor) => (
          <Card key={sensor.id} className="p-4 border-2">
            <h3 className="font-medium mb-3">
              Sensor {sensor.id.replace("sensor", "")}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Thermometer
                  className={`h-6 w-6 ${getTempColor(sensor.temperature)} ${sensor.temperature > 30 ? "animate-pulse" : ""}`}
                />
                <div>
                  <span className="text-sm text-muted-foreground">
                    Temperature
                  </span>
                  <p
                    className={`text-lg font-semibold ${getTempColor(sensor.temperature)}`}
                  >
                    {sensor.temperature}°C
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Droplet
                  className={`h-6 w-6 ${getHumidityColor(sensor.humidity)} ${sensor.humidity > 70 ? "animate-bounce" : ""}`}
                />
                <div>
                  <span className="text-sm text-muted-foreground">
                    Humidity
                  </span>
                  <p
                    className={`text-lg font-semibold ${getHumidityColor(sensor.humidity)}`}
                  >
                    {sensor.humidity}%
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentMonitor;

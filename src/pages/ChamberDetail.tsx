import React, { useState } from "react";
import { useParams } from "react-router-dom";
import EnvironmentMonitor from "../components/EnvironmentMonitor";
import ManualControlPanel from "../components/ManualControlPanel";
import AutomaticControlPanel from "../components/AutomaticControlPanel";

interface ChamberData {
  id: string;
  name: string;
  sensors: {
    temperature1: number;
    humidity1: number;
    temperature2: number;
    humidity2: number;
  };
  devices: {
    heater1: boolean;
    heater2: boolean;
    dryer: boolean;
    fan1: boolean;
    fan2: boolean;
  };
  settings: {
    desiredTemperature: number;
    desiredHumidity: number;
    dryingTime: number; // in minutes
  };
  isAutomaticActive: boolean;
  remainingTime: number | null; // in seconds
}

const ChamberDetail: React.FC = () => {
  const { chamberId } = useParams<{ chamberId: string }>();

  // Mock data - in a real application, this would come from an API
  const [chamberData, setChamberData] = useState<ChamberData>({
    id: chamberId || "1",
    name: `Chamber ${chamberId || 1}`,
    sensors: {
      temperature1: 25.5,
      humidity1: 65,
      temperature2: 26.0,
      humidity2: 63,
    },
    devices: {
      heater1: false,
      heater2: false,
      dryer: false,
      fan1: false,
      fan2: false,
    },
    settings: {
      desiredTemperature: 30,
      desiredHumidity: 50,
      dryingTime: 120,
    },
    isAutomaticActive: false,
    remainingTime: null,
  });

  // Toggle device state
  const toggleDevice = (device: keyof ChamberData["devices"]) => {
    setChamberData((prev) => ({
      ...prev,
      devices: {
        ...prev.devices,
        [device]: !prev.devices[device],
      },
    }));
  };

  // Update automatic settings
  const updateSettings = (settings: Partial<ChamberData["settings"]>) => {
    setChamberData((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...settings,
      },
    }));
  };

  // Start automatic drying process
  const startAutomaticDrying = () => {
    setChamberData((prev) => ({
      ...prev,
      isAutomaticActive: true,
      remainingTime: prev.settings.dryingTime * 60, // Convert minutes to seconds
    }));
    // In a real application, this would trigger API calls to control the devices
  };

  return (
    <div className="container mx-auto p-4 bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-6">{chamberData.name}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Environment Monitoring</h2>
          <EnvironmentMonitor sensors={chamberData.sensors} />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Manual Control</h2>
          <ManualControlPanel
            devices={chamberData.devices}
            onToggleDevice={toggleDevice}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Automatic Control</h2>
          <AutomaticControlPanel
            settings={chamberData.settings}
            isActive={chamberData.isAutomaticActive}
            remainingTime={chamberData.remainingTime}
            onUpdateSettings={updateSettings}
            onStartDrying={startAutomaticDrying}
          />
        </div>
      </div>
    </div>
  );
};

export default ChamberDetail;

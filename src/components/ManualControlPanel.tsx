import React, { useState } from "react";
import { Button } from "./ui/button";
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { Flame, Fan, Droplets } from "lucide-react";

interface ManualControlPanelProps {
  chamberName?: string;
}

const ManualControlPanel = ({
  chamberName = "Chamber",
}: ManualControlPanelProps) => {
  const [devices, setDevices] = useState({
    heater1: false,
    heater2: false,
    dryer: false,
    fan1: false,
    fan2: false,
  });

  const { toast } = useToast();

  const toggleDevice = (device: keyof typeof devices) => {
    setDevices((prev) => {
      const newState = { ...prev, [device]: !prev[device] };

      // Show toast notification
      toast({
        title: `${device.charAt(0).toUpperCase() + device.slice(1)} ${newState[device] ? "activated" : "deactivated"}`,
        description: `${chamberName} ${device} has been turned ${newState[device] ? "on" : "off"}.`,
        variant: newState[device] ? "default" : "destructive",
      });

      return newState;
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Manual Control</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Button
          variant={devices.heater1 ? "default" : "outline"}
          className={`flex items-center gap-2 ${devices.heater1 ? "bg-orange-600 hover:bg-orange-700" : ""}`}
          onClick={() => toggleDevice("heater1")}
        >
          <Flame
            className={`h-5 w-5 ${devices.heater1 ? "animate-pulse text-orange-100" : ""}`}
          />
          Heater 1
        </Button>

        <Button
          variant={devices.heater2 ? "default" : "outline"}
          className={`flex items-center gap-2 ${devices.heater2 ? "bg-orange-600 hover:bg-orange-700" : ""}`}
          onClick={() => toggleDevice("heater2")}
        >
          <Flame
            className={`h-5 w-5 ${devices.heater2 ? "animate-pulse text-orange-100" : ""}`}
          />
          Heater 2
        </Button>

        <Button
          variant={devices.dryer ? "default" : "outline"}
          className={`flex items-center gap-2 ${devices.dryer ? "bg-blue-600 hover:bg-blue-700" : ""}`}
          onClick={() => toggleDevice("dryer")}
        >
          <Droplets
            className={`h-5 w-5 ${devices.dryer ? "animate-pulse text-blue-100" : ""}`}
          />
          Dryer
        </Button>

        <Button
          variant={devices.fan1 ? "default" : "outline"}
          className={`flex items-center gap-2 ${devices.fan1 ? "bg-cyan-600 hover:bg-cyan-700" : ""}`}
          onClick={() => toggleDevice("fan1")}
        >
          <Fan
            className={`h-5 w-5 ${devices.fan1 ? "animate-spin text-cyan-100" : ""}`}
          />
          Fan 1
        </Button>

        <Button
          variant={devices.fan2 ? "default" : "outline"}
          className={`flex items-center gap-2 ${devices.fan2 ? "bg-cyan-600 hover:bg-cyan-700" : ""}`}
          onClick={() => toggleDevice("fan2")}
        >
          <Fan
            className={`h-5 w-5 ${devices.fan2 ? "animate-spin text-cyan-100" : ""}`}
          />
          Fan 2
        </Button>
      </div>
      <Toaster />
    </div>
  );
};

export default ManualControlPanel;

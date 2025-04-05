import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { Clock, Thermometer, Droplets, Play } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "./ui/use-toast";

interface AutomaticControlPanelProps {
  settings?: {
    desiredTemperature: number;
    desiredHumidity: number;
    dryingTime: number; // in minutes
  };
  isActive?: boolean;
  remainingTime?: number | null; // in seconds
  onUpdateSettings?: (
    settings: Partial<{
      desiredTemperature: number;
      desiredHumidity: number;
      dryingTime: number;
    }>,
  ) => void;
  onStartDrying?: () => void;
  chamberName?: string;
}

const AutomaticControlPanel: React.FC<AutomaticControlPanelProps> = ({
  settings = {
    desiredTemperature: 30,
    desiredHumidity: 50,
    dryingTime: 120,
  },
  isActive = false,
  remainingTime = null,
  onUpdateSettings = () => {},
  onStartDrying = () => {},
  chamberName = "Chamber",
}) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [timeDisplay, setTimeDisplay] = useState("");
  const [progressPercent, setProgressPercent] = useState(0);
  const { toast } = useToast();

  // Update local settings when props change
  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  // Handle countdown timer
  useEffect(() => {
    if (remainingTime !== null && isActive) {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;

      setTimeDisplay(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );

      // Calculate progress percentage
      const totalSeconds = settings.dryingTime * 60;
      const elapsedSeconds = totalSeconds - remainingTime;
      setProgressPercent(Math.round((elapsedSeconds / totalSeconds) * 100));
    } else if (!isActive) {
      const hours = Math.floor(settings.dryingTime / 60);
      const minutes = settings.dryingTime % 60;
      setTimeDisplay(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:00`,
      );
      setProgressPercent(0);
    }
  }, [remainingTime, isActive, settings.dryingTime]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof typeof localSettings,
  ) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) {
      setLocalSettings({ ...localSettings, [field]: value });
    }
  };

  const handleSliderChange = (
    value: number[],
    field: keyof typeof localSettings,
  ) => {
    setLocalSettings({ ...localSettings, [field]: value[0] });
  };

  const handleSaveSettings = () => {
    onUpdateSettings(localSettings);
    toast({
      title: "Settings Saved",
      description: `${chamberName} automatic control settings have been updated.`,
    });
  };

  const handleStartDrying = () => {
    onStartDrying();
    toast({
      title: "Automatic Drying Started",
      description: `${chamberName} automatic drying process has been initiated.`,
      variant: "default",
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-bold mb-4">Automatic Control</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-4 border-2">
            <div className="flex items-center gap-2 mb-2">
              <Thermometer className="h-5 w-5 text-orange-500" />
              <Label htmlFor="desiredTemperature" className="font-medium">
                Desired Temperature (°C)
              </Label>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="desiredTemperature"
                min={15}
                max={40}
                step={0.5}
                value={[localSettings.desiredTemperature]}
                onValueChange={(value) =>
                  handleSliderChange(value, "desiredTemperature")
                }
                disabled={isActive}
                className="flex-grow"
              />
              <Input
                type="number"
                min={15}
                max={40}
                step={0.5}
                value={localSettings.desiredTemperature}
                onChange={(e) => handleInputChange(e, "desiredTemperature")}
                disabled={isActive}
                className="w-20"
              />
            </div>
          </Card>

          <Card className="p-4 border-2">
            <div className="flex items-center gap-2 mb-2">
              <Droplets className="h-5 w-5 text-blue-500" />
              <Label htmlFor="desiredHumidity" className="font-medium">
                Desired Humidity (%)
              </Label>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="desiredHumidity"
                min={30}
                max={80}
                step={1}
                value={[localSettings.desiredHumidity]}
                onValueChange={(value) =>
                  handleSliderChange(value, "desiredHumidity")
                }
                disabled={isActive}
                className="flex-grow"
              />
              <Input
                type="number"
                min={30}
                max={80}
                step={1}
                value={localSettings.desiredHumidity}
                onChange={(e) => handleInputChange(e, "desiredHumidity")}
                disabled={isActive}
                className="w-20"
              />
            </div>
          </Card>

          <Card className="p-4 border-2">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <Label htmlFor="dryingTime" className="font-medium">
                Drying Time (minutes)
              </Label>
            </div>
            <div className="flex items-center gap-4">
              <Slider
                id="dryingTime"
                min={30}
                max={480}
                step={10}
                value={[localSettings.dryingTime]}
                onValueChange={(value) =>
                  handleSliderChange(value, "dryingTime")
                }
                disabled={isActive}
                className="flex-grow"
              />
              <Input
                type="number"
                min={30}
                max={480}
                step={10}
                value={localSettings.dryingTime}
                onChange={(e) => handleInputChange(e, "dryingTime")}
                disabled={isActive}
                className="w-20"
              />
            </div>
          </Card>

          <div className="flex gap-4">
            <Button
              onClick={handleSaveSettings}
              variant="outline"
              disabled={isActive}
              className="flex-1"
            >
              Save Changes
            </Button>
            <Button
              onClick={handleStartDrying}
              disabled={isActive}
              className={`flex-1 flex items-center justify-center gap-2 ${isActive ? "" : "bg-green-600 hover:bg-green-700"}`}
            >
              <Play className="h-4 w-4" />
              Start Drying
            </Button>
          </div>
        </div>

        <div>
          <Card className="p-6 border-2 h-full flex flex-col justify-center items-center">
            <h3 className="text-lg font-semibold mb-4">Drying Progress</h3>

            <div className="w-48 h-48 rounded-full border-8 border-gray-100 flex items-center justify-center mb-6 relative">
              <div className="text-3xl font-bold">{timeDisplay}</div>
              <div
                className="absolute inset-0 rounded-full border-8 border-green-500 animate-pulse"
                style={{
                  clipPath: isActive
                    ? `polygon(50% 50%, 50% 0%, ${progressPercent > 0 ? "100%" : "50%"} 0%, ${progressPercent > 12.5 ? "100%" : "50%"} ${progressPercent > 12.5 ? "50%" : "0%"}, ${progressPercent > 25 ? "100%" : "50%"} 100%, ${progressPercent > 37.5 ? "50%" : "0%"} 100%, ${progressPercent > 50 ? "0%" : "50%"} ${progressPercent > 50 ? "100%" : "50%"}, ${progressPercent > 62.5 ? "0%" : "50%"} ${progressPercent > 62.5 ? "50%" : "0%"}, ${progressPercent > 75 ? "0%" : "50%"} 0%, ${progressPercent > 87.5 ? "50%" : "100%"} 0%)`
                    : "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
                  opacity: isActive ? 0.7 : 0,
                }}
              />
            </div>

            <div className="w-full">
              <Progress value={progressPercent} className="h-2 mb-2" />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>{isActive ? `${progressPercent}%` : "Ready"}</span>
                <span>100%</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="text-sm font-medium">
                {isActive ? "Automatic Drying In Progress" : "Ready to Start"}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {isActive
                  ? `Maintaining ${localSettings.desiredTemperature}°C and ${localSettings.desiredHumidity}% humidity`
                  : "Set parameters and press Start"}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AutomaticControlPanel;

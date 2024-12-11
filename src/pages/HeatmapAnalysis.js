import React, { useState } from 'react';
import { Camera } from 'lucide-react';

// Simulated CCTV footage data
const cctvFootageData = [
  {
    id: 'cam-01',
    location: 'Entrance Lobby',
    heatmapData: [
      { x: 10, y: 20, intensity: 0.7 },
      { x: 50, y: 40, intensity: 0.9 },
      { x: 80, y: 60, intensity: 0.5 }
    ],
    timestamp: '2024-11-26 14:30:45'
  },
  {
    id: 'cam-02',
    location: 'Parking Area',
    heatmapData: [
      { x: 20, y: 30, intensity: 0.8 },
      { x: 60, y: 50, intensity: 0.6 },
      { x: 90, y: 70, intensity: 0.4 }
    ],
    timestamp: '2024-11-26 14:35:22'
  },
  {
    id: 'cam-03',
    location: 'Main Hall',
    heatmapData: [
      { x: 30, y: 40, intensity: 0.6 },
      { x: 70, y: 60, intensity: 0.8 },
      { x: 50, y: 50, intensity: 0.9 }
    ],
    timestamp: '2024-11-26 14:40:15'
  }
];

// Heatmap Component
const Heatmap = ({ data }) => {
  const getColor = (intensity) => {
    // Color gradient from green to red based on intensity
    const r = Math.floor(255 * intensity);
    const g = Math.floor(255 * (1 - intensity));
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {data.map((point, index) => (
        <circle
          key={index}
          cx={point.x}
          cy={point.y}
          r={5 * point.intensity}
          fill={getColor(point.intensity)}
          opacity={0.7}
        />
      ))}
      {/* Background grid for reference */}
      {[...Array(10)].map((_, i) => (
        <React.Fragment key={i}>
          <line 
            x1={i * 10} 
            y1={0} 
            x2={i * 10} 
            y2={100} 
            stroke="#e0e0e0" 
            strokeWidth="0.5"
          />
          <line 
            x1={0} 
            y1={i * 10} 
            x2={100} 
            y2={i * 10} 
            stroke="#e0e0e0" 
            strokeWidth="0.5"
          />
        </React.Fragment>
      ))}
    </svg>
  );
};

// Activity Statistics Component
const ActivityStatistics = ({ data }) => {
  const totalIntensity = data.reduce((sum, point) => sum + point.intensity, 0);
  const averageIntensity = (totalIntensity / data.length).toFixed(2);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-2">Activity Statistics</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm text-gray-600">Total Points</p>
          <p className="font-bold">{data.length}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Avg Intensity</p>
          <p className="font-bold">{averageIntensity}</p>
        </div>
      </div>
    </div>
  );
};

const HeatmapAnalysis = () => {
  const [selectedCamera, setSelectedCamera] = useState(cctvFootageData[0]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">CCTV Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Camera List */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Camera Feeds</h2>
          {cctvFootageData.map((camera) => (
            <button
              key={camera.id}
              onClick={() => setSelectedCamera(camera)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedCamera.id === camera.id 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center">
                <Camera className="mr-2" />
                <span>{camera.location}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Camera Details */}
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-lg border bg-white shadow-sm">
            <div className="p-6 border-b flex justify-between items-center">
              <h3 className="text-2xl font-semibold">{selectedCamera.location} - Heatmap</h3>
              <span className="text-sm text-gray-600">
                Last Updated: {selectedCamera.timestamp}
              </span>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Heatmap Visualization */}
                <div className="bg-gray-200 p-4 rounded-lg relative">
                  <Heatmap data={selectedCamera.heatmapData} />
                  <div className="absolute top-2 right-2 bg-white/70 px-2 py-1 rounded text-xs">
                    Grid: 10x10 units
                  </div>
                </div>

                {/* Camera Details and Statistics */}
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-700 mb-2">Camera Details</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-gray-600">Camera ID:</p>
                      <p className="font-bold">{selectedCamera.id}</p>
                    </div>
                  </div>

                  {/* Activity Statistics Component */}
                  <ActivityStatistics data={selectedCamera.heatmapData} />

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h3 className="font-semibold text-gray-700 mb-2">Heatmap Legend</h3>
                    <div className="flex items-center">
                      <div className="w-full h-4 bg-gradient-to-r from-green-500 to-red-500 rounded-full"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mt-1">
                      <span>Low Activity</span>
                      <span>High Activity</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeatmapAnalysis;
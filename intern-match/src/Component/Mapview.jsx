import { useState } from "react";
import mapPinsData from "../data/mapPins.json";
 
export const MapView = () => {
  const [activePin, setActivePin] = useState(3);
 
  return (
    <div className="relative w-full h-96 bg-green-50 rounded-xl overflow-hidden border border-gray-200">
      {/* SVG fake map background */}
      <svg width="100%" height="100%" viewBox="0 0 700 450" className="absolute inset-0">
        <rect width="700" height="450" fill="#e8f0e8" />
        <ellipse cx="350" cy="420" rx="200" ry="60" fill="#b3d9f0" opacity="0.6" />
        <path
          d="M0 350 Q100 320 200 340 Q300 360 400 350 Q500 340 600 360 Q650 370 700 380 L700 450 L0 450Z"
          fill="#b3d9f0" opacity="0.5"
        />
        <path
          d="M50 50 Q200 20 400 60 Q550 90 680 50 L700 200 Q600 180 500 200 Q400 220 300 200 Q200 180 100 200 Q50 210 0 180Z"
          fill="#d4e8d4"
        />
        <path
          d="M0 200 Q100 180 200 200 Q350 230 500 200 Q600 180 700 200 L700 350 Q600 330 500 350 Q400 370 300 350 Q200 330 100 350 Q50 360 0 340Z"
          fill="#c8e0c8"
        />
        <path d="M300 0 Q320 100 340 200 Q360 300 380 450" stroke="#d0ddd0" strokeWidth="2" fill="none" />
        <path d="M0 250 Q200 240 400 260 Q600 280 700 260" stroke="#d0ddd0" strokeWidth="1.5" fill="none" />
        <text x="10" y="20" fontSize="10" fill="#9bb09b" fontFamily="sans-serif">© OpenStreetMap</text>
        <rect x="10" y="30" width="30" height="60" rx="6" fill="white" stroke="#ccc" strokeWidth="1" />
        <text x="25" y="53" fontSize="16" fill="#555" textAnchor="middle" fontFamily="sans-serif">+</text>
        <line x1="14" y1="60" x2="36" y2="60" stroke="#ccc" strokeWidth="1" />
        <text x="25" y="80" fontSize="16" fill="#555" textAnchor="middle" fontFamily="sans-serif">−</text>
      </svg>
 
      {/* Pins */}
      {mapPinsData.map((pin, i) => {
        const isActive = activePin === i;
        const pinColor =
          pin.match >= 80
            ? "bg-green-500"
            : pin.match >= 60
            ? "bg-yellow-400"
            : "bg-gray-400";
 
        const textColor =
          pin.match >= 80
            ? "text-green-600"
            : pin.match >= 60
            ? "text-yellow-600"
            : "text-gray-500";
 
        return (
          <div
            key={i}
            onClick={() => setActivePin(isActive ? null : i)}
            className="absolute cursor-pointer"
            style={{
              left: `${(pin.x / 700) * 100}%`,
              top: `${(pin.y / 450) * 100}%`,
              transform: "translate(-50%, -50%)",
              zIndex: isActive ? 20 : 10,
            }}
          >
            <div
              className={`w-8 h-8 rounded-full ${pinColor} border-2 border-white flex items-center justify-center text-white text-xs font-black shadow-md`}
            >
              {pin.match}
            </div>
 
            {isActive && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-white rounded-xl p-3 shadow-xl min-w-48 z-30">
                <button
                  onClick={(e) => { e.stopPropagation(); setActivePin(null); }}
                  className="absolute top-1.5 right-2 text-gray-400 bg-transparent border-none cursor-pointer text-sm"
                >
                  ×
                </button>
                <p className="font-bold text-sm text-gray-900 mb-1" style={{ fontFamily: "'Georgia', serif" }}>
                  {pin.title}
                </p>
                <p className="text-xs text-gray-500 mb-0.5">{pin.company}</p>
                <p className="text-xs text-gray-500">📍 {pin.city}</p>
                <p className={`text-xs font-bold mt-1.5 ${textColor}`}>Match: {pin.match}%</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

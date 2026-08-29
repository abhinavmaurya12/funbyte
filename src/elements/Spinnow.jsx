import { useState } from "react";

export default function Spinnow() {
  const options = [
    "Prize",
    "Lucky",
    "Bonus",
    "Play",
    "Jackpot",
    "Reward",
    "Boost",
    "Retry",
  ];

  const colors = [
    "#ef4444",
    "#22c55e",
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("");
  const [spinning, setSpinning] = useState(false);

  const size = 400;
  const center = size / 2;
  const radius = 180;
  const sliceAngle = 360 / options.length;

  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = ((angle - 90) * Math.PI) / 180;

    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const createSlice = (startAngle, endAngle) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);

    return `
      M ${center} ${center}
      L ${start.x} ${start.y}
      A ${radius} ${radius} 0 0 0 ${end.x} ${end.y}
      Z
    `;
  };

 const spinWheel = () => {
  if (spinning) return;

  setSpinning(true);
  setResult("");

  // Random spin angle
  const spinAmount =
    360 * 5 + Math.floor(Math.random() * 360);

  const finalRotation = rotation + spinAmount;

  setRotation(finalRotation);

  setTimeout(() => {
    const normalized =
      ((finalRotation % 360) + 360) % 360;

    // Pointer top par hai
    const pointerAngle = (360 - normalized + 90) % 360;

    const winningIndex =
      Math.floor(pointerAngle / sliceAngle) %
      options.length;

    setResult(options[winningIndex]);
    setSpinning(false);
  }, 4000);
};

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
        🎡 Spin The Wheel
      </h1>

      <div className="relative">
        {/* Pointer */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20 text-5xl">
          ▼
        </div>

        {/* Wheel */}
        <svg
          width={size}
          height={size}
          className="drop-shadow-2xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning
              ? "transform 4s cubic-bezier(0.17,0.67,0.12,0.99)"
              : "none",
          }}
        >
          {options.map((option, index) => {
            const startAngle = index * sliceAngle;
            const endAngle = startAngle + sliceAngle;

            const textAngle =
              startAngle + sliceAngle / 2;

            const textPos = polarToCartesian(
              center,
              center,
              radius * 0.65,
              textAngle
            );

            return (
              <g key={index}>
                <path
                  d={createSlice(startAngle, endAngle)}
                  fill={colors[index]}
                  stroke="white"
                  strokeWidth="2"
                />

                <text
  x={textPos.x}
  y={textPos.y}
  fill="white"
  fontSize="13"
  fontWeight="bold"
  textAnchor="middle"
  dominantBaseline="middle"
>
  {option}
</text>
              </g>
            );
          })}

          {/* Center Circle */}
          <circle
            cx={center}
            cy={center}
            r="45"
            fill="white"
            stroke="#222"
            strokeWidth="4"
          />

          <text
            x={center}
            y={center}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="20"
            fontWeight="bold"
            fill="#111"
          >
            GO
          </text>
        </svg>
      </div>

      <button
        onClick={spinWheel}
        disabled={spinning}
        className={`mt-10 px-8 py-4 text-white font-bold rounded-xl shadow-lg transition
          ${
            spinning
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {spinning ? "🎡 Spinning..." : "🎯 Spin Now"}
      </button>

      {result && (
        <div className="mt-8 bg-white dark:bg-zinc-900 px-8 py-4 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
            🎉 You Won: {result}
          </h2>
        </div>
      )}
    </div>
  );
}
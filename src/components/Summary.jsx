import React from 'react';
import { useMood } from '../context/MoodContext';

const moodLevels = { Happy: 2, Neutral: 1, Sad: -1 };
const colors = { Happy: '#34D399', Neutral: '#FBBF24', Sad: '#F87171' }; // Tailwind colors

const Summary = () => {
  const { moods } = useMood();

  if (moods.length === 0) return <p className="text-purple-200">No data this week.</p>;

  const count = { Happy: 0, Neutral: 0, Sad: 0 };
  moods.forEach(m => count[m.mood]++);

  const dominantMood = Object.keys(count).reduce((a, b) =>
    count[a] > count[b] ? a : b
  );

  const moodScore = moods.reduce((acc, m) => acc + moodLevels[m.mood], 0);

  const total = moods.length;
  const moodEntries = Object.entries(count).filter(([_, v]) => v > 0);

  let cumulativePercent = 0;

  const getCoordinatesForPercent = (percent, radius = 1) => {
    const x = Math.cos(2 * Math.PI * percent) * radius;
    const y = Math.sin(2 * Math.PI * percent) * radius;
    return [x, y];
  };

  
  const makePieSlice = (percent, color) => {
    const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
    cumulativePercent += percent;
    const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    return (
      <path
        d={`
          M 0 0
          L ${startX} ${startY}
          A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}
          Z
        `}
        fill={color}
        key={color + percent}
      />
    );
  };

 
  cumulativePercent = 0;


  const labels = moodEntries.map(([mood, value]) => {
    const percent = value / total;
    const midPercent = cumulativePercent + percent / 2;
    const [x, y] = getCoordinatesForPercent(midPercent, 0.6); // 0.6 radius for label inside slice
    cumulativePercent += percent;

    return (
      <text
        key={mood + '-label'}
        x={x}
        y={y}
        fill="#fff"
        fontSize="0.2"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="middle"
        pointerEvents="none"
        style={{ userSelect: 'none' }}
      >
        {mood}
      </text>
    );
  });

  return (
    <div className="rounded-xl p-6 shadow-2xl text-center transition duration-500 transform backdrop-blur-xl bg-white/10">
      <h2 className="text-2xl font-bold mb-3 tracking-wider">Mood Overview</h2>
      <div className="space-y-1 text-lg text-purple-200">
        <p>👑 Dominant Mood: <strong>{dominantMood}</strong></p>
        <p>😊 Happy Days: {count.Happy}</p>
        <p>😐 Neutral Days: {count.Neutral}</p>
        <p>😢 Sad Days: {count.Sad}</p>
        <p>🧠 Mood Score: {moodScore}</p>
      </div>

      
      <div className="flex justify-center items-center mt-6">
        <svg viewBox="-1 -1 2 2" width="200" height="200" style={{ transform: "rotate(-90deg)" }}>
          {moodEntries.map(([mood, value]) =>
            makePieSlice(value / total, colors[mood])
          )}
          {labels}
        </svg>
      </div>
    </div>
  );
};

export default Summary;

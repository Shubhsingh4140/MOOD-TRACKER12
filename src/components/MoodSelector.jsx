import React from 'react';

const moods = ['Happy', 'Neutral', 'Sad'];

const MoodSelector = ({ date, onSelect }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {moods.map(mood => (
        <button
          key={mood}
          className="bg-white/20 text-white rounded px-3 py-1 hover:bg-white/30 text-sm"
          onClick={() => onSelect(date, mood)}
        >
          {mood}
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;

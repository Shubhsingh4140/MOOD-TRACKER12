import React from 'react';
import { useMood } from '../context/MoodContext';
import MoodSelector from './MoodSelector';

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
};

const Calendar = () => {
  const { moods, setMood, removeMood } = useMood();
  const days = getLast7Days();

  const getMoodForDate = (date) =>
    moods.find(m => m.date === date)?.mood || null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {days.map(date => {
        const mood = getMoodForDate(date);
        return (
          <div key={date} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-lg shadow-lg p-4 hover:scale-105 transform transition duration-300">
            <p className="text-sm font-semibold text-purple-300">{date}</p>
            {mood ? (
              <>
                <p className="text-2xl font-bold mt-2">{mood}</p>
                <button
                  className="mt-2 text-red-300 hover:text-red-500 text-sm underline"
                  onClick={() => removeMood(date)}
                >
                  ❌ Delete
                </button>
              </>
            ) : (
              <MoodSelector date={date} onSelect={setMood} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
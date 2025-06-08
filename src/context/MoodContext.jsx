import React, { createContext, useContext, useEffect, useState } from 'react';

const MoodContext = createContext();
const moodKey = 'moodboard-data';

export const MoodProvider = ({ children }) => {
  
  const [moods, setMoods] = useState(() => {
    const saved = localStorage.getItem(moodKey);
    return saved ? JSON.parse(saved) : [];
  });

  
  useEffect(() => {
    if (moods.length > 0) {
      localStorage.setItem(moodKey, JSON.stringify(moods));
    }
  }, [moods]);

  const setMood = (date, mood) => {
    setMoods(prev => {
      const updated = prev.filter(entry => entry.date !== date);
      return [...updated, { date, mood }];
    });
  };

  const removeMood = (date) => {
    setMoods(prev => prev.filter(entry => entry.date !== date));
  };

  return (
    <MoodContext.Provider value={{ moods, setMood, removeMood }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = () => useContext(MoodContext);

import React from 'react';
import { MoodProvider, useMood } from './context/MoodContext';
import Calendar from './components/Calendar';
import Summary from './components/Summary';
import Quote from './components/Quote';

const colors = {
  Happy: ['#34D399', '#059669'],      
  Neutral: ['#FBBF24', '#B45309'],    
  Sad: ['#F87171', '#B91C1C'],        
};

function AppContent() {
  const { moods } = useMood();

 
  const count = { Happy: 0, Neutral: 0, Sad: 0 };
  moods.forEach(m => count[m.mood]++);
  const dominantMood = Object.keys(count).reduce((a, b) => count[a] > count[b] ? a : b, 'Neutral');


  const [fromColor, toColor] = colors[dominantMood] || colors.Neutral;

  return (
    <div
      className="min-h-screen w-full transition-all duration-700 font-sans text-white p-4"
      style={{
        background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-6">
          <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg animate-pulse">MoodBoard 👑</h1>
          <p className="mt-2 text-lg text-purple-200">Track your Mood.</p>
        </header>

        <Quote />

        <div className="grid md:grid-cols-2 gap-6">
          <Calendar />
          <Summary />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <MoodProvider>
      <AppContent />
    </MoodProvider>
  );
}

export default App;

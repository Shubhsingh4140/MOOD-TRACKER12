import React, { useEffect, useState } from 'react';

const Quote = () => {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    fetch('https://api.quotable.io/random')
      .then(res => res.json())
      .then(data => setQuote(data.content));
  }, []);

  return (
    <div className="max-w-xl mx-auto text-center bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl mb-8 shadow-lg animate-fadeIn">
      <p className="italic text-lg text-purple-100 transition duration-300">“{quote}”</p>
    </div>
  );
};

export default Quote;
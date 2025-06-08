# MoodBoard: Daily Mood Tracker

A single-page React application to track daily moods with a dynamic, responsive UI.

## Setup Instructions
1. Clone the repository: `git clone <your-repo-url>`
2. Navigate to the project: `cd MOOD-TRACKER12`
3. Install dependencies: `npm install`
4. Run the app: `npm run dev`
5. Open `http://localhost:5173` in your browser.

## Features
- Weekly calendar to select/edit moods (Happy, Neutral, Sad).
- Color-coded moods with a custom palette.
- Dynamic summary with most common mood, good/bad day counts, and a custom SVG pie chart.
- Animated mood selection with CSS transitions.
- Background color changes based on dominant mood.
- Data stored in LocalStorage for persistence.

## Live Demo
[#mood-tracker-12.vercel.app](https://mood-tracker-12.vercel.app.)


## Custom Logic
- Moods mapped to values (Happy = 2, Neutral = 1, Sad = -1) for trend analysis.
- SVG-based pie chart calculates mood distribution without external libraries.
- Background gradient updates dynamically based on the most frequent mood.

# Weather App

A beautiful, real-time weather application built with React and powered by [Open-Meteo](https://open-meteo.com/) - a free, open-source weather API.

## Features

- 🌡️ Real-time weather data for any city worldwide
- 💨 Detailed weather metrics (wind, humidity, pressure, precipitation, cloud cover)
- 📱 Responsive design for all devices
- ✨ Beautiful gradient UI with smooth animations
- 🔓 **No API key required!** - Completely free to use

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Run the App

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## How to Use

1. Enter any city name in the search bar
2. Press Enter or click the Search button
3. View detailed weather information including:
   - Current temperature and feels like temperature
   - Weather conditions with emoji icons
   - Wind speed and direction
   - Humidity and pressure
   - Precipitation and cloud cover

## Technologies Used

- **React** - Frontend framework
- **Vite** - Build tool
- **Open-Meteo** - Free weather data API (no API key required!)

## API Features Used

- Geocoding API for city search
- Current weather data with hourly resolution
- WMO weather codes with emoji representations
- Automatic timezone detection

## Project Structure

```
src/
├── components/
│   ├── SearchBar/
│   │   ├── SearchBar.jsx
│   │   └── search-bar.css
│   └── WeatherCard/
│       ├── WeatherCard.jsx
│       └── weather-card.css
├── services/
│   └── weatherService.js
├── App.jsx
├── App.css
├── main.jsx
└── index.css
```

## Why Open-Meteo?

- **Completely Free** - No API key or registration required
- **Open Source** - Transparent and community-driven
- **High Accuracy** - Data from national weather services
- **No Rate Limits** - Up to 10,000 calls/day for free
- **Privacy Friendly** - No tracking or data collection

## License

MIT

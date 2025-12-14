import { useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Forecast from './components/Forecast/Forecast';
import { weatherService } from './services/weatherService';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    
    try {
      const [weatherData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city),
        weatherService.getForecast(city, 5)
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="app-header">
          <h1>🌤️ Weather App</h1>
          <p>Get real-time weather information for any city</p>
        </header>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>❌ {error}</p>
            <small>Please try another city name</small>
          </div>
        )}

        {weather && !loading && <WeatherCard weather={weather} />}

        {forecast && !loading && (
          <Forecast 
            forecast={forecast} 
            getWeatherCondition={weatherService.getWeatherCondition}
          />
        )}

        {!weather && !loading && !error && (
          <div className="welcome">
            <h2>👋 Welcome!</h2>
            <p>Enter a city name to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import './weather-card.css';

export default function WeatherCard({ weather }) {
  const { location, current } = weather;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>{location.name}</h2>
        <p className="location-details">
          {location.region}, {location.country}
        </p>
        <p className="local-time">{location.localtime}</p>
      </div>

      <div className="weather-main">
        <div className="weather-icon-emoji">
          {current.condition.icon}
        </div>
        <div className="temperature">
          <h1>{Math.round(current.temp_c)}°C</h1>
          <p className="feels-like">Feels like {Math.round(current.feelslike_c)}°C</p>
        </div>
      </div>

      <p className="condition">{current.condition.text}</p>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">
            {Math.round(current.wind_kph)} km/h
          </span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{Math.round(current.pressure_mb)} mb</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Precipitation</span>
          <span className="detail-value">{current.precip_mm} mm</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Cloud Cover</span>
          <span className="detail-value">{current.cloud}%</span>
        </div>
      </div>

      {/* Removed air quality section as Open-Meteo uses different API for this */}
    </div>
  );
}

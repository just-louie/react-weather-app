import './forecast.css';

export default function Forecast({ forecast, getWeatherCondition }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    return {
      day: days[date.getDay()],
      date: `${months[date.getMonth()]} ${date.getDate()}`
    };
  };

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {forecast.daily.time.slice(0, 5).map((date, index) => {
          const { day, date: formattedDate } = formatDate(date);
          const condition = getWeatherCondition(forecast.daily.weather_code[index], 1);
          
          return (
            <div key={date} className="forecast-day">
              <div className="forecast-date">
                <span className="day">{day}</span>
                <span className="date">{formattedDate}</span>
              </div>
              <div className="forecast-icon">{condition.icon}</div>
              <div className="forecast-condition">{condition.text}</div>
              <div className="forecast-temp">
                <span className="temp-max">{Math.round(forecast.daily.temperature_2m_max[index])}°</span>
                <span className="temp-min">{Math.round(forecast.daily.temperature_2m_min[index])}°</span>
              </div>
              <div className="forecast-precip">
                {forecast.daily.precipitation_sum[index] > 0 ? (
                  <span>💧 {forecast.daily.precipitation_sum[index]} mm</span>
                ) : (
                  <span className="no-rain">No rain</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

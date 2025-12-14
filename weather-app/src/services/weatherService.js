// Open-Meteo API - No API key required!
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_URL = 'https://api.open-meteo.com/v1/forecast';

export const weatherService = {
  // Get coordinates for a city
  async getCoordinates(city) {
    try {
      const response = await fetch(
        `${GEOCODING_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );
      
      if (!response.ok) {
        throw new Error('City not found');
      }
      
      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('City not found');
      }
      
      return data.results[0];
    } catch (error) {
      throw error;
    }
  },

  // Get current weather by city name
  async getCurrentWeather(city) {
    try {
      // First, get coordinates for the city
      const location = await this.getCoordinates(city);
      
      // Then fetch weather data
      const response = await fetch(
        `${WEATHER_URL}?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      
      const weatherData = await response.json();
      
      // Transform to a format similar to the old API
      return {
        location: {
          name: location.name,
          region: location.admin1 || '',
          country: location.country,
          lat: location.latitude,
          lon: location.longitude,
          timezone: location.timezone,
          localtime: weatherData.current.time
        },
        current: {
          temp_c: weatherData.current.temperature_2m,
          feelslike_c: weatherData.current.apparent_temperature,
          humidity: weatherData.current.relative_humidity_2m,
          cloud: weatherData.current.cloud_cover,
          wind_kph: weatherData.current.wind_speed_10m,
          wind_degree: weatherData.current.wind_direction_10m,
          pressure_mb: weatherData.current.surface_pressure,
          precip_mm: weatherData.current.precipitation,
          is_day: weatherData.current.is_day,
          condition: this.getWeatherCondition(weatherData.current.weather_code, weatherData.current.is_day)
        }
      };
    } catch (error) {
      throw error;
    }
  },

  // Get weather forecast
  async getForecast(city, days = 3) {
    try {
      const location = await this.getCoordinates(city);
      
      const response = await fetch(
        `${WEATHER_URL}?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code,precipitation_sum&forecast_days=${days}&timezone=auto`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch forecast data');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // Search/autocomplete for cities
  async searchCities(query) {
    try {
      const response = await fetch(
        `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=10&language=en&format=json`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      throw error;
    }
  },

  // Convert WMO weather code to description and icon
  getWeatherCondition(code, isDay) {
    const conditions = {
      0: { text: 'Clear sky', icon: isDay ? '☀️' : '🌙' },
      1: { text: 'Mainly clear', icon: isDay ? '🌤️' : '🌙' },
      2: { text: 'Partly cloudy', icon: '⛅' },
      3: { text: 'Overcast', icon: '☁️' },
      45: { text: 'Foggy', icon: '🌫️' },
      48: { text: 'Depositing rime fog', icon: '🌫️' },
      51: { text: 'Light drizzle', icon: '🌦️' },
      53: { text: 'Moderate drizzle', icon: '🌦️' },
      55: { text: 'Dense drizzle', icon: '🌧️' },
      61: { text: 'Slight rain', icon: '🌧️' },
      63: { text: 'Moderate rain', icon: '🌧️' },
      65: { text: 'Heavy rain', icon: '⛈️' },
      71: { text: 'Slight snow', icon: '🌨️' },
      73: { text: 'Moderate snow', icon: '🌨️' },
      75: { text: 'Heavy snow', icon: '❄️' },
      77: { text: 'Snow grains', icon: '🌨️' },
      80: { text: 'Slight rain showers', icon: '🌦️' },
      81: { text: 'Moderate rain showers', icon: '🌧️' },
      82: { text: 'Violent rain showers', icon: '⛈️' },
      85: { text: 'Slight snow showers', icon: '🌨️' },
      86: { text: 'Heavy snow showers', icon: '❄️' },
      95: { text: 'Thunderstorm', icon: '⛈️' },
      96: { text: 'Thunderstorm with slight hail', icon: '⛈️' },
      99: { text: 'Thunderstorm with heavy hail', icon: '⛈️' }
    };

    return conditions[code] || { text: 'Unknown', icon: '❓' };
  }
};

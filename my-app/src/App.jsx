import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import SearchForm from "./components/SearchForm";
import DetailCard from "./components/DetailCard";
import DataTable from "./components/DataTable";
import SearchHistory from "./components/SearchHistory";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState('celsius');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(0);

  const API_KEY = '3be9cc631e29ac2e6927c03b22c6358c';

  const fetchWeatherData = async (city, lat = null, lon = null) => {
    setLoading(true);
    setError(null);

    try {
      let weatherUrl;
      let forecastUrl;

      if (lat && lon) {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=id`;
      } else {
        weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=id`;
        forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=id`;
      }

      const [weatherResponse, forecastResponse] = await Promise.all([
        fetch(weatherUrl),
        fetch(forecastUrl)
      ]);

      if (!weatherResponse.ok || !forecastResponse.ok) {
        throw new Error('Kota tidak ditemukan');
      }

      const weatherData = await weatherResponse.json();
      const forecastData = await forecastResponse.json();

      setWeather(weatherData);
      setForecast(forecastData);

      // Save to localStorage
      saveToHistory(city, weatherData.coord.lat, weatherData.coord.lon);

    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const saveToHistory = (city, lat, lon) => {
    const history = JSON.parse(localStorage.getItem('weatherSearchHistory') || '[]');
    
    // Remove duplicate if exists
    const filteredHistory = history.filter(item => 
      item.city.toLowerCase() !== city.toLowerCase()
    );

    // Add to beginning of array
    const newHistory = [{
      city,
      lat,
      lon,
      timestamp: new Date().toISOString()
    }, ...filteredHistory].slice(0, 10); // Keep only last 10 searches

    localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
    setRefreshHistory(prev => prev + 1);
  };

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit);
  };

  return (
    <div className="app-container">
      <Header />
      
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            <SearchForm onSearch={fetchWeatherData} unit={unit} />
            
            {loading && (
              <div className="text-center my-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">Memuat data cuaca...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill"></i> {error}
              </div>
            )}

            {!loading && !error && (
              <>
                <DetailCard 
                  weather={weather}
                  unit={unit}
                  onToggleUnit={handleUnitToggle}
                />
                
                {forecast && (
                  <div className="mt-4">
                    <DataTable forecast={forecast} unit={unit} />
                  </div>
                )}
              </>
            )}

            <div className="mt-4">
              <SearchHistory 
                key={refreshHistory}
                onSelectCity={fetchWeatherData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

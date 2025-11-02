import { useState, useEffect } from 'react';

const SearchForm = ({ onSearch, unit }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const API_KEY = '3be9cc631e29ac2e6927c03b22c6358c';

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length > 2) {
        try {
          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
          );
          const data = await response.json();
          setSuggestions(data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [city]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const cityName = `${suggestion.name}${suggestion.state ? ', ' + suggestion.state : ''}, ${suggestion.country}`;
    setCity(cityName);
    // Menggunakan nama lengkap kota termasuk state-nya jika ada
    const fullCityName = suggestion.state 
      ? `${suggestion.name}, ${suggestion.state}`
      : suggestion.name;
    onSearch(fullCityName, suggestion.lat, suggestion.lon);
    setShowSuggestions(false);
  };

  return (
    <div className="search-form-container">
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group input-group-lg">
          <input
            type="text"
            className="form-control"
            placeholder="Masukkan nama kota..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-search"></i> Cari
          </button>
        </div>
        
        {showSuggestions && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            <ul className="list-group">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="list-group-item list-group-item-action"
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{ cursor: 'pointer' }}
                >
                  {suggestion.name}
                  {suggestion.state && `, ${suggestion.state}`}
                  , {suggestion.country}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;

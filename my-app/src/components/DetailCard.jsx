const DetailCard = ({ weather, unit, onToggleUnit }) => {
  if (!weather) {
    return (
      <div className="alert alert-info text-center">
        <i className="bi bi-cloud-sun fs-1"></i>
        <p className="mt-2">Cari kota untuk melihat informasi cuaca</p>
      </div>
    );
  }

  const temperature = unit === 'celsius' 
    ? Math.round(weather.main.temp) 
    : Math.round((weather.main.temp * 9/5) + 32);

  const feelsLike = unit === 'celsius'
    ? Math.round(weather.main.feels_like)
    : Math.round((weather.main.feels_like * 9/5) + 32);

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  return (
    <div className="card weather-card shadow-lg">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div>
            <h2 className="card-title mb-1">
              <i className="bi bi-geo-alt-fill text-primary"></i> {weather.name}, {weather.sys.country}
            </h2>
            <p className="text-muted mb-0">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="btn-group" role="group">
            <button 
              type="button" 
              className={`btn ${unit === 'celsius' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => onToggleUnit('celsius')}
            >
              °C
            </button>
            <button 
              type="button" 
              className={`btn ${unit === 'fahrenheit' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => onToggleUnit('fahrenheit')}
            >
              °F
            </button>
          </div>
        </div>

        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img 
              src={getWeatherIcon(weather.weather[0].icon)} 
              alt={weather.weather[0].description}
              className="weather-icon"
            />
            <h1 className="display-1 fw-bold mb-0">{temperature}{unitSymbol}</h1>
            <p className="text-muted">Terasa seperti {feelsLike}{unitSymbol}</p>
            <p className="text-capitalize fs-5">{weather.weather[0].description}</p>
          </div>

          <div className="col-md-6">
            <div className="weather-details">
              <div className="detail-item mb-3">
                <i className="bi bi-droplet-fill text-info fs-3"></i>
                <div className="ms-3">
                  <small className="text-muted d-block">Kelembaban</small>
                  <strong className="fs-5">{weather.main.humidity}%</strong>
                </div>
              </div>

              <div className="detail-item mb-3">
                <i className="bi bi-wind fs-3 text-success"></i>
                <div className="ms-3">
                  <small className="text-muted d-block">Kecepatan Angin</small>
                  <strong className="fs-5">{weather.wind.speed} m/s</strong>
                </div>
              </div>

              <div className="detail-item mb-3">
                <i className="bi bi-speedometer2 fs-3 text-warning"></i>
                <div className="ms-3">
                  <small className="text-muted d-block">Tekanan</small>
                  <strong className="fs-5">{weather.main.pressure} hPa</strong>
                </div>
              </div>

              <div className="detail-item">
                <i className="bi bi-eye-fill fs-3 text-secondary"></i>
                <div className="ms-3">
                  <small className="text-muted d-block">Jarak Pandang</small>
                  <strong className="fs-5">{(weather.visibility / 1000).toFixed(1)} km</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;

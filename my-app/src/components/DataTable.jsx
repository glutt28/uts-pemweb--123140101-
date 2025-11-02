const DataTable = ({ forecast, unit }) => {
  if (!forecast || !forecast.list) {
    return null;
  }

  // Group forecast by day (mengambil data per 24 jam / 1 kali per hari di jam 12:00)
  const dailyForecasts = forecast.list.filter((item, index) => index % 8 === 0).slice(0, 5);

  const convertTemp = (temp) => {
    if (unit === 'celsius') {
      return Math.round(temp);
    }
    return Math.round((temp * 9/5) + 32);
  };

  const unitSymbol = unit === 'celsius' ? '°C' : '°F';

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString('id-ID', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="card forecast-card shadow">
      <div className="card-body">
        <h4 className="card-title mb-4">
          <i className="bi bi-calendar-week text-primary"></i> Prakiraan 5 Hari Ke Depan
        </h4>
        
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Tanggal</th>
                <th>Cuaca</th>
                <th>Deskripsi</th>
                <th>Suhu</th>
                <th>Kelembaban</th>
                <th>Angin</th>
              </tr>
            </thead>
            <tbody>
              {dailyForecasts.map((day, index) => (
                <tr key={index}>
                  <td className="fw-bold">{formatDate(day.dt)}</td>
                  <td>
                    <img 
                      src={getWeatherIcon(day.weather[0].icon)} 
                      alt={day.weather[0].description}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </td>
                  <td className="text-capitalize">{day.weather[0].description}</td>
                  <td>
                    <span className="badge bg-primary fs-6">
                      {convertTemp(day.main.temp)}{unitSymbol}
                    </span>
                  </td>
                  <td>
                    <i className="bi bi-droplet-fill text-info"></i> {day.main.humidity}%
                  </td>
                  <td>
                    <i className="bi bi-wind text-success"></i> {day.wind.speed} m/s
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

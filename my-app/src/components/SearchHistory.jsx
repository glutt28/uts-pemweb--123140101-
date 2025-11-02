import { useEffect, useState } from 'react';

const SearchHistory = ({ onSelectCity }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const savedHistory = localStorage.getItem('weatherSearchHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  };

  const clearHistory = () => {
    localStorage.removeItem('weatherSearchHistory');
    setHistory([]);
  };

  const removeItem = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    localStorage.setItem('weatherSearchHistory', JSON.stringify(newHistory));
    setHistory(newHistory);
  };

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="card search-history-card shadow">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">
            <i className="bi bi-clock-history text-primary"></i> Riwayat Pencarian
          </h5>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={clearHistory}
          >
            <i className="bi bi-trash"></i> Hapus Semua
          </button>
        </div>

        <div className="history-items">
          {history.map((item, index) => (
            <div key={index} className="history-item d-flex justify-content-between align-items-center mb-2">
              <button
                className="btn btn-outline-secondary btn-sm flex-grow-1 text-start me-2"
                onClick={() => onSelectCity(item.city, item.lat, item.lon)}
              >
                <i className="bi bi-geo-alt"></i> {item.city}
                <small className="text-muted ms-2">
                  {new Date(item.timestamp).toLocaleString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </small>
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => removeItem(index)}
                title="Hapus"
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchHistory;

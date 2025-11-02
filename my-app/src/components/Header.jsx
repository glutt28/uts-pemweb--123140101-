const Header = () => {
  return (
    <header className="header-section mb-4">
      <div className="container">
        <div className="text-center py-4">
          <h1 className="display-4 fw-bold">
            <i className="bi bi-cloud-sun-fill text-warning"></i> Weather Dashboard
          </h1>
          <p className="lead text-muted">Informasi Cuaca Real-time dan Prakiraan 5 Hari</p>
        </div>
      </div>
    </header>
  );
};

export default Header;

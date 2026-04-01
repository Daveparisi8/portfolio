import './Header.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header({ viewMode, onTrackLinkClick }) {
  const modeLabel = viewMode === 'administrator' ? 'Administrator View' : 'Portfolio Review View';
  const track = (linkId, label, url) => {
    if (typeof onTrackLinkClick === 'function') {
      onTrackLinkClick(linkId, label, url);
    }
  };

  return (
    <header id="nav-wrapper">
      <div id="nav-content">
        <div id="nav-title-stack">
          <h1 id="nav-name">Dave Parisi</h1>
          <span className="view-mode-badge">{modeLabel}</span>
        </div>
        <div className="social-icons">
          <a
            href="https://github.com/daveparisi8"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            onClick={() => track('header-github', 'GitHub', 'https://github.com/daveparisi8')}
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ParisiDave"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            onClick={() => track('header-linkedin', 'LinkedIn', 'https://www.linkedin.com/in/ParisiDave')}
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:dave@parisi.dev"
            className="social-icon"
            title="Email Dave"
            onClick={() => track('header-email', 'Email', 'mailto:dave@parisi.dev')}
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

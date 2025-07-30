import './Header.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
  return (
    <header id="nav-wrapper">
      <div id="nav-content">
        <h1 id="nav-name">Dave Parisi</h1>
        <div className="social-icons">
          <a
            href="https://github.com/daveparisi8"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/ParisiDave"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:dave@parisi.dev"
            className="social-icon"
            title="Email Dave"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;

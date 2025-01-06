import './Header.css';
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-light py-3 border-bottom">
      <div className="container d-flex align-items-center">
        {/* Logo on the Left */}
        <div className="logo d-flex align-items-center" onClick={() => navigate("/")}>
          <img
            src="/Images/logo.png"
            alt="Logo"
            className="img-fluid"
          />
        </div>

        {/* Menu Next to the Logo */}
        <nav className="ms-3"> {/* Added margin-start (Bootstrap utility) */}
          <ul className="nav fw-bold">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Νταντάδες
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/parents" className="nav-link">
                Γονείς
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/info" className="nav-link">
                Πληροφορίες
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/help" className="nav-link">
                Βοήθεια
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link">
                Επικοινωνία
              </Link>
            </li>
          </ul>
        </nav>

        {/* "Σύνδεση" Button on the Right */}
        <div className="ms-auto"> {/* Push the button to the far right */}
          <button
            className="btn btn-primary"
            onClick={() => navigate("/PreLoginPage")}
          >
            Σύνδεση
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
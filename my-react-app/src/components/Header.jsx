import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';        /*For dropdown menu*/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';   /*For dropdown menu*/
import { useNavigate, Link } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const handleNannyInfoClick = function(){
    nav('/LoginParent')
  }
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
            <li className="nav-item dropdown">
              <a
              href="#"
              className="nav-link dropdown-toggle"
              id="nanniesDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >
                Νταντάδες
              </a>
              <ul className="dropdown-menu" aria-labelledby="nanniesDropdown">
                <li>
                  <a className="dropdown-item" href="./NannyInfo">
                    Οδηγίες για Νταντάδες
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Γίνε Νταντά
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="parrentsDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >
                Γονείς
              </a>
              <ul className="dropdown-menu" aria-labelledby="parentsDropdown">
                <li>
                  <a className="dropdown-item" href="./ParentInfo">
                    Οδηγίες για Γονείς
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Βρές Νταντά
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="infoDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >
                Πληροφορίες
              </a>
              <ul className="dropdown-menu" aria-labelledby="infoDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Ανακοινώσεις
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="./NannyInfo">
                    Οδηγίες για Νταντάδες
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="./ParentInfo">
                    Οδηγίες για Γονείς
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
            <a
              href="#"
              className="nav-link dropdown-toggle"
              id="helpDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >
                Βοήθεια
              </a>
              <ul className="dropdown-menu" aria-labelledby="helpDropdown">
                <li>
                  <a className="dropdown-item" href="./Faq">
                    Συχνές Ερωτήσεις
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="./SiteMap">
                    Χάρτης Ιστοχώρου 
                  </a>
                </li>
              </ul>
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
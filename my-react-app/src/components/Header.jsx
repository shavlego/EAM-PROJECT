import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
    return (
      <header className="bg-light py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo" onClick={() =>
                 navigate("/")}>
            <img src="/logo.png" alt="Logo" className="img-fluid" style={{ width: '100px' }} />
          </div>
          <nav>
            <ul className="nav fw-bold">
              <li className="nav-item"><a href="#" className="nav-link">Νταντάδες</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Γονείς</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Πληροφορίες</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Βοήθεια</a></li>
              <li className="nav-item"><a href="#" className="nav-link">Επικοινωνία</a></li>
              <li className="nav-item"><a href="#" className="btn" onClick={() =>
                 navigate("/PreLoginPage")}>Σύνδεση</a></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  
  export default Header;
   
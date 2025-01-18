import Header from "../Header";
import "./index.css";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

function PreLoginPage() {
  const nav = useNavigate();
  const handleNannyClick = function () {
    nav("/LoginNanny");
  };

  const handleParentClick = function () {
    nav("/LoginParent");
  };

  return (
    <div>
      <Header />

      <h1>Σελίδα Σύνδεσης</h1>
      <p>
        Μπορείτε να συνδεθείτε είτε ως “Νταντά” είτε ως Γονέας/Κηδεμόνας. Αν δεν
        έχετε φτιάξει προφίλ επιλέγοντας μια απο τις επιλογές γονέας/νταντά, στο
        επόμενο βήμα μπορείτε να κάνετε εγγραφή.
      </p>

      <div className="login-options">
        <div className="login-option parent">
          <img
            src="\public\Images\parent_logo.png"
            alt="Parent Icon"
            className="img-fluid rounded-circle mb-3"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
          <button className="login-button" onClick={handleParentClick}>
            Σύνδεση/Εγγραγή Γονέα
          </button>
        </div>
        <div className="login-option nanny">
          <img
            src="\public\Images\nanny_logo.png"
            alt="Nanny Icon"
            className="img-fluid rounded-circle mb-3"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
            }}
          />
          <button className="login-button" onClick={handleNannyClick}>
            Σύνδεση/Εγγραφή "Νταντάς"
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default PreLoginPage;

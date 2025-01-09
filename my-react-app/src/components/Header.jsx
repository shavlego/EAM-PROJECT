import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';        /*For dropdown menu*/
import 'bootstrap/dist/js/bootstrap.bundle.min.js';   /*For dropdown menu*/
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";



function Header() {
  const navigate = useNavigate();
  const [userName,setUserName] = useState(null);
  const [userId,setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state locally

 // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      if (user) {
        setUserId(user.uid); // Store user ID
        await fetchUsername(user.uid); // Fetch and set the username
        setIsLoggedIn(true); // Mark as logged in
      } else {
        setUserId(null);
        setUserName(null);
        setIsLoggedIn(false); 
      }
    });
    return () => unsubscribe();
  }, []);
  

// Fetch username from Firestore using query logic
const fetchUsername = async (userId) => {
  try {
    console.log("Fetching username for UID:", userId);

    // Query the "user" collection for documents where "userId" matches
    const q = query(collection(FIREBASE_DB, "user"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Assuming only one document matches
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      console.log("User data fetched from Firestore:", userData);
      setUserName(userData.fullName); // Assuming the username is stored as "fullName"
    } else {
      console.log("No user document found for the provided userId.");
    }
  } catch (error) {
    console.error("Error fetching username:", error);
  }
};



  const handleLogout = async () => {
      try {
        await signOut(FIREBASE_AUTH);
        navigate("/");
      } catch (error) {
        console.error("Error logging out:", error);
      
      }
    };

 
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
                  <a className="dropdown-item" href="./Anouncements">
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

        {/* Dynamic Login/Username Section */}
        <div className="ms-auto"> {/* Push the button/username to the far right */}
          {isLoggedIn ? (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="userDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {userName}
              </button>
              <ul className="dropdown-menu" aria-labelledby="userDropdown">
                <li>
                  <a className="dropdown-item" href="#" onClick={() => navigate("/profile")}>
                    Προφίλ
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={() => navigate("/settings")}>
                    Ρυθμίσεις
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-danger"
                    href="#"
                    onClick={handleLogout}
                  >
                    Αποσύνδεση
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => navigate("/PreLoginPage")}
            >
              Σύνδεση
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
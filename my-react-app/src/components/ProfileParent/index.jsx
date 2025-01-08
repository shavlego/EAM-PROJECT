import Header from "../Header";
import Footer from "../Footer";
import "./index.css";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc,setDoc , query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function ParentProfile() {
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Form fields
  const [fullName, setFullName] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState([]); // For fetched data

  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);
      } else {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch user data after userId is set
  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Αποτυχία αποσύνδεσης. Παρακαλώ προσπαθήστε ξανά.");
    }
  };

  // Form submission handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!fullName || !address || !phone || !age || !userId) {
      setError("Παρακαλώ συμπληρώστε όλα τα απαιτούμενα πεδία.");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        fullName,
        address,
        age,
        phone,
        userId,
        createdAt: new Date(),
      };
      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, { merge: true });
      }
      // Reset form fields
      setFullName("");
      setAddress("");
      setAge("");
      setPhone("");
      fetchUserData(); // Refresh data
      navigate("/findNanny");
    } catch (error) {
      console.error("Error adding document:", error);
      setError("Αποτυχία αποθήκευσης. Παρακαλώ προσπαθήστε ξανά.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const q = query(collection(FIREBASE_DB, "user"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(users);
      //If user data exists, populate the form fields
      if (users.length > 0) {
        const user = users[0]; // Assuming there's only one document per user
        setFullName(user.fullName || "");
        setAddress(user.address || "");
        setAge(user.age || "");
        setPhone(user.phone || "");
      
       }
    } 
    catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Header />
      <h1>Δημιουργία Επεξεργασία Προφίλ - Γονέα/Κηδεμόνα</h1>

      {/* Breadcrumb */}
      <div className="breadcrumb">
        <a href="/">Αρχική</a> &gt; <span>Προφίλ - Γονέα/Κηδεμόνα</span>
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      {/* Profile Form */}
      <div className="profile-container">
        <div className="profile-image-section">
          <img
            src="profile-placeholder.jpg"
            alt="Profile"
            className="profile-image"
          />
          <button className="change-image-button">Αλλαγή Εικόνας Προφίλ</button>
        </div>

        <form onSubmit={handleFormSubmit} className="form-section">
          <div className="form-group yellow">
            <label>Ονοματεπώνυμο</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <label>Διεύθυνση</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />

            <label>Επιθυμητή Τοποθεσία Φύλαξης</label>
            <select>
              <option>Στο χώρο μου</option>
              <option>Στο χώρο της νταντάς</option>
            </select>

            <label>Ηλικία παιδιού προς φύλαξης</label>
            <select
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            >
              <option value="">Επιλέξτε ηλικία</option>
              <option>6-12 μηνών</option>
              <option>1-2 ετών</option>
            </select>
          </div>

          <div className="form-group blue">
            <label>Σταθερό Τηλέφωνο</label>
            <input type="text" />

            <label>Κινητό Τηλέφωνο</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <label>Διεύθυνση Ηλεκτρονικού Ταχυδρομείου -email</label>
            <input type="email" value={email} />
          </div>

          <textarea
            placeholder="Λίγα λόγια για εσάς"
            className="about-textarea"
          ></textarea>

          {/* Buttons */}
          <div className="buttons">
            <button
              type="button"
              className="cancel-button"
              onClick={handleLogout}
            >
              Έξοδος
            </button>
            <button
              type="submit"
              className="save-button"
              disabled={loading}
            >
              {loading ? "Επεξεργασία.." : "Αποθήκευση"}
            </button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>
  );
}

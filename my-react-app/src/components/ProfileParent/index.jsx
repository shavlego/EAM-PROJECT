import Header from "../Header";
import Footer from "../Footer";
import "./index.css";

import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

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
  const [bio, setBio] = useState(""); // State for additional text
  const [userData, setUserData] = useState([]); // For fetched data

  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);
      } else {
        navigate("/loginParent");
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
        role: true,
        bio,
        createdAt: new Date(),
      };
      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, {
          merge: true,
        });
      }
      // Reset form fields
      setFullName("");
      setAddress("");
      setAge("");
      setPhone("");
      setBio("");
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
      const q = query(
        collection(FIREBASE_DB, "user"),
        where("userId", "==", userId)
      );
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
        setBio(user.bio || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="profile-page">
      <Header />
      <Breadcrumb />
      <h1>Δημιουργία Επεξεργασία Προφίλ - Γονέα/Κηδεμόνα</h1>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      <div className="container profile-page">
        <div className="row">
          {/* 1st Column: Profile Image */}
          <div className="col-md-3 text-center">
            <div className="profile-image-section">
              <img
                src="/Images/nanny1.png"
                alt="Profile"
                className="profile-image rounded-circle mb-3"
              />
              <button className="btn btn-primary w-100">
                Αλλαγή Εικόνας Προφίλ
              </button>
            </div>
          </div>

          {/* 2nd Column: Ονοματεπώνυμο, Διεύθυνση */}
          <div className="col-md-3">
            <form>
              <div className="form-group mb-3">
                <label>Ονοματεπώνυμο</label>
                <input
                  type="text"
                  className="form-control"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Διεύθυνση</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Επιθυμητή Τοποθεσία Φύλαξης</label>
                <select className="form-control">
                  <option>Στο χώρο μου</option>
                  <option>Στο χώρο της νταντάς</option>
                </select>
              </div>
              <div className="form-group mb-3">
                <label>Ηλικία παιδιού προς φύλαξης</label>
                <select
                  className="form-control"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                >
                  <option value="">Επιλέξτε ηλικία</option>
                  <option>6-12 μηνών</option>
                  <option>1-2 ετών</option>
                </select>
              </div>
            </form>
          </div>

          {/* 3rd Column: Σταθερό Τηλέφωνο, Κινητό */}
          <div className="col-md-3">
            <form>
              <div className="form-group mb-3">
                <label>Σταθερό Τηλέφωνο</label>
                <input type="text" className="form-control" />
              </div>
              <div className="form-group mb-3">
                <label>Κινητό Τηλέφωνο</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Διεύθυνση Ηλεκτρονικού Ταχυδρομείου -email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </form>
          </div>
          <div className="col-md-3">
            <div className="form-group mb-3">
              <label>About Me (Bio):</label>
              <textarea
                className="form-control"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Λίγα λόγια για εσάς"
                rows="5"
              ></textarea>
            </div>
            <div className="d-flex flex-column">
              <button
                type="button"
                className="btn btn-secondary mb-3"
                onClick={handleLogout}
              >
                Έξοδος
              </button>
              <button
                type="submit"
                className="btn btn-success"
                onClick={handleFormSubmit}
                disabled={loading}
              >
                {loading ? "Επεξεργασία.." : "Αποθήκευση"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

import Header from "../Header";
import Footer from "../Footer";
import "./index.css";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ConfirmationModals from "./ConfirmationModals";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import {
  Box,
  Button,
  Typography,
  TextField,
  useStepContext,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid2,
  Checkbox,
} from "@mui/material";
import Breadcrumb from "./Breadcrumb";
import { useNavigate } from "react-router-dom";

export default function NannyProfile() {
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [regSubmitted, setRegSubmitted] = useState(null);
  const navigate = useNavigate();

  // Form fields
  const [name, setName] = useState("");
  const [surName, setSurName] = useState("");
  const [ilikia, setIlikia] = useState("");
  const [address, setAddress] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [phone, setPhone] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [perioxi, setPerioxi] = useState("");
  const [tk, setTk] = useState("");
  const [city, setCity] = useState("");
  const [host, setHost] = useState("");
  const [childAges, setChildAges] = useState("");
  const [ekpaideusi, setEkpaideusi] = useState();
  const [bio, setBio] = useState(""); // State for additional text
  const [userData, setUserData] = useState([]); // For fetched data

  //Modals for new registration
  const [regModalOpen, setRegModalOpen] = useState(false);

  const handleRegButtonClick = () => {
    setRegModalOpen(true);
  };
  const handleCloseReg = () => {
    setRegModalOpen(false);
  };
  //here we need to open set the submit var and navigate to registration
  const handleConfirmReg = async (e) => {
    setRegModalOpen(false);
    try {
      const payload = {
        phone: phone,
        cellPhone: cellPhone,
        address: address,
        perioxi: perioxi,
        tk: tk,
        region: city,
        host: host, //Dynatotita filoksenias stin oikia
        type: typeOfWork, //pliris/meriki
        childAges: childAges, //0-6 Μηνών/6-12 Μηνών/1-2.5 Έτη/0-2.5 Έτη
        regSubmitted: false,
        userId,
        bio: bio, //bio of nanny
      };

      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, {
          merge: true,
        });
      }
      navigate("/registerFormNanny");
    } catch {}
  };
  //----------------------------------------------------------------------------------------

  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);
      } else {
        //navigate("/loginNanny");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch user data after userId is set
  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

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
        setName(user.name || "");
        setSurName(user.surName || "");
        const todaysDate = new Date();
        const birthDate = user.dateOfBirth.toDate();
        const toIlikia = todaysDate.getFullYear() - birthDate.getFullYear();
        setIlikia(toIlikia);
        setAddress(user.address || "");
        setPhone(user.phone || "");
        setCellPhone(user.cellPhone || "");
        setPerioxi(user.perioxi || "");
        setTk(user.tk || "");
        setCity(user.region || "");
        setHost(user.host || "");
        setTypeOfWork(user.type || "");
        setChildAges(user.childAges || "");
        setEkpaideusi(user.ekpaideusi || "");
        setTypeOfWork(user.type);
        setBio(user.bio || "");
        setRegSubmitted(user.regSubmitted);
        //-------------------------------------------------------

        //setExpertise(user.expertise || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleRecommendationFileChange = () => {};
  const handleBioFileChange = () => {};
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

  if (!userId) return <div>Loading...</div>;

  return (
    <div className="profile-page container">
      {console.log(regSubmitted)}
      {regSubmitted == false && navigate("/registerFormNanny")}
      <Header />
      <h1>Δημιουργία / Επεξεργασία Προφίλ - Νταντάς</h1>
      <Breadcrumb />
      <div className="container py-4">
        <div className="row mb-3">
          {/* Profile Picture Section */}
          <div className="col-12 col-sm-4 d-flex flex-column align-items-left">
            <div
              className="border border-secondary rounded text-center custom-bg"
              style={{
                padding: "10px", // Reduced padding
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "120px", // Reduced image size
                  height: "120px",
                  overflow: "hidden",
                  borderRadius: "50%",
                  margin: "0 auto",
                }}
              >
                <img
                  src="/Images/logo.png"
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <button className="btn btn-primary mt-2">
                Αλλαγή Εικόνας Προφίλ
              </button>
            </div>
          </div>

          {/* Personal Info Section */}
          <div className="col-12 col-sm-6">
            <div
              className="custom-bg text-dark rounded"
              style={{
                padding: "15px", // Reduced padding
              }}
            >
              <h6 className="text-center">Προσωπικές Πληροφορίες</h6>
              <p className="small text-muted">
                Οι προσωπικές πληροφορίες μπορούν να αλλάξουν μόνο με νέα
                αίτησης εγγραφής. Για νέα αίτηση χρησιμοποιήστε το πλήκτρο
                "Φόρμα Επανεγγραφής".
              </p>
              <div className="mb-2">
                <label className="form-label">Ονοματεπώνυμο</label>
                <input
                  type="text"
                  className="form-control"
                  value={`${name} ${surName}`}
                  readOnly
                />
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">Ηλικία</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ilikia}
                    readOnly
                  />
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Επίπεδο Σπουδών</label>
                  <input
                    type="text"
                    className="form-control"
                    value={ekpaideusi}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Button Section */}
          <div className="col-12 col-sm-2 d-flex align-items-center justify-content-center">
            <button
              onClick={handleRegButtonClick}
              className="btn btn-success rounded-pill px-3 py-2"
            >
              Φόρμα Eπανεγγραφής
            </button>
          </div>
        </div>

        {/* Address Section */}
        <div className="row mb-3">
          <div className="col-12 col-md-6">
            <div
              className="custom-bgy text-dark rounded"
              style={{
                padding: "15px", // Reduced padding
              }}
            >
              <h6>Διεύθυνση Νταντάς</h6>
              <div className="mb-2">
                <label className="form-label">Διεύθυνση</label>
                <input
                  type="text"
                  className="form-control"
                  value={address}
                  readOnly
                />
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">Περιοχή</label>
                  <input
                    type="text"
                    className="form-control"
                    value={perioxi}
                    readOnly
                  />
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Πόλη</label>
                  <input
                    type="text"
                    className="form-control"
                    value={city}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Info Section */}
          <div className="col-12 col-md-6">
            <div
              className="custom-bgy text-dark rounded"
              style={{
                padding: "15px", // Reduced padding
              }}
            >
              <h6>Στοιχεία Επικοινωνίας</h6>
              <div className="mb-2">
                <label className="form-label">Σταθερό Τηλέφωνο</label>
                <input
                  type="text"
                  className="form-control"
                  value={phone}
                  readOnly
                />
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">Κινητό Τηλέφωνο</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cellPhone}
                    readOnly
                  />
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Text Section */}
        <div className="row mb-3">
          <div className="col-12">
            <div
              className="p-3 rounded custom-bg"
              style={{
                borderRadius: "10px",
              }}
            >
              <label className="form-label" style={{ color: "black" }}>
                Λίγα Λόγια για Εσάς
              </label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Γράψτε κάτι για εσάς..."
                style={{
                  border: "2px solid black",
                  borderRadius: "8px",
                }}
              ></textarea>
            </div>
          </div>
        </div>
        {/* Custom Text Section */}
        <div className="row mb-3">
          <div className="col-12">
            <div
              className="p-3 rounded custom-bgy"
              style={{
                borderRadius: "10px",
              }}
            >
              <label className="form-label" style={{ color: "black" }}>
                Σύντομο Βιογραφικό
              </label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Γράψτε κάτι για εσάς..."
                style={{
                  border: "2px solid black",
                  borderRadius: "8px",
                }}
              ></textarea>
              <div className="row">
                <div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Επισύναψη Βιογραφικού
                  </label>
                  <input
                    id="biografiko"
                    type="file"
                    className="form-control"
                    //onChange={handleFileUploadFirstAid}
                    style={{ marginBottom: "8px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container d-flex justify-content-center mt-4">
          <Button
            variant="contained"
            style={{
              backgroundColor: "#FF0000",
              color: "white",
              borderRadius: "20px", // Rounded corners
              minWidth: "180px",
              marginRight: "10px", // Gap between buttons
            }}
          >
            ΑΚΥΡΩΣΗ
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#008000",
              color: "white",
              borderRadius: "20px", // Rounded corners
              minWidth: "180px",
            }}
          >
            ΑΠΟΘΗΚΕΥΣΗ
          </Button>
        </div>
      </div>

      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      <Footer />
    </div>
  );
}

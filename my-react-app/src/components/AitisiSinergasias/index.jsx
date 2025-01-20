// Aitisi sinergasias me ntanta
import Header from "../Header";
import Footer from "../Footer";
import Breadcrumb from "./Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  arrayUnion,
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
  Alert,
  Snackbar,
} from "@mui/material";
export default function AitisiSinergasias() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  //vars
  const [userData, setUserData] = useState([]); // For fetched data
  const [nannyData, setNannyData] = useState([]); //for fetched data
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true); // Track auth state loading
  const [loadingUserData, setLoadingUserData] = useState(true); // Track user data loading
  const [formData, setFormData] = useState([]);
  //vars of application choices
  const [typeOfWork, setTypeOfWork] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [childGender, setChildGender] = useState("");
  const [childAge, setChildAge] = useState("");
  const [host, setHost] = useState("");
  const [hours, setHours] = useState("");

  //nanny vars
  const location = useLocation();
  const { nannyId } = location.state || {}; // Retrieve nannyId from state
  const [nannyName, setNannyName] = useState("");
  const [nannySurName, setNannySurName] = useState("");
  const [nannyTypeOfWork, setNannyTypeOfWork] = useState("");
  const [nannyHost, setNannyHost] = useState("");
  const [nannyCoHost, setNannyCoHost] = useState("");
  const [nannySex, setNannySex] = useState("");
  const [nannyPerioxi, setNannyPerioxi] = useState("");
  const [nannyCity, setNannyCity] = useState("");
  const [nannyAge, setNannyAge] = useState("");
  const [nannyChildAges, setNannyChildAges] = useState("");

  //change handlers

  const handletypeOfWorkChange = (e) => {
    setTypeOfWork(e.target.value);
  };
  const handleHostChange = (e) => {
    setHost(e.target.value);
  };
  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };
  const handleChildAgeChange = (e) => {
    setChildAge(e.target.value);
  };
  const handleChildGenderChange = (e) => {
    setChildGender(e.target.value);
  };
  const handleHoursChange = (e) => {
    console.log("Test");
    setHours(e.target.value);
  };
  //----------------------------------------------------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
      setLoadingAuth(false); // Auth check complete
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    } else if (!loadingAuth) {
      // Redirect if not logged in after auth check completes
      navigate("/loginParent");
    }
  }, [userId, loadingAuth, navigate]);

  useEffect(() => {
    if (role === false && !loadingUserData) {
      alert(
        "Το προφίλ με το οποίο έχετε συνδεθεί είναι προφίλ Νταντάς! Για να κάνετε αίτιση συνεργασίας πρέπει να έχετε συνδεθεί με προφίλ γονέα."
      );
      navigate("/");
    }
  }, [role, loadingUserData, navigate]);

  const fetchUserData = async () => {
    setLoadingUserData(true); // Start loading
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

      if (users.length > 0) {
        const user = users[0];
        setRole(user.role); // Set role from fetched data
        console.log("role set");
        console.log(role);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoadingUserData(false); // Loading finished
    }
  };

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

  useEffect(() => {
    if (nannyId) {
      fetchNannyData();
    }
  }, [nannyId]);

  //fetch nanny Data
  const fetchNannyData = async () => {
    try {
      const q = query(
        collection(FIREBASE_DB, "user"),
        where("userId", "==", nannyId)
      );
      const querySnapshot = await getDocs(q);
      const nannies = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNannyData(nannies);
      //If user data exists, populate the form fields
      if (nannies.length > 0) {
        const usern = nannies[0]; // Assuming there's only one document per user
        setNannyName(usern.name || "");
        setNannySurName(usern.surName || "");
        setNannyName(usern.name || "");
        setNannyHost(usern.host || "");
        setNannyCoHost(usern.coHost || "");
        setNannyTypeOfWork(usern.type || "");
        setNannyPerioxi(usern.perioxi || "");
        setNannyCity(usern.region || "");
        const todaysDate = new Date();
        const birthDate = usern.dateOfBirth.toDate();
        const toIlikia = todaysDate.getFullYear() - birthDate.getFullYear();
        setNannyAge(toIlikia);
        setNannySex(usern.sex || "");
        setNannyChildAges(usern.childAges || "");

        //setExpertise(user.expertise || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const isFormComplete = () => {
    return (
      typeOfWork !== "" &&
      host !== "" &&
      duration !== "" &&
      startDate !== "" &&
      childAge !== "" &&
      hours !== "" &&
      childGender !== ""
    );
  };

  const handleSaveOrSubmit = async (isSubmit) => {
    //Validate required fields
    if (
      !childAge ||
      !childGender ||
      !startDate ||
      !duration ||
      !typeOfWork ||
      !hours
    ) {
      setError("Παρακαλώ συμπληρώστε όλα τα πεδία.");
      return;
    }
    try {
      const application = {
        startDate: startDate,
        duration: duration,
        type: typeOfWork,
        childAge: childAge,
        childGender: childGender,
        hours: hours,
        parentId: userId,
        nannyId, // Include the nanny's ID
        isSubmitted: isSubmit, // Set whether the application is submitted or just stored
      };
      console.log("Nanny ID:", nannyId);
      console.log("Application:", application);
      // Update parent's database
      const parentRef = doc(FIREBASE_DB, "user", userId);
      console.log("Parent Ref:", parentRef);
      await updateDoc(parentRef, {
        applications: arrayUnion(application),
      });
      if (isSubmit) {
        // Update nanny's database
        const nannyRef = doc(FIREBASE_DB, "user", nannyId);
        console.log("Nanny Ref:", nannyRef);
        await updateDoc(nannyRef, {
          applications: arrayUnion(application),
        });
        setSuccess("Η αίτηση υποβλήθηκε με επιτυχία!");
      } else {
        setSuccess("Η αίτηση αποθηκεύτηκε με επιτυχία!");
      }
      setError("");
      setTimeout(() => navigate("/profileParent"), 2000);
    } catch (err) {
      console.error("Error saving/submitting application:", err);
      setError("Αποτυχία υποβολής της αίτησης. Δοκιμάστε ξανά.");
    }
  };

  return (
    <div>
      <Header />
      <Breadcrumb />
      {error && <p className="text-danger text-center">{error}</p>}
      {success && <p className="text-success text-center">{success}</p>}
      <h1>Αίτηση Συνεργασίας με Νταντά</h1>
      <div className="container">
        <div
          className="d-flex flex-column mt-4 align-items-start"
          style={{ width: "100%" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr", // Two equal columns
              gap: "16px", // Space between items
            }}
          >
            {" "}
            {/* First Column */}
            <div className="summary-container ">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Βασικά Στοιχεία Νταντάς
              </Typography>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Όνομα Νταντάς:</strong>{" "}
                {nannyName || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Επώνυμο Νταντάς:</strong>{" "}
                {nannySurName || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Φύλο:</strong> {nannySex || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Ηλικία:</strong> {nannyAge || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Περιοχή Κατοικίας Νταντάς:</strong>{" "}
                {nannyPerioxi || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Πόλη κατοικίας Νταντάς: </strong>{" "}
                {nannyCity || "Δεν συμπληρώθηκε"}
              </div>
            </div>
            {/* Second Column */}
            <div className="summary-container">
              <Typography variant="h5" style={{ fontWeight: "bold" }}>
                Επιλογές Εργασίας Νταντάς
              </Typography>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Τύπος Απασχόλησης που επιθυμεί ο/η Νταντά :</strong>{" "}
                {nannyTypeOfWork || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Επιλογή Φιλοξενίας στο χώρο του/της Νταντάς:</strong>{" "}
                {nannyHost || "Δεν συμπληρώθηκε"}
              </div>
              {nannyHost == "ΝΑΙ" && (
                <div className="summary-item" style={{ textAlign: "left" }}>
                  <strong>
                    Υπάρχουν συνοικούντες στο χώρο του/της Νταντάς:
                  </strong>{" "}
                  {nannyCoHost || "Δεν συμπληρώθηκε"}
                </div>
              )}
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>
                  Εύρος Ηλικίας βρεφών/νηπίων που επέλεξε ο/η Νταντά:
                </strong>{" "}
                {nannyChildAges || "Δεν συμπληρώθηκε"}
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h3 style={{ textAlign: "center" }}>Επιλογές Συνεργασίας</h3>
          <div className="row mb-3">
            {/* Τύπος Απασχόλησης */}
            <div className="col-md-3">
              <FormControl fullWidth>
                <label
                  htmlFor="typeOfWork"
                  className="form-label"
                  style={{
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Τύπος Απασχόλησης <span style={{ color: "red" }}>* </span>
                </label>
                <Select
                  id="typeOfWork"
                  value={typeOfWork}
                  onChange={handletypeOfWorkChange}
                  displayEmpty
                >
                  <MenuItem value="Πλήρης">Πλήρης</MenuItem>
                  <MenuItem value="Μερική">Μερική</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Χώρος φύλαξης */}
            <div className="col-md-3">
              <FormControl fullWidth>
                <label
                  htmlFor="host"
                  className="form-label"
                  style={{
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Χώρος φύλαξης <span style={{ color: "red" }}>* </span>
                </label>
                <Select
                  id="host"
                  value={host}
                  onChange={handleHostChange}
                  displayEmpty
                >
                  <MenuItem value="Οικεία Γονέα">Οικεία Γονέα</MenuItem>
                  <MenuItem value="Οικεία Νταντάς">Οικεία Νταντάς</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Διάρκεια Συνεργασίας */}
            <div className="col-md-3">
              <FormControl fullWidth>
                <label
                  htmlFor="cohabitants"
                  className="form-label"
                  style={{
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Διάρκεια Συνεργασίας <span style={{ color: "red" }}>* </span>
                </label>
                <Select
                  id="cohabitants"
                  value={duration}
                  onChange={handleDurationChange}
                  displayEmpty
                >
                  <MenuItem value="1 Μήνας">1 Μήνας</MenuItem>
                  <MenuItem value="3 Μήνες">3 Μήνες</MenuItem>
                  <MenuItem value="6 Μήνες">6 Μήνες</MenuItem>
                </Select>
              </FormControl>
            </div>
            {/* Ωράριο*/}
            {typeOfWork == "Πλήρης" && (
              <div className="col-md-3">
                <FormControl fullWidth>
                  <label
                    htmlFor="wrario"
                    className="form-label"
                    style={{
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Ωράριο<span style={{ color: "red" }}>* </span>
                  </label>
                  <Select
                    id="wrario"
                    value={hours}
                    onChange={handleHoursChange}
                    displayEmpty
                  >
                    <MenuItem value="6:00 - 14:00">6:00 - 14:00</MenuItem>
                    <MenuItem value="7:00 - 15:00">7:00 - 15:00</MenuItem>
                    <MenuItem value="8:00 - 16:00">8:00 - 16:00</MenuItem>
                    <MenuItem value="9:00 - 17:00">9:00 - 17:00</MenuItem>
                    <MenuItem value="10:00 - 18:00">10:00 - 18:00</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
            {typeOfWork == "Μερική" && (
              <div className="col-md-3">
                <FormControl fullWidth>
                  <label
                    htmlFor="wrario"
                    className="form-label"
                    style={{
                      fontSize: "16px",
                      marginBottom: "8px",
                    }}
                  >
                    Ωράριο<span style={{ color: "red" }}>* </span>
                  </label>
                  <Select
                    id="wrario"
                    value={hours}
                    onChange={handleHoursChange}
                    displayEmpty
                  >
                    <MenuItem value="6:00 - 10:00">6:00 - 10:00</MenuItem>
                    <MenuItem value="7:00 - 11:00">7:00 - 11:00</MenuItem>
                    <MenuItem value="8:00 - 12:00">8:00 - 12:00</MenuItem>
                    <MenuItem value="9:00 - 13:00">9:00 - 13:00</MenuItem>
                    <MenuItem value="10:00 - 14:00">10:00 - 14:00</MenuItem>
                    <MenuItem value="11:00 - 15:00">11:00 - 15:00</MenuItem>
                    <MenuItem value="12:00 - 16:00">12:00 - 16:00</MenuItem>
                    <MenuItem value="13:00 - 17:00">13:00 - 17:00</MenuItem>
                    <MenuItem value="14:00 - 18:00">13:00 - 18:00</MenuItem>
                  </Select>
                </FormControl>
              </div>
            )}
          </div>

          <div className="row">
            {/* Ημερομηνία Έναρξης */}
            <div className="col-md-4">
              <div className="form-group">
                <label
                  htmlFor="startDate"
                  className="form-label"
                  style={{
                    fontSize: "16px",
                  }}
                >
                  Ημερομηνία Έναρξης<span style={{ color: "red" }}>* </span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="form-control"
                />
              </div>
            </div>

            {/* Ηλικία παιδιού */}
            <div className="col-md-4">
              <FormControl fullWidth>
                <label
                  htmlFor="childAge"
                  className="form-label"
                  style={{
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Ηλικία παιδιού <span style={{ color: "red" }}>* </span>
                </label>
                <Select
                  id="childAge"
                  value={childAge}
                  onChange={handleChildAgeChange}
                  displayEmpty
                >
                  <MenuItem value="0-6 Μηνών">0-6 Μηνών</MenuItem>
                  <MenuItem value="6-12 Μηνών">6-12 Μηνών</MenuItem>
                  <MenuItem value="1-2,5 Έτη">1-2,5 Έτη</MenuItem>
                  <MenuItem value="0-2,5 Έτη">0-2,5 Έτη</MenuItem>
                </Select>
              </FormControl>
            </div>

            {/* Φύλο Παιδιού */}
            <div className="col-md-4">
              <FormControl fullWidth>
                <label
                  htmlFor="childGenre"
                  className="form-label"
                  style={{
                    fontSize: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Φύλο Παιδιού <span style={{ color: "red" }}>* </span>
                </label>
                <Select
                  id="childGenre"
                  value={childGender}
                  onChange={handleChildGenderChange}
                  displayEmpty
                >
                  <MenuItem value="Αγόρι">Αγόρι</MenuItem>
                  <MenuItem value="Κορίτσι">Κορίτσι</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="text-center my-4">
          <p style={{ color: "red" }}>
            {" "}
            Συμπληρώστε όλα τα πεδία με * για να υποβάλετε την αίτηση
          </p>
          <button
            className="btn btn-danger mx-2"
            onClick={() => navigate("/profileParent")}
          >
            Ακύρωση
          </button>
          <button
            className="btn btn-warning mx-2"
            onClick={() => handleSaveOrSubmit(false)}
          >
            Αποθήκευση
          </button>
          <button
            className="btn btn-success mx-2"
            onClick={() => handleSaveOrSubmit(true)}
            disabled={!isFormComplete()} // Disable button if form is incomplete
          >
            Υποβολή
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

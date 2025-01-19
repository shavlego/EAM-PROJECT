// Aitisi sinergasias me ntanta
import Header from "../Header";
import Footer from "../Footer";
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
  //vars
  const [userData, setUserData] = useState([]); // For fetched data
  const [nannyData, setNannyData] = useState([]); //for fetched data
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");
  const [role, setRole] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true); // Track auth state loading
  const [loadingUserData, setLoadingUserData] = useState(true); // Track user data loading

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
  return (
    <div>
      <Header />
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
              <Typography variant="h5">Βασσικά Στοιχεία Νταντάς:</Typography>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Όνομα Νταντάς:</strong>{" "}
                {nannyName || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Επώνυμο Νταντάς:</strong>{" "}
                {nannySurName || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Φύλο :</strong> {nannySex || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Ηλικία :</strong> {nannyAge || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Περιοχή Κατοικίας Νταντάς :</strong>{" "}
                {nannyPerioxi || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Πόλη κατοικίας Νταντάς </strong>{" "}
                {nannyCity || "Δεν συμπληρώθηκε"}
              </div>
            </div>
            {/* Second Column */}
            <div className="summary-container">
              <Typography variant="h5">Επιλογές Εργασίας Νταντάς</Typography>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Τύπος Απασχόλησης που επιθυμεί ο/η "Νταντά" :</strong>{" "}
                {nannyTypeOfWork || "Δεν συμπληρώθηκε"}
              </div>
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>Επιλογή Φιλοξενίας στο χώρο του/της "Νταντάς":</strong>{" "}
                {nannyHost || "Δεν συμπληρώθηκε"}
              </div>
              {nannyHost == "ΝΑΙ" && (
                <div className="summary-item" style={{ textAlign: "left" }}>
                  <strong>
                    Υπάρχουν συνοικούντες στο χώρο του/της "Νταντάς":
                  </strong>{" "}
                  {nannyCoHost || "Δεν συμπληρώθηκε"}
                </div>
              )}
              <div className="summary-item" style={{ textAlign: "left" }}>
                <strong>
                  Εύρος Ηλικίας βρεφών/νηπίων που επέλεξε ο/η Νταντά":
                </strong>{" "}
                {nannyChildAges || "Δεν συμπληρώθηκε"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

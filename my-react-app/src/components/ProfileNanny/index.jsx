import Header from "../Header";
import Footer from "../Footer";
import "./index.css";
import { useEffect, useState } from "react";
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
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h5">
          Επεξεργασία Προφίλ - Βιογραφικού Νταντάς
        </Typography>

        <Grid2 container spacing={2} sx={{ marginTop: "20px" }}>
          {/* Profile Picture Section */}
          <Grid2 xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column", // Ensure button goes below the image
                alignItems: "center", // Center align items
                padding: "10px",
                borderRadius: "8px",
                border: "2px solid #c1c1c1",
              }}
            >
              <img
                src="/Images/logo.png"
                alt="Profile"
                style={{
                  borderRadius: "50%",
                  width: "150px",
                  height: "150px",
                  objectFit: "cover", // Ensures the image maintains its aspect ratio
                }}
              />
              <Button
                variant="contained"
                component="label"
                sx={{
                  marginTop: "10px",
                  backgroundColor: "#2e86de",
                  color: "white",
                }}
              >
                Αλλαγή Εικόνας Προφίλ
                <input
                  type="file"
                  hidden
                  //onChange={handleProfilePictureChange}
                />
              </Button>
            </Box>
          </Grid2>
          {/* Personal Info Section */}
          <Grid2 xs={12}>
            <Box
              sx={{
                backgroundColor: "#d4e157",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6">Προσωπικές Πληροφορίες</Typography>
              <TextField
                label="Ονοματεπώνυμο"
                fullWidth
                sx={{ marginBottom: "10px", marginTop: "15px" }}
                value={name + " " + surName}
              />
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  <TextField
                    label="Ηλικία"
                    value={ilikia}
                    fullWidth
                    //onChange={(e) => setAge(e.target.value)}
                  />
                </Grid2>
              </Grid2>
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  <TextField
                    label="Επίπεδο Σπουδών"
                    fullWidth
                    sx={{ marginTop: "10px" }}
                    value={ekpaideusi}
                    //onChange={(e) => setEducationLevel(e.target.value)}
                  />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
        <Grid2 container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid2 xs={12} sm={8}>
            <Box
              sx={{
                backgroundColor: "#d4e157",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6">Διεύθυνση Νταντάς</Typography>
              <TextField
                label="Διεύθυνση"
                fullWidth
                sx={{ marginBottom: "10px", marginTop: "15px" }}
                value={address}
              />
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  <TextField
                    label="Περιοχή"
                    value={perioxi}
                    fullWidth
                    //onChange={(e) => setAge(e.target.value)}
                  />
                </Grid2>
              </Grid2>
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  <TextField
                    label="Πόλη"
                    fullWidth
                    sx={{ marginTop: "10px" }}
                    value={city}
                    //onChange={(e) => setEducationLevel(e.target.value)}
                  />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
          <Grid2 xs={12} sm={8}>
            <Box
              sx={{
                backgroundColor: "#d4e157",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <Typography variant="h6">Στοιχεία Επικοινωνίας</Typography>
              <TextField
                label="Σταθερό Τηλέφωνο"
                fullWidth
                sx={{ marginBottom: "10px", marginTop: "15px" }}
                value={phone}
              />
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  <TextField
                    label="Κινητό Τηλέφωνο"
                    value={cellPhone}
                    fullWidth
                    //onChange={(e) => setAge(e.target.value)}
                  />
                </Grid2>
              </Grid2>
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  <TextField
                    label="Email"
                    fullWidth
                    sx={{ marginTop: "10px" }}
                    value={email}
                    disabled
                    //onChange={(e) => setEducationLevel(e.target.value)}
                  />
                </Grid2>
              </Grid2>
            </Box>
          </Grid2>
        </Grid2>
      </Box>
      {/* Error message */}
      {error && <div className="error-message">{error}</div>}

      <Footer />
    </div>
  );
}

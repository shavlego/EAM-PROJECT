// Template file used to quickly create new pages
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./index.css";
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
  Alert,
  Snackbar,
} from "@mui/material";
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import { use } from "react";
export default function CreateAggelia() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]); // For fetched data
  const [userId, setUserId] = useState(null);
  //variables for form and tect controls
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [cellPhone, setCellPhone] = useState("");
  const [cellPhoneError, setCellPhoneError] = useState("");
  const [perioxi, setPerioxi] = useState("");
  const [perioxiError, setPerioxiError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [city, setCity] = useState("");
  const [cityError, setCityError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ligaLogia, setLigaLogia] = useState("");
  const [bio, setBio] = useState("");
  const [host, setHost] = useState("");
  const [coHost, setCoHost] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [childAges, setChildAges] = useState("");
  const [addressIsChecked, setAddressIsChecked] = useState(false);
  const [emailIsChecked, setEmailIsChecked] = useState(false);
  const [phoneIsChecked, setPhoneIsChecked] = useState(false);
  //firebase functions
  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setEmail(user.email);
        setUserId(user.uid);
      } else {
        navigate("/loginNanny");
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

        setPhone(user.phone || "");
        setCellPhone(user.cellPhone || "");
        setAddress(user.address || "");
        setPerioxi(user.perioxi || "");
        setCity(user.region || "");
        setHost(user.host || "");
        setCoHost(user.coHost || "");
        setTypeOfWork(user.type || "");
        setChildAges(user.childAges || "");
        setBio(user.bio || "");
        setLigaLogia(user.ligaLogia || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      setError("Αποτυχία αποσύνδεσης. Παρακαλώ προσπαθήστε ξανά.");
    }
  };
  //-----------------------------------------------------------------------------
  //handlers for data change
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (isValidNumber(value, 0, 10)) {
      //only numbers and 10 digits
      setPhone(value); //set the val
      setPhoneError(""); //reset error
    } else {
      setPhoneError("Ο αριθμός τηλεφώνου πρέπει να περιέχει 10 ψηφία.");
    }
  };
  const handlePhoneBlur = () => {
    if (isValidNumber(phone)) setTilefwnoError(""); // Update error state
  };

  const handleCellPhoneChange = (e) => {
    const value = e.target.value;
    if (isValidNumber(value, 0, 10)) {
      //only numbers and 10 digits
      setCellPhone(value); //set the val
      setCellPhoneError(""); //reset error
    } else {
      setCellPhoneError(
        "Ο αριθμός κινητού τηλεφώνου πρέπει να περιέχει 10 ψηφία."
      );
    }
  };
  const handleCellPhoneBlur = () => {
    if (isValidNumber(cellPhone)) setKinitoError(""); // Update error state
  };

  const handlePerioxiChange = (e) => {
    const value = e.target.value;
    if (isValidName(value)) {
      setPerioxi(value); // Update state if valid
      setPerioxiError(""); // Clear error message
    } else {
      setPerioxiError(
        'Στο πεδίο " Περιοχή " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
  };
  const handlePerioxiBlur = () => {
    if (isValidName(perioxi)) setPerioxiError(""); // Update error state
  };
  const handleAddressChange = (e) => {
    const value = e.target.value;
    if (isValidAddress(value)) {
      setAddress(value); // Update state if valid
      setAddressError(""); // Clear error message
    } else {
      setAddressError(
        'Στο πεδίο " Διεύθυνση " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
  };
  const handleAddressBlur = () => {
    if (isValidAddress(address)) setAddressError(""); // Update error state
  };

  const handleCityChange = (e) => {
    const value = e.target.value;
    if (isValidName(value)) {
      setCity(value); // Update state if valid
      setCityError(""); // Clear error message
    } else {
      setCityError(
        'Στο πεδίο " Πόλη κατοικίας " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
  };
  const handleCityBlur = () => {
    if (isValidName(city)) setCityError(""); // Update error state
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (isValidEmail(value)) setEmailError(""); // Update error state
  };
  const handleEmailBlur = () => {
    if (isValidEmail(email))
      setEmailError(""); // Update error state
    else
      setEmailError(
        "Η διεύθυνση Email πρέπει να είναι της μορφής xxxxx@xxxx.xxx"
      );
  };
  const handleLigaLogiaChange = (e) => {
    const value = e.target.value;
    setLigaLogia(value);
  };
  const handleBioChange = (e) => {
    const value = e.target.value;
    setBio(value);
  };
  const handletypeOfWorkChange = (event) => {
    setTypeOfWork(event.target.value); // Update state when the user selects an option
  };
  const handleHostChange = (event) => {
    setHost(event.target.value); // Update state when the user selects an option
  };
  const handleCoHostChange = (event) => {
    setCoHost(event.target.value); // Update state when the user selects an option
  };
  const handleChildAgesChange = (event) => {
    setChildAges(event.target.value); // Update state when the user selects an option
  };
  const handleAddressCheckBoxClick = () => {
    setAddressIsChecked((prevState) => !prevState);
  };
  const handleEmailCheckBoxClick = () => {
    setEmailIsChecked((prevState) => !prevState);
  };
  const handlePhoneCheckBoxClick = () => {
    setPhoneIsChecked((prevState) => !prevState);
  };
  //------------------------------------------------------------------------------------------------------------------------------
  //handlers for modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  //close
  const handleCloseDelete = () => {
    setDeleteModalOpen(false);
  };
  const handleCloseCancel = () => {
    setCancelModalOpen(false);
  };
  const handleCloseSubmit = () => {
    setSubmitModalOpen(false);
  };
  //confirm
  const handleConfirmCancel = async (e) => {
    setCancelModalOpen(false);
    navigate("/NannyMenu");
  };
  const handleConfirmDelete = async (e) => {
    setDeleteModalOpen(false);
    // set the variable that controls the show of aggeliews activeAggelia = false
    try {
      const payload = {
        userId,
        aggeliaActive: false,
      };

      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, {
          merge: true,
        });
      }
    } catch {}
    navigate("/NannyMenu");
    navigate("/NannyMenu");
  };
  const handleConfirmSubmit = async (e) => {
    setSubmitModalOpen(false);
    //sign data and send firebase
    try {
      const payload = {
        phone: phone,
        cellPhone: cellPhone,
        address: address,
        perioxi: perioxi,
        region: city,
        host: host, //Dynatotita filoksenias stin oikia
        coHost: coHost,
        type: typeOfWork, //pliris/meriki
        childAges: childAges, //0-6 Μηνών/6-12 Μηνών/1-2.5 Έτη/0-2.5 Έτη
        userId,
        bio: bio, //bio of nanny
        ligaLogia: ligaLogia,
        aggeliaActive: true,
      };

      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, {
          merge: true,
        });
      }
    } catch {}
    navigate("/NannyMenu");
  };
  //------------------------------------------------------------------------------------------------------------------------------
  //handlers for button clicks
  const handleDeleteBtnClick = () => {
    setDeleteModalOpen(true);
  };
  const handleCancelBtnClick = () => {
    setCancelModalOpen(true);
  };
  const handleSaveBtnClick = async (e) => {
    //check if data are filled
    if (
      !phone ||
      !cellPhone ||
      !address ||
      !perioxi ||
      !city ||
      !email ||
      !typeOfWork ||
      !host ||
      !childAges
    ) {
      alert(
        "Συμπληρώστε όλα τα πεδία με αστερίσκο για να αποθηκεύσετε ή να δημοσιεύσετε αγγελία."
      );
      return;
    }
    //check if host is filled and coHost not
    if (host) {
      if (!coHost) {
        alert(
          "Εφόσον έχετε συμπληρώσει οτι μπορείτε να φιλοξενήσετε στο σπίτι σας πρέπει να συμπληρώσετε αν υπάρχει συνοικούντας ή οχι."
        );
        return;
      }
    }
    if (!isValidEmail(email)) {
      alert("Λάθος μορφή διεύθυνσης ηλεκτρονικού ταχυδρομείου.");
      return;
    }
    //send info to firebase
    try {
      const payload = {
        phone: phone,
        cellPhone: cellPhone,
        address: address,
        perioxi: perioxi,
        region: city,
        host: host, //Dynatotita filoksenias stin oikia
        coHost: coHost,
        type: typeOfWork, //pliris/meriki
        childAges: childAges, //0-6 Μηνών/6-12 Μηνών/1-2.5 Έτη/0-2.5 Έτη
        userId,
        bio: bio, //bio of nanny
        ligaLogia: ligaLogia,
      };

      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, {
          merge: true,
        });
      }
    } catch {}
  };

  const handleSubmitBtnClick = () => {
    if (
      !phone ||
      !cellPhone ||
      !address ||
      !perioxi ||
      !city ||
      !email ||
      !typeOfWork ||
      !host ||
      !childAges
    ) {
      alert(
        "Συμπληρώστε όλα τα πεδία με αστερίσκο για να αποθηκεύσετε ή να δημοσιεύσετε αγγελία."
      );
      return;
    }
    //check if host is filled and coHost not
    if (host) {
      if (!coHost) {
        alert(
          "Εφόσον έχετε συμπληρώσει οτι μπορείτε να φιλοξενήσετε στο σπίτι σας πρέπει να συμπληρώσετε αν υπάρχει συνοικούντας ή οχι."
        );
        return;
      }
    }
    if (!isValidEmail(email)) {
      alert("Λάθος μορφή διεύθυνσης ηλεκτρονικού ταχυδρομείου.");
      return;
    }
    setSubmitModalOpen(true);
  };

  //------------------------------------------------------------------------------------------------------------------------------
  //data validation
  const isValidName = (value) => /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s]*$/.test(value); //i will use the same for eponymo,onoma patros,mitros
  const isValidEmail = (value) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
  const isValidNumber = (value, minLength = 1, maxLength = Infinity) => {
    // Check if the value contains only digits
    const isNumber = /^[0-9]*$/.test(value);
    // Check if the length is within the specified range
    const isCorrectLength =
      value.length >= minLength && value.length <= maxLength;
    return isNumber && isCorrectLength;
  };
  const isValidAddress = (value) => {
    // Regular expression to allow letters, numbers, and spaces
    const regex = /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ0-9\s]*$/;
    return regex.test(value);
  };

  return (
    <div>
      <Header />
      <h1>Δημιουργία / Επεξεργασία Αγγελίας</h1>
      <Breadcrumb />
      {/* Address Section */}
      <div className="container py-4">
        <div className="row mb-3">
          <div className="col-12 col-md-6 con">
            <div
              className="custom-bgy text-dark rounded"
              style={{
                padding: "15px", // Reduced padding
              }}
            >
              <h6>Διεύθυνση Νταντάς</h6>

              <div className="mb-2 ">
                <label className="form-label">
                  Διεύθυνση <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${addressError ? "is-invalid" : ""}`}
                  value={address}
                  onChange={handleAddressChange}
                  onBlur={handleAddressBlur}
                />
                {addressError && (
                  <div className="invalid-feedback">{addressError}</div>
                )}
                <Form.Group controlId="addressCheckbox" className="mt-1">
                  <Form.Check
                    type="checkbox"
                    checked={addressIsChecked}
                    onChange={handleAddressCheckBoxClick}
                    label="Επιθυμώ την εμφάνιση της Διεύθυνσης μου στην Αγγελία"
                  />
                </Form.Group>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">
                    Περιοχή <span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    className={`form-control ${perioxiError ? "is-invalid" : ""}`}
                    value={perioxi}
                    onChange={handlePerioxiChange}
                    onBlur={handlePerioxiBlur}
                  />
                  {perioxiError && (
                    <div className="invalid-feedback">{perioxiError}</div>
                  )}
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">
                    Πόλη <span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    className={`form-control ${cityError ? "is-invalid" : ""}`}
                    value={city}
                    onChange={handleCityChange}
                    onBlur={handleCityBlur}
                  />
                  {cityError && (
                    <div className="invalid-feedback">{cityError}</div>
                  )}
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
              <div className="col-12 mb-2">
                <label className="form-label">
                  Email <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  type="text"
                  className={`form-control ${emailError ? "is-invalid" : ""}`}
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )}
              </div>
              <Form.Group controlId="addressCheckbox" className="mt-1">
                <Form.Check
                  type="checkbox"
                  checked={emailIsChecked}
                  onChange={handleEmailCheckBoxClick}
                  label="Επιθυμώ την εμφάνιση του Email μου στην αγγελία"
                />
              </Form.Group>
              <div className="row">
                <div className=" col-md-6 mb-2">
                  <label className="form-label">
                    Σταθερό Τηλέφωνο <span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    className={`form-control ${phoneError ? "is-invalid" : ""}`}
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={handlePhoneBlur}
                  />
                  {phoneError && (
                    <div className="invalid-feedback">{phoneError}</div>
                  )}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">
                    Κινητό Τηλέφωνο<span style={{ color: "red" }}>*</span>
                  </label>

                  <input
                    type="text"
                    className={`form-control ${cellPhoneError ? "is-invalid" : ""}`}
                    value={cellPhone}
                    onChange={handleCellPhoneChange}
                    onBlur={handleCellPhoneBlur}
                  />
                  {cellPhoneError && (
                    <div className="invalid-feedback">{cellPhoneError}</div>
                  )}
                </div>
                <Form.Group controlId="addressCheckbox" className="mt-1">
                  <Form.Check
                    type="checkbox"
                    checked={phoneIsChecked}
                    onChange={handlePhoneCheckBoxClick}
                    label="Επιθυμώ την εμφάνιση των αριθμών τηλεφώνου μου στην αγγελία"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div>
            &nbsp;
            {/* plaisio paroxis ktlp */}
            <div className="row">
              <div className="col-12 col-md-12">
                <div
                  className="custom-bg text-dark rounded"
                  style={{
                    padding: "15px", // Reduced padding
                  }}
                >
                  <h6>Επιλογές Νταντάς</h6>
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "16px", marginBottom: "16px" }}
                  >
                    <FormControl
                      style={{ flexGrow: 2, minWidth: "320px" }}
                      fullWidth
                      variant="outlined"
                    >
                      {/* Label for the combobox */}
                      <label
                        htmlFor="typeOfWork"
                        className="form-label"
                        style={{
                          fontSize: "16px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Τύπος Απασχόλησης Πλήρης/Μερική
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {/* Combobox */}
                      <Select
                        id="typeOfWork"
                        value={typeOfWork} // Bind the current state to the Select value
                        onChange={handletypeOfWorkChange} // Handle selection change
                        displayEmpty
                      >
                        {/* Dropdown options */}
                        <MenuItem value="Πλήρης">Πλήρης</MenuItem>
                        <MenuItem value="Μερική">Μερική</MenuItem>
                      </Select>
                    </FormControl>
                    {/* Combobox dynatotita filoksenias */}
                    <FormControl
                      style={{ flexGrow: 2, minWidth: "320px" }}
                      fullWidth
                      variant="outlined"
                    >
                      {/* Label for the combobox */}
                      <label
                        htmlFor="host"
                        className="form-label"
                        style={{
                          fontSize: "16px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Δυνατότητα Φιλοξενίας στην οικία μου
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {/* Combobox */}
                      <Select
                        id="host"
                        value={host} // Bind the current state to the Select value
                        onChange={handleHostChange} // Handle selection change
                        displayEmpty
                      >
                        {/* Dropdown options */}
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                        <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Combobox 2 */}
                    <FormControl
                      style={{ flexGrow: 4, minWidth: "250px" }}
                      fullWidth
                      variant="outlined"
                    >
                      {/* Label for the combobox */}
                      <label
                        htmlFor="cohabitants"
                        className="form-label"
                        style={{
                          fontSize: "16px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Υπάρχουν Συνοικούντες;
                        {host === "ΝΑΙ" && (
                          <span style={{ color: "red" }}>*</span>
                        )}
                      </label>
                      {/* Combobox */}
                      <Select
                        id="cohabitants"
                        value={coHost}
                        onChange={handleCoHostChange}
                        displayEmpty
                        disabled={host != "ΝΑΙ"}
                      >
                        {/* Dropdown options */}
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                        <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Combobox 3 */}
                    <FormControl
                      style={{ flexGrow: 4, minWidth: "320px" }}
                      fullWidth
                      variant="outlined"
                    >
                      {/* Label for the combobox */}
                      <label
                        htmlFor="childAges"
                        className="form-label"
                        style={{
                          fontSize: "16px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Ηλικίες παιδιών που δύναται να φροντίσει:
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      {/* Combobox */}
                      <Select
                        id="childAges"
                        value={childAges}
                        onChange={handleChildAgesChange}
                        displayEmpty
                      >
                        {/* Dropdown options */}
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="0-6 Μηνών">0-6 Μηνών</MenuItem>
                        <MenuItem value="6-12 Μηνών">6-12 Μηνών</MenuItem>
                        <MenuItem value="1-2,5 Έτη">1-2,5 Έτη</MenuItem>
                        <MenuItem value="0-2,5 Έτη">0-2,5 Έτη</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>
              </div>
            </div>
            &nbsp;
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
                    Λίγα Λόγια για Εσάς
                  </label>
                  <textarea
                    className="form-control"
                    value={ligaLogia}
                    onChange={handleLigaLogiaChange}
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
            {/* Custom Text Section bio */}
            <div className="row mb-3">
              <div className="col-12">
                <div
                  className="p-3 rounded custom-bg"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <label className="form-label" style={{ color: "black" }}>
                    Σύντομο Βιογραφικό
                  </label>
                  <textarea
                    className="form-control"
                    value={bio}
                    onChange={handleBioChange}
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
                        style={{ marginBottom: "8px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center mt-4">
          {addressIsChecked && (
            <Button
              variant="contained"
              onClick={handleDeleteBtnClick}
              style={{
                backgroundColor: "#FF0000",
                color: "white",
                borderRadius: "20px", // Rounded corners
                minWidth: "180px",
                marginRight: "10px", // Gap between button
              }}
            >
              ΔΙΑΓΡΑΦΗ ΔΗΜΟΣΙΕΥΜΕΝΗΣ ΑΓΓΕΛΙΑΣ
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleCancelBtnClick}
            style={{
              backgroundColor: "#d96f6f",
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
            onClick={handleSaveBtnClick}
            style={{
              backgroundColor: "#0864a6",
              color: "white",
              borderRadius: "20px", // Rounded corners
              minWidth: "180px",
              marginRight: "10px",
            }}
          >
            ΑΠΟΘΗΚΕΥΣΗ
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmitBtnClick}
            style={{
              backgroundColor: "#008000",
              color: "white",
              borderRadius: "20px", // Rounded corners
              minWidth: "180px",
            }}
          >
            ΔΗΜΟΣΙΕΥΣΗ
          </Button>
        </div>
      </div>
      <Footer />
      {/* Modal Dialog */}
      <ConfirmationModals
        cancelModalOpen={cancelModalOpen}
        handleCloseCancel={handleCloseCancel}
        handleConfirmCancel={handleConfirmCancel}
        deleteModalOpen={deleteModalOpen}
        handleCloseDelete={handleCloseDelete}
        handleConfirmDelete={handleConfirmDelete}
        submitModalOpen={submitModalOpen}
        handleCloseSubmit={handleCloseSubmit}
        handleConfirmSubmit={handleConfirmSubmit}
      />
    </div>
  );
}

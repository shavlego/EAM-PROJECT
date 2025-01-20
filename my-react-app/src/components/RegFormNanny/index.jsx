// Create Nanny Registration Form
import Header from "../Header";
import Footer from "../Footer";
import { useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Button,
  Typography,
  TextField,
  useStepContext,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Checkbox,
  Alert,
  Snackbar,
} from "@mui/material";
import Breadcrumb from "./Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";
import ConfirmationModals from "./ConfirmationModals";

export default function RegFormNanny() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]); // For fetched data
  const [userId, setUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false); // State for success message
  const handleCloseSuccessMessage = () => {
    setSuccessMessage(false); // Close success message
  };
  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setMail(user.email);
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

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(FIREBASE_AUTH);
      // navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      // setError("Αποτυχία αποσύνδεσης. Παρακαλώ προσπαθήστε ξανά.");
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
        //step 0 vars
        setOnoma(user.name || "");
        setEponymo(user.surName || "");
        setOnomaPatera(user.fatherName || "");
        setOnomaMiteras(user.motherName || "");
        setGenisi(user.dateOfBirth.toDate());
        setSex(user.sex || "");
        //step 1 vars
        setTilefwno(user.phone || "");
        setKinito(user.cellPhone || "");
        setAddress(user.address || "");
        setPerioxi(user.perioxi || "");
        setTk(user.tk || "");
        setCity(user.region || "");
        setMail(user.email || "");
        setHost(user.host || "");
        setCoHost(user.coHost || "");
        setTypeOfWork(user.type || "");
        setChildAges(user.childAges || "");
        //step 2 vasrs
        setEkpaideusi(user.ekpaideusi || "");
        setFileUploadSpoudes(user.fileUploadSpoudes || "");
        setFirstAid(user.firstAid || "");
        setFileUploadFirstAid(user.fileUploadFirstAid || "");
        setFileUploadPathol(user.fileUploadPathol || "");
        setFileUploadDerm(user.setFileUploadDerm || "");
        setFileUploadPsi(user.fileUploadPsi || "");
        setFileUploadYd(user.fileUploadPsi || "");
        setFileUploadAlo(user.fileUploadAlo || "");
        //-------------------------------------------------------
        //setBio(user.bio || "");
        //setExpertise(user.expertise || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const steps = [
    "Βασικά στοιχεία",
    "Στοιχεία επικοινωνίας, Διαθεσιμότητα",
    "Εκπαίδευση και Δικαιολογητικά",
    "Έλεγχος και Υποβολή",
  ]; // Define stages
  const [activeStep, setActiveStep] = useState(0);
  //Modals for confirmation windows
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  //check the validity of the data
  const isValidName = (value) => /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s]*$/.test(value); //i will use the same for eponymo,onoma patros,mitros
  const isValidEmail = (value) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
  const isValidAddress = (value) => {
    // Regular expression to allow letters, numbers, and spaces
    const regex = /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ0-9\s]*$/;
    return regex.test(value);
  };
  const isValidNumber = (value, minLength = 1, maxLength = Infinity) => {
    // Check if the value contains only digits
    const isNumber = /^[0-9]*$/.test(value);
    // Check if the length is within the specified range
    const isCorrectLength =
      value.length >= minLength && value.length <= maxLength;
    return isNumber && isCorrectLength;
  };
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18); // Calculate the minimum date (18 years ago)

  //Modal handlers
  const handleConfirmCancel = () => {
    setCancelModalOpen(false); // Close the modal
    // Perform cancel action, e.g., navigate or reset form
    //navigate("/home");
  };
  const handleConfirmSave = async (e) => {
    setSaveModalOpen(false); // Close the modal
    try {
      const payload = {
        //from step 0
        name: onoma,
        surName: eponymo,
        fatherName: onomaPatera,
        motherName: onomaMiteras,
        dateOfBirth: genisi,
        sex: sex,
        //from step 1
        email: mail,
        phone: tilefwno,
        cellPhone: kinito,
        address: address,
        perioxi: perioxi,
        tk: tk,
        region: city,
        host: host, //Dynatotita filoksenias stin oikia
        coHost: coHost, //synikountes
        type: typeOfWork, //pliris/meriki
        childAges: childAges, //0-6 Μηνών/6-12 Μηνών/1-2.5 Έτη/0-2.5 Έτη
        //from step 2
        ekpaideusi: ekpaideusi, //Λύκειο/ΙΕΚ/ΤΕΙ/ΑΕΙ
        fileUploadSpoudes: fileUploadSpoudes, //Pistopoihtiko ekpaideusis string
        firstAid: firstAid, //Gnwsi prwtwn bohtheiwn NAI/OXI
        fileUploadFirstAid: fileUploadFirstAid, //Pistopoihtiko prwtwn vohtheiwn string
        fileUploadPathol: fileUploadPathol, //Pistopoihtiko ygeias apo pathologo string
        fileUploadDerm: fileUploadDerm, //pistopoihtiko ygeias apo dermatologo string
        fileUploadPsi: fileUploadPsi, //pistopoihtiko ygeias apo psichiatro string
        fileUploadYd: fileUploadYd, //Ypeythini dhlwsh aitisis string
        fileUploadAlo: fileUploadAlo, //pistopoihtiko glwssomatheias gia alodapous string
        //-----------------------------------------------------------------------------------
        fullname: onoma + " " + eponymo,
        appointments: [],
        createdAt: new Date(),
        role: false,
        userId,
        aggeliaActive: false,
      };

      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, {
          merge: true,
        });
        setSuccessMessage(true); // Show success messag
      }
      //navigate("/home");
    } catch {}
  };
  const handleConfirmSubmit = async (e) => {
    setSubmitModalOpen(false); //close the modal
    try {
      const payload = {
        //from step 0
        name: onoma,
        surName: eponymo,
        fatherName: onomaPatera,
        motherName: onomaMiteras,
        dateOfBirth: genisi,
        sex: sex,
        //from step 1
        email: mail,
        phone: tilefwno,
        cellPhone: kinito,
        address: address,
        perioxi: perioxi,
        tk: tk,
        region: city,
        host: host, //Dynatotita filoksenias stin oikia
        coHost: coHost, //synikountes
        type: typeOfWork, //pliris/meriki
        childAges: childAges, //0-6 Μηνών/6-12 Μηνών/1-2.5 Έτη/0-2.5 Έτη
        //from step 2
        ekpaideusi: ekpaideusi, //Λύκειο/ΙΕΚ/ΤΕΙ/ΑΕΙ
        fileUploadSpoudes: fileUploadSpoudes, //Pistopoihtiko ekpaideusis string
        firstAid: firstAid, //Gnwsi prwtwn bohtheiwn NAI/OXI
        fileUploadFirstAid: fileUploadFirstAid, //Pistopoihtiko prwtwn vohtheiwn string
        fileUploadPathol: fileUploadPathol, //Pistopoihtiko ygeias apo pathologo string
        fileUploadDerm: fileUploadDerm, //pistopoihtiko ygeias apo dermatologo string
        fileUploadPsi: fileUploadPsi, //pistopoihtiko ygeias apo psichiatro string
        fileUploadYd: fileUploadYd, //Ypeythini dhlwsh aitisis string
        fileUploadAlo: fileUploadAlo, //pistopoihtiko glwssomatheias gia alodapous string
        //-----------------------------------------------------------------------------------
        fullName: onoma + " " + eponymo,
        regSubmitted: true,
        appointments: [],
        createdAt: new Date(),
        role: false,
        userId,
        aggeliaActive: false,
      };

      if (userData.length > 0) {
        const existingDocId = userData[0].id; // Assuming only one document per user
        await setDoc(doc(FIREBASE_DB, "user", existingDocId), payload, {
          merge: true,
        });
        setSuccessMessage(true); // Show success message
        // Delay navigation to let the message show
        setTimeout(() => {
          navigate("/profileNanny"); // Replace with your desired route
        }, 1500); // 3-second delay
      }
      //navigate("/profileNanny");
    } catch {}
  };

  const handleCloseCancel = () => {
    setCancelModalOpen(false); // Close the modal without canceling
  };
  const handleCloseSave = () => {
    setSaveModalOpen(false); // Close the modal without canceling
  };
  const handleCloseSubmit = () => {
    setSubmitModalOpen(false); // Close the modal without canceling
  };
  //---------------------------------------------------------------------------------------
  //metablites forms
  //vars of step 0
  const [onoma, setOnoma] = useState("");
  const [eponymo, setEponymo] = useState("");
  const [onomaPatera, setOnomaPatera] = useState("");
  const [onomaMiteras, setOnomaMiteras] = useState("");
  const [genisi, setGenisi] = useState("");
  const [formData, setFormData] = useState(""); // Input data for validation
  const [sex, setSex] = useState("");
  //vars of step 1
  const [tilefwno, setTilefwno] = useState("");
  const [kinito, setKinito] = useState("");
  const [mail, setMail] = useState("");
  const [address, setAddress] = useState("");
  const [tk, setTk] = useState("");
  const [perioxi, setPerioxi] = useState("");
  const [typeOfWork, setTypeOfWork] = useState("");
  const [host, setHost] = useState("");
  const [coHost, setCoHost] = useState("");
  const [childAges, setChildAges] = useState("");
  const [city, setCity] = useState("");
  //vars of step 2
  const [ekpaideusi, setEkpaideusi] = useState("");
  const [fileUploadSpoudes, setFileUploadSpoudes] = useState("");
  const [firstAid, setFirstAid] = useState("");
  const [fileUploadFirstAid, setFileUploadFirstAid] = useState("");
  const [fileUploadPathol, setFileUploadPathol] = useState("");
  const [fileUploadDerm, setFileUploadDerm] = useState("");
  const [fileUploadPsi, setFileUploadPsi] = useState("");
  const [fileUploadYd, setFileUploadYd] = useState("");
  const [fileUploadAlo, setFileUploadAlo] = useState("");

  //step 0 error messages
  const [nameError, setNameError] = useState(""); // State for error message
  const [SurNameError, setSurNameError] = useState(""); // State for error message
  const [FatherNameError, setFatherNameError] = useState(""); // State for error message
  const [MotherNameError, setMotherNameError] = useState(""); // State for error message
  //step 1 error messages
  const [tilefwnoError, setTilefwnoError] = useState("");
  const [kinitoError, setKinitoError] = useState("");
  const [mailError, setMailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [perioxiError, setPerioxiError] = useState("");
  const [tkError, setTkError] = useState("");
  const [cityError, setCityError] = useState("");

  //step 2 error messages
  //Maybe add errors for

  //------------------------------------------------------------------------------------------------------------------------
  //step 0 handlers
  const handleNameChange = (e) => {
    const value = e.target.value;
    if (isValidName(value)) {
      setOnoma(value); // Update state if valid
      setNameError(""); // Clear error message
    } else {
      setNameError(
        'Στο πεδίο " Όνομα " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
  };
  const handleSurNameChange = (e) => {
    const value = e.target.value;
    if (isValidName(value)) {
      setEponymo(value); // Update state if valid
      setSurNameError(""); // Clear error message
    } else {
      setSurNameError(
        'Στο πεδίο " Επώνυμο " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
  };
  const handleFatherNameChange = (e) => {
    const value = e.target.value;
    if (isValidName(value)) {
      setOnomaPatera(value); // Update state if valid
      setFatherNameError(""); // Clear error message
    } else {
      setFatherNameError(
        'Στο πεδίο " Όνομα Πατέρα " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
  };
  const handleMotherNameChange = (e) => {
    const value = e.target.value;
    if (isValidName(value)) {
      setOnomaMiteras(value); // Update state if valid
      setMotherNameError(""); // Clear error message
    } else {
      setMotherNameError(
        'Στο πεδίο " Όνομα Μητέρας " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
  };

  const handleSexChange = (event) => {
    setSex(event.target.value); // Update state when the user selects an option
  };

  //----------------------------------------------------------------------------------------------------------------------------
  //step 1 handlers
  const handleTilefwnoChange = (e) => {
    const value = e.target.value;
    if (isValidNumber(value, 0, 10)) {
      //only numbers and 10 digits
      setTilefwno(value); //set the val
      setTilefwnoError(""); //reset error
    } else {
      setTilefwnoError("Ο αριθμός τηλεφώνου πρέπει να περιέχει 10 ψηφία.");
    }
  };
  const handleKinitoChange = (e) => {
    const value = e.target.value;
    if (isValidNumber(value, 0, 10)) {
      //only numbers and 10 digits
      setKinito(value); //set the val
      setKinitoError(""); //reset error
    } else {
      setKinitoError(
        "Ο αριθμός κινητού τηλεφώνου πρέπει να περιέχει 10 ψηφία."
      );
    }
  };

  // Handle validation when the field loses focus
  const handleTilefwnoBlur = () => {
    if (isValidNumber(tilefwno)) setTilefwnoError(""); // Update error state
  };

  const handleKinitoBlur = () => {
    if (isValidNumber(kinito)) setKinitoError(""); // Update error state
  };

  const handleMailChange = (e) => {
    const value = e.target.value;
    setMail(value);
    if (isValidEmail(value)) setMailError(""); // Update error state
  };
  const handleEmailBlur = (e) => {
    if (isValidEmail(mail))
      setMailError(""); // Update error state
    else
      setMailError(
        "Η διεύθυνση Email πρέπει να είναι της μορφής xxxxx@xxxx.xxx"
      );
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
  const handleAddressBlur = (e) => {
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
  const handleTκChange = (e) => {
    const value = e.target.value;
    if (isValidNumber(value, 0, 8)) {
      //only numbers
      setTk(value); //set the val
      setTkError(""); //reset error
    } else {
      setTkError("Ο Ταχυδρομικός κώδικας αποτελείται μόνο απο αριθμούς");
    }
  };
  const handlePerioxiChange = (e) => {
    const value = e.target.value;
    if (isValidName(value)) {
      setPerioxi(value); // Update state if valid
      setPerioxiError(""); // Clear error message
    } else {
      setPerioxiError(
        'Στο πεδίο " Διεύθυνση " επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά'
      );
    }
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

  //Step 2 Handlers
  const handleEkpaideusiChange = (event) => {
    setEkpaideusi(event.target.value); // Update state when the user selects an option
  };
  const handleFileUploadSpoudes = (event) => {
    setFileUploadSpoudes(event.target.value); // Update state when the user selects an option
  };
  const handleFirstAidChange = (event) => {
    setFirstAid(event.target.value); // Update state when the user selects an option
  };
  const handleFileUploadFirstAid = (event) => {
    setFileUploadFirstAid(event.target.value); // Update state when the user selects an option
  };
  const handleFileUploadPathol = (event) => {
    setFileUploadPathol(event.target.value); // Update state when the user selects an option
  };
  const handleFileUploadDerm = (event) => {
    setFileUploadDerm(event.target.value); // Update state when the user selects an option
  };
  const handleFileUploadPsi = (event) => {
    setFileUploadPsi(event.target.value); // Update state when the user selects an option
  };
  const handleFileUploadYd = (event) => {
    setFileUploadYd(event.target.value); // Update state when the user selects an option
  };
  const handleFileUploadAlo = (event) => {
    setFileUploadAlo(event.target.value); // Update state when the user selects an option
  };
  //----------------------------------------------------------------------------------------------------------------------

  // Handle the Next button click
  const handleNext = () => {
    if (activeStep === 0 && !validateStep0()) return; // Validate Step 0
    if (activeStep === 1 && !validateStep1()) return; // Validate Step 2

    setActiveStep(activeStep + 1); // Proceed to the next step if valid
  };
  //Handle the prev button click
  const handlePrev = () => {
    setActiveStep(activeStep - 1); // Go Back
  };
  const handleSave = () => {
    setSaveModalOpen(true);
  };
  const handleCancel = () => {
    setCancelModalOpen(true); // Show the modal
  };
  const handleSubmit = () => {
    setSubmitModalOpen(true); // Show the modal
  };

  //Allow users to directly select a step
  const handleStepClick = (index) => {
    if (index != activeStep) {
      if (index == 0) setActiveStep(index);
      else if (index == 1) {
        if (validateStep0() == true) {
          setActiveStep(index);
        }
      } else if (index == 2) {
        if (validateStep0() == true && validateStep1OnlyFilled() == true) {
          setActiveStep(index);
        }
      } else if (index == 3) {
        if (
          validateStep0() == true &&
          validateStep1OnlyFilled() == true &&
          validateStep2() == true
        ) {
          setActiveStep(index);
        }
      }
    }
  };

  // const handleStepClick = (index) => {
  //   setActiveStep(index);
  // };

  //-------------------------------------------------------------------------------------------------------------------------------
  //Validate functions for next button
  // Validation function for Step 0
  const validateStep0 = () => {
    let isValid = true;

    if (!onoma.trim()) {
      isValid = false;
    }

    if (!eponymo.trim()) {
      isValid = false;
    }

    if (!onomaPatera.trim()) {
      isValid = false;
    }

    if (!onomaMiteras.trim()) {
      isValid = false;
    }

    if (!genisi) {
      isValid = false;
    }

    return isValid;
  };
  // Validation functions for Step 1
  const validateStep1 = () => {
    let isValid = true;

    if (!mail.trim()) {
      setMailError('Το πεδίο "Mail" είναι υποχρεωτικό.');
      isValid = false;
    } else {
      setMailError("");
    }
    if (!isValidEmail(mail)) {
      setMailError(
        'Το πεδίο "Mail" πρέπει να περιέχει έγκυρη διεύθυνση ηλεκτρονικού ταχυδρομίου'
      );
      isValid = false;
    } else {
      setMailError("");
    }

    if (!/^[0-9]{10}$/.test(tilefwno)) {
      setTilefwnoError('Το πεδίο "Αριθμός Τηλεφώνου" πρέπει να έχει 10 ψηφία.');
      isValid = false;
    } else {
      setTilefwnoError("");
    }
    if (!/^[0-9]{10}$/.test(kinito)) {
      setKinitoError('Το πεδίο "Κινητό Τηλέφωνο" πρέπει να έχει 10 ψηφία.');
      isValid = false;
    } else {
      setKinitoError("");
    }

    return isValid;
  };

  const validateStep1OnlyFilled = () => {
    let isValid = true;

    if (!tilefwno.trim()) {
      isValid = false;
    }

    if (!kinito.trim()) {
      isValid = false;
    }

    if (!mail.trim()) {
      isValid = false;
    }
    if (!address.trim()) {
      isValid = false;
    }
    if (!perioxi.trim()) {
      isValid = false;
    }
    if (!tk.trim()) {
      isValid = false;
    }
    if (!city.trim()) {
      isValid = false;
    }
    if (!typeOfWork.trim()) {
      isValid = false;
    }
    //if the user selects his address then he must check the cohost field
    if (host == "NAI") {
      if (coHost == "") {
        isValid = false;
      }
    }
    return isValid;
  };
  // Validation function for Step 2
  const validateStep2 = () => {
    let isValid = true;

    if (!ekpaideusi.trim()) {
      isValid = false;
    }
    if (firstAid == "ΝΑΙ") {
      if (fileUploadFirstAid == "") {
        isValid = false;
      }
    }

    if (!fileUploadSpoudes.trim()) {
      isValid = false;
    }

    if (!fileUploadPathol.trim()) {
      isValid = false;
    }

    if (!fileUploadDerm.trim()) {
      isValid = false;
    }

    if (!fileUploadDerm.trim()) {
      isValid = false;
    }
    if (!fileUploadYd.trim()) {
      isValid = false;
    }

    return isValid;
  };
  return (
    <div>
      <Header />
      <h1>Αίτηση Εγγραφής ως υποψήδια Ννταντά</h1>
      <h6 className="container">
        Για την ολοκλήρωση της αίτησης σας θα πρέπει να συμπληρώσετε όλα τα
        πεδία με ένδειξη <span style={{ color: "red" }}>* </span>και να
        επισυνάψετε τα κατάλληλα έγγραφα
      </h6>
      <Breadcrumb />
      <div className="container my-5">
        <Box sx={{ width: "100%", textAlign: "center", padding: "5px" }}>
          {/* Stepper Component */}
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  onClick={() => handleStepClick(index)}
                  sx={{ cursor: index < activeStep ? "pointer" : "default" }}
                >
                  {" "}
                  {/*Make previous steps clickable*/}
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Dynamic Content for Each Step */}
          <Box sx={{ marginTop: "20px" }}>
            {activeStep === 0 && (
              <div>
                <Typography variant="h6">Προσωπικά Στοιχεία</Typography>
                {/*form controls here*/}
                <div
                  className="d-flex flex-column mt-3 align-items-start"
                  style={{ width: "100%" }}
                >
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Όνομα <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="textBox"
                      variant="outlined"
                      value={onoma}
                      onChange={handleNameChange}
                      fullWidth
                      error={Boolean(nameError)} // Highlight input if there's an error
                      helperText={nameError} // Display error message below the input
                    />
                  </div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Επώνυμο <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="textBox"
                      variant="outlined"
                      value={eponymo}
                      onChange={handleSurNameChange}
                      fullWidth
                      error={Boolean(SurNameError)} // Highlight input if there's an error
                      helperText={SurNameError} // Display error message below the input
                    />
                  </div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Όνομα Πατέρα <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="textBox"
                      variant="outlined"
                      value={onomaPatera}
                      onChange={handleFatherNameChange}
                      fullWidth
                      error={Boolean(FatherNameError)} // Highlight input if there's an error
                      helperText={FatherNameError} // Display error message below the input
                    />
                  </div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Όνομα Μητέρας <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="textBox"
                      variant="outlined"
                      value={onomaMiteras}
                      onChange={handleMotherNameChange}
                      fullWidth
                      error={Boolean(MotherNameError)} // Highlight input if there's an error
                      helperText={MotherNameError} // Display error message below the input
                    />
                  </div>
                  &nbsp;
                  <div
                    style={{
                      display: "flex",
                      gap: "16px", // Space between DatePicker and Select
                      alignItems: "center", // Vertical alignment
                    }}
                  >
                    {/* Date Picker */}
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="genisi"
                        className="form-label"
                        style={{ fontSize: "16px" }}
                      >
                        Ημερομηνία Γέννησης{" "}
                        <span style={{ color: "red" }}>*</span>
                      </label>
                      <DatePicker
                        id="genisi"
                        className="form-control"
                        selected={genisi}
                        onChange={(date) => setGenisi(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Επιλέξτε ημερομηνία"
                        maxDate={eighteenYearsAgo}
                        showYearDropdown
                        scrollableYearDropdown
                        yearDropdownItemNumber={100}
                        showMonthDropdown
                        required
                        style={{ width: "100%", height: "40px" }} // Consistent height
                      />
                    </div>

                    {/* Select Box */}
                    <div style={{ flex: 1 }}>
                      <label
                        htmlFor="sex"
                        className="form-label"
                        style={{ fontSize: "16px", marginBottom: "8px" }}
                      >
                        Φύλο
                      </label>
                      <Select
                        id="sex"
                        value={sex}
                        onChange={handleSexChange}
                        displayEmpty
                        fullWidth
                        style={{ width: "100%", height: "40px" }} // Consistent height
                      >
                        <MenuItem value="Άνδρας">Άνδρας</MenuItem>
                        <MenuItem value="Γυναίκα">Γυναίκα</MenuItem>
                      </Select>
                    </div>
                  </div>
                </div>
                {formData.trim() === "" && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ marginTop: "10px" }}
                  >
                    Please fill out the field to proceed.
                  </Typography>
                )}
              </div>
            )}
            {/* ----------------------------------------------------------------------------------------------------------- */}
            {/* Step 1 */}
            {activeStep === 1 && (
              <div>
                <Typography variant="h6">Στοιχεία Επικοινωνίας</Typography>
                {/*form controls here*/}
                <div
                  className="d-flex flex-column mt-3 align-items-start"
                  style={{ width: "100%" }}
                >
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Σταθερό Τηλέφωνο <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="tilefwno"
                      variant="outlined"
                      value={tilefwno}
                      onChange={handleTilefwnoChange}
                      fullWidth
                      onBlur={handleTilefwnoBlur}
                      error={Boolean(tilefwnoError)} // Highlight input if there's an error
                      helperText={tilefwnoError} // Display error message below the input
                    />
                  </div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Αριθμός Κινητού Τηλεφώνου{" "}
                    <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="kinito"
                      variant="outlined"
                      value={kinito}
                      onChange={handleKinitoChange}
                      onBlur={handleKinitoBlur}
                      fullWidth
                      error={Boolean(kinitoError)} // Highlight input if there's an error
                      helperText={kinitoError} // Display error message below the input
                    />
                  </div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Διεύθυνση Ηλεκτρονικού ταχυδρομίου E-Mail{" "}
                    <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="mail"
                      variant="outlined"
                      value={mail}
                      onChange={handleMailChange}
                      onBlur={handleEmailBlur}
                      fullWidth
                      error={Boolean(mailError)} // Highlight input if there's an error
                      helperText={mailError} // Display error message below the input
                    />
                  </div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Διεύθυνση Κατοικίας <span style={{ color: "red" }}>* </span>
                  </label>
                  <div className="w-50">
                    <TextField
                      id="address"
                      variant="outlined"
                      value={address}
                      onChange={handleAddressChange}
                      onBlur={handleAddressBlur}
                      fullWidth
                      error={Boolean(addressError)} // Highlight input if there's an error
                      helperText={addressError} // Display error message below the input
                    />
                  </div>
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "16px", marginBottom: "16px" }}
                  >
                    <FormControl
                      style={{ flexGrow: 2, minWidth: "500px" }}
                      fullWidth
                      variant="outlined"
                    >
                      <label
                        htmlFor="textBox"
                        className="form-label"
                        style={{ fontSize: "16px" }}
                      >
                        Περιοχή <span style={{ color: "red" }}>* </span>
                      </label>
                      <TextField
                        id="perioxi"
                        variant="outlined"
                        value={perioxi}
                        onChange={handlePerioxiChange}
                        fullWidth
                        error={Boolean(perioxiError)} // Highlight input if there's an error
                        helperText={perioxiError} // Display error message below the input
                      />
                    </FormControl>
                    <FormControl
                      style={{ flexGrow: 2, minWidth: "280px" }}
                      fullWidth
                      variant="outlined"
                    >
                      <label
                        htmlFor="textBox"
                        className="form-label"
                        style={{ fontSize: "16px" }}
                      >
                        Ταχυδρομικός Κώδικας{" "}
                        <span style={{ color: "red" }}>* </span>
                      </label>
                      <TextField
                        id="tk"
                        variant="outlined"
                        value={tk}
                        onChange={handleTκChange}
                        fullWidth
                        error={Boolean(tkError)} // Highlight input if there's an error
                        helperText={tkError} // Display error message below the input
                      />
                    </FormControl>
                    <FormControl
                      style={{ flexGrow: 2, minWidth: "280px" }}
                      fullWidth
                      variant="outlined"
                    >
                      <label
                        htmlFor="textBox"
                        className="form-label"
                        style={{ fontSize: "16px" }}
                      >
                        Πόλη Κατοικίας <span style={{ color: "red" }}>* </span>
                      </label>
                      <TextField
                        id="city"
                        variant="outlined"
                        value={city}
                        onChange={handleCityChange}
                        fullWidth
                        error={Boolean(tkError)} // Highlight input if there's an error
                        helperText={tkError} // Display error message below the input
                      />
                    </FormControl>
                  </div>
                  {/* Pedia ta opoia aforoun tin diathesimotita kai to plaisio paroxis ypiresiwn */}
                  <Typography variant="h6">
                    Διαθεσιμότητα και Πλαίσιο παροχής υπηρεσίας
                  </Typography>
                  &nbsp;
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
                      </label>
                      {/* Combobox */}
                      <Select
                        id="childAges"
                        value={childAges}
                        onChange={handleChildAgesChange}
                        displayEmpty
                      >
                        {/* Dropdown options */}
                        <MenuItem value="0-6 Μηνών">0-6 Μηνών</MenuItem>
                        <MenuItem value="6-12 Μηνών">6-12 Μηνών</MenuItem>
                        <MenuItem value="1-2,5 Έτη">1-2,5 Έτη</MenuItem>
                        <MenuItem value="0-2,5 Έτη">0-2,5 Έτη</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </div>

                {formData.trim() === "" && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ marginTop: "10px" }}
                  >
                    Please fill out the field to proceed.
                  </Typography>
                )}
              </div>
            )}
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
            {/* Step 2 */}
            {activeStep === 2 && (
              <div>
                <Typography variant="h6">
                  Εκπαίδευση και Πιστοποιητικά
                </Typography>
                {/*form controls here*/}
                <div
                  className="d-flex flex-column mt-4 align-items-start "
                  style={{ width: "80%" }}
                >
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Επίπεδο Εκπαίδευσης <span style={{ color: "red" }}>* </span>
                  </label>
                  <Select
                    id="ekpaideusi"
                    value={ekpaideusi} // Bind the current state to the Select value
                    onChange={handleEkpaideusiChange} // Handle selection change
                    displayEmpty
                    style={{ width: "100%" }} // Set the width to 100% of the container
                  >
                    {/* Dropdown options */}
                    <MenuItem value=""></MenuItem>
                    <MenuItem value="Λύκειο">
                      Απόφοιτος/Απόφοιτη Λυκείου
                    </MenuItem>
                    <MenuItem value="IEK">Απόφοιτος/Απόφοιτη ΙΕΚ</MenuItem>
                    <MenuItem value="TEI">Απόφοιτος/Απόφοιτη ΤΕΙ</MenuItem>
                    <MenuItem value="AEI">Απόφοιτος/Απόφοιτη ΑΕΙ</MenuItem>
                  </Select>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Πιστοποιητικό Σπουδών που επιλέξατα στο προηγούμενο πεδίο{" "}
                    <span style={{ color: "red" }}>* </span>
                  </label>
                  <input
                    id="fileUploadSpoudes"
                    type="file"
                    className="form-control"
                    onChange={handleFileUploadSpoudes}
                    style={{ marginBottom: "8px", border: "1px solid black" }}
                  />
                  &nbsp;
                  <div
                    className="d-flex align-items-center"
                    style={{ gap: "16px", marginBottom: "16px" }}
                  >
                    {/* Combobox dynatotita filoksenias */}
                    <FormControl
                      style={{ flexGrow: 2, minWidth: "320px" }}
                      fullWidth
                      variant="outlined"
                    >
                      {/* Label for the combobox */}
                      <label
                        htmlFor="firstAid"
                        className="form-label"
                        style={{
                          fontSize: "16px",
                          marginBottom: "8px",
                          display: "block",
                        }}
                      >
                        Γνώση Πρώτων Βοηθειών
                      </label>
                      {/* Combobox */}
                      <Select
                        id="firstAid"
                        value={firstAid} // Bind the current state to the Select value
                        onChange={handleFirstAidChange} // Handle selection change
                        displayEmpty
                      >
                        {/* Dropdown options */}
                        <MenuItem value=""></MenuItem>
                        <MenuItem value="ΝΑΙ">ΝΑΙ</MenuItem>
                        <MenuItem value="ΟΧΙ">ΟΧΙ</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Πιστοποιητικό Πρώτων Βοηθειών
                    {firstAid === "ΝΑΙ" && (
                      <span style={{ color: "red" }}>*</span>
                    )}
                  </label>
                  <input
                    id="fileUploadFirstAid"
                    type="file"
                    className="form-control"
                    onChange={handleFileUploadFirstAid}
                    style={{ marginBottom: "8px", border: "1px solid black" }}
                    disabled={firstAid != "ΝΑΙ"}
                  />
                  &nbsp;
                  <Typography variant="h4">Πιστοποιητικά Υγείας</Typography>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Πιστοποιητικό Υγείας - Παθολόγος/Γενικός Ιατρός{" "}
                    <span style={{ color: "red" }}>* </span>
                  </label>
                  <input
                    id="fileUploadPathol"
                    type="file"
                    className="form-control"
                    onChange={handleFileUploadPathol}
                    style={{ marginBottom: "8px", border: "1px solid black" }}
                  />
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Πιστοποιητικό Υγείας - Δερματολόγος{" "}
                    <span style={{ color: "red" }}>* </span>
                  </label>
                  <input
                    id="fileUploadDerm"
                    type="file"
                    className="form-control"
                    onChange={handleFileUploadDerm}
                    style={{ marginBottom: "8px", border: "1px solid black" }}
                  />
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Πιστοποιητικό Υγείας - Ψυχίατρος{" "}
                    <span style={{ color: "red" }}>* </span>
                  </label>
                  <input
                    id="fileUploadPsi"
                    type="file"
                    className="form-control"
                    onChange={handleFileUploadPsi}
                    style={{ marginBottom: "8px", border: "1px solid black" }}
                  />
                  &nbsp;
                  <Typography variant="h6">Υπεύθυνη Δήλωση</Typography>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Υπεύθυνη Δήλωση Συμμετοχής Στο πρόγραμμα "Νταντάδες της
                    γειτονιάς" <span style={{ color: "red" }}>* </span>
                  </label>
                  <input
                    id="fileUploadYd"
                    type="file"
                    className="form-control"
                    onChange={handleFileUploadYd}
                    style={{ marginBottom: "8px", border: "1px solid black" }}
                  />
                  &nbsp;
                  <Typography variant="h6">
                    Πιστοποιητικά για αλλοδαπούς
                  </Typography>
                  <label
                    htmlFor="textBox"
                    className="form-label"
                    style={{ fontSize: "16px" }}
                  >
                    Υπεύθυνη Δήλωση Συμμετοχής Στο πρόγραμμα "Νταντάδες της
                    γειτονιάς" <span style={{ color: "red" }}>* </span>
                  </label>
                  <input
                    id="fileUploadAlo"
                    type="file"
                    className="form-control"
                    onChange={handleFileUploadAlo}
                    style={{ marginBottom: "8px", border: "1px solid black" }}
                  />
                  &nbsp;
                </div>

                {formData.trim() === "" && (
                  <Typography
                    variant="body2"
                    color="error"
                    sx={{ marginTop: "10px" }}
                  >
                    Please fill out the field to proceed.
                  </Typography>
                )}
              </div>
            )}
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
            {/* Step 3 */}
            {activeStep === 3 && (
              <div>
                <Typography variant="h4">Ανασκόπηση Επιλογών:</Typography>
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
                      <Typography variant="h5">Βασικά Στοιχεία:</Typography>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>Όνομα:</strong> {onoma || "Δεν συμπληρώθηκε"}
                      </div>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>Επώνυμο:</strong>{" "}
                        {eponymo || "Δεν συμπληρώθηκε"}
                      </div>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>Πατρώνυμο:</strong>{" "}
                        {onomaPatera || "Δεν συμπληρώθηκε"}
                      </div>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>Μητρώνυμο:</strong>{" "}
                        {onomaMiteras || "Δεν συμπληρώθηκε"}
                      </div>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>Ημερομηνία Γέννησης:</strong>{" "}
                        {genisi
                          ? genisi.toLocaleDateString("el-GR")
                          : "Δεν συμπληρώθηκε"}
                      </div>
                    </div>
                    {/* Second Column */}
                    <div className="summary-container">
                      <Typography variant="h5">
                        Στοιχεία Επικοινωνίας:
                      </Typography>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>Σταθερό Τηλέφωνο:</strong>{" "}
                        {tilefwno || "Δεν συμπληρώθηκε"}
                      </div>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>Κινητό Τηλέφωνο:</strong>{" "}
                        {kinito || "Δεν συμπληρώθηκε"}
                      </div>
                      <div
                        className="summary-item"
                        style={{ textAlign: "left" }}
                      >
                        <strong>email:</strong> {mail || "Δεν συμπληρώθηκε"}
                      </div>
                    </div>
                  </div>
                  <div className="summary-container" style={{ width: "100%" }}>
                    <Typography variant="h5">
                      Διεύθυνση και πληροφορίες φιλοξενίας
                    </Typography>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Διεύθυνση:</strong>{" "}
                      {address || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Περιοχή:</strong> {perioxi || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Ταχυδρομικός Κώδικας:</strong>{" "}
                      {tk || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Δυνατότητα φιλοξενίας στον χώρο μου::</strong>{" "}
                      {host || "Δεν συμπληρώθηκε"}
                    </div>
                  </div>
                  <div className="summary-container" style={{ width: "100%" }}>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>
                        Ηλικίες παιδιών που δύνασται να φροντίσετε ως Νταντά:
                      </strong>{" "}
                      {childAges || "Δεν συμπληρώθηκε"}
                    </div>
                  </div>
                  <div className="summary-container" style={{ width: "100%" }}>
                    <Typography variant="h5">
                      Σπουδές και Πιστοποιητικά:
                    </Typography>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Ανώτερο επίπεδο σπουδών:</strong>{" "}
                      {ekpaideusi || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Πιστοποιητικό Σπουδών:</strong>{" "}
                      {fileUploadSpoudes || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>
                        Πιστοποιητικό Υγείας -Παθολόγος/Γενικός Ιατρός:
                      </strong>{" "}
                      {fileUploadPathol || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Πιστοποιητικό Υγείας -Δερματολόγος:</strong>{" "}
                      {fileUploadDerm || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Πιστοποιητικό Υγείας -Ψυχίατρος:</strong>{" "}
                      {fileUploadPsi || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>Υπεύθυνη Δήλωση</strong>{" "}
                      {fileUploadYd || "Δεν συμπληρώθηκε"}
                    </div>
                    <div className="summary-item" style={{ textAlign: "left" }}>
                      <strong>
                        Υπεύθυνη Δήλωση Γλωσσομάθειας (Μονο για αλλοδαπούς)
                      </strong>{" "}
                      {fileUploadAlo || "Δεν συμπληρώθηκε"}
                    </div>
                  </div>
                </div>
                &nbsp;
              </div>
            )}
          </Box>

          {/* Prev Button */}
          {/*Mporei na beltiwthei me thn xrhsh MUI: theme*/}
          <Box
            sx={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              maxWidth: "50%",
              margin: "0 auto",
            }}
          >
            <Button
              variant="contained"
              onClick={handleCancel}
              style={{
                backgroundColor: "#E53935",
                color: "white",
                flexGrow: 1, // Allow buttons to grow equally
                minWidth: "180px",
              }}
            >
              ΑΚΥΡΩΣΗ ΑΙΤΗΣΗΣ
            </Button>
            {activeStep > 0 && (
              <Button
                variant="contained"
                onClick={handlePrev}
                style={{
                  backgroundColor: "#B0C4DE",
                  color: "black",
                  flexGrow: 1, // Allow buttons to grow equally
                  minWidth: "180px",
                }}
              >
                ΠΡΟΗΓΟΥΜΕΝΟ
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleSave}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                flexGrow: 1, // Allow buttons to grow equally
                minWidth: "180px",
              }}
            >
              ΑΠΟΘΗΚΕΥΣΗ
            </Button>
            {activeStep < steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={
                  (activeStep === 0 && !validateStep0()) ||
                  (activeStep === 1 && !validateStep1OnlyFilled()) ||
                  (activeStep === 2 && !validateStep2())
                }
                style={{
                  backgroundColor: "#007BFF",
                  color: "white",
                  flexGrow: 1, // Allow buttons to grow equally
                  minWidth: "180px",
                }}
              >
                ΕΠΟΜΕΝΟ
              </Button>
            )}
            {activeStep == steps.length - 1 && (
              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{
                  backgroundColor: "#007BFF",
                  color: "white",
                  flexGrow: 1, // Allow buttons to grow equally
                  minWidth: "180px",
                }}
              >
                ΚΑΤΑΘΕΣΗ
              </Button>
            )}
            {/* Modal Dialog for confirm*/}
            <ConfirmationModals
              cancelModalOpen={cancelModalOpen}
              handleCloseCancel={handleCloseCancel}
              handleConfirmCancel={handleConfirmCancel}
              saveModalOpen={saveModalOpen}
              handleCloseSave={handleCloseSave}
              handleConfirmSave={handleConfirmSave}
              submitModalOpen={submitModalOpen}
              handleCloseSubmit={handleCloseSubmit}
              handleConfirmSubmit={handleConfirmSubmit}
            />
            {/* Success Snackbar */}
            <Snackbar
              open={successMessage}
              autoHideDuration={4000} // Auto-hide after 4 seconds
              onClose={handleCloseSuccessMessage}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleCloseSuccessMessage}
                severity="success"
                sx={{ width: "100%" }}
              >
                Data saved successfully!
              </Alert>
            </Snackbar>
            ;
          </Box>
        </Box>
      </div>
      <Footer />
    </div>
  );
}

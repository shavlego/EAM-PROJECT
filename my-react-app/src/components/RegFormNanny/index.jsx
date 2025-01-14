// Create Nanny Registration Form
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel, Box, Button, Typography, TextField, useStepContext,Select,MenuItem,FormControl,InputLabel,Grid } from "@mui/material";
import Breadcrumb from "./Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RegFormNanny  ()  {

    const navigate = useNavigate();
  

    const steps = ["Έλεγχος Στοιχείων TaxisNet", "Συμπλήρωση στοιχείων Νταντάς", "Επισύναψη Δικαιολογητικών","Έλεγχος και Υποβολή"];                 // Define stages
    const [activeStep, setActiveStep] = useState(0);

    //check the validity of the data
    const isValidName = (value) => /^[A-Za-zΑ-Ωα-ωΆ-Ώά-ώ\s]*$/.test(value);                 //i will use the same for eponymo,onoma patros,mitros  
    const isValidEmail = (value) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(value);
    const isValidNumber = (value, minLength = 1, maxLength = Infinity) => {
        // Check if the value contains only digits
        const isNumber = /^[0-9]*$/.test(value);
        // Check if the length is within the specified range
        const isCorrectLength = value.length >= minLength && value.length <= maxLength;
        return isNumber && isCorrectLength;
      };
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);  // Calculate the minimum date (18 years ago)
    
    //metablites forms
    //vars of step 0
    const [onoma,setOnoma] = useState("");
    const [eponymo,setEponymo] = useState ("");
    const [onomaPatera,setOnomaPatera] = useState("");
    const [onomaMiteras,setOnomaMiteras] = useState("");
    const [genisi,setGenisi] = useState("");
    const [formData, setFormData] = useState(""); // Input data for validation
    //vars of step 1
    const [tilefwno,setTilefwno] = useState("");
    const [kinito,setKinito] = useState("");
    const [mail,setMail] = useState("");
    const [address,setAddress] =useState("");
    const [tk,setTk] = useState("");
    const [perioxi,setPerioxi] = useState("");
    const[host,setHost]= useState("");
    const [coHost,setCoHost] = useState("");
    const [childAges,setChildAges] = useState("");
    //vars of step 2
    const [ekpaideusi,setEkpaideusi] = useState("");
    const [fileUploadSpoudes,setFileUploadSpoudes] = useState("");
    const [firstAid,setFirstAid] = useState("");
    const [fileUploadFirstAid,setFileUploadFirstAid] = useState("");
    const [fileUploadPathol,setFileUploadPathol] = useState("");
    const [fileUploadDerm,setFileUploadDerm] = useState("");
    const [fileUploadPsi,setFileUploadPsi] = useState("");
    
    //step 0 error messages
    const [nameError, setNameError] = useState(""); // State for error message
    const [SurNameError, setSurNameError] = useState(""); // State for error message
    const [FatherNameError, setFatherNameError] = useState(""); // State for error message
    const [MotherNameError, setMotherNameError] = useState(""); // State for error message
    //step 1 error messages
    const [tilefwnoError,setTilefwnoError] = useState("");
    const [kinitoError,setKinitoError] = useState("");
    const [mailError,setMailError] = useState("");
    const [addressError,setAddressError] = useState("");
    const [perioxiError,setPerioxiError] = useState("");
    const [tkError, setTkError] =useState("");

    

    //step 2 error messages
    
    
    //------------------------------------------------------------------------------------------------------------------------
    //step 0 handlers
    const handleNameChange = (e) => {
        const value = e.target.value;
        if (isValidName(value)) {
            setOnoma(value); // Update state if valid
            setNameError(""); // Clear error message
        } 
        else {
            setNameError("Στο πεδίο \" Όνομα \" επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά");
        }
    };
    const handleSurNameChange = (e) => {
        const value = e.target.value;
        if (isValidName(value)) {
            setEponymo(value); // Update state if valid
            setSurNameError(""); // Clear error message
        } 
        else {
            setSurNameError("Στο πεδίο \" Επώνυμο \" επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά");
        }
    };
    const handleFatherNameChange = (e) => {
        const value = e.target.value;
        if (isValidName(value)) {
            setOnomaPatera(value); // Update state if valid
            setFatherNameError(""); // Clear error message
        } 
        else {
            setFatherNameError("Στο πεδίο \" Όνομα Πατέρα \" επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά");
        }
    };
    const handleMotherNameChange = (e) => {
        const value = e.target.value;
        if (isValidName(value)) {
            setOnomaMiteras(value); // Update state if valid
            setMotherNameError(""); // Clear error message
        } 
        else {
            setMotherNameError("Στο πεδίο \" Όνομα Μητέρας \" επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά");
        }
    };
    const handleDateChange = (e) => {
        const value = e.target.value;
        if (isValidName(value)) {
            setOnomaMiteras(value); // Update state if valid
            setMotherNameError(""); // Clear error message
        } 
        else {
            setMotherNameError("Στο πεδίο \" Όνομα Μητέρας \" επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά");
        }
    };
    //----------------------------------------------------------------------------------------------------------------------------
    //step 1 handlers
    const handleTilefwnoChange = (e) => {
        const value = e.target.value;
        if(isValidNumber(value,0,10)){                 //only numbers and 10 digits
            setTilefwno(value);                         //set the val
            setTilefwnoError("");                       //reset error
        }
        else{
            setTilefwnoError("Ο αριθμός τηλεφώνου πρέπει να περιέχει 10 ψηφία.");
        }
    };
    const handleKinitoChange = (e) =>{
        const value = e.target.value;
        if(isValidNumber(value,0,10)){                 //only numbers and 10 digits
            setKinito(value);                         //set the val
            setKinitoError("");                       //reset error
        }
        else{
            setKinitoError("Ο αριθμός κινητού τηλεφώνου πρέπει να περιέχει 10 ψηφία.");
        }
    };

    // Handle validation when the field loses focus
    const handleTilefwnoBlur = () => {
        if (isValidNumber(tilefwno))
            setTilefwnoError("" ); // Update error state
    };

    const handleKinitoBlur = () => {
        if (isValidNumber(kinito))
            setKinitoError("" ); // Update error state
    };

    const handleMailChange = (e) => {
        const value = e.target.value;
        setMail(value);
    };
    const handleAddressChange = (e) => {
        const value = e.target.value;
        if (isValidName(value)) {
            setAddress(value); // Update state if valid
            setAddressError(""); // Clear error message
        } 
        else {
            setAddressError("Στο πεδίο \" Διεύθυνση \" επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά");
        }
    };
    const handleTκChange = (e) => {
        const value = e.target.value;
        if(isValidNumber(value,0,8)){                 //only numbers
            setTk(value);                         //set the val
            setTkError("");                       //reset error
        }
        else{
            setTkError("Ο Ταχυδρομικός κώδικας αποτελείται μόνο απο αριθμούς");
        }
    };
    const handlePerioxiChange = (e) => {
        const value = e.target.value;
        if (isValidName(value)) {
            setPerioxi(value); // Update state if valid
            setPerioxiError(""); // Clear error message
        } 
        else {
            setPerioxiError("Στο πεδίο \" Διεύθυνση \" επιτρέπονται μόνο ελληνικοί,λατινικοί χαρακτήρες και κενά");
        }
    };
    const handleHostChange = (event) => {
        setHost(event.target.value); // Update state when the user selects an option
    };
    const handleCoHostChange= (event) => {
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
    //----------------------------------------------------------------------------------------------------------------------

      // Handle the Next button click
      const handleNext = () => {
        if (activeStep === 0 && !validateStep0()) return; // Validate Step 0
        if (activeStep === 1 && !validateStep1()) return; // Validate Step 2
      
        setActiveStep(activeStep + 1); // Proceed to the next step if valid
      };
      //Handle the prev button click
      const handlePrev = ()=>{
        setActiveStep(activeStep -1); // Go Back
      };
    
      // Allow users to directly select a step
      const handleStepClick = (index) => {
        if (index != activeStep) {
          setActiveStep(index); // Allow only going back to previous steps
        }
      };

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
          setMailError("Το πεδίο \"Mail\" είναι υποχρεωτικό.");
          isValid = false;
        } else {
          setMailError("");
        }
        if(! isValidEmail(mail)){
            setMailError("Το πεδίο \"Mail\" πρέπει να περιέχει έγκυρη διεύθυνση ηλεκτρονικού ταχυδρομίου");
            isValid = false;
        }
        else {
            setMailError("");
          }
      
        if (!/^[0-9]{10}$/.test(tilefwno)) {
          setTilefwnoError("Το πεδίο \"Αριθμός Τηλεφώνου\" πρέπει να έχει 10 ψηφία.");
          isValid = false;
        } else {
          setTilefwnoError("");
        }
        if (!/^[0-9]{10}$/.test(kinito)) {
            setKinitoError("Το πεδίο \"Κινητό Τηλέφωνο\" πρέπει να έχει 10 ψηφία.");
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
    
        return isValid;
    }
    // Validation function for Step 2
    const validateStep2 = () => {
        let isValid = true;
    
        if (!ekpaideusi.trim()) {
            isValid = false;
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
    
        return isValid;
    };
    return (
        <div>
            <Header />
            <h1>Αίτηση Εγγραφής ως υποψήδια Ννταντά</h1>
            <h6 className="container" >Για την ολοκλήρωση της αίτησης σας θα πρέπει να συμπληρώσετε όλα τα πεδία με ένδειξη <span style={{ color: "red" }}>* </span>και να επισυνάψετε τα κατάλληλα έγγραφα</h6>
            <Breadcrumb/>
            <div className="container my-5">
        <Box sx={{ width: "100%", textAlign: "center", padding: "5px" }}>
        {/* Stepper Component */}
        <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
            <Step key={label}>
                <StepLabel onClick={() => handleStepClick(index)}
                sx={{ cursor: index < activeStep ? "pointer" : "default" }}>        {/*Make previous steps clickable*/} 
              {label}</StepLabel>
            </Step>
            ))}
        </Stepper>

        {/* Dynamic Content for Each Step */}
        <Box sx={{ marginTop: "20px" }}>
            {activeStep === 0 && (
            <div>
                <Typography variant="h6">Προσωπικά Στοιχεία</Typography>
                {/*form controls here*/}
                <div className="d-flex flex-column mt-3 align-items-start" style={{ width: "100%" }}>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
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
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
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
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
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
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
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
                    {/* Date Picker Field */}
                    {/*	&nbsp; Date of Birth */}
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Ημερομηνία Γέννησης <span style={{ color: "red" }}>*</span>
                    </label>
                        <DatePicker
                        id="genisi"
                        className="form-control"
                        selected={genisi}
                        onChange={(date) => setGenisi(date)}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Επιλέξτε ημερομηνία"
                        maxDate={new Date()} // Prevent future dates
                        minDate={eighteenYearsAgo}
                        showYearDropdown // Enables year dropdown
                        scrollableYearDropdown // Allows scrolling through the years
                        yearDropdownItemNumber={100} // Number of years to show in the dropdown
                        showMonthDropdown // Enables month dropdown
                        required
                    />
                    </div>

                {formData.trim() === "" && (
                <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
                    Please fill out the field to proceed.
                </Typography>
                )}
            </div>
            )}
            {/* Step 1 */}
            {activeStep === 1 && (
                <div>
                <Typography variant="h6">Στοιχεία Επικοινωνίας</Typography>
                {/*form controls here*/}
                <div className="d-flex flex-column mt-3 align-items-start" style={{ width: "100%" }}>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
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
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Αριθμός Κινητού Τηλεφώνου <span style={{ color: "red" }}>* </span>
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
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Διεύθυνση Ηλεκτρονικού ταχυδρομίου E-Mail <span style={{ color: "red" }}>* </span>
                    </label>
                    <div className="w-50"> 
                        <TextField
                            id="mail"
                            variant="outlined"
                            value={mail}
                            onChange={handleMailChange}
                            fullWidth
                            error={Boolean(mailError)} // Highlight input if there's an error
                            helperText={mailError} // Display error message below the input
                        />
                    </div>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Διεύθυνση Κατοικίας <span style={{ color: "red" }}>* </span>
                    </label>
                    <div className="w-50"> 
                        <TextField
                            id="address"
                            variant="outlined"
                            value={address}
                            onChange={handleAddressChange}
                            fullWidth
                            error={Boolean(addressError)} // Highlight input if there's an error
                            helperText={addressError} // Display error message below the input
                        />
                    </div>

                    <div className="d-flex align-items-center" style={{ gap: "16px", marginBottom: "16px" }}>
                        <FormControl style={{ flexGrow: 2, minWidth: "500px" }} fullWidth variant="outlined">
                            <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
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
                        <FormControl style={{ flexGrow: 2, minWidth: "280px" }} fullWidth variant="outlined">
                            <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                                Ταχυδρομικός Κώδικας <span style={{ color: "red" }}>* </span>
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
                        </div>
                        {/* Pedia ta opoia aforoun tin diathesimotita kai to plaisio paroxis ypiresiwn */}
                        <Typography variant="h6">Διαθεσιμότητα και Πλαίσιο παροχής υπηρεσίας</Typography>
                        &nbsp;
                        <div className="d-flex align-items-center" style={{ gap: "16px", marginBottom: "16px" }}>
                        {/* Combobox dynatotita filoksenias */}
                        <FormControl style={{ flexGrow: 2, minWidth: "320px" }} fullWidth variant="outlined">
                            {/* Label for the combobox */}
                            <label htmlFor="host" className="form-label" style={{ fontSize: "16px", marginBottom: "8px", display: "block" }}>
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
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value="yes">ΝΑΙ</MenuItem>
                            <MenuItem value="no">ΟΧΙ</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Combobox 2 */}
                        <FormControl style={{ flexGrow: 4, minWidth: "250px" }} fullWidth variant="outlined">
                            {/* Label for the combobox */}
                            <label htmlFor="cohabitants" className="form-label" style={{ fontSize: "16px", marginBottom: "8px", display: "block" }}>
                                Υπάρχουν Συνοικούντες;
                            </label>
                            {/* Combobox */}
                            <Select
                            id="cohabitants"
                            value={coHost} 
                            onChange={handleCoHostChange}
                            displayEmpty
                            >
                            {/* Dropdown options */}
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value="yes">ΝΑΙ</MenuItem>
                            <MenuItem value="no">ΟΧΙ</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Combobox 3 */}
                        <FormControl style={{ flexGrow: 4, minWidth: "320px" }} fullWidth variant="outlined">
                            {/* Label for the combobox */}
                            <label htmlFor="childAges" className="form-label" style={{ fontSize: "16px", marginBottom: "8px", display: "block" }}>
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
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value="0-6">0-6 Μηνών</MenuItem>
                            <MenuItem value="6-12">6-12 Μηνών</MenuItem>
                            <MenuItem value="1-2.5">1-2,5 Έτη</MenuItem>
                            <MenuItem value="0-2.5">0-2,5 Έτη</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                    </div>

                {formData.trim() === "" && (
                <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
                    Please fill out the field to proceed.
                </Typography>
                )}
            </div>
            )}
            {/* ------------------------------------------------------------------------------------------------------------------------- */}
            {/* Step 2 */}
            {activeStep === 2 && (
                <div>
                <Typography variant="h6">Εκπαίδευση και Πιστοποιητικά</Typography>
                {/*form controls here*/}
                <div className="d-flex flex-column mt-4 align-items-start " style={{ width: "80%" }}>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
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
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value="likio">Απόφοιτος/Απόφοιτη Λυκείου</MenuItem>
                            <MenuItem value="iek">Απόφοιτος/Απόφοιτη ΙΕΚ</MenuItem>
                            <MenuItem value="tei">Απόφοιτος/Απόφοιτη ΤΕΙ</MenuItem>
                            <MenuItem value="aei">Απόφοιτος/Απόφοιτη ΑΕΙ</MenuItem>
                        </Select>

                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Πιστοποιητικό Σπουδών που επιλέξατα στο προηγούμενο πεδίο <span style={{ color: "red" }}>* </span>
                    </label>
                    <input
                        id="fileUploadSpoudes"
                        type="file"
                        className="form-control"
                        onChange={handleFileUploadSpoudes}
                        style={{ marginBottom: "8px" }}
                    />
                        &nbsp;
                        <div className="d-flex align-items-center" style={{ gap: "16px", marginBottom: "16px" }}>
                        {/* Combobox dynatotita filoksenias */}
                        <FormControl style={{ flexGrow: 2, minWidth: "320px" }} fullWidth variant="outlined">
                            {/* Label for the combobox */}
                            <label htmlFor="firstAid" className="form-label" style={{ fontSize: "16px", marginBottom: "8px", display: "block" }}>
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
                            <MenuItem value="">
                            </MenuItem>
                            <MenuItem value="yes">ΝΑΙ</MenuItem>
                            <MenuItem value="no">ΟΧΙ</MenuItem>
                            </Select>
                        </FormControl>
                        </div>
                        <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                            Πιστοποιητικό Πρώτων Βοηθειών
                        </label>
                        <input
                            id="fileUploadFirstAid"
                            type="file"
                            className="form-control"
                            onChange={handleFileUploadFirstAid}
                            style={{ marginBottom: "8px" }}
                            disabled = {(firstAid != "yes")}
                        />
                            &nbsp;
                       <Typography variant="h4">Πιστοποιητικά Υγείας</Typography>
                       <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                            Πιστοποιητικό Υγείας - Παθολόγος/Γενικός Ιατρός <span style={{ color: "red" }}>* </span>
                        </label>
                        <input
                            id="fileUploadPathol"
                            type="file"
                            className="form-control"
                            onChange={handleFileUploadPathol}
                            style={{ marginBottom: "8px" }}
                        />
                        <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                            Πιστοποιητικό Υγείας - Δερματολόγος <span style={{ color: "red" }}>* </span>
                        </label>
                        <input
                            id="fileUploadDerm"
                            type="file"
                            className="form-control"
                            onChange={handleFileUploadDerm}
                            style={{ marginBottom: "8px" }}
                        />
                        <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                            Πιστοποιητικό Υγείας - Ψυχίατρος <span style={{ color: "red" }}>* </span>
                        </label>
                        <input
                            id="fileUploadPsi"
                            type="file"
                            className="form-control"
                            onChange={handleFileUploadPsi}
                            style={{ marginBottom: "8px" }}
                        />
                            &nbsp;
                    </div>

                {formData.trim() === "" && (
                <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
                    Please fill out the field to proceed.
                </Typography>
                )}
            </div>
            )}
        </Box>

        {/* Prev Button */}
        {/*Mporei na beltiwthei me thn xrhsh MUI: theme*/}
        <Box sx={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "1.5rem"}}>
            {activeStep > 0 && (
            <Button
                variant="contained"
                color=  "secondary"
                onClick={handlePrev}
            >
                Prev
            </Button>
            )}
            {activeStep < steps.length - 1 && (
            <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={(activeStep === 0 && !validateStep0()) || (activeStep === 1 && !validateStep1OnlyFilled())|| (activeStep === 2 && !validateStep2()) }
            >
                Next
            </Button>
            )}

        </Box>
        </Box>
        </div>
            <Footer />     
        </div>
    );
  };
  
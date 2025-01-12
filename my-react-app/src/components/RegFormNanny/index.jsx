// Create Nanny Registration Form
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel, Box, Button, Typography, TextField } from "@mui/material";
import Breadcrumb from "./Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function RegFormNanny  ()  {

    const navigate = useNavigate();
  
    const steps = ["Έλεγχος Στοιχείων TaxisNet", "Συμπλήρωση στοιχείων Νταντάς", "Επισύναψη Δικαιολογητικών","Έλεγχος και Υποβολή"];                 // Define stages
    const [activeStep, setActiveStep] = useState(0);
    //metablites forms
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
    const [address,setAddress] =useState();

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


    const [nameError, setNameError] = useState(""); // State for error message
    const [SurNameError, setSurNameError] = useState(""); // State for error message
    const [FatherNameError, setFatherNameError] = useState(""); // State for error message
    const [MotherNameError, setMotherNameError] = useState(""); // State for error message
    //step 1
    const [tilefwnoError,setTilefwnoError] = useState("");
    const [kinitoError,setKinitoError] = useState("");
    const [mailError,setMailError] = useState("");
    const [addressError,setAddressError] = useState("");

     // Calculate the minimum date (18 years ago)
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
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
    const handleMailChange = (e) => {
        const value = e.target.value;
        setMail(value);
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
    const handleMailBlur = () => {
        if (isValidEmail(mail))
            setMailError("" ); // Update error state
        else
            setMailError("Fill a valid Email Address");
    };
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
        if (index < activeStep) {
          setActiveStep(index); // Allow only going back to previous steps
        }
      };
      console.log("18 years ago:", eighteenYearsAgo);
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
                disabled={activeStep === 0 && !validateStep0() }
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
  
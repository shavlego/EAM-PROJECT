// Create Nanny Registration Form
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { Stepper, Step, StepLabel, Box, Button, Typography, TextField } from "@mui/material";
import Breadcrumb from "./Breadcrumb";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import React, { useState } from "react";

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
    
      // Handle the Next button click
      const handleNext = () => {
        setActiveStep(activeStep +1); // Proceed to the next step
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
                <Typography variant="h6">Προσωπικά στοιχεία</Typography>
                {/*form controls here*/}
                <div className="d-flex flex-column mt-3 align-items-start" style={{ width: "100%" }}>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Όνομα <span style={{ color: "red" }}>* </span>
                    </label>
                    <div className="w-50"> {/* Bootstrap class for width (adjust as needed) */}
                        <TextField
                            id="textBox"
                            variant="outlined"
                            value={onoma}
                            onChange={(e) => setOnoma(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Επώνυμο <span style={{ color: "red" }}>* </span>
                    </label>
                    <div className="w-50"> {/* Bootstrap class for width (adjust as needed) */}
                        <TextField
                            id="textBox"
                            variant="outlined"
                            value={eponymo}
                            onChange={(e) => setEponymo(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Όνομα Πατέρα <span style={{ color: "red" }}>* </span>
                    </label>
                    <div className="w-50"> {/* Bootstrap class for width (adjust as needed) */}
                        <TextField
                            id="textBox"
                            variant="outlined"
                            value={onomaPatera}
                            onChange={(e) => setOnomaPatera(e.target.value)}
                            fullWidth
                        />
                    </div>
                    <label htmlFor="textBox" className="form-label" style={{ fontSize: "16px" }}>
                        Όνομα Μητέρας <span style={{ color: "red" }}>* </span>
                    </label>
                    <div className="w-50"> {/* Bootstrap class for width (adjust as needed) */}
                        <TextField
                            id="textBox"
                            variant="outlined"
                            value={onomaMiteras}
                            onChange={(e) => setOnomaMiteras(e.target.value)}
                            fullWidth
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
                disabled={activeStep === 0 && formData.trim() === ""}
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
  
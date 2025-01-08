import React, { useState } from "react";
import { Stepper, Step, StepLabel, Box, Button, Typography, TextField } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

/* Παρότι χρησιμοποιώ material ui κάνω import bootstrap γιατί τα υπόλοιπα components είναι φτιαγμένε χρησιμοποιώντας
    bootstrap container*/

function ProgressBar() {
  const steps = ["Έλεγχος Στοιχείων TaxisNet", "Συμπλήρωση στοιχείων Νταντάς", "Επισύναψη Δικαιολογητικών","Έλεγχος και Υποβολή"];                 // Define stages
  const [activeStep, setActiveStep] = useState(0);
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
                <Typography variant="h6">Fill out the required data for Stage 1:</Typography>
                <TextField
                label="Enter some data"
                variant="outlined"
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                sx={{ marginTop: "20px", width: "300px" }}
                />
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
  );
}

export default ProgressBar;
import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const ConfirmationModals = ({
  regModalOpen,
  handleCloseReg,
  handleConfirmReg,
}) => {
  return (
    <>
      {/* Modal Dialog cancel button */}
      <Dialog
        open={regModalOpen}
        onClose={handleCloseReg}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Επιβεβαίωση Κατάθεσης Νέας Φόρμας Εγγραφής
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουροι ότι θέλετε να καταθέσετε εκ νέου φόρμα εγγραφής;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReg} style={{ color: "#007BFF" }}>
            Όχι
          </Button>
          <Button
            onClick={handleConfirmReg}
            style={{ color: "#E53935" }}
            autoFocus
          >
            Ναι
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModals;

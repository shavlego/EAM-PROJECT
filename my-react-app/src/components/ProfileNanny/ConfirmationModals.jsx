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
  cancelModalOpen,
  handleCloseCancel,
  handleConfirmCancel,
}) => {
  return (
    <>
      {/* Modal Dialog re-registration button */}
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
      {/* Modal Dialog cancel button */}
      <Dialog
        open={cancelModalOpen}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Επιβεβαίωση Ακύρωσης αλλαγών που έγιναν στο προφίλ σας
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουροι ότι θέλετε να ακυρώσετε τις αλλαγές σας;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCancel} style={{ color: "#007BFF" }}>
            Όχι
          </Button>
          <Button
            onClick={handleConfirmCancel}
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

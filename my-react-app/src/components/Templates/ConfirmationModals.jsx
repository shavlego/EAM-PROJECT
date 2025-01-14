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
  cancelModalOpen,
  handleCloseCancel,
  handleConfirmCancel,
  saveModalOpen,
  handleCloseSave,
  handleConfirmSave,
  submitModalOpen,
  handleCloseSubmit,
  handleConfirmSubmit,
}) => {
  return (
    <>
      {/* Modal Dialog cancel button */}
      <Dialog
        open={cancelModalOpen}
        onClose={handleCloseCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Επιβεβαίωση Ακύρωσης</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουροι ότι θέλετε να ακυρώσετε; Όλες οι αλλαγές σας θα
            χαθούν.
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
            Ναι, Ακύρωση
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Dialog save button */}
      <Dialog
        open={saveModalOpen}
        onClose={handleCloseSave}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Επιβεβαίωση Αποθήκευσης
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουροι ότι θέλετε να αποθηκεύσετε τις αλλαγές σας;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSave} style={{ color: "#007BFF" }}>
            Όχι
          </Button>
          <Button
            onClick={handleConfirmSave}
            style={{ color: "#4CAF50" }}
            autoFocus
          >
            Ναι, Αποθήκευση
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal Dialog submit button */}
      <Dialog
        open={submitModalOpen}
        onClose={handleCloseSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Επιβεβαίωση Υποβολής</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουροι ότι θέλετε να υποβάλετε την αίτηση σας;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubmit} style={{ color: "#007BFF" }}>
            Όχι
          </Button>
          <Button
            onClick={handleConfirmSubmit}
            style={{ color: "#007BFF" }}
            autoFocus
          >
            Ναι, Υποβολή
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConfirmationModals;

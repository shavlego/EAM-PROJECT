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
  submitModalOpen,
  handleCloseSubmit,
  handleConfirmSubmit,
  deleteModalOpen,
  handleCloseDelete,
  handleConfirmDelete,
}) => {
  return (
    <>
      {/* Modal Dialog delete  button */}
      <Dialog
        open={deleteModalOpen}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Διαγραφή Δηοσιευμένης Αγγελίας
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουροι ότι θέλετε να διαγράψετε την αγγελία που έχετε
            ανεβάσει; Αυτό σημαίνει οτι πλέον δεν θα εμφανίζεστε στις
            αναζητήσεις των γονέων.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} style={{ color: "#007BFF" }}>
            Όχι
          </Button>
          <Button
            onClick={handleConfirmDelete}
            style={{ color: "#E53935" }}
            autoFocus
          >
            Ναι
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal Dialog sumbit button */}
      <Dialog
        open={submitModalOpen}
        onClose={handleCloseSubmit}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Επιβεβαίωση δημοσίευσης αγγελίας
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Είστε σίγουροι ότι θέλετε να δημοσιεύσετε την αγγελία σας; Στην
            περίπτωση που έχετε ήδη μια δημοσιευμένη αγγελία, θα αντικατασταθεί
            με την νέα. Δημιουργία Αγγελίας;
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSubmit} style={{ color: "#007BFF" }}>
            Όχι
          </Button>
          <Button
            onClick={handleConfirmSubmit}
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

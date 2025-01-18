// Template file used to quickly create new pages
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import { useEffect, useState } from "react";
import "./index.css";
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
export default function CreateAggelia() {
  const navigate = useNavigate();

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
                <label className="form-label">Διεύθυνση</label>
                <input
                  type="text"
                  //className={`form-control ${addressError ? "is-invalid" : ""}`}
                  //value={address}
                  //onChange={handleAddressChange}
                  // onBlur={handleAddressBlur}
                />
                {/* {addressError && (
                <div className="invalid-feedback">{addressError}</div>
              )} */}
                <Form.Group controlId="addressCheckbox" className="mt-1">
                  <Form.Check
                    type="checkbox"
                    label="Επιθυμώ την εμφάνιση της Διεύθυνσης μου στην Αγγελία"
                  />
                </Form.Group>
              </div>
              <div className="row">
                <div className="col-6 mb-2">
                  <label className="form-label">Περιοχή</label>
                  <input
                    type="text"
                    //className={`form-control ${perioxiError ? "is-invalid" : ""}`}
                    //value={perioxi}
                    //onChange={handlePerioxiChange}
                    //onBlur={handlePerioxiBlur}
                  />
                  {/* perioxiError && (
                 <div className="invalid-feedback">{perioxiError}</div>
                )} */}
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Πόλη</label>
                  <input
                    type="text"
                    // className={`form-control ${cityError ? "is-invalid" : ""}`}
                    //value={city}
                    //onChange={handleCityChange}
                    // onBlur={handleCityBlur}
                  />
                  {/* {cityError && (
                  <div className="invalid-feedback">{cityError}</div>
                )} */}
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
                <label className="form-label">Email</label>
                <input
                  type="text"
                  //className={`form-control ${emailError ? "is-invalid" : ""}`}
                  // value={email}
                  // onChange={handleEmailChange}
                  //onBlur={handleEmailBlur}
                />
                {/* {emailError && (
                  <div className="invalid-feedback">{emailError}</div>
                )} */}
              </div>
              <Form.Group controlId="addressCheckbox" className="mt-1">
                <Form.Check
                  type="checkbox"
                  label="Επιθυμώ την εμφάνιση του Email μου"
                />
              </Form.Group>
              <div className="row">
                <div className=" col-md-6 mb-2">
                  <label className="form-label">Σταθερό Τηλέφωνο</label>
                  <input
                    type="text"
                    //className={`form-control ${phoneError ? "is-invalid" : ""}`}
                    //  value={phone}
                    // onChange={handlePhoneChange}
                    // onBlur={handlePhoneBlur}
                  />
                  {/* {phoneError && (
                <div className="invalid-feedback">{phoneError}</div>
              )} */}
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Κινητό Τηλέφωνο</label>
                  <input
                    type="text"
                    // className={`form-control ${cellPhoneError ? "is-invalid" : ""}`}
                    // value={cellPhone}
                    // onChange={handleCellPhoneChange}
                    // onBlur={handleCellPhoneBlur}
                  />
                  {/* {cellPhoneError && (
                  <div className="invalid-feedback">{cellPhoneError}</div>
                )} */}
                </div>
                <Form.Group controlId="addressCheckbox" className="mt-1">
                  <Form.Check
                    type="checkbox"
                    label="Επιθυμώ την εμφάνιση των αριθμών τηλεφώνου μου"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div>
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
                      </label>
                      {/* Combobox */}
                      <Select
                        id="typeOfWork"
                        // value={typeOfWork} // Bind the current state to the Select value
                        //  onChange={handletypeOfWorkChange} // Handle selection change
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
                        //value={host} // Bind the current state to the Select value
                        //   onChange={handleHostChange} // Handle selection change
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
                        {/* {host === "ΝΑΙ" && (
                          <span style={{ color: "red" }}>*</span>
                        )} */}
                      </label>
                      {/* Combobox */}
                      <Select
                        id="cohabitants"
                        //  value={coHost}
                        // onChange={handleCoHostChange}
                        displayEmpty
                        //  disabled={host != "ΝΑΙ"}
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
                        //value={childAges}
                        // onChange={handleChildAgesChange}
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
                  className="p-3 rounded custom-bg"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <label className="form-label" style={{ color: "black" }}>
                    Λίγα Λόγια για Εσάς
                  </label>
                  <textarea
                    className="form-control"
                    //value={ligaLogia}
                    //onChange={handleLigaLogiaChange}
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
                  className="p-3 rounded custom-bgy"
                  style={{
                    borderRadius: "10px",
                  }}
                >
                  <label className="form-label" style={{ color: "black" }}>
                    Σύντομο Βιογραφικό
                  </label>
                  <textarea
                    className="form-control"
                    //value={bio}
                    //onChange={handleBioChange}
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
                        //onChange={handleFileUploadFirstAid}
                        style={{ marginBottom: "8px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

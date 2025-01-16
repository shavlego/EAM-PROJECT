// nanny menu page
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "./Breadcrumb";
import "./index.css";
export default function NannyMenu() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profileNanny");
  };

  return (
    <div>
      <Header />
      <Breadcrumb />
      <Container className="mt-4">
        {/* Header Section */}
        <div className="text-center">
          <h2>Menu Επιλογών Νταντάς</h2>
          <p>
            Αυτό είναι το menu δυνατών επιλογών σας. Μπορείτε να επιλέξετε
            οποιαδήποτε καρτέλα για να μεταβείτε στην αντίστοιχη σελίδα.
          </p>
        </div>

        {/* Cards Section */}
        <Row className="card-container mt-4">
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-sm text-center h-100"
              style={{
                backgroundColor: "#D6B8F4",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Img
                variant="top"
                src="\public\Images\nanny1.png"
                className="rounded-circle mt-3"
                style={{ width: "120px", height: "120px", margin: "0 auto" }}
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>Επεξεργασία του προφίλ μου</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Card N2 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-sm text-center h-100"
              style={{
                backgroundColor: "#FFE5A5",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Img
                variant="top"
                src="\public\Images\aggelia.png"
                className="rounded-circle mt-3"
                style={{ width: "120px", height: "120px", margin: "0 auto" }}
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>Δημιουργία/Επεξεργασία Αγγελίας</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              className="shadow-sm text-center h-100"
              onClick={handleProfileClick}
              style={{
                backgroundColor: "#88C2F6",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Img
                variant="top"
                src="\public\Images\history.png"
                className="rounded-circle mt-3"
                style={{ width: "120px", height: "120px", margin: "0 auto" }}
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>Ιστορικό Αιτήσεων, Συμβάσεων, Πληρωμών</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Add remaining cards */}
        </Row>
        <Row className="card-container mt-4">
          {/* Card N1 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-sm text-center h-100"
              style={{
                backgroundColor: "#88C2F6",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Img
                variant="top"
                src="\public\Images\calendar.png"
                className="rounded-circle mt-3"
                style={{ width: "120px", height: "120px", margin: "0 auto" }}
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>Τα ραντεβού μου</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Card N2 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-sm text-center h-100"
              style={{
                backgroundColor: "#D6B8F4",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Img
                variant="top"
                src="\public\Images\review.png"
                className="rounded-circle mt-3"
                style={{ width: "120px", height: "120px", margin: "0 auto" }}
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>Οι αξιολογήσεις μου</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Repeat for all other cards */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-sm text-center h-100"
              style={{
                backgroundColor: "#FFE5A5",
                borderRadius: "30px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Card.Img
                variant="top"
                src="\public\Images\notifications.png"
                className="rounded-circle mt-3"
                style={{ width: "120px", height: "120px", margin: "0 auto" }}
              />
              <Card.Body className="d-flex flex-column justify-content-center">
                <Card.Title>
                  Ειδοποιήσεις - Υπογραγή Συμφωνητικού, Λήψη Voucher
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Add remaining cards */}
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

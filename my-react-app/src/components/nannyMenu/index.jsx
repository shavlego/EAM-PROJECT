import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Breadcrumb from "./Breadcrumb";
import "./index.css";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

export default function NannyMenu() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [appArray, setAppArray] = useState([]);
  const [userData, setUserData] = useState([]); // For fetched data
  const [hasNotifications, setHasNotifications] = useState(false);

  const handleProfileClick = () => {
    navigate("/profileNanny");
  };
  const handleAggeliaClick = () => {
    navigate("/CreateAggelia");
  };

  //----------------------------------------------------------------------------------------
  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        //navigate("/loginNanny");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // Fetch user data after userId is set
  useEffect(() => {
    if (userId) fetchUserData();
  }, [userId]);

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const q = query(
        collection(FIREBASE_DB, "user"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);
      const users = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(users);
      //If user data exists, populate the form fields
      if (users.length > 0) {
        const user = users[0]; // Assuming there's only one document per user
        //need to check if there are any notifications
        console.log("user id ", userId);
        console.log();
        setAppArray(user.applications || []); //get array of notifications
        console.log("app array len", appArray.length);
        setHasNotifications(user.applications.length > 0);
        //-------------------------------------------------------

        //setExpertise(user.expertise || "");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div>
      <Header />
      <Breadcrumb />
      <Container className="mt-4">
        {/* Header Section */}
        <div className="text-center mb-4">
          <h2 style={{ fontWeight: "bold", color: "#4A4A4A" }}>
            Menu Επιλογών Νταντάς
          </h2>
          <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
            Αυτό είναι το menu δυνατών επιλογών σας. Μπορείτε να επιλέξετε
            οποιαδήποτε καρτέλα για να μεταβείτε στην αντίστοιχη σελίδα.
          </p>
        </div>

        {/* Cards Section */}
        <Row className="justify-content-center">
          {/* Card N1 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-lg text-center h-100"
              style={{
                backgroundColor: "#F7F4FD",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Card.Img
                variant="top"
                src="/Images/nanny1.png"
                className="mt-4"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#6A1B9A" }}>
                  Επεξεργασία του προφίλ μου
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Card N2 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleAggeliaClick}
              className="shadow-lg text-center h-100"
              style={{
                backgroundColor: "#FFF7E6",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Card.Img
                variant="top"
                src="/Images/aggelia.png"
                className="mt-4"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#FF8F00" }}>
                  Δημιουργία/Επεξεργασία Αγγελίας
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Card N3 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              className="shadow-lg text-center h-100"
              onClick={handleProfileClick}
              style={{
                backgroundColor: "#E3F2FD",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Card.Img
                variant="top"
                src="/Images/history.png"
                className="mt-4"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#0288D1" }}>
                  Ιστορικό Αιτήσεων, Συμβάσεων, Πληρωμών
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Card N4 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-lg text-center h-100"
              style={{
                backgroundColor: "#E8F5E9",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Card.Img
                variant="top"
                src="/Images/calendar.png"
                className="mt-4"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#2E7D32" }}>
                  Τα ραντεβού μου
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-lg text-center h-100"
              style={{
                backgroundColor: "#F7F4FD",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Card.Img
                variant="top"
                src="/Images/review.png"
                className="mt-4"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#6A1B9A" }}>
                  Οι αξιολογήσεις μου
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Card N6 */}
          <Col md={4} sm={6} xs={12} className="mb-4">
            <Card
              onClick={handleProfileClick}
              className="shadow-lg text-center h-100"
              style={{
                backgroundColor: "#FFF7E6",
                borderRadius: "20px",
                cursor: "pointer",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0, 0, 0, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 4px 10px rgba(0, 0, 0, 0.1)";
              }}
            >
              <Card.Img
                variant="top"
                src="/Images/notifications.png"
                className="mt-4"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  margin: "0 auto",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title style={{ fontWeight: "bold", color: "#FF8F00" }}>
                  Ειδοποιήσεις - Υπογραγή Συμφωνητικού, Λήψη Voucher
                </Card.Title>
                {/* Notification Badge */}
                {hasNotifications && (
                  <Badge
                    bg="danger"
                    pill
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "0px",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    {appArray.length}
                  </Badge>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <Footer />
    </div>
  );
}

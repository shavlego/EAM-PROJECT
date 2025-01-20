import Header from "../Header";
import Footer from "../Footer";
import Breadcrumb from "./Breadcrumb";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  doc,
  setDoc,
} from "firebase/firestore";

export default function NannyApplications() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [appArray, setAppArray] = useState([]);
  const [userData, setUserData] = useState([]); // For fetched data

  // Track authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserId(user.uid);
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

      // If user data exists, fetch parent details for applications
      if (users.length > 0) {
        const user = users[0];
        const applications = user.applications || [];
        const updatedApplications = await Promise.all(
          applications.map(async (application) => {
            const parentDetails = await fetchParentData(application.parentId);
            return { ...application, parentDetails };
          })
        );
        setAppArray(updatedApplications);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Fetch parent data
  const fetchParentData = async (parentId) => {
    try {
      const q = query(
        collection(FIREBASE_DB, "user"),
        where("userId", "==", parentId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const parentDoc = querySnapshot.docs[0].data();
        return {
          parentFullName: parentDoc.fullName || "N/A",
          parentPhone: parentDoc.phone || "N/A",
          parentCellPhone: parentDoc.cellPhone || "N/A",
          parentEmail: parentDoc.email || "N/A",
          parentAddress: parentDoc.address || "N/A",
          parentRegion: parentDoc.region || "N/A",
          parentId: parentId,
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching parent data:", error);
      return null;
    }
  };

  //button handlers
  const handleAcceptClick = async (index) => {
    console.log(
      "Need to delete the rest of the nanny applications and send data to parent with id ",
      appArray[index].parentId
    );

    try {
      // Step 1: Get the parent's user document
      const parentId = appArray[index].parentId;
      const userDocRef = doc(FIREBASE_DB, "user", parentId);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        console.log("User document not found.");
        return;
      }

      const userData = userDocSnapshot.data();
      const applications = userData.applications || [];

      // Step 2: Find the specific application by nannyId
      const targetApplication = applications.find(
        (application) => application.nannyId === userId
      );

      if (!targetApplication) {
        console.log(
          "Application with the specified nannyId not found.",
          userId
        );
        navigate("/nannyMenu");
        return;
      }

      // Step 3: Modify the application (set approved to true)
      const updatedApplication = {
        ...targetApplication,
        approved: true,
      };

      // Step 4: Update Firestore (remove old app, add updated app)
      await updateDoc(userDocRef, {
        applications: arrayRemove(targetApplication),
      });

      await updateDoc(userDocRef, {
        applications: arrayUnion(updatedApplication),
      });

      console.log("Application approval updated successfully.");
    } catch (error) {
      console.error("Error updating application approval:", error);
    }
  };

  return (
    <div>
      <Header />
      <Breadcrumb />
      <div className="text-center mb-4 container">
        <h2 style={{ fontWeight: "bold", color: "#4A4A4A" }}>
          Ειδοποιήσεις Αιτήσεων
        </h2>
        <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
          Σε αυτή τη σελίδα θα βρείτε τις αιτήσεις συνεργασίας που σας έχουν
          στείλει οι γονείς. Μπορείτε να αποδεχτείτε ή να απορρίψετε τις
          αιτήσεις.
        </p>
      </div>

      <div className="container">
        <Container className="mt-4">
          <h3 className="text-start">Αιτήσεις</h3>
          {appArray.length > 0 ? (
            <Row className="gy-4">
              {appArray.map((application, index) => (
                <Col md={12} key={index}>
                  <Card className="shadow-sm p-3">
                    <Row>
                      {/* Left column: Application details */}
                      <Col md={4}>
                        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                          Αίτηση #{index + 1}
                        </p>
                        <p>
                          <strong>Child Age:</strong> {application.childAge}
                        </p>
                        <p>
                          <strong>Child Gender:</strong>{" "}
                          {application.childGender}
                        </p>
                        <p>
                          <strong>Duration:</strong> {application.duration}
                        </p>
                        <p>
                          <strong>Start Date:</strong> {application.startDate}
                        </p>
                        <p>
                          <strong>Type:</strong> {application.type}
                        </p>
                        <p>
                          <strong>Ωράριο:</strong> {application.hours}
                        </p>
                      </Col>

                      {/* Right column: Parent details */}
                      <Col md={4}>
                        {application.parentDetails ? (
                          <>
                            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                              Στοιχεία Γονέα
                            </p>
                            <p>
                              <strong>Όνομα:</strong>{" "}
                              {application.parentDetails.parentFullName}
                            </p>
                            <p>
                              <strong>Τηλέφωνο:</strong>{" "}
                              {application.parentDetails.parentPhone}
                            </p>
                            <p>
                              <strong>Κινητό:</strong>{" "}
                              {application.parentDetails.parentCellPhone}
                            </p>
                            <p>
                              <strong>Email:</strong>{" "}
                              {application.parentDetails.parentEmail}
                            </p>
                            <p>
                              <strong>Διεύθυνση:</strong>{" "}
                              {application.parentDetails.parentAddress}
                            </p>
                            <p>
                              <strong>Πόλη:</strong>{" "}
                              {application.parentDetails.parentRegion}
                            </p>
                          </>
                        ) : (
                          <p>Loading parent details...</p>
                        )}
                      </Col>
                    </Row>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        variant="success"
                        className="me-2"
                        onClick={() => handleAcceptClick(index)}
                      >
                        Αποδοχή
                      </Button>
                      <Button variant="danger">Απόρριψη</Button>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No applications found.</p>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

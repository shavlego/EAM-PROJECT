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

export default function NannyApplications() {
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
        setAppArray(user.applications || []); //get array of notifications
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
      <div className="text-center mb-4 container">
        <h2 style={{ fontWeight: "bold", color: "#4A4A4A" }}>
          Ειδοποιήσεις Αιτήσεων
        </h2>
        <p style={{ color: "#6c757d", fontSize: "1.1rem" }}>
          Σε αυτή τη σελίδα θα βρείτε τις αιτήσεις συνεργασίας που σας έχουν
          στείλει οι γονείς. Μπορείτε να αοδεχτείτε ή να απορρίψετε τις
          αιτήσεις.
        </p>
      </div>
      <div className="container"></div>
      <Footer />
    </div>
  );
}

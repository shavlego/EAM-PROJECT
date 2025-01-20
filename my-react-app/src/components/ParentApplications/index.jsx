import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc,updateDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Breadcrumb from "./Breadcrumb";

function ParentApplications() {
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await fetchApplications(currentUser.uid);
      } else {
        navigate("/loginParent");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const fetchApplications = async (userId) => {
    try {
      const userDocRef = doc(FIREBASE_DB, "user", userId);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const applications = userDoc.data().applications || [];
        const applicationsWithNannyData = await Promise.all(
          applications.map(async (app) => {
            if (app.nannyId) {
              try {
                const nannyDocRef = doc(FIREBASE_DB, "user", app.nannyId);
                const nannyDoc = await getDoc(nannyDocRef);
  
                if (nannyDoc.exists()) {
                  return {
                    ...app,
                    nannyData: nannyDoc.data(), // Attach nanny data
                  };
                }
              } catch (error) {
                console.error(`Failed to fetch nanny data for ID: ${app.nannyId}`, error);
              }
            }
            return { ...app, nannyData: null }; // Handle missing nanny data
          })
        );
  
        setApplications(applicationsWithNannyData);
      } else {
        console.error("No applications found.");
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeApplication = async (ParentId, nannyId) => {
    console.log("parent id is ", ParentId);
    console.log("nanny id is ", nannyId);
    try {
      const userDocRef = doc(FIREBASE_DB, "user", ParentId);
      const userDoc = await getDoc(userDocRef);
  
      if (userDoc.exists()) {
        const applications = userDoc.data().applications || [];
        const updatedApplications = applications.filter(app => app.nannyId !== nannyId);
  
        // Update Firestore with the filtered applications
        await updateDoc(userDocRef, { applications: updatedApplications });
  
        // Update the local state
        setApplications(updatedApplications);
        console.log(`Application with nannyId ${nannyId} has been removed.`);
      } else {
        console.error("User document does not exist.");
      }
    } catch (error) {
      console.error("Error removing application:", error);
    }
  };
  
  
  
  

  if (loading) {
    return <p>Loading applications...</p>;
  }

  const savedApplications = applications.filter((app) => !app.isSubmitted);
  const pendingApplications = applications.filter((app) => app.isSubmitted);

  return (
    <div>
      <Header />
      <Breadcrumb />
      <div className="container my-4">
        <h1 className="text-center">Οι αιτήσεις μου</h1>

        <div className="mb-4">
        <h3 className="text-primary">Αιτήσεις σε επεξεργασία</h3>
        {savedApplications.length > 0 ? (
            savedApplications.map((app, index) => (
            <div key={index} className="card my-2 p-3" style={{ backgroundColor: "#e8dcf4" }}>
                <p><strong>{app.nannyData?.fullName || "Όνομα δεν είναι διαθέσιμο"}</strong></p>
                <p>{app.nannyData?.address || "Διεύθυνση δεν είναι διαθέσιμη"}</p>
                <p>{new Date(app.startDate).toLocaleDateString()}</p>
                <div className="d-flex justify-content-between">
                <button
                    className="btn btn-warning"
                    onClick={() => navigate(`../applyForNanny/${app.nannyId}`)}
                >
                    Επεξεργασία
                </button>
                <button className="btn btn-danger"
                onClick={() => removeApplication(app.parentId, app.nannyId)}
                
                >
                  Ακύρωση
                </button>
                </div> 
            </div>
            ))
        ) : (
            <p>Δεν έχετε αποθηκευμένες αιτήσεις.</p>
        )}
        </div>

        <div className="mb-4">
        <h3 className="text-secondary">Ολοκληρωμένες αιτήσεις</h3>
        {pendingApplications.length > 0 ? (
            pendingApplications.map((app, index) => (
            <div key={index} className="card my-2 p-3" style={{ backgroundColor: "#d9d9d9" }}>
                <p><strong>{app.nannyData?.fullName || "Όνομα δεν είναι διαθέσιμο"}</strong></p>
                <p>{app.nannyData?.address || "Διεύθυνση δεν είναι διαθέσιμη"}</p>
                <p>{new Date(app.startDate).toLocaleDateString()}</p>
                <button className="btn btn-info">Περισσότερα</button>
            </div>
            ))
        ) : (
            <p>Δεν έχετε αιτήσεις σε αναμονή.</p>
        )}
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default ParentApplications;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebase";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../Header";
import Footer from "../Footer";
// import "./index.css";

function ScheduleAppointment() {
  const { nannyId } = useParams(); // Get the nanny ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // User state
  const [selectedDate, setSelectedDate] = useState(null);
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Check if the user is authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/loginParent"); // Redirect to login if not authenticated
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSchedule = async () => {
    if (!selectedDate || !time || !location) {
      setError("Παρακαλώ συμπληρώστε όλα τα πεδία.");
      return;
    }

    try {
      const appointment = {
        date: selectedDate.toISOString().split("T")[0], // Format as YYYY-MM-DD
        time,
        location,
        userId: user.uid, // Add user ID to the appointment for tracking

      };
      console.log("Nanny ID:", nannyId);
      console.log("Appointment:", appointment);
      const nannyRef = doc(FIREBASE_DB, "user", nannyId);
      console.log("Nanny Ref:", nannyRef);  // Log the document reference
      await updateDoc(nannyRef, {
        appointments: arrayUnion(appointment), // Add to the appointments array
      });

      setSuccess("Το ραντεβού προγραμματίστηκε με επιτυχία!");
      setError("");
      setTimeout(() => navigate("/findNanny"), 2000); // Redirect after success
    } catch (err) {
      console.error("Error scheduling appointment:", err);
      setError("Αποτυχία προγραμματισμού ραντεβού. Δοκιμάστε ξανά.");
    }
  };

  return (
    <div>
      <Header />
      <div className="container my-4">
        <h1 className="text-center">Προγραμματισμός Ραντεβού</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <div className="form">
          <div className="form-group mb-3">
            <label>Επιλέξτε Ημερομηνία</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Εισάγετε Ώρα</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="form-group mb-3">
            <label>Τοποθεσία</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="form-control"
              placeholder="π.χ. Καφέ, Οικία"
            />
          </div>
          <button className="btn btn-primary" onClick={handleSchedule}>
            Καταχώρηση Ραντεβού
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ScheduleAppointment;

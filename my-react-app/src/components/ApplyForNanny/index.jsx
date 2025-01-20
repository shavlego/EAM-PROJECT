import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import Header from "../Header";
import Footer from "../Footer";

function ParentApplication() {
  const { nannyId } = useParams(); // Get the nanny ID from the URL
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    region: "",
    address: "",
    phone: "",
    email: "",
    childAge: "",
    childGender: "",
    comments: "",
    startDate: "",
    endDate: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data from Firestore and prefill the form
  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userDocRef = doc(FIREBASE_DB, "user", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setFormData((prev) => ({
            ...prev,
            fullName: userData.fullName || "",
            address: userData.address || "",
            phone: userData.phone || "",
            email: userData.email || "",
            region: userData.region || "",
            childAge: userData.age || "", // Assuming "age" corresponds to "childAge"
            childGender: userData.type || "", // Assuming "type" corresponds to "childGender"
          }));
        } else {
          console.error("User data not found.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserData(currentUser.uid); // Fetch user data when authenticated
      } else {
        navigate("/loginParent");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveOrSubmit = async (isSubmit) => {
    const {
      fullName,
      region,
      address,
      phone,
      email,
      childAge,
      childGender,
      startDate,
      endDate,
    } = formData;
  
    // Validate required fields
    if (!fullName || !region || !address || !phone || !email || !childAge || !childGender || !startDate || !endDate) {
      setError("Παρακαλώ συμπληρώστε όλα τα πεδία.");
      return;
    }
  
    try {
      const application = {
        ...formData,
        parentId: user.uid,
        parentEmail: user.email,
        nannyId,
        isSubmitted: isSubmit, // Set whether the application is submitted or just stored
      };
  
      console.log("Nanny ID:", nannyId);
      console.log("Application:", application);
  
      const parentRef = doc(FIREBASE_DB, "user", user.uid);
  
      if (isSubmit) {
        // 1. Remove the saved application (if it exists)
        const parentDoc = await getDoc(parentRef);
        if (parentDoc.exists()) {
          const applications = parentDoc.data().applications || [];
          const updatedApplications = applications.filter(
            (app) => app.nannyId !== nannyId || app.isSubmitted
          );
  
          // Update the parent's database with the filtered applications
          await updateDoc(parentRef, {
            applications: updatedApplications,
          });
        }
  
        // 2. Add the submitted application to the parent's database
        await updateDoc(parentRef, {
          applications: arrayUnion(application),
        });
  
        // 3. Update the nanny's database
        const nannyRef = doc(FIREBASE_DB, "user", nannyId);
        await updateDoc(nannyRef, {
          applications: arrayUnion(application),
        });
  
        setSuccess("Η αίτηση υποβλήθηκε με επιτυχία!");
      } else {
        // Save the application without submitting it
        await updateDoc(parentRef, {
          applications: arrayUnion(application),
        });
  
        setSuccess("Η αίτηση αποθηκεύτηκε με επιτυχία!");
      }
  
      setError("");
      setTimeout(() => navigate("/profileParent"), 2000);
    } catch (err) {
      console.error("Error saving/submitting application:", err);
      setError("Αποτυχία υποβολής της αίτησης. Δοκιμάστε ξανά.");
    }
  };
  

  return (
    <div>
      <Header />
      <div className="container my-4">
        <h1 className="text-center">Αίτηση ενδιαφέροντος συνεργασίας</h1>
        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}
        <div className="row">
          <div className="col-md-6">
            <div className="p-3" style={{ backgroundColor: "#d9fdd3" }}>
              <h4>Προσωπικά Στοιχεία</h4>
              <div className="form-group mb-3">
                <label>Ονοματεπώνυμο</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="form-group mb-3">
                <label>Περιοχή</label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Διεύθυνση</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Αρ. Τηλεφώνου</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Ηλικία Παιδιού</label>
                <input
                  type="text"
                  name="childAge"
                  value={formData.childAge}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Φύλο Παιδιού</label>
                <select
                  name="childGender"
                  value={formData.childGender}
                  onChange={handleInputChange}
                  className="form-control"
                >
                  <option value="">Επιλέξτε</option>
                  <option value="Αγόρι">Αγόρι</option>
                  <option value="Κορίτσι">Κορίτσι</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="p-3" style={{ backgroundColor: "#d3f4fd" }}>
              <h4>Επιλέξτε ημερομηνίες</h4>
              <div className="form-group mb-3">
                <label>Ημερομηνία Έναρξης</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-3">
                <label>Ημερομηνία Λήξης</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center my-4">
          <button className="btn btn-danger mx-2" onClick={() => navigate("/profileParent")}>Ακύρωση</button>
          <button
            className="btn btn-warning mx-2"
            onClick={() => handleSaveOrSubmit(false)}
          >
            Αποθήκευση
          </button>
          <button
            className="btn btn-success mx-2"
            onClick={() => handleSaveOrSubmit(true)}
          >
            Υποβολή
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ParentApplication;

import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";

// Track authentication
useEffect(() => {
  const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
    if (user) {
      setEmail(user.email);
      setUserId(user.uid);
    } else {
      navigate("/loginNanny");
    }
  });
  return () => unsubscribe();
}, [navigate]);

// Fetch user data after userId is set
useEffect(() => {
  if (userId) fetchUserData();
}, [userId]);

// Logout handler
const handleLogout = async () => {
  try {
    await signOut(FIREBASE_AUTH);
    navigate("/");
  } catch (error) {
    console.error("Error logging out:", error);
    setError("Αποτυχία αποσύνδεσης. Παρακαλώ προσπαθήστε ξανά.");
  }
};

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
      setFullName(user.fullName || "");
      setAddress(user.address || "");
      setType(user.age || "");
      setPhone(user.phone || "");
      setBio(user.bio || "");
      setRegion(user.region || "");
      setExpertise(user.expertise || "");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

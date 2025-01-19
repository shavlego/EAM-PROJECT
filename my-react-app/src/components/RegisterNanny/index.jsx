import { useState } from "react";
import "./index.css";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages no matching pass

  async function SignUp(event) {
    event.preventDefault(); // Prevent default form submission
    // Reset error state
    setError("");
    // Check if password and repeat match
    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      return; //validation fails
    }

    setLoading(true);
    try {
      // Create user with email and password
      const res = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = res.user;

      // Add user details to Firestore
      await setDoc(doc(FIREBASE_DB, "user", user.uid), {
        userId: user.uid, // Store user ID
        email: user.email, // Store user email
        role: false, // Initialize role as null or some default value
        createdAt: new Date().toISOString(), // Optional: track creation date
        regSubmitted: false, //to go to registration form
      });

      console.log("User registered:", user);
      window.location.href = "/registerFormNanny"; // Redirect after successful registration
    } catch (error) {
      console.error("Registration error:", error.message);
      setError(error.message); // Set error message
    } finally {
      setLoading(false); // End loading state
    }
  }

  return (
    <div className="register">
      <form onSubmit={SignUp} className="register-container">
        <h2>Register</h2>
        <div className="register-row">
          <label>
            Email: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>
            Κωδικός: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>
            Επανάληψη Κωδικού: <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button type="submit"> {loading ? "Creating user" : "Εγγραφή"}</button>
        <a href="/">Έχω ήδη εγγραφεί</a>
      </form>
    </div>
  );
}

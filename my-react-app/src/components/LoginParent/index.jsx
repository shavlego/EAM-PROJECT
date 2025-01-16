import "./index.css";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import query and where methods

export default function LoginParent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authChecked, setAuthChecked] = useState(false); // State to track if auth is checked

  const navigate = useNavigate();

  // Handles the login functionality of the user
  async function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Indicate login is in progress
    setError(""); // Clear previous error

    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;

      console.log("User logged in:", user); // Debugging log

      // Create a query to find the user by uid and role
      const userQuery = query(
        collection(FIREBASE_DB, "user"),
        where("userId", "==", user.uid), // Query by the user's uid
        where("role", "==", true) // Check if role is true (parent)
      );

      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        // User is a parent, navigate to their profile
        navigate("/profileParent");
      } else {
        setError("You do not have access to this section.");
      }
    } catch (error) {
      console.error("Error during login:", error); // Debugging log
      setError(error.message); // Display the error message
    } finally {
      setLoading(false); // Reset the loading state
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (currentUser) => {
      if (currentUser) {
        // Wait for the user to be authenticated before checking the role
        setAuthChecked(true); // Mark auth as checked

        // No navigation should happen here, because we are checking the role in handleLogin
      } else {
        setAuthChecked(true); // Ensure the auth check is completed even if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, [navigate]);

  // Render the login form only when authentication is checked
  if (!authChecked) {
    return <div>Loading...</div>; // Optional loading state while authentication is checked
  }

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="login-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message */}
        <div className="login-row">
          <label>Email:</label>
          &nbsp;&nbsp;&nbsp;
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-row">
          <label>Password:</label>
          &nbsp;&nbsp;&nbsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-container">
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <div className="links">
          <a href="/registerParent">Create new user</a>
          <a href="/">Forgot password</a>
        </div>
      </form>
    </div>
  );
}

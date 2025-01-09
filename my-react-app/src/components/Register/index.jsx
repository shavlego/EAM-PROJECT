import  { useState } from 'react';
import './index.css'
import { FIREBASE_AUTH } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Register(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword,setRepeatPassword] = useState('');  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');               // State for error messages no matching pass

  async function SignUp(event) {
    event.preventDefault(); // Prevent default form submission
    // Reset error state
    setError('');
    // Check if password and repeat match
    if (password !== repeatPassword) {
      setError('Passwords do not match!');
      alert('passwords does not match');
      return; //validation fails
    }


    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      console.log("User registered:", res.user);
      window.location.href = "/";
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }


    return(
      <div className='register'>
        <form onSubmit={SignUp} className='register-container'>
            <h2>Register</h2>
            <div className='register-row'>
                <label>Email: <span style={{ color: "red" }}>*</span></label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Password: <span style={{ color: "red" }}>*</span></label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Repeat Password: <span style={{ color: "red" }}>*</span></label>
                <input
                    type="password"
                    value={repeatPassword}
                    onChange={(e) => setRepeatPassword(e.target.value)}
                />
            </div>
            <button type='submit'> {loading ? 'Creating user' : 'Register'}</button>
            <a href='/'>Already have an Account?</a>
        </form>
      </div>
    )
}
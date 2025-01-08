import React, { useEffect, useState } from 'react';
import { FIREBASE_AUTH , FIREBASE_DB}  from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export default function SandBox(){
    const [address,setAddress] = useState(null);
    const [age,setAge] = useState(null);
    const[fullName,setFullName] = useState('');
    const[userId , setUserId] = useState(null);
    const [formMessage, setFormMessage] = useState('');
    const [userData, setUserData] = useState([]); // State for fetched user data
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (user) {
                setAddress(user.address);
                setAge(user.age); // Store the user's UID
            } else {
                setAddress(null);
                setAge(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        if (userId) {
            fetchUserData(); // Fetch user data only after the user_id is available
        }
    }, [userId]);

    const handleLogout = async () => {
        try {
            await signOut(FIREBASE_AUTH);
            navigate('/');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormMessage('');
        
        try {
            const payload = {
                fullName: doc.fullName,
                age: parseInt(age),
                userId: userId, // Add the user's UID
                address: address,
            }
            
            await addDoc(collection(FIREBASE_DB, 'user'), payload);

            setFormMessage('Data submitted successfully!');
            setAddress('');
            setFullName('');
            setAge('');
            fetchUserData(); // Refresh user data after submission
        } catch (error) {
            console.error('Error adding document:', error);
            setFormMessage('Error submitting data. Please try again.');
        }
    };

    const fetchUserData = async () => {
        try {
            const q = query(collection(FIREBASE_DB, 'user'), where('userId', '==', userId)); // Query only data matching the user's UID
            const querySnapshot = await getDocs(q);
            const users = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUserData(users);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
        
    return (
        <div className='courses'>
        <h1>Welcome</h1>
        {address ? <p>Your address: {address}</p> : <p>No user logged in</p>}
        <button onClick={handleLogout}>Logout</button>
        <h2>Submit User Data</h2> 
         <form onSubmit={handleFormSubmit} className="data-form">
             <div className="form-row">
                <label>name:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    />
                </div>
            <button type="submit">Submit</button>
            {formMessage && <p>{formMessage}</p>}
        </form> 
         <h2>User Data</h2>
        {userData.length > 0 ? (
            <table>
            <thead>
                <tr>
                    <th>AMKA</th>
                    <th>First Name</th>
                    <th>Age</th>
                </tr>
            </thead>
            <tbody>
                {userData.map((user) => (
                    <tr key={user.id}>
                        <td>{user.address}</td>
                        <td>{user.fullName}</td>
                        <td>{user.age}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        ) : (
            <p>No user data found</p>
        )}
    </div>
);

}
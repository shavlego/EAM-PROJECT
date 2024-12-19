
import BecomeNanny from './components/BecomeNanny';
import FindNanny from './components/FindNanny';
import Home from './components/Home';
import LoginNanny from './components/LoginNanny';
import LoginParent from './components/LoginParent';
import Profile from './components/Profile';
import Register from './components/Register';
import PreLoginPage from './components/PreLoginPage';


import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";



function App() {
  return (
    <Router>  
        {/*Implementing Routes for respective Path */}
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="preLoginPage" element={<PreLoginPage/>} />
            <Route path="/loginNanny"element={<LoginNanny />} />
            <Route path="/loginParent"element={<LoginParent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="register" element={<Register/>} />

            <Route path="/becomeNanny" element={<BecomeNanny />}/>
            <Route path="/findNanny" element={<FindNanny />} />
        </Routes>
    </Router>
  );
}

export default App;

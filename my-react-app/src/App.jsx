
import BecomeNanny from './components/BecomeNanny';
import FindNanny from './components/FindNanny';
import Home from './components/Home';
import LoginNanny from './components/LoginNanny';
import LoginParent from './components/LoginParent';
import Profile from './components/Profile';
import Register from './components/Register';
import PreLoginPage from './components/PreLoginPage';
import ProfileParent from './components/ProfileParent';
import Contact from './components/Contact';
import nannyInfo from './components/nanny_info/nanny_info';



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
            <Route path="/preLoginPage" element={<PreLoginPage/>} />
            <Route path="/loginNanny"element={<LoginNanny />} />
            <Route path="/loginParent"element={<LoginParent />} />
            <Route path="/profileParent" element={<ProfileParent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/nanny_info" element={<nannyInfo />} />

            <Route path="/register" element={<Register/>} />

            <Route path="/becomeNanny" element={<BecomeNanny />}/>
            <Route path="/findNanny" element={<FindNanny />} />
        </Routes>
    </Router>
  );
}

export default App;

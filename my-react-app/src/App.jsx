import BecomeNanny from "./components/BecomeNanny";
import FindNanny from "./components/FindNanny";
import Home from "./components/Home";
import LoginNanny from "./components/LoginNanny";
import LoginParent from "./components/LoginParent";
import Profile from "./components/Profile";
import RegisterParent from "./components/RegisterParent";
import RegisterNanny from "./components/RegisterNanny";
import PreLoginPage from "./components/PreLoginPage";
import ProfileParent from "./components/ProfileParent";
import Contact from "./components/Contact";
import NannyInfo from "./components/NannyInfo";
import ParentInfo from "./components/ParentInfo";
import Faq from "./components/Faq";
import SiteMap from "./components/SiteMap";
import Anouncements from "./components/Anouncements";
import SandBox from "./components/SandBox";
import ProfileNanny from "./components/ProfileNanny";
import RegFormNanny from "./components/RegFormNanny";
import ScheduleAppointment from "./components/ScheduleAppointment";
import NannyMenu from "./components/NannyMenu";
import ApplyForNanny from "./components/ApplyForNanny";
import CreateAggelia from "./components/CreateAggelia";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AitisiSinergasias from "./components/AitisiSinergasias";

function App() {
  return (
    <Router>
      {/*Routes for each page with URL*/}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preLoginPage" element={<PreLoginPage />} />
        <Route path="/loginNanny" element={<LoginNanny />} />
        <Route path="/loginParent" element={<LoginParent />} />
        <Route path="/profileParent" element={<ProfileParent />} />
        <Route path="/profileNanny" element={<ProfileNanny />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/NannyInfo" element={<NannyInfo />} />
        <Route path="/ParentInfo" element={<ParentInfo />} />
        <Route path="/Faq" element={<Faq />} />
        <Route path="/SiteMap" element={<SiteMap />} />
        <Route path="/registerNanny" element={<RegisterNanny />} />
        <Route path="/registerParent" element={<RegisterParent />} />
        <Route path="/becomeNanny" element={<BecomeNanny />} />
        <Route path="/findNanny" element={<FindNanny />} />
        <Route path="/Anouncements" element={<Anouncements />} />
        <Route path="/SandBox" element={<SandBox />} />

        <Route path="/NannyMenu" element={<NannyMenu />} />
        <Route path="/CreateAggelia" element={<CreateAggelia />} />
        <Route path="/AitisiSinergasias" element={<AitisiSinergasias />} />
        <Route
          path="/scheduleAppointment/:nannyId"
          element={<ScheduleAppointment />}
        />
        <Route path="/applyForNanny/:nannyId" element={<ApplyForNanny />} />
        <Route path="/registerFormNanny" element={<RegFormNanny />} />
      </Routes>
    </Router>
  );
}

export default App;

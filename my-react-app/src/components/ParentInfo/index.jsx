// nanny info page
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import Eligibility from "./Eligibility";
import HowitWorks from "./HowItWorks";

export default function NannyInfo  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h1>Οδηγίες για Γονείς</h1>
            <Breadcrumb/>
            <p>Σε αυτή την σελίδα  θα βρείτε τις πληροφορίες που χρειάζεστε για να επωφεληθείτε απο το πρόγραμμα ως γονέας.</p>
            <Eligibility/>
            <HowitWorks/>
            <Footer />     
        </div>
    );
  };
  
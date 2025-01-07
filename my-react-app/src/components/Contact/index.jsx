// Home Page Component
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import ContactForm from "./ContactForm";

export default function Contact  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h1>Eπικοινωνήστε μαζί μας</h1>
             {/* Contact Information Section */}
            <div className="d-flex  container align-items-center mb-4">
                <div className="d-flex align-items-center me-4">
                    <i className="fas fa-phone fa-lg me-3"></i>
                    <span>210325880 - 2103258090</span>
                </div>
                <div className="d-flex align-items-center">
                    <i className="fas fa-envelope fa-lg me-3"></i>
                    <span>ntantades@yeka.gr</span>
                </div>
            </div>
            <ContactForm/>
            <Footer />     
        </div>
    );
  };
  
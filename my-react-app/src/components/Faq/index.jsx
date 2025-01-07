// faq page
import Header from "../Header";
import Footer from "../Footer";
import Breadcrumb from "./Breadcrumb";
import { useNavigate } from "react-router-dom";

export default function Faq  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h1>Συχνές Ερωτήσεις</h1>
            <Breadcrumb/>
            <Footer />     
        </div>
    );
  };
  
// Anouncements page
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

export default function Anouncements  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h1>Ανακοινώσεις</h1>
            <Breadcrumb/>
            <Footer />     
        </div>
    );
  };
  
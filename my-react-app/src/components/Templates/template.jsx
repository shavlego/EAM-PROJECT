// Template file used to quickly create new pages
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";

export default function Contact  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h1>Change Title</h1>
            <Breadcrumb/>
            <Footer />     
        </div>
    );
  };
  
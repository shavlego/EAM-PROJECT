// Template file used to quickly create new pages
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

export default function Contact  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h1>Home Page 2</h1>
            <Footer />     
        </div>
    );
  };
  
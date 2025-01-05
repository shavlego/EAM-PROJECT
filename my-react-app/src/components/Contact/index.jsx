// Home Page Component
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

export default function Contact  ()  {

    const navigate = useNavigate();
  
    return (
        <div>
            <Header />
            <h2>Home Page 2</h2>
            <button onClick={
                 navigate("/contact")}>Go to Contact</button>
            <Footer />     
        </div>
    );
  };
  
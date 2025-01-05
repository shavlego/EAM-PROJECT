// Home Page Component
import Header from "../Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";

export default function FindNanny  ()  {

    const nav = useNavigate();

    const handleContactClick
        = function(){
        nav('/Contact')
        }


   

  
    return (
        <div>
            <Header />
            <h2>Home Page</h2>
            <button onClick={handleContactClick}>Go to Contact</button>
            <Footer />     
        </div>
    );
  };
  
// Home Page Component
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import StepProgressBar from "./ProgressBar";

function FindNanny  ()  {

    const nav = useNavigate();
    const handleContactClick
        = function(){
        nav('/Contact')
        }


  
    return (
        <div>
            <Header />
            <h2>Home Page</h2>
            <ProgressBar/>
            <Footer />     
        </div>
    );
  }
  

  export default FindNanny;